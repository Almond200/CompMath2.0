// Past-paper mocks and Elo-curve matching. All choices retain stable source problem IDs.
(function (root) {
  'use strict';
  const formats = Object.freeze({
    'AMC 8': { count:25, minutes:40, correct:1, blank:0 },
    'AMC 10': { count:25, minutes:75, correct:6, blank:1.5 },
    'AMC 12': { count:25, minutes:75, correct:6, blank:1.5 },
    'AIME': { count:15, minutes:180, correct:1, blank:0 }
  });
  const mean = a => a.reduce((s,x)=>s+x,0)/a.length;
  function identity(p) { return p.identity || (p.strategy ? p.year+'|'+p.strategy.replace(/\s+/g,' ').trim() : p.slug); }
  function papers(problems, hasAnswer) {
    const groups = new Map();
    for (const p of problems) {
      if (!formats[p.fam] || !hasAnswer(p)) continue;
      const label = p.ref.replace(/,\s*Problem\s+\d+$/, '');
      if (!groups.has(label)) groups.set(label, { label, family:p.fam, year:p.year, problems:[] });
      groups.get(label).problems.push(p);
    }
    return [...groups.values()].filter(g => {
      const n=formats[g.family].count, slots=new Set(g.problems.map(p=>p.num));
      return g.problems.length===n && slots.size===n && [...slots].every(k=>k>=1&&k<=n);
    }).map(g=>({...g, problems:g.problems.slice().sort((a,b)=>a.num-b.num)}))
      .sort((a,b)=>b.year-a.year||a.label.localeCompare(b.label,undefined,{numeric:true}));
  }
  // Least-squares monotone fit: small reversals in historical slot means should not reverse a mock's progression.
  function monotone(values) {
    const blocks=[];
    values.forEach(x=>{blocks.push({sum:x,n:1});while(blocks.length>1){const a=blocks.at(-2),b=blocks.at(-1);if(a.sum/a.n<=b.sum/b.n)break;blocks.splice(-2,2,{sum:a.sum+b.sum,n:a.n+b.n});}});
    return blocks.flatMap(b=>Array(b.n).fill(b.sum/b.n));
  }
  function curve(catalog, family, isVoided=()=>false) {
    const available=catalog.filter(g=>g.family===family), format=formats[family];
    if(!format||!available.length)throw Error('No complete papers are available for this contest.');
    // A common five-calendar-year window; omit missing papers within it.
    const endYear=Math.max(...catalog.map(g=>g.year)), startYear=endYear-4;
    const recent=available.filter(g=>g.year>=startYear), means=[];
    for(let slot=1;slot<=format.count;slot++){
      const byYear=new Map();
      for(const paper of recent){const p=paper.problems[slot-1];if(!Number.isFinite(p.elo)||isVoided(p))continue;if(!byYear.has(p.year))byYear.set(p.year,[]);byYear.get(p.year).push(p.elo);}
      if(!byYear.size)throw Error('Not enough recent difficulty ratings to model this contest.');
      means.push(mean([...byYear.values()].map(mean)));
    }
    return {startYear,endYear,years:[...new Set(recent.map(g=>g.year))].sort(),means,targets:monotone(means)};
  }
  function generate(problems, catalog, family, hasAnswer, isVoided=()=>false, random=Math.random) {
    const model=curve(catalog,family,isVoided), format=formats[family], unique=new Map();
    for(const p of problems){
      // The owner explicitly allows our 2019 HMMT round as an exception to the older-source cutoff.
      const older=p.year<model.startYear || p.fam==='HMMT February';
      if(!older||!hasAnswer(p)||isVoided(p)||!Number.isFinite(p.elo))continue;
      const key=identity(p);if(!unique.has(key))unique.set(key,p);
    }
    let pool=[...unique.values()];
    if(pool.length<format.count)throw Error('Not enough older problems are available to build this mock.');
    const selected=[];
    for(const target of model.targets.slice().reverse()){
      const nearest=Math.min(...pool.map(p=>Math.abs(p.elo-target)));
      const tolerance=Math.max(100,nearest+25);
      const choices=pool.filter(p=>Math.abs(p.elo-target)<=tolerance);
      const chosen=choices[Math.floor(random()*choices.length)];selected.push(chosen);
      pool=pool.filter(p=>p!==chosen);
    }
    selected.sort((a,b)=>a.elo-b.elo||a.slug.localeCompare(b.slug));
    return {problems:selected,model};
  }
  function score(set, result) {
    const f=formats[set.mock?.family];if(!f)return null;
    const counts={Correct:0,Incorrect:0,Unanswered:0,Voided:0,'Answer unavailable':0};
    set.slugs.forEach(s=>counts[result(s)]++);
    const points=(counts.Correct+counts.Voided)*f.correct+counts.Unanswered*f.blank;
    return {points,max:set.slugs.length*f.correct,counts};
  }
  const api={formats,identity,papers,curve,generate,score,monotone};
  if(typeof module!=='undefined')module.exports=api;else root.MockContests=api;
})(typeof window!=='undefined'?window:globalThis);
