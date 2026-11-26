// Route-local Arena views. Grading, statements, math inputs and study destinations are
// supplied by the main app so an archived problem behaves the same in both spaces.
(function () {
  'use strict';
  const A = window.Arena, grade = window.PracticeSessions;
  const number = n => n.toLocaleString(), signed = n => (n > 0 ? '+' : '') + n;
  const hasAnswer = event => !!(event.answer || event.firstMiss);
  const paceNames = { warmup: 'Warm-up', matched: 'Matched', stretch: 'Stretch' };
  const trendRanges = [[0,'All time'],[1,'Past 1 month'],[3,'Past 3 months'],[12,'Past 1 year']];
  const trendPeriod = {0:'over all time',1:'over the past month',3:'over the past 3 months',12:'over the past year'};
  const trendDates = new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',year:'numeric'});
  const sessionUrl = '#/arena/session', homeUrl = '#/arena';
  const missing = new Set(), cachedSubjects = new WeakMap();
  const back = ctx => `<a class="back-link" href="#/arena">${ctx.icon('arrow-left')} Arena overview</a>`;
  function subjectIds(ctx, p) {
    if (!cachedSubjects.has(p)) cachedSubjects.set(p, ctx.subjectsOf(p));
    return cachedSubjects.get(p);
  }
  function setPoints(points) {
    return points.filter((point, i, all) => point.calibration ? !all[i+1]?.calibration :
      all[i+1]?.event.session !== point.event.session);
  }
  function ratingHistory(stats, subject) {
    if (!subject) return setPoints(stats.points).map(({rating,event}) => ({rating, at:event.at}));
    if (!stats.baseline) return [];
    const points = stats.points.filter(point => !point.calibration && point.event.subjects.includes(subject));
    return [{rating:stats.baseline.rating, at:stats.baseline.event.at}, ...setPoints(points).map(point => ({
      rating:point.subjectChanges.find(change => change.id === subject).after, at:point.event.at
    }))];
  }
  function rangeStart(months) {
    const date = new Date(), day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() - months);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    date.setDate(Math.min(day,lastDay));
    return date.getTime();
  }
  function chart(points, months) {
    if (!points.length) return {html:'<p class="arena-note">Finish placement to see your rating trend.</p>'};
    const start = months ? rangeStart(months) : -Infinity;
    const data = points.filter(point => point.at >= start);
    if (!data.length) return {html:'<p class="arena-note">No rating activity in this range.</p>'};
    const prior = months && points.findLast(point => point.at < start);
    if (prior) data.unshift({rating:prior.rating,at:start});
    const first = data[0], last = data.at(-1), span = last.at - first.at;
    const values = data.map(point => point.rating);
    const lo = Math.max(0, Math.floor((Math.min(...values) - 5) / 25) * 25);
    const hi = Math.ceil((Math.max(...values) + 5) / 25) * 25;
    const x = at => span ? 38 + 437 * (at - first.at) / span : 38;
    const y = v => 78 - 64 * (v - lo) / (hi - lo);
    const samples = data.map(p => ({x:x(p.at), y:y(p.rating), label:`${trendDates.format(p.at)} · ${number(p.rating)} Elo`}));
    const coords = samples.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const firstDate = trendDates.format(first.at), lastDate = trendDates.format(last.at);
    const label = data.length === 1 ? `Rating on ${lastDate}: ${number(last.rating)} Elo` :
      `Rating trend from ${firstDate} to ${lastDate}: ${number(first.rating)} to ${number(last.rating)} Elo`;
    const html = `<svg class="arena-chart" viewBox="0 0 485 88" tabindex="0" role="img" aria-label="${label}" aria-description="Use the arrow keys to inspect dates and ratings.">
      ${[hi, lo].map(v => `<line x1="38" y1="${y(v)}" x2="475" y2="${y(v)}"/><text x="0" y="${y(v)+4}">${number(v)}</text>`).join('')}
      ${span ? `<polygon points="38,78 ${coords} 475,78"/><polyline points="${coords}"/>` : ''}
      <circle cx="${x(last.at)}" cy="${y(last.rating)}" r="3.5"/>
      <g class="arena-chart-marker" visibility="hidden" aria-hidden="true"><line x1="0" x2="0" y1="14" y2="78"/><circle r="4"/></g></svg>
      <output class="arena-chart-tip" hidden></output>
      <div class="arena-chart-caption"><span>${firstDate}</span>${firstDate === lastDate ? '' : `<span>${lastDate}</span>`}</div>
      <p class="arena-note arena-plot-change"><strong>${signed(last.rating-first.rating)} Elo</strong> ${trendPeriod[months]}</p>`;
    return {html,samples};
  }
  function trendPlot(label) {
    return `<section class="arena-plot" data-rating-plot><div class="arena-plot-head"><h4>Rating trend</h4>
      <select aria-label="${label} rating trend period">${trendRanges.map(([months,name]) => `<option value="${months}">${name}</option>`).join('')}</select></div>
      <div class="arena-plot-body"></div></section>`;
  }
  function wireTrend(plot, points) {
    const range = plot.querySelector('select'), body = plot.querySelector('.arena-plot-body');
    const draw = () => {
      const {html,samples} = chart(points,Number(range.value));
      body.innerHTML = html;
      if (!samples) return;
      const svg = body.querySelector('svg'), tip = body.querySelector('output');
      const marker = svg.querySelector('.arena-chart-marker'), dot = marker.querySelector('circle');
      let active = -1;
      function show(index) {
        if (active === index) return;
        active = index;
        const {x,y,label} = samples[index];
        marker.setAttribute('transform',`translate(${x} 0)`);
        marker.setAttribute('visibility','visible');
        dot.setAttribute('cy',y);
        tip.textContent = label;
        tip.hidden = false;
        const max = Math.max(0, svg.clientWidth - tip.offsetWidth);
        tip.style.left = Math.max(0,Math.min(max,svg.clientWidth*x/485-tip.offsetWidth/2)) + 'px';
      }
      function hide() {
        active = -1;
        marker.setAttribute('visibility','hidden');
        tip.hidden = true;
      }
      function point(event) {
        const rect = svg.getBoundingClientRect();
        const x = (event.clientX - rect.left) * 485 / rect.width;
        const nearest = samples.reduce((best,p,i) => Math.abs(p.x-x) <= Math.abs(samples[best].x-x) ? i : best,0);
        show(nearest);
      }
      svg.addEventListener('pointermove',point);
      svg.addEventListener('pointerdown',point);
      svg.addEventListener('pointerleave',e => { if (e.pointerType !== 'touch') hide(); });
      svg.addEventListener('focus',() => show(samples.length-1));
      svg.addEventListener('blur',hide);
      svg.addEventListener('keydown',event => {
        const last = samples.length - 1, index = active < 0 ? last : active;
        const target = {ArrowLeft:Math.max(0,index-1), ArrowRight:Math.min(last,index+1), Home:0, End:last}[event.key];
        if (target == null) return;
        event.preventDefault();
        show(target);
      });
    };
    range.addEventListener('change',draw);
    draw();
  }
  const rules = `<details class="arena-rules"><summary>How ratings work</summary>
    <p>Placement is untimed. The next problem adapts to how you answered the previous ones. You get two tries per problem in placement and in rated sets. Each result is compared with that problem’s own Elo. A first-try solve earns full rating credit and a second-try solve earns half.</p>
    <p>The placement set establishes a provisional starting rating for all four subjects. Later sets update each subject independently. Each subject stays provisional until you correctly answer ${A.SUBJECT_PROVISIONAL} rated problems in that subject. Overall Elo stays provisional while any subject rating is provisional.</p>
    <p>Rated sets share one timer across all problems. Each problem adds 2 to 15 minutes based on its difficulty. The same timing scale applies to every subject. Submitting grades any saved answers. Unanswered problems count as misses.</p>
    <p>Each problem updates the subjects it covers. Overall Elo is the average of your three lowest subject ratings. Solving a harder problem earns more Elo, and missing an easier one costs more. Early ratings adjust faster. The minimum rating is 0 Elo.</p></details>`;
  function selector(name, legend, options, value) {
    return `<fieldset class="arena-options"><legend>${legend}</legend><div>${options.map(([id, label]) =>
      `<label><input type="radio" name="${name}" value="${id}" ${id === value ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></fieldset>`;
  }
  function focusOf(state, events) {
    const id = events[0].session;
    const explicit = events.find(event => event.focus)?.focus || (state.session?.id === id ? state.session.focus : null);
    if (explicit) return explicit;
    const shared = events[0].subjects.filter(subject => events.every(event => event.subjects.includes(subject)));
    return shared.length === 1 ? shared[0] : 'mixed';
  }
  function ratingRange(points, focus) {
    if (focus === 'mixed') {
      const after = points.at(-1)?.rating;
      return {before:after - points.reduce((sum,point) => sum + point.delta,0), after};
    }
    const changes = points.flatMap(point => point.subjectChanges.filter(change => change.id === focus));
    return {before:changes[0]?.before, after:changes.at(-1)?.after};
  }
  function showHistory(ctx, state, stats) {
    const box = ctx.container.querySelector('#arena-history-list');
    const button = box.parentElement.querySelector('[data-arena-history-toggle]');
    const sessions = new Map(), pointsBySession = new Map();
    state.events.forEach(event => {
      if (state.session?.id === event.session && !state.session.closed) return;
      if (!sessions.has(event.session)) sessions.set(event.session,[]);
      sessions.get(event.session).push(event);
    });
    stats.points.forEach(point => {
      if (!pointsBySession.has(point.event.session)) pointsBySession.set(point.event.session,[]);
      pointsBySession.get(point.event.session).push(point);
    });
    const groups = [...sessions.values()].reverse();
    if (!groups.length) { box.textContent = 'Completed sets will appear here for review.'; return; }
    const previewSize = 4;
    function appendRows(rows) {
      for (const events of rows) {
        const event = events.at(-1), points = pointsBySession.get(event.session) || [];
        const placement = event.placement || points.length && points.every(p => p.calibration);
        const focus = focusOf(state,events);
        const {before,after} = ratingRange(points,focus);
        const change = Number.isFinite(after - before) ? signed(after - before) + (focus === 'mixed' ? ' overall Elo' : ' Elo') : 'No rating change';
        const date = new Date(event.at).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
        box.insertAdjacentHTML('beforeend', `<div class="arena-log arena-history-row">
          <a href="${reviewUrl(event.session)}">${placement ? (stats.baseline?.event.session === event.session ? 'Placement' : 'Placement incomplete') : ratedSetTitle(ctx,focus,events)} <small>${date}</small></a>
          ${placement ? '' : `<span>${change}</span>`}</div>`);
      }
    }
    appendRows(groups.slice(0,previewSize));
    if (groups.length <= previewSize) return;
    button.hidden = false;
    button.onclick = () => {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Show less' : 'Show all';
      if (expanded) {
        appendRows(groups.slice(previewSize));
        box.children[previewSize].querySelector('a').focus();
      } else {
        while (box.children.length > previewSize) box.lastElementChild.remove();
      }
    };
  }
  function reviewedProblemLink(ctx, event) {
    const p = ctx.lookup(event.item);
    const name = ctx.escape(p ? ctx.refShort(p.ref) : event.item);
    return `<a class="review-problem-link" href="${reviewUrl(event.session)}/${event.reviewNumber}"${p ? ` data-problem-preview="${ctx.escape(p.slug)}"` : ''}>${name}</a>`;
  }
  function reviewedProblemsHtml(ctx, examples) {
    const links = examples.map(event => reviewedProblemLink(ctx,event));
    if (links.length < 3) return links.join(' and ');
    return links.slice(0,-1).join(', ') + ', and ' + links.at(-1);
  }
  function studyReasonHtml(ctx, examples) {
    const missed = examples.filter(event => event.outcome === 'incorrect');
    const retried = examples.filter(event => event.outcome === 'correct');
    const unanswered = examples.filter(event => event.outcome === 'unanswered');
    const reasons = [];
    if (missed.length) reasons.push('you missed ' + reviewedProblemsHtml(ctx,missed));
    if (retried.length) reasons.push('you needed two tries on ' + reviewedProblemsHtml(ctx,retried));
    if (unanswered.length) reasons.push('you left ' + reviewedProblemsHtml(ctx,unanswered) + ' unanswered');
    return 'Because ' + reasons.join(' and ') + '.';
  }
  const hasArenaReview = event => event.source === 'arena' && event.session && event.reviewNumber;
  function studyRowsHtml(ctx, rows) {
    return `<div class="arena-study-list">${rows.map(r => {
      const item = ctx.studyItem(r);
      const lesson = r.kind === 'topic' ? ctx.studyLink(r.id, r.missedSlug) : '';
      const practice = r.kind === 'topic' ? ctx.practiceLink(r.id) : ctx.studyCardPractice(r.id);
      return `<article class="arena-study-row"><div><h4>${item.kind} to revisit · ${item.link}</h4>
        <p class="arena-note">${studyReasonHtml(ctx,r.examples)}</p></div>
        <ul class="study-links">
          ${lesson ? `<li><span>Study</span>${lesson}</li>` : ''}
          ${practice ? `<li><span>Practice</span>${practice}</li>` : ''}
        </ul></article>`;
    }).join('')}</div>`;
  }
  function studyHtml(ctx, rows) {
    return rows.length ? studyRowsHtml(ctx,rows) :
      '<p class="arena-note">Study recommendations will appear here when your recent results show what to review.</p>';
  }
  function subjectDetails(ctx, id, label, stats, reviews) {
    const results = stats.points.filter(point => point.event.subjects.includes(id));
    const subject = stats.subjects.get(id);
    const latest = results.slice(-3).reverse();
    const correct = subject?.wins || 0;
    const provisional = stats.baseline && correct < A.SUBJECT_PROVISIONAL ?
      `<p class="arena-note">${correct} of ${A.SUBJECT_PROVISIONAL} correctly answered rated problems to finish subject placement.</p>` : '';
    const focus = results.filter(point => !point.calibration && point.event.focus === id);
    const session = focus.at(-1)?.event.session;
    const {before,after} = ratingRange(focus.filter(point => point.event.session === session),id);
    const trend = Number.isFinite(after - before) ?
      `<p><strong>${signed(after - before)} Elo</strong> in your latest ${label} set</p>` : '';
    return `<div class="arena-subject-layout"><div>${trend}${provisional}${latest.length ? `<h4>Recent results</h4><ul>${latest.map(({event}) => {
      const review = reviews.get(event.slug);
      return `<li>${review ? reviewedProblemLink(ctx,review) : ctx.escape(event.slug)}
        <span>${statusLabel(event.outcome)}</span></li>`;
    }).join('')}</ul>` : '<p>No graded problems in this subject yet.</p>'}</div>${trendPlot(label)}</div>`;
  }
  function dashboard(ctx, state, stats, history) {
    const t = stats.overall, placed = !!stats.baseline, s = state.session, active = s && !s.closed;
    const activePlacement = active && s.placement && s.round;
    const placementTotal = activePlacement ? t.count + s.length : A.PLACEMENT_SIZE;
    const placementCompleted = activePlacement ? placementTotal - A.remaining(state) : t.count;
    const prev = s || {};
    const established = ctx.roots.filter(root => stats.subjects.get(root.id)?.wins >= A.SUBJECT_PROVISIONAL).length;
    let studyHistory = history.filter(hasArenaReview);
    const reviews = new Map(studyHistory.map(event => [event.item,event]));
    const studyRows = (subject = 'all', type = 'all') => A.studyRecommendations(studyHistory, ctx.lookup, Date.now(), row =>
      (type === 'all' || row.kind === type) && ctx.studyItem(row) &&
      (subject === 'all' || row.examples.some(event => ctx.subjectsOf(ctx.lookup(event.item)).includes(subject))));
    const initialStudy = studyHtml(ctx,studyRows());
    const postPlacement = stats.points.filter(point => !point.calibration);
    const accuracy = points => points.length ? Math.round(100 * points.filter(p => p.event.outcome === 'correct').length / points.length) + '%' : '—';
    const latest = postPlacement.at(-1);
    const delta = latest && postPlacement.filter(p => p.event.session === latest.event.session).reduce((sum,p) => sum + p.delta, 0);
    const opts = new Map(ctx.roots.map(n => [n.id, ctx.topicLabel(n)]));
    const rated = active ? !s.placement : placed;
    const suggestion = rated ? opts.get(A.suggestedSubject(stats)) : "";
    const subjectTrends = new Map([...opts.keys()].map(id => [id,ratingHistory(stats,id)]));
    const title = !placed ? 'Find your starting rating' : 'Your rating';
    ctx.container.innerHTML = `<div class="space-home arena">
      <header class="space-home-head"><h1>Arena</h1><p class="sh-ask">Measure your growth on real contest problems.</p></header>
      <section class="sh-section arena-hero" id="arena-overview"><div><h3>${title}</h3>
      ${placed ? `<div class="arena-big">${number(t.rating)} <small>Elo</small></div>
        ${established < ctx.roots.length ? '<p class="arena-note">Provisional · ' + established + '/' + ctx.roots.length + ' subjects established</p>' : ''}
        <p class="arena-note">${!postPlacement.length ? 'Starting Elo from placement' : signed(delta) + ' overall Elo in your latest rated set'}</p>` :
        `<p>Take one set of ${placementTotal} problems across a range of difficulties. Your starting Elo applies to all four subjects.</p>
        ${placementCompleted ? `<small>${placementCompleted} of ${placementTotal} placement problems completed</small>` : ''}`}</div>
      ${placed ? trendPlot('Overall') :
        `<div class="arena-placement"><h4>How placement works</h4><p>You get two tries per problem. A second-try solve earns half credit toward your placement rating. Save and exit whenever you need a break.</p></div>`}
      ${placed ? `<div class="arena-metrics">
        <div><strong>${number(setPoints(stats.points).reduce((max,p) => Math.max(max, p.rating), stats.baseline.rating))}</strong><small>Peak Elo</small></div>
        ${postPlacement.length ? `<div><strong>${new Set(postPlacement.map(p => p.event.session)).size}</strong><small>Rated sets</small></div>` : ''}</div>
        ${arenaAnswerBreakdown(ctx,postPlacement.map(point => point.event),'Overall accuracy on submitted rated answers')}` : ''}
      </section>
      <section class="sh-section" id="arena-session"><h3>${rated ? 'Rated session' : 'Placement set'}</h3>
      ${suggestion ? `<p class="arena-note">Suggested next topic: <strong>${suggestion}</strong></p>` : ''}
      ${active ? `<p class="arena-note">${s.placement ? 'Mixed subjects' : (opts.get(s.focus) || 'Mixed subjects') + ' · ' + paceNames[s.pace]} · ${s.round ? s.placement ? s.length + ' problems · Untimed' : s.round.items.length + ' problems · ' + s.round.limitMs / 60000 + ' min' : (s.length - A.remaining(state)) + ' of ' + s.length + ' answered'}</p>
        <div class="arena-resume"><a class="hp-btn arena-primary" href="${sessionUrl}">${A.remaining(state) ? (s.placement ? 'Resume placement' : 'Resume session') : 'View results'} ${ctx.icon('arrow-right')}</a>
        ${s.round && !s.placement ? '<span class="arena-resume-time"><span class="arena-clock" aria-label="Time remaining" role="timer"></span> left</span>' : ''}</div>` :
        `<form id="arena-start">${placed ? `${selector('focus', 'Subject', [...opts], opts.has(prev.focus) ? prev.focus : opts.keys().next().value)}
        ${selector('pace','Difficulty',Object.entries(paceNames),prev.pace || 'matched')}
        ${selector('length','Problems',A.LENGTHS.map(n => [String(n), String(n)]), String(A.LENGTHS.includes(prev.length) ? prev.length : 5))}<p class="arena-note" data-arena-target aria-live="polite"></p>` :
        '<p class="arena-note">Work at your own pace.</p>'}
        <button class="hp-btn arena-primary">${placed ? 'Start rated session' : t.count ? 'Continue placement' : 'Start placement'} ${ctx.icon('arrow-right')}</button></form>`}${rules}</section>
      <section class="sh-section" id="arena-subjects"><h3>Subject ratings</h3>
        <div class="arena-table-wrap"><table class="arena-subject-table"><thead><tr><th>Subject</th><th>Elo</th><th>Accuracy on submitted answers</th></tr></thead><tbody>
        ${[...opts].map(([id, label]) => { const r = stats.subjects.get(id);
          return `<tr><th scope="row"><button type="button" class="arena-subject-toggle" data-subject-toggle aria-expanded="false" aria-controls="arena-subject-${id}">${label}</button></th><td>${placed && r ? number(r.rating) : '—'}${placed && r && r.wins < A.SUBJECT_PROVISIONAL ? '<small>Provisional</small>' : ''}</td>
          <td>${accuracy(stats.points.filter(p => hasAnswer(p.event) && p.event.subjects.includes(id)))}</td></tr>
          <tr class="arena-subject-details" id="arena-subject-${id}" data-subject="${id}" hidden><td colspan="3">${subjectDetails(ctx,id,label,stats,reviews)}</td></tr>`; }).join('')}</tbody></table></div></section>
      <section class="sh-section" id="arena-study"><div class="study-header"><div><h3>What to study</h3>
        <p class="arena-note">Based on the Arena problems you’ve worked on recently.</p></div>
        <div class="study-filters"><select class="study-filter" data-study-subject aria-label="Study recommendation subject"><option value="all">All subjects</option>
          ${[...opts].map(([id,label]) => `<option value="${id}">${label}</option>`).join('')}</select>${ctx.studyTypeFilterHtml()}</div></div>
        <div data-study-items aria-live="polite">${initialStudy}</div></section>
      <section class="sh-section" id="arena-history"><h3>Contest history</h3><div id="arena-history-list"></div><button type="button" class="hp-btn hp-btn-soft" data-arena-history-toggle aria-controls="arena-history-list" aria-expanded="false" hidden>Show all</button></section></div>`;
    const overallPlot = ctx.container.querySelector('#arena-overview [data-rating-plot]');
    if (overallPlot) wireTrend(overallPlot,ratingHistory(stats));
    for (const button of ctx.container.querySelectorAll('[data-subject-toggle]')) {
      const detail = document.getElementById(button.getAttribute('aria-controls'));
      const plot = detail.querySelector('[data-rating-plot]');
      let plotted = false;
      button.onclick = () => {
        detail.hidden = !detail.hidden;
        button.setAttribute('aria-expanded', String(!detail.hidden));
        if (!detail.hidden) {
          if (!plotted) { wireTrend(plot,subjectTrends.get(detail.dataset.subject)); plotted = true; }
          ctx.renderMath(detail);
        }
      };
    }
    const countdown = ctx.container.querySelector('.arena-resume .arena-clock');
    if (countdown) showCountdown(countdown,s);
    showHistory(ctx, state, stats);
    ctx.renderMath(ctx.container);
    const startForm = ctx.container.querySelector('#arena-start');
    const reportTarget = () => {
      const target = startForm?.querySelector('[data-arena-target]');
      if (!target) return;
      const {focus, pace} = Object.fromEntries(new FormData(startForm));
      const value = document.createElement('strong');
      value.textContent = number(A.targetRating(stats,focus,pace));
      target.replaceChildren('This contest would be around ',value,' Elo.');
    };
    reportTarget();
    startForm?.addEventListener('change', reportTarget);
    const study = ctx.container.querySelector('#arena-study');
    const subject = study.querySelector('[data-study-subject]');
    const type = study.querySelector('[data-study-type]');
    const list = study.querySelector('[data-study-items]');
    let displayed = initialStudy, studyRequest = 0;
    const updateStudy = () => {
      const html = studyHtml(ctx,studyRows(subject.value,type.value));
      if (html === displayed) return;
      displayed = html;
      list.innerHTML = html;
      ctx.renderMath(list);
    };
    subject.onchange = updateStudy;
    type.onchange = updateStudy;
    list.addEventListener('study-history-changed',async () => {
      const current = ++studyRequest;
      try {
        const latest = await ctx.history();
        if (current !== studyRequest || !list.isConnected) return;
        studyHistory = latest.filter(hasArenaReview);
        updateStudy();
      } catch {}
    });
    startForm?.addEventListener('submit', async e => {
      e.preventDefault();
      const form = e.currentTarget, values = new FormData(form);
      form.querySelector('button').disabled = true;
      try {
        await A.change(current => A.start(current, values.get('focus') || opts.keys().next().value, values.get('pace') || 'matched', +(values.get('length') || 5)));
        if (form.isConnected) location.hash = sessionUrl;
      } catch { saveError(form); form.querySelector('button').disabled = false; }
    });
  }
  function saveError(el) {
    let msg = el.querySelector('.arena-save-error');
    if (!msg) { msg = document.createElement('p'); msg.className = 'arena-save-error'; msg.setAttribute('role','alert'); el.append(msg); }
    msg.textContent = 'Your browser could not save this change. Check available browser storage and try again.';
  }
  const reviewUrl = id => '#/arena/review/' + id;
  const statusLabel = outcome => ({
    correct:'Correct', incorrect:'Incorrect', seen:'Previously seen', unanswered:'Unanswered'
  })[outcome] || 'Unanswered';
  function arenaAnswerBreakdown(ctx, events, label) {
    const counts = {first:0,second:0,incorrect:0,unanswered:0};
    for (const event of events) {
      if (event.outcome === 'correct') counts[event.firstMiss ? 'second' : 'first']++;
      else if (event.outcome !== 'seen') counts[hasAnswer(event) ? 'incorrect' : 'unanswered']++;
    }
    return ctx.answerBreakdown(counts,label);
  }
  const navButton = (label, href) => href ? `<a class="hp-btn hp-btn-soft" href="${href}">${label}</a>` :
    `<button type="button" class="hp-btn hp-btn-soft" disabled>${label}</button>`;
  function gradeAnswer(slug, draft) {
    if (!draft.trim()) return null;
    const numeric = !grade.exactKey(slug) && /^\d+$/.test(grade.officialKey(slug) || '');
    const set = {answers:{}, status:'active'};
    if (!grade.answer(set, slug, draft, numeric)) return null;
    const outcome = grade.result(set, slug).toLowerCase();
    return ['correct','incorrect'].includes(outcome) ? {outcome, answer:set.answers[slug]} : null;
  }
  function acceptedAnswer(ctx, slug) {
    const exact = grade.exactKey(slug);
    if (exact) return exact.answers.map(value => ctx.answerHtml(value, exact)).join(' or ');
    return ctx.escape(grade.choiceAnswers(slug).join(' or ') || String(grade.officialKey(slug) ?? ''));
  }
  function responseText(ctx, event, reveal = true) {
    const {slug, outcome, answer, firstMiss, invalidDraft} = event;
    if (outcome === 'seen') return '';
    const format = value => ctx.answerHtml(value, grade.exactKey(slug) || {});
    const first = firstMiss ? 'First try ' + format(firstMiss) + ' · ' : '';
    const response = answer ? (firstMiss ? 'Second try ' : 'Your answer ') + format(answer) :
      invalidDraft ? 'Unaccepted answer format · ' + format(invalidDraft) :
        outcome === 'incorrect' ? (firstMiss ? 'No second answer submitted' : 'Gave up') : 'No answer submitted';
    const accepted = acceptedAnswer(ctx,slug);
    return first + response + (reveal && outcome !== 'correct' && accepted ? ' · Accepted answer ' + accepted : '');
  }
  async function review(ctx, state, stats, route, history) {
    const id = route.review;
    const events = state.events.filter(e => e.session === id);
    if (!events.length || state.session?.id === id && !state.session.closed) { location.replace(homeUrl); return; }
    const marks = new Map(history.filter(e => e.source === 'arena' && e.session === id && e.mistakes?.length)
      .map(e => [e.item,e.mistakes]));
    const points = stats.points.filter(p => p.event.session === id);
    const placement = events.some(e => e.placement) || (points.length > 0 && points.every(p => p.calibration));
    const startedHere = stats.baseline?.event.session === id;
    const title = placement ? (startedHere ? 'Placement complete' : 'Placement incomplete') : 'Rated set complete';
    const focus = focusOf(state,events);
    const topic = ctx.roots.find(root => root.id === focus);
    const subjectName = topic ? ctx.topicLabel(topic) : 'Mixed subjects';
    const difficulty = placement ? '' : ratedSetTitle(ctx,focus,events) + ' · ';
    const subtitle = difficulty + events.length + (events.length === 1 ? ' problem' : ' problems') +
      (events[0].limitMs ? ' · ' + events[0].limitMs / 60000 + ' minutes' : '');
    const detailUrl = i => reviewUrl(id) + '/' + (i + 1);
    if (route.reviewProblem != null) {
      const index = route.reviewProblem, event = events[index];
      if (!event) { location.replace(reviewUrl(id)); return; }
      const p = ctx.lookup(event.slug);
      ctx.container.innerHTML = `<div class="space-home practice-session arena arena-play">
        <a class="back-link practice-back-results" href="${reviewUrl(id)}">${ctx.icon('arrow-left')} Back to Results overview</a>
        ${back(ctx)}
        <section class="sh-section"><div class="practice-session-top"><div><h1>${title}</h1><p>${subtitle} · Review</p></div></div>
          <nav class="cn-nums" aria-label="Review problems">${events.map((row,i) =>
            `<a class="cn-num practice-reviewed${i === index ? ' cn-here' : ''}" data-result="${statusLabel(row.outcome)}" href="${detailUrl(i)}"
              aria-label="Problem ${i+1}, ${statusLabel(row.outcome)}" ${i === index ? 'aria-current="step"' : ''}>${i+1}</a>`).join('')}</nav>
          ${ctx.reviewActions(reviewUrl(id))}</section>
        <section class="sh-section practice-question"><h3 tabindex="-1">Problem ${index+1}${p ?
          ' · <a class="practice-prob-link" href="#/problem/' + p.slug + '">' + ctx.escape(ctx.refShort(p.ref)) + '</a>' : ''}</h3>
          ${!p ? '<p>This problem is no longer available.</p>' : event.external && p.url ? ctx.paperPrompt(p) :
            `<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement">Loading statement…</div></div>`}</section>
        <section class="sh-section practice-review detail"><h3>Your answer</h3>
          <p class="practice-result">${statusLabel(event.outcome)}${event.outcome !== 'seen' ? ' · ' + responseText(ctx,event) : ''}</p>
          ${p ? ctx.mistakeReviewHtml(event.outcome, !!event.firstMiss) : ''}
          <div data-arena-explanation></div>${p ? ctx.nextStepsHtml(p) : ''}
          <div class="practice-problem-nav">${navButton('Previous',index && detailUrl(index-1))}
          ${navButton('Next',index+1 < events.length && detailUrl(index+1))}</div></section></div>`;
      const explanation = ctx.container.querySelector('[data-arena-explanation]');
      ctx.container.querySelector('.practice-question h3').focus({preventScroll:true});
      ctx.renderMath(ctx.container);
      if (!p) return;
      ctx.wireMistakeReview(explanation.parentElement,p.slug, {
        source:'arena', setId:id, initial:marks.get(event.slug) || []
      });
      if (!event.external) ctx.showPrompt(p);
      try {
        await ctx.loadExplanation(p);
        if (explanation.isConnected) { explanation.innerHTML = ctx.reviewExplanation(p); ctx.renderMath(explanation); }
      } catch {
        if (explanation.isConnected) explanation.innerHTML = `<p>Could not load the explanation. <a href="#/problem/${p.slug}">Open the problem in the app</a></p>`;
      }
      return;
    }
    const rating = points.at(-1)?.rating;
    const {before,after} = ratingRange(points,focus);
    const ratingChange = !placement && Number.isFinite(before) && Number.isFinite(after) ?
      `<p class="practice-results-meta arena-rating-change"><strong>${topic ? subjectName : 'Overall'}</strong> ·
        ${number(before)} ${after >= before ? '+' : '−'} ${number(Math.abs(after-before))} → ${number(after)} Elo</p>` : '';
    const counts = {Correct:0, Incorrect:0, Unanswered:0, 'Previously seen':0};
    const outcomes = events.map(e => [e.slug, statusLabel(e.outcome)]);
    outcomes.forEach(([, label]) => counts[label]++);
    const rows = events.map((event, index) => {
      return ctx.reviewRow({href:detailUrl(index), index, number:index+1, problem:ctx.lookup(event.slug),
        result:statusLabel(event.outcome),
        summary:responseText(ctx,event,false)});
    }).join('');
    const rated = events.length - counts['Previously seen'];
    const figures = [[counts.Correct + '/' + rated,'Correct'],[counts.Incorrect,'Incorrect'],[counts.Unanswered,'Unanswered']];
    if (placement && Number.isFinite(rating)) figures.unshift([number(rating),
      startedHere ? 'Provisional starting Elo' : 'Placement estimate']);
    const placementCount = stats.points.filter(p => p.calibration && p.event.at <= events.at(-1).at).length;
    const note = [
      events.some(e => e.timedOut) ? 'Submitted when time ran out.' : '',
      placement ? startedHere ? 'Your starting Elo applies to all four subjects.' :
        `${placementCount} of ${A.PLACEMENT_SIZE} placement problems completed. Return to Arena to continue.` : ''
    ].filter(Boolean).join(' ');
    ctx.container.innerHTML = ctx.reviewResults({back:back(ctx), title, subtitle, arena:true, stats:figures, rows,
      reviewUrl:detailUrl(0), insights:ctx.reviewInsights(outcomes,counts,detailUrl,
        arenaAnswerBreakdown(ctx,events,'Accuracy on submitted answers')),
      intro:ratingChange, meta:note ? `<p class="practice-results-meta">${note}</p>` : ''});
    const heading = ctx.container.querySelector('h1');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
    ctx.renderMath(ctx.container);
    ctx.wireResultStudy(id,outcomes,detailUrl,history);
  }
  function seenProblems(ctx, history, state) {
    return new Set([...history.map(e => e.canonicalId), ...ctx.priorSeen().map(A.canonical), ...state.events.map(e => A.canonical(e.identity))]);
  }
  function loading(ctx, message) {
    ctx.container.innerHTML = `<div class="space-home arena arena-play">${back(ctx)}
      <section class="sh-section" data-arena-loading><p role="status">${message}</p></section></div>`;
    return ctx.container.querySelector('[data-arena-loading]');
  }
  function promptError(ctx, box, text) {
    box.innerHTML = `<h1>Problems could not load</h1><p>${text}</p><button class="hp-btn arena-primary">Try again</button>`;
    box.querySelector('button').onclick = ctx.refresh;
  }
  async function findProblem(ctx, seen, stats, session, current, savedSlug, picked = [], weakTopics) {
    let p = savedSlug && ctx.lookup(savedSlug);
    const pool = ctx.pool;
    const allowExternal = ctx.allowExternal;
    while (current()) {
      p ||= A.choose(pool, seen, stats, session, p => subjectIds(ctx,p), Math.random, picked, weakTopics);
      if (!p) return {status:'empty'};
      const identity = A.canonical(p.identity);
      if (pool.includes(p) && !seen.has(identity) && (!missing.has(p.slug) || allowExternal && p.url)) {
        const status = await ctx.loadPrompt(p,allowExternal);
        if (status !== 'missing') return {status, p};
        missing.add(p.slug);
      }
      seen.add(identity);
      p = null;
    }
    return {status:'left'};
  }
  function noFreshProblems(ctx, box, session) {
    box.innerHTML = `<h1>Too few fresh problems</h1><p>${session.placement ?
      'There are no unopened placement problems available.' : 'Choose another subject to draw from a larger pool.'}</p>
      <button class="hp-btn arena-primary">Back to Arena</button>`;
    box.querySelector('button').onclick = async () => {
      try {
        await A.change(st => {
          if (st.session?.id !== session.id || st.session.closed || st.session.round) return false;
          st.session.closed = true;
        });
        if (box.isConnected) location.hash = homeUrl;
      } catch { saveError(box); }
    };
  }
  async function legacyFeedback(ctx, state) {
    const s = state.session;
    const event = s.last && state.events.find(e => e.slug === s.last && e.session === s.id);
    const box = loading(ctx, 'Finding your next problem…');
    const current = () => box.isConnected && location.hash === sessionUrl;
    if (event) {
      const p = ctx.lookup(event.slug);
      if (p) await ctx.loadPrompt(p);
      if (!current()) return;
      const done = s.closed;
      box.innerHTML = `<div class="arena-problem-top"><h1 tabindex="-1">Problem ${s.length - A.remaining(state)} of ${s.length}</h1></div>
        <div class="arena-st" data-slug="${event.slug}"><div class="prob-statement"></div></div>
        <p class="arena-result-status" data-result="${event.outcome}"><strong>${statusLabel(event.outcome)}</strong></p>
        <p>${responseText(ctx, event)}</p>
        <button class="hp-btn arena-primary" data-continue>${done ? 'See results' : 'Next problem'}</button>`;
      if (p) ctx.showPrompt(p,true);
      ctx.renderMath(box);
      box.querySelector('h1').focus({preventScroll:true});
      box.querySelector('button').onclick = async () => {
        try {
          await A.change(st => {
            if (st.session?.id !== s.id || st.session.last !== s.last) return false;
            st.session.last = null;
          });
          if (current()) {
            if (done) location.hash = reviewUrl(s.id);
            else ctx.refresh();
          }
        } catch { saveError(box); }
      };
      return;
    }
    await A.change(st => {
      if (st.session?.id !== s.id || st.session.last !== s.last) return false;
      st.session.last = null;
    });
    if (current()) ctx.refresh();
  }
  function showQuestion(ctx, box, id, p, slot, commit, isPlacement = false) {
    const exact = grade.exactKey(p.slug), numeric = !exact && /^\d+$/.test(grade.officialKey(p.slug) || '');
    const locked = !!slot.outcome, retry = !!slot.firstMiss;
    const visibleAnswer = slot.draft || (locked && slot.firstMiss) || '';
    let response = box.querySelector('.arena-response');
    const opened = !response;
    if (opened) {
      box.insertAdjacentHTML('beforeend', `${slot.external ? ctx.paperPrompt(p) :
        `<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement"></div></div>`}<div class="arena-response"></div>`);
      response = box.querySelector('.arena-response');
      if (!slot.external) ctx.showPrompt(p,true);
      box.querySelector('h1, h2').focus({preventScroll:true});
    }
    response.innerHTML = `<form class="practice-answer"><h3>Your answer</h3>
      <p class="arena-note" role="status">${locked ? (retry ? 'Try 2 of 2' : 'Try 1 of 2') :
        retry ? 'First try was incorrect. You have one try left.' : 'Try 1 of 2'}</p>
      ${exact || numeric ? `<label for="practice-answer">${exact ? ctx.escape(ctx.exactLabel(exact)) : 'Integer from 000 to 999'}</label>
        <input id="practice-answer" type="text" maxlength="120" autocomplete="off" value="${ctx.escape(visibleAnswer)}" aria-describedby="practice-answer-error" ${locked ? 'readonly' : ''}>${ctx.keypad()}` :
        ctx.choices({answers:{[p.slug]:visibleAnswer}},p.slug,locked)}
      <button type="button" class="practice-answer-clear" data-clear ${locked || !slot.draft ? 'disabled' : ''}>Clear answer</button>
      <div class="arena-actions"><button type="submit" class="hp-btn arena-primary" ${locked || !slot.draft.trim() ? 'disabled' : ''}>Submit answer</button>
        ${isPlacement ? '<button type="button" class="hp-btn hp-btn-soft" data-giveup>Give up</button>' : ''}</div>
      <p class="arena-status arena-result-status" data-result="${locked ? slot.outcome : retry ? 'incorrect' : ''}" role="status">${locked ? statusLabel(slot.outcome) : ''}</p></form>`;
    if (locked) {
      const form = response.querySelector('form'), input = form.querySelector('#practice-answer');
      form.querySelectorAll('button').forEach(button => button.disabled = true);
      form.onsubmit = event => event.preventDefault();
      if (input) ctx.wireKeys(input, exact);
      ctx.renderMath(response);
      const status = form.querySelector('.arena-status');
      if (!opened) { status.tabIndex = -1; status.focus({preventScroll:true}); }
      return;
    }
    const form = box.querySelector('form'), input = form.querySelector('#practice-answer');
    const submit = form.querySelector('[type="submit"]'), status = form.querySelector('.arena-status');
    const choices = [...form.querySelectorAll('[data-practice-answer]')], multi = grade.allowsMultipleChoices(p.slug);
    const clear = form.querySelector('[data-clear]');
    if (!opened) (input || choices[0])?.focus({preventScroll:true});
    let draft = slot.draft, busy = false;
    function writeDraft(value) {
      draft = value;
      clear.disabled = !value;
      submit.disabled = !value.trim();
      status.textContent = '';
      choices.forEach(b => b.setAttribute('aria-checked', String(draft.includes(b.dataset.practiceAnswer))));
      A.saveDraft(id, p.slug, value, retry).catch(() => saveError(form));
    }
    for (const button of choices) button.onclick = () => {
      const letter = button.dataset.practiceAnswer;
      writeDraft(!multi ? letter : draft.includes(letter) ? draft.replace(letter,'') : draft + letter);
    };
    if (input) { ctx.wireKeys(input, exact); input.addEventListener('input', () => writeDraft(input.value)); }
    clear.onclick = () => {
      if (input) { input.value = ''; input.dispatchEvent(new Event('input')); }
      else writeDraft('');
      (input || choices[0])?.focus({preventScroll:true});
    };
    async function finish(result) {
      if (busy || !form.isConnected) return;
      busy = true;
      submit.disabled = true;
      try { await commit(result); } catch { saveError(form); }
      finally { busy = false; submit.disabled = !draft.trim(); }
    }
    form.onsubmit = e => {
      e.preventDefault();
      const result = gradeAnswer(p.slug,draft);
      if (!result) {
        status.textContent = 'Check the answer format before submitting.';
        input?.focus();
        return;
      }
      finish(result);
    };
    if (isPlacement) form.querySelector('[data-giveup]').onclick = async () => {
      if (await ctx.confirm({title:'Give up on this problem?', text:'This ends your tries for this question.', ok:'Give up'}))
        finish({outcome:'incorrect', answer:''});
    };
    if (isPlacement) return () => A.saveDraft(id,p.slug,draft,retry);
  }
  function estimatedDifficulty(items) {
    const average = items.reduce((sum,item) => sum + item.elo,0) / items.length;
    return Math.round(average/50)*50;
  }
  function ratedSetTitle(ctx, focus, items) {
    const subject = ctx.roots.find(root => root.id === focus);
    return `${subject ? ctx.topicLabel(subject) : 'Mixed subjects'} ${estimatedDifficulty(items)}`;
  }
  function setProblemUrl(i) { return i ? sessionUrl + '/' + (i+1) : sessionUrl; }
  function expireRatedSet(id) {
    return A.change(st => {
      const session = st.session;
      if (session?.id !== id || !session.round || session.closed || Date.now() < A.submissionAt(session)) return false;
      return A.submitRound(st,id,gradeAnswer);
    });
  }
  let expiryTimer;
  function watchDeadline(ctx, session) {
    clearTimeout(expiryTimer);
    if (!session?.round || session.closed) return;
    const due = A.submissionAt(session);
    if (!Number.isFinite(due)) return;
    expiryTimer = setTimeout(async () => {
      try {
        const saved = await expireRatedSet(session.id);
        if (saved.session?.id === session.id && saved.session.closed) {
          ctx.notifyStudyUpdate();
          if (location.hash === homeUrl || location.hash === sessionUrl || location.hash.startsWith(sessionUrl + '/')) ctx.refresh();
        }
      } catch {
        // The active question's timer or the next Arena visit retries the save.
      }
    },Math.max(0,due - Date.now()));
  }
  function showCountdown(timer, session, onExpire) {
    function tick() {
      if (!timer.isConnected) { clearInterval(interval); return; }
      const ms = A.remainingMs(session);
      const seconds = Math.ceil(ms/1000);
      timer.textContent = Math.floor(seconds/60) + ':' + String(seconds%60).padStart(2,'0');
      timer.classList.toggle('is-low',seconds <= 60);
      if (!ms) {
        clearInterval(interval);
        onExpire?.();
      }
    }
    const interval = setInterval(tick,250);
    tick();
  }
  let roundController;
  function placementEstimate(state) {
    const points = A.placementStats(state).points;
    const current = points.at(-1), previous = points.at(-2);
    if (!current) return 'Current estimated Elo: ?';
    if (!previous) return 'Current estimated Elo: ' + number(current.rating);
    const change = current.rating - previous.rating;
    return `Current estimated Elo: ${number(previous.rating)} ${change < 0 ? '−' : '+'} ${number(Math.abs(change))} → ${number(current.rating)}`;
  }
  async function ratedSet(ctx, state, stats, history, index) {
    let s = state.session;
    const id = s.id;
    const box = loading(ctx, s.round ? 'Loading your set…' : s.placement ? 'Finding your first problem…' : 'Building your set…');
    if (!s.round) {
      const seen = seenProblems(ctx, history, state), problems = [];
      const total = s.placement ? 1 : A.remaining(state);
      const current = () => box.isConnected;
      const withinSubject = id => id.startsWith(s.focus + '.');
      const weakTopics = new Set(s.placement ? [] : A.recommendations(history.filter(event =>
        ctx.lookup(event.item)?.tree.some(withinSubject)
      ), ctx.lookup).map(row => row.id).filter(withinSubject));
      // A problem filed under a subtopic also covers its parent topic.
      for (const id of weakTopics) {
        for (const child of ctx.nodes.get(id)?.children || []) weakTopics.add(child);
      }
      // Vary the position so the targeted question blends into the rest of the set.
      const firstFreeSlot = s.slot && total > 1 ? 1 : 0;
      let targetedSlot = weakTopics.size ? firstFreeSlot + Math.floor(Math.random() * (total - firstFreeSlot)) : -1;
      while (problems.length < total && current()) {
        const topics = problems.length === targetedSlot ? weakTopics : undefined;
        const {status, p} = await findProblem(ctx, seen, stats, s, current, !problems.length && s.slot?.slug, problems, topics);
        if (!current()) return;
        if (status === 'offline') return promptError(ctx, box, 'The timer starts after your set loads. Check your connection and try again.');
        if (status === 'empty') break;
        if (p.tree.some(topic => weakTopics.has(topic))) targetedSlot = -1;
        seen.add(A.canonical(p.identity));
        // Rotate subjects within the set as well as across earlier results.
        for (const subject of subjectIds(ctx,p)) {
          if (!stats.subjects.has(subject)) stats.subjects.set(subject, {count:0});
          stats.subjects.get(subject).count++;
        }
        problems.push({slug:p.slug, identity:p.identity, elo:p.elo, subjects:subjectIds(ctx,p),
          external:status === 'external'});
      }
      if (!current()) return;
      if (!problems.length) return noFreshProblems(ctx, box, s);
      const latest = await A.change(st => A.openRound(st,id,problems));
      if (!current()) return;
      if (latest.session?.id !== id || !latest.session.round || latest.session.closed) { ctx.refresh(); return; }
      state = latest;
      s = state.session;
      watchDeadline(ctx,state.session);
    }
    const round = state.session.round;
    index = s.placement ? A.placementIndex(round) : Math.min(index, round.items.length-1);
    const placementOffset = s.placement ? stats.overall.count : 0;
    const problemNumber = index + 1 + placementOffset;
    const progress = items => (placementOffset + items.filter(row => row.outcome && row.outcome !== 'seen').length) +
      ' of ' + (s.placement ? placementOffset + s.length : round.items.length) + ' finished';
    const item = round.items[index], p = ctx.lookup(item.slug);
    const controller = roundController = new AbortController();
    const onLeave = () => controller.abort();
    window.addEventListener('hashchange',onLeave,{once:true,signal:controller.signal});
    let finishing = false, saveFailed = false, latest = state;
    let savePlacementDraft;
    async function submit() {
      if (finishing || !box.isConnected) return;
      finishing = true;
      controller.abort();
      try {
        await A.change(st => A.submitRound(st,id,gradeAnswer));
        if (box.isConnected) location.hash = reviewUrl(id);
      } catch { finishing = false; saveFailed = true; saveError(box.parentElement); }
    }
    box.parentElement.classList.add('practice-session');
    box.insertAdjacentHTML('beforebegin', `<section class="sh-section arena-set-nav">
      <div class="practice-session-top"><div><h1>${s.placement ? 'Placement set' : ratedSetTitle(ctx,s.focus,round.items)}</h1><p>${s.placement ?
        `${placementOffset ? s.length + ' remaining' : s.length + ' problems'} · <span data-placement-elo aria-live="polite">${placementEstimate(state)}</span>` : round.items.length + ' problems · ' + round.limitMs/60000 + ' minutes'}</p></div>
      ${s.placement ? '' : '<span class="arena-clock" aria-label="Time remaining" role="timer"></span>'}</div>
      <nav class="cn-nums" aria-label="Set problems">${Array.from({length:s.placement ? s.length : round.items.length},(_,i) => {
        const row = round.items[i];
        const result = row?.outcome ? statusLabel(row.outcome) : row?.firstMiss ? 'Incorrect' : '';
        const label = result || (row?.draft ? 'Draft saved' : 'Unanswered');
        const tint = result ? ' practice-reviewed' : row?.draft ? ' practice-answered' : '';
        const current = i === index ? ' aria-current="step"' : '';
        const retry = row?.firstMiss && !row.outcome ? ' data-retry' : '';
        const attributes = `class="cn-num${tint}${i === index ? ' cn-here' : ''}" data-problem-index="${i}" data-result="${result}" aria-label="Problem ${i+1+placementOffset}, ${label}"${current}${retry}`;
        return s.placement ? `<span ${attributes}>${i+1+placementOffset}</span>` :
          `<a ${attributes} href="${setProblemUrl(i)}">${i+1}</a>`;
      }).join('')}</nav>
      <div class="practice-session-actions"><span data-arena-checked>${progress(round.items)}</span>
      ${s.placement ? '<button type="button" class="hp-btn hp-btn-soft" data-save-placement>Save and exit</button>' :
        '<button type="button" class="hp-btn hp-btn-soft" data-submit-set>Submit set</button>'}</div>
      <p class="arena-note" data-arena-finish-note role="status"${A.roundComplete(state.session) ? '' : ' hidden'}>Set complete. Submitting in three seconds…</p></section>`);
    const nav = box.previousElementSibling, timer = nav.querySelector('.arena-clock');
    if (timer) showCountdown(timer,state.session,() => { if (!saveFailed) submit(); });
    const savePlacement = nav.querySelector('[data-save-placement]');
    if (savePlacement) savePlacement.onclick = async () => {
      savePlacement.disabled = true;
      try {
        await savePlacementDraft?.();
        if (box.isConnected) location.hash = homeUrl;
      } catch {
        saveError(nav);
        savePlacement.disabled = false;
      }
    };
    const submitSet = nav.querySelector('[data-submit-set]');
    if (submitSet) submitSet.onclick = async () => {
      if (saveFailed || A.roundComplete(latest.session)) { submit(); return; }
      try {
        const current = await A.read();
        if (!box.isConnected || finishing) return;
        if (current.session?.id !== id || current.session.closed) { ctx.refresh(); return; }
        if (A.roundComplete(current.session) || await ctx.confirm({title:'Submit this set?',
          text:'Saved answers will be graded. Any unanswered problems count as misses.',
          ok:'Submit set',signal:controller.signal})) submit();
      } catch { saveError(nav); }
    };
    const ready = p && (item.external && p.url ? 'external' : await ctx.loadPrompt(p));
    if (!box.isConnected || finishing) return;
    if (ready !== 'ready' && ready !== 'external') return promptError(ctx, box, 'Your answers are saved. Reconnect to view this problem.');
    box.classList.add('practice-question');
    box.innerHTML = `<h2 class="arena-question-heading" tabindex="-1">Problem ${problemNumber}</h2>`;
    const selected = nav.querySelector('[aria-current="step"]');
    let nextButton;
    const lastPlacementProblem = () => round.adaptive ? round.items.length >= s.length :
      latest.session.round.items.every(row => row.outcome);
    function showSlot(slot) {
      savePlacementDraft = showQuestion(ctx, box, id, p, slot, async result => {
        latest = await A.change(st => A.checkRoundAnswer(st,id,item.slug,result,Date.now(),!!slot.firstMiss));
        if (!box.isConnected || finishing) return;
        const updated = latest.session?.id === id && latest.session.round?.items[index];
        if (!updated || latest.session.closed || s.placement && A.placementIndex(latest.session.round) !== index) {
          ctx.refresh();
          return;
        }
        const label = updated.outcome ? statusLabel(updated.outcome) : 'Incorrect';
        selected.dataset.result = label;
        selected.toggleAttribute('data-retry',!!updated.firstMiss && !updated.outcome);
        selected.setAttribute('aria-label', `Problem ${problemNumber}, ${label}${updated.outcome ? '' : ', retry available'}`);
        selected.classList.remove('practice-answered');
        selected.classList.add('practice-reviewed');
        nav.querySelector('[data-arena-checked]').textContent = progress(latest.session.round.items);
        if (s.placement) nav.querySelector('[data-placement-elo]').textContent = placementEstimate(latest);
        showSlot(updated);
        if (A.roundComplete(latest.session)) {
          nav.querySelector('[data-arena-finish-note]').hidden = false;
          watchDeadline(ctx,latest.session);
        }
      }, s.placement);
      if (nextButton) {
        nextButton.disabled = !slot.outcome;
        nextButton.textContent = lastPlacementProblem() && slot.outcome ? 'See results' : 'Next problem';
      }
    }
    if (s.placement) {
      const actions = document.createElement('div');
      actions.className = 'practice-problem-nav';
      actions.innerHTML = `${navButton('Previous')}<button type="button" class="hp-btn hp-btn-soft" data-placement-next>Next problem</button>`;
      nextButton = actions.querySelector('[data-placement-next]');
      showSlot(item);
      box.append(actions);
      nextButton.onclick = async () => {
        if (lastPlacementProblem()) { submit(); return; }
        nextButton.disabled = true;
        try {
          let candidate;
          if (round.adaptive) {
            const seen = seenProblems(ctx,history,latest);
            for (const row of round.items) seen.add(A.canonical(row.identity));
            const current = () => box.isConnected && !finishing;
            const {status, p:next} = await findProblem(ctx,seen,A.placementStats(latest),s,current,null,round.items);
            if (!current()) return;
            if (status !== 'ready' && status !== 'external') {
              const note = box.querySelector('.arena-status');
              note.textContent = status === 'offline' ? 'The next problem could not load. Try again.' : 'No fresh problems remain. Use Save and exit to keep your progress.';
              nextButton.disabled = status !== 'offline';
              return;
            }
            candidate = {slug:next.slug, identity:next.identity, elo:next.elo, subjects:subjectIds(ctx,next), external:status === 'external'};
          }
          await A.change(st => A.advancePlacement(st,id,index,candidate));
          if (box.isConnected && !finishing) ctx.refresh();
        } catch {
          nextButton.disabled = false;
          saveError(actions);
        }
      };
    } else {
      showSlot(item);
      box.insertAdjacentHTML('beforeend', `<div class="practice-problem-nav">${navButton('Previous',index && setProblemUrl(index-1))}
        ${navButton('Next',index+1 < round.items.length && setProblemUrl(index+1))}</div>`);
    }
  }
  let draw = 0;
  async function render(ctx, route) {
    roundController?.abort();
    const renderId = ++draw, hash = location.hash;
    const current = () => draw === renderId && location.hash === hash;
    ctx.container.innerHTML = '<section class="sh-section"><h1>Arena</h1><p role="status">Loading your progress…</p></section>';
    try {
      let state = await A.read();
      if (A.placementLength(state) !== state.session?.length) {
        state = await A.change(st => {
          const length = A.placementLength(st);
          if (length === st.session?.length) return false;
          st.session.length = length;
        });
      }
      if (state.session?.round && !state.session.closed && Date.now() >= A.submissionAt(state.session))
        state = await expireRatedSet(state.session.id);
      const history = await ctx.history(state);
      if (!current()) return;
      watchDeadline(ctx,state.session);
      const stats = A.ratings(state.events, state.session?.placement && !state.session.closed ? state.session.id : null);
      const s = state.session;
      if (route.review) await review(ctx,state,stats,route,history);
      else if (!route.playing) dashboard(ctx,state,stats,history);
      else if (!s) location.replace(homeUrl);
      else if (s.closed && !s.last) {
        location.replace(state.events.some(e => e.session === s.id) ? reviewUrl(s.id) : homeUrl);
      } else if (s.last) await legacyFeedback(ctx,state);
      else await ratedSet(ctx,state,stats,history,route.index);
      if (current()) ctx.didRender();
    } catch {
      if (!current()) return;
      ctx.container.innerHTML = '<section class="sh-section"><h1>Arena progress is unavailable</h1><p>Check browser storage or restore a progress backup in <a href="#/settings">Settings</a>.</p></section>';
    }
  }
  window.ArenaView = { render };
})();
