// Route-local Arena views. Grading, statements, math inputs and study destinations are
// supplied by the main app so an archived problem behaves the same in both spaces.
(function () {
  'use strict';
  const A = window.Arena, grade = window.PracticeSessions;
  const number = n => n.toLocaleString(), signed = n => (n > 0 ? '+' : '') + n;
  const paceNames = { warmup: 'Warm-up', matched: 'Matched', stretch: 'Stretch' };
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
  function chart(points) {
    const data = setPoints(points).slice(-30);
    if (data.length < 2) return '<p class="arena-note">Your trend starts here. Your next rated set adds a second point.</p>';
    const values = data.map(p => p.rating);
    const lo = Math.floor((Math.min(...values) - 5) / 25) * 25;
    const hi = Math.ceil((Math.max(...values) + 5) / 25) * 25;
    const x = i => 38 + 437 * i / (data.length - 1);
    const y = v => 78 - 64 * (v - lo) / (hi - lo);
    const coords = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const label = `Rating trend across ${data.length} results, from ${values[0]} to ${values.at(-1)} Elo`;
    return `<svg class="arena-chart" viewBox="0 0 485 88" role="img" aria-label="${label}"><title>${label}</title>
      ${[hi, lo].map(v => `<line x1="38" y1="${y(v)}" x2="475" y2="${y(v)}"/><text x="0" y="${y(v)+4}">${v}</text>`).join('')}
      <polygon points="38,78 ${coords} 475,78"/><polyline points="${coords}"/>
      <circle cx="475" cy="${y(values.at(-1))}" r="3.5"/></svg>
      <div class="arena-chart-caption"><span>${data[0].calibration ? 'Placement' : 'Earlier set'}</span><span>Latest set</span></div>`;
  }
  const rules = `<details class="arena-rules"><summary>How ratings work</summary>
    <p>Placement is one timed set across difficulty levels. You get two tries per problem. Each result is compared with that problem’s own Elo.</p>
    <p>The placement set establishes a provisional starting rating for all four subjects. Later sets update each subject independently. Each subject stays provisional until you submit ${A.SUBJECT_PROVISIONAL} more answers in that subject. Overall Elo stays provisional while any subject rating is provisional.</p>
    <p>Rated sets have one timer. Harder problems add more time to the set: 2, 3, 5, 7 or 9 minutes per problem at Elo cutoffs of 1000, 1600, 2200 and 2800. Submitting grades any saved answers. Unanswered problems count as misses.</p>
    <p>Each problem updates the subjects it covers. Overall Elo is the average of your three lowest subject ratings. Solving a harder problem earns more Elo, and missing an easier one costs more. Early ratings adjust faster.</p></details>`;
  function selector(name, legend, options, value) {
    return `<fieldset class="arena-options"><legend>${legend}</legend><div>${options.map(([id, label]) =>
      `<label><input type="radio" name="${name}" value="${id}" ${id === value ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></fieldset>`;
  }
  function showHistory(ctx, state, stats) {
    const box = ctx.container.querySelector('[data-arena-log]');
    const button = box.parentElement.querySelector('[data-earlier]');
    const sessions = new Map();
    state.events.forEach(event => {
      if (state.session?.id === event.session && !state.session.closed) return;
      sessions.set(event.session, event);
    });
    const bySession = new Map();
    stats.points.forEach(point => {
      const entry = bySession.get(point.event.session) || {delta:0, placement:point.calibration};
      entry.delta += point.delta;
      entry.rating = point.rating;
      bySession.set(point.event.session, entry);
    });
    const groups = [...sessions.values()].reverse();
    if (!groups.length) { box.textContent = 'Completed sets will appear here for review.'; return; }
    let shown = 0;
    function more() {
      for (const event of groups.slice(shown, shown + 4)) {
        const result = bySession.get(event.session);
        const date = new Date(event.at).toLocaleDateString(undefined, {month:'short',day:'numeric',year:'numeric'});
        box.insertAdjacentHTML('beforeend', `<div class="arena-log arena-history-row">
          <a href="${reviewUrl(event.session)}">${event.placement || result?.placement ? 'Placement' : 'Rated set'} <small>${date}</small></a>
          <span>${result ? number(result.rating) + ' Elo' + (result.placement ? '' : ' · ' + signed(result.delta)) : 'No rating change'}</span></div>`);
        shown++;
      }
      button.hidden = shown === groups.length;
    }
    button.onclick = () => {
      const first = box.children.length;
      more();
      box.children[first]?.querySelector('a')?.focus();
    };
    more();
  }
  function studyHtml(ctx, rows, stats) {
    const selected = [];
    const anchors = new Set();
    for (const row of rows) {
      if (anchors.has(row.missedSlug)) continue;
      selected.push(row);
      anchors.add(row.missedSlug);
      if (selected.length === 3) break;
    }
    const answered = n => stats.subjects.get(n.id)?.count || 0;
    const least = [...ctx.roots].sort((a, b) => answered(a) - answered(b))[0];
    const coverage = stats.baseline && !answered(least) ?
      `<div class="arena-study-coverage"><h4>Get a clearer subject rating</h4>
        <p class="arena-note">${ctx.topicLabel(least)} still uses your provisional starting rating.</p>
        <button type="button" class="hp-btn hp-btn-soft" data-arena-focus="${least.id}">Choose ${ctx.topicLabel(least)} for your next set</button></div>` : '';
    if (!selected.length) {
      return coverage || '<p class="arena-note">Missed topics from Arena and Practice will appear here with links to review and practice them.</p>';
    }
    return `<p class="arena-note">Start with a recent miss, review the idea, then try a fresh problem.</p>
      <div class="arena-study-list">${selected.map(r => {
        const p = ctx.lookup(r.missedSlug);
        const lesson = ctx.studyLink(r.id, r.missedSlug), practice = ctx.practiceLink(r.id);
        return `<article class="arena-study-row"><div><h4>${ctx.topicLabel(ctx.nodes.get(r.id))}</h4>
          <small>${r.misses} of ${r.attempts} recent ${r.attempts === 1 ? 'attempt' : 'attempts'} missed</small></div>
          <ul class="study-links">
            ${p ? `<li><span>Revisit</span><a href="#/problem/${p.slug}">${ctx.escape(ctx.refShort(p.ref))}</a></li>` : ''}
            ${lesson ? `<li><span>Study</span>${lesson}</li>` : ''}
            ${practice ? `<li><span>Practice</span>${practice}</li>` : ''}
          </ul></article>`;
      }).join('')}</div>${coverage}`;
  }
  function subjectDetails(ctx, id, stats, recommendations) {
    const results = stats.points.filter(point => point.event.subjects.includes(id));
    const subject = stats.subjects.get(id);
    const rated = results.filter(point => !point.calibration);
    const latest = results.slice(-3).reverse();
    const answered = rated.filter(({event}) => event.outcome !== 'unanswered').length;
    const provisional = stats.baseline && answered < A.SUBJECT_PROVISIONAL ?
      `<p class="arena-note">${answered} of ${A.SUBJECT_PROVISIONAL} answered rated problems to finish subject placement.</p>` : '';
    const trend = stats.baseline && rated.length ?
      `<p><strong>${signed(subject.rating - stats.baseline.rating)} Elo</strong> since placement · ${rated.length} rated ${rated.length === 1 ? 'problem' : 'problems'}</p>` : '';
    const topic = recommendations.find(row => row.id.startsWith(id + '.'));
    return `${trend}${provisional}${latest.length ? `<h4>Recent results</h4><ul>${latest.map(({event}) => {
      const p = ctx.lookup(event.slug);
      return `<li>${p ? `<a href="#/problem/${p.slug}">${ctx.escape(ctx.refShort(p.ref))}</a>` : ctx.escape(event.slug)}
        <span>${statusLabel(event.outcome)}</span></li>`;
    }).join('')}</ul>` : '<p>No graded problems in this subject yet.</p>'}
    ${topic ? `<div class="study-links">${ctx.practiceLink(topic.id)}</div>` : ''}`;
  }
  function dashboard(ctx, state, stats, history) {
    const t = stats.overall, placed = !!stats.baseline, s = state.session, active = s && !s.closed;
    const prev = s || {};
    const established = ctx.roots.filter(root => stats.subjects.get(root.id)?.answered >= A.SUBJECT_PROVISIONAL).length;
    const recommendations = A.recommendations(history, ctx.lookup).filter(row => ctx.nodes.has(row.id));
    const postPlacement = stats.points.filter(point => !point.calibration);
    const ratedAnswers = postPlacement.filter(p => p.event.answer);
    const accuracy = points => points.length ? Math.round(100 * points.filter(p => p.event.outcome === 'correct').length / points.length) + '%' : '—';
    const latest = postPlacement.at(-1);
    const delta = latest && postPlacement.filter(p => p.event.session === latest.event.session).reduce((sum,p) => sum + p.delta, 0);
    const opts = new Map(ctx.roots.map(n => [n.id, ctx.topicLabel(n)]));
    const title = !placed ? 'Find your starting rating' : 'Your rating';
    ctx.container.innerHTML = `<div class="space-home arena">
      <header class="space-home-head"><h1>Arena</h1><p class="sh-ask">Measure your growth on real contest problems.</p></header>
      <section class="sh-section arena-hero" id="arena-overview"><div><h3>${title}</h3>
      ${placed ? `<div class="arena-big">${number(t.rating)} <small>Elo</small></div>
        ${established < ctx.roots.length ? '<p class="arena-note">Provisional · ' + established + '/' + ctx.roots.length + ' subjects established</p>' : ''}
        <p class="arena-note">${!postPlacement.length ? 'Starting rating established' : signed(delta) + ' Elo in your latest set'}</p>` :
        `<p>Take one timed set of ${A.PLACEMENT_SIZE} problems across a range of difficulties. Your starting Elo applies to all four subjects.</p>
        ${t.count ? `<small>${t.count} earlier results included</small>` : ''}`}</div>
      ${placed ? `<div class="arena-plot"><h4>Rating trend</h4>${chart(stats.points)}</div>` :
        `<div class="arena-placement"><h4>What counts</h4><p>You get two tries per problem. A solve on either try counts once. Blanks count as misses when you submit. You can move freely between problems.</p></div>`}
      ${placed ? `<div class="arena-metrics">
        <div><strong>${number(setPoints(stats.points).reduce((max,p) => Math.max(max, p.rating), 0))}</strong><small>Peak Elo</small></div>
        ${ratedAnswers.length ? `<div><strong>${accuracy(ratedAnswers)}</strong><small>Accuracy on submitted answers</small></div>` : ''}
        ${postPlacement.length ? `<div><strong>${new Set(postPlacement.map(p => p.event.session)).size}</strong><small>Rated sets</small></div>` : ''}</div>` : ''}
      </section>
      <section class="sh-section" id="arena-session"><h3>${(active ? s.placement : !placed) ? 'Placement set' : 'Rated session'}</h3>
      ${active ? `<p class="arena-note">${s.placement ? 'Mixed subjects' : (opts.get(s.focus) || 'Mixed subjects') + ' · ' + paceNames[s.pace]} · ${s.round ? s.round.items.length + ' problems · ' + s.round.limitMs / 60000 + ' min' : (s.length - A.remaining(state)) + ' of ' + s.length + ' answered'}</p>
        <a class="hp-btn arena-primary" href="${sessionUrl}">${A.remaining(state) ? 'Resume session' : 'See session result'} ${ctx.icon('arrow-right')}</a>` :
        `<form id="arena-start">${placed ? `${selector('focus', 'Subject', [['mixed','Mixed subjects'], ...opts], opts.has(prev.focus) ? prev.focus : 'mixed')}
        ${selector('pace','Difficulty',Object.entries(paceNames),prev.pace || 'matched')}
        ${selector('length','Problems',A.LENGTHS.map(n => [String(n), String(n)]), String(A.LENGTHS.includes(prev.length) ? prev.length : 5))}<p class="arena-note" data-arena-target aria-live="polite"></p>` :
        '<p class="arena-note">The set timer starts once the problems load.</p>'}
        <button class="hp-btn arena-primary">${placed ? 'Start rated session' : 'Start placement'} ${ctx.icon('arrow-right')}</button></form>`}${rules}</section>
      <section class="sh-section" id="arena-subjects"><h3>Subject ratings</h3>
        <div class="arena-table-wrap"><table class="arena-subject-table"><thead><tr><th>Subject</th><th>Elo</th><th>Submitted accuracy</th></tr></thead><tbody>
        ${[...opts].map(([id, label]) => { const r = stats.subjects.get(id);
          return `<tr><th scope="row"><button type="button" class="arena-subject-toggle" data-subject-toggle aria-expanded="false" aria-controls="arena-subject-${id}">${label}</button></th><td>${placed && r ? number(r.rating) : '—'}${placed && r && r.answered < A.SUBJECT_PROVISIONAL ? '<small>Provisional</small>' : ''}</td>
          <td>${accuracy(stats.points.filter(p => p.event.answer && p.event.subjects.includes(id)))}</td></tr>
          <tr class="arena-subject-details" id="arena-subject-${id}" hidden><td colspan="3">${subjectDetails(ctx,id,stats,recommendations)}</td></tr>`; }).join('')}</tbody></table></div></section>
      <section class="sh-section" id="arena-study"><h3>What to study</h3>${studyHtml(ctx, recommendations, stats)}</section>
      <section class="sh-section" id="arena-history"><h3>Session history</h3><div data-arena-log></div><button class="hp-btn hp-btn-soft" data-earlier hidden>Earlier sessions</button></section></div>`;
    for (const button of ctx.container.querySelectorAll('[data-subject-toggle]')) {
      button.onclick = () => {
        const detail = document.getElementById(button.getAttribute('aria-controls'));
        detail.hidden = !detail.hidden;
        button.setAttribute('aria-expanded', String(!detail.hidden));
        if (!detail.hidden) ctx.renderMath(detail);
      };
    }
    showHistory(ctx, state, stats);
    ctx.renderMath(ctx.container);
    const startForm = ctx.container.querySelector('#arena-start');
    const reportTarget = () => {
      const target = startForm?.querySelector('[data-arena-target]');
      if (!target) return;
      const {focus, pace} = Object.fromEntries(new FormData(startForm));
      const chosen = startForm.querySelector('input[name="focus"]:checked');
      const basis = stats.subjects.has(focus) ? chosen.nextElementSibling.textContent : 'overall';
      target.textContent = `Aim for about ${number(A.targetRating(stats,focus,pace))} Elo, using your ${basis} rating.`;
    };
    reportTarget();
    startForm?.addEventListener('change', reportTarget);
    const studyFocus = ctx.container.querySelector('[data-arena-focus]');
    if (studyFocus && !startForm) studyFocus.remove();
    else if (studyFocus) studyFocus.onclick = () => {
      const option = [...startForm.elements.focus].find(input => input.value === studyFocus.dataset.arenaFocus);
      if (option) { option.checked = true; reportTarget(); option.focus(); }
    };
    startForm?.addEventListener('submit', async e => {
      e.preventDefault();
      const form = e.currentTarget, values = new FormData(form);
      form.querySelector('button').disabled = true;
      try {
        await A.change(current => A.start(current, values.get('focus') || 'mixed', values.get('pace') || 'matched', +(values.get('length') || 5)));
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
        outcome === 'incorrect' ? 'Gave up' : 'No answer submitted';
    const accepted = acceptedAnswer(ctx, slug);
    return first + response + (reveal && outcome !== 'correct' && accepted ? ' · Accepted answer ' + accepted : '');
  }
  async function review(ctx, state, stats, route) {
    const id = route.review;
    const events = state.events.filter(e => e.session === id);
    if (!events.length || state.session?.id === id && !state.session.closed) { location.replace(homeUrl); return; }
    const points = stats.points.filter(p => p.event.session === id);
    const placement = events.some(e => e.placement) || (points.length > 0 && points.every(p => p.calibration));
    const startedHere = stats.baseline?.event.session === id;
    const title = placement ? 'Placement complete' : 'Rated set complete';
    const subtitle = events.length + (events.length === 1 ? ' problem' : ' problems') +
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
              aria-label="Problem ${i+1}, ${statusLabel(row.outcome)}" ${i === index ? 'aria-current="step"' : ''}>${i+1}</a>`).join('')}</nav></section>
        <section class="sh-section practice-question"><h3 tabindex="-1">Problem ${index+1}${p ?
          ' · <a class="practice-prob-link" href="#/problem/' + p.slug + '">' + ctx.escape(ctx.refShort(p.ref)) + '</a>' : ''}</h3>
          ${p ? `<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement">Loading statement…</div></div>` : '<p>This problem is no longer available.</p>'}</section>
        <section class="sh-section practice-review detail"><h3>Your answer</h3>
          <p class="practice-result">${statusLabel(event.outcome)}${event.outcome !== 'seen' ? ' · ' + responseText(ctx,event) : ''}</p>
          <div data-arena-explanation></div>
          <div class="practice-problem-nav">${index ? `<a class="hp-btn hp-btn-soft" href="${detailUrl(index-1)}">Previous</a>` : ''}
          ${index+1 < events.length ? `<a class="hp-btn hp-btn-soft" href="${detailUrl(index+1)}">Next</a>` : ''}</div></section></div>`;
      const explanation = ctx.container.querySelector('[data-arena-explanation]');
      ctx.container.querySelector('.practice-question h3').focus({preventScroll:true});
      ctx.renderMath(ctx.container);
      if (!p) return;
      ctx.showPrompt(p);
      try {
        await ctx.loadExplanation(p);
        if (explanation.isConnected) { explanation.innerHTML = ctx.reviewExplanation(p); ctx.renderMath(explanation); }
      } catch {
        if (explanation.isConnected) explanation.innerHTML = `<p>Could not load the explanation. <a href="#/problem/${p.slug}">Open the problem in the app</a></p>`;
      }
      return;
    }
    const byProblem = new Map(points.map(point => [point.event.slug, point]));
    const rating = points.at(-1)?.rating;
    const delta = points.reduce((total, point) => total + point.delta, 0);
    const counts = {Correct:0, Incorrect:0, Unanswered:0, 'Previously seen':0};
    const outcomes = events.map(e => [e.slug, statusLabel(e.outcome)]);
    outcomes.forEach(([, label]) => counts[label]++);
    const rows = events.map((event, index) => {
      const point = byProblem.get(event.slug);
      return ctx.reviewRow({href:detailUrl(index), index, number:index+1, problem:ctx.lookup(event.slug),
        result:statusLabel(event.outcome), detail:point && !placement ? signed(point.delta) + ' Elo' : '',
        summary:responseText(ctx,event,false)});
    }).join('');
    const rated = events.length - counts['Previously seen'];
    const figures = [[counts.Correct + '/' + rated,'Correct'],[counts.Incorrect,'Incorrect'],[counts.Unanswered,'Unanswered']];
    if (Number.isFinite(rating)) figures.unshift([placement ? number(rating) : signed(delta),
      placement ? startedHere ? 'Provisional starting Elo' : 'Placement estimate' : 'Elo this set']);
    const note = [
      events.some(e => e.timedOut) ? 'Submitted when time ran out.' : '',
      !placement && Number.isFinite(rating) ? 'Overall rating after this set is ' + number(rating) + ' Elo.' : '',
      placement ? startedHere ? 'Your starting Elo applies to all four subjects.' :
        points.length ? 'These results count toward your starting rating.' : 'Submit an answer in placement to establish a starting rating.' : ''
    ].filter(Boolean).join(' ');
    ctx.container.innerHTML = ctx.reviewResults({back:back(ctx), title, subtitle, arena:true, stats:figures, rows,
      reviewUrl:detailUrl(0), insights:ctx.reviewInsights(outcomes,counts,detailUrl),
      meta:note ? `<p class="practice-results-meta">${note}</p>` : ''});
    const heading = ctx.container.querySelector('h1');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
    ctx.renderMath(ctx.container);
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
  async function findProblem(ctx, seen, stats, session, current, savedSlug, position = 1) {
    let p = savedSlug && ctx.lookup(savedSlug);
    while (current()) {
      p ||= A.choose(ctx.pool, seen, stats, session, p => subjectIds(ctx,p), Math.random, position);
      if (!p) return {status:'empty'};
      const identity = A.canonical(p.identity);
      if (ctx.pool.includes(p) && !seen.has(identity) && !missing.has(p.slug)) {
        const status = await ctx.loadPrompt(p);
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
      'Placement needs ' + A.PLACEMENT_SIZE + ' problems you haven’t opened before.' : 'Try mixed subjects to draw from a larger pool.'}</p>
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
      if (p) ctx.showPrompt(p);
      ctx.renderMath(box);
      box.querySelector('h1').focus({preventScroll:true});
      box.querySelector('button').onclick = async () => {
        try {
          await A.change(st => {
            if (st.session?.id !== s.id || st.session.last !== s.last) return false;
            st.session.last = null;
          });
          if (current()) { if (done) location.hash = reviewUrl(s.id); else ctx.refresh(); }
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
    const result = locked && slot.outcome !== 'seen' ? `<p>Your answer ${ctx.answerHtml(slot.draft, exact || {})}</p>` : '';
    let response = box.querySelector('.arena-response');
    const opened = !response;
    if (opened) {
      box.insertAdjacentHTML('beforeend', `<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement"></div></div><div class="arena-response"></div>`);
      response = box.querySelector('.arena-response');
      ctx.showPrompt(p);
      box.querySelector('h1, h2').focus({preventScroll:true});
    }
    response.innerHTML = `${locked ? `<p class="arena-result-status" data-result="${slot.outcome}" role="status"><strong>${statusLabel(slot.outcome)}</strong></p>${result}` :
      `<form class="practice-answer"><h3>Your answer</h3>
      ${isPlacement ? `<p class="arena-note" role="status">${retry ? 'First try was incorrect. You have one try left.' : 'Try 1 of 2'}</p>` : ''}
      ${exact || numeric ? `<label for="practice-answer">${exact ? ctx.escape(ctx.exactLabel(exact)) : 'Integer from 000 to 999'}</label>
        <input id="practice-answer" type="text" maxlength="120" autocomplete="off" value="${ctx.escape(slot.draft)}" aria-describedby="practice-answer-error">${ctx.keypad()}` :
        ctx.choices({answers:{[p.slug]:slot.draft}},p.slug,false)}
      <button type="button" class="practice-answer-clear" data-clear ${slot.draft ? '' : 'disabled'}>Clear answer</button>
      <div class="arena-actions"><button type="submit" class="hp-btn arena-primary" ${slot.draft.trim() ? '' : 'disabled'}>Submit answer</button>
        ${isPlacement ? '<button type="button" class="hp-btn hp-btn-soft" data-giveup>Give up</button>' : ''}
</div>
      <p class="arena-status" role="status"></p></form>`}`;
    if (locked) {
      ctx.renderMath(response);
      const status = response.querySelector('[role="status"]');
      if (!opened && status) { status.tabIndex = -1; status.focus({preventScroll:true}); }
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
      const result = gradeAnswer(p.slug, draft);
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
  }
  function setProblemUrl(i) { return i ? sessionUrl + '/' + (i+1) : sessionUrl; }
  async function ratedSet(ctx, state, stats, history, index) {
    const s = state.session, id = s.id;
    const box = loading(ctx, s.round ? 'Loading your set…' : 'Building your set…');
    if (!s.round) {
      const seen = seenProblems(ctx, history, state), problems = [];
      const total = s.placement ? A.PLACEMENT_SIZE : A.remaining(state);
      const current = () => box.isConnected;
      while (problems.length < total && current()) {
        const {status, p} = await findProblem(ctx, seen, stats, s, current, !problems.length && s.slot?.slug, problems.length);
        if (!current()) return;
        if (status === 'offline') return promptError(ctx, box, 'The timer starts after your set loads. Check your connection and try again.');
        if (status === 'empty') break;
        seen.add(A.canonical(p.identity));
        // Rotate subjects within the set as well as across earlier results.
        for (const subject of subjectIds(ctx,p)) {
          if (!stats.subjects.has(subject)) stats.subjects.set(subject, {count:0});
          stats.subjects.get(subject).count++;
        }
        problems.push({slug:p.slug, identity:p.identity, elo:p.elo, subjects:subjectIds(ctx,p)});
      }
      if (!current()) return;
      if (problems.length < (s.placement ? A.PLACEMENT_SIZE : 1)) return noFreshProblems(ctx, box, s);
      const latest = await A.change(st => A.openRound(st,id,problems));
      if (!current()) return;
      if (latest.session?.id !== id || !latest.session.round || latest.session.closed) { ctx.refresh(); return; }
      state = latest;
    }
    const round = state.session.round;
    index = Math.min(index, round.items.length-1);
    const item = round.items[index], p = ctx.lookup(item.slug);
    const controller = new AbortController();
    let finishing = false, saveFailed = false;
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
      <div class="practice-session-top"><div><h1>${s.placement ? 'Placement set' : 'Rated set'}</h1><p>${round.items.length} problems · ${round.limitMs/60000} minutes</p></div>
      <span class="arena-clock" aria-label="Time remaining" role="timer"></span></div>
      <nav class="cn-nums" aria-label="Set problems">${round.items.map((row,i) => {
        const status = row.outcome ? statusLabel(row.outcome) : row.draft ? 'Draft saved' : 'Unanswered';
        const tint = ['correct','incorrect'].includes(row.outcome) ? ' practice-reviewed' : row.draft ? ' practice-answered' : '';
        return `<a class="cn-num${tint}${i === index ? ' cn-here' : ''}" data-result="${status}" href="${setProblemUrl(i)}"
           aria-label="Problem ${i+1}, ${status}" ${i === index ? 'aria-current="step"' : ''}>${i+1}</a>`;
      }).join('')}</nav>
      <div class="practice-session-actions"><span data-arena-checked>${round.items.filter(row => row.outcome && row.outcome !== 'seen').length} checked</span>
      <button type="button" class="hp-btn hp-btn-soft" data-submit-set>Submit set</button></div></section>`);
    const nav = box.previousElementSibling, timer = nav.querySelector('.arena-clock');
    function tick() {
      if (!nav.isConnected) { clearInterval(clock); controller.abort(); return; }
      const ms = A.remainingMs(state.session);
      const seconds = Math.ceil(ms/1000);
      timer.textContent = Math.floor(seconds/60) + ':' + String(seconds%60).padStart(2,'0');
      timer.classList.toggle('is-low', seconds <= 60);
      if (!ms && !saveFailed) submit();
    }
    const clock = setInterval(tick, 250);
    tick();
    nav.querySelector('[data-submit-set]').onclick = async () => {
      if (saveFailed || await ctx.confirm({title:'Submit this set?', text:'Saved answers will be graded. Any unanswered problems count as misses.', ok:'Submit set', signal:controller.signal})) submit();
    };
    const ready = p && await ctx.loadPrompt(p);
    if (!box.isConnected || finishing) return;
    if (ready !== 'ready') return promptError(ctx, box, 'Your answers are saved. Reconnect to view this problem.');
    box.classList.add('practice-question');
    box.innerHTML = '<h2 class="sr-only" tabindex="-1">Problem statement</h2>';
    const selected = nav.querySelector('[aria-current="step"]');
    function showSlot(slot) {
      showQuestion(ctx, box, id, p, slot, async result => {
        const latest = await A.change(st => A.checkRoundAnswer(st,id,item.slug,result,Date.now(),!!slot.firstMiss));
        if (!box.isConnected || finishing) return;
        const updated = latest.session?.id === id && latest.session.round?.items[index];
        if (!updated || latest.session.closed) { ctx.refresh(); return; }
        if (!updated.outcome) {
          selected.setAttribute('aria-label', `Problem ${index+1}, retry available`);
          selected.classList.remove('practice-answered');
          showSlot(updated);
          return;
        }
        const label = statusLabel(updated.outcome);
        selected.dataset.result = label;
        selected.setAttribute('aria-label', `Problem ${index+1}, ${label}`);
        selected.classList.remove('practice-answered');
        selected.classList.toggle('practice-reviewed', updated.outcome !== 'seen');
        nav.querySelector('[data-arena-checked]').textContent =
          latest.session.round.items.filter(row => ['correct','incorrect'].includes(row.outcome)).length + ' checked';
        showSlot(updated);
      }, s.placement);
    }
    showSlot(item);
    if (index+1 < round.items.length) box.insertAdjacentHTML('beforeend', `<div class="arena-actions">
      <a class="hp-btn hp-btn-soft" href="${setProblemUrl(index+1)}">Next problem ${ctx.icon('arrow-right')}</a></div>`);
  }
  let draw = 0;
  async function render(ctx, route) {
    const renderId = ++draw, hash = location.hash;
    const current = () => draw === renderId && location.hash === hash;
    ctx.container.innerHTML = '<section class="sh-section"><h1>Arena</h1><p role="status">Loading your progress…</p></section>';
    try {
      let state = await A.read();
      if (state.session?.round && !state.session.closed && !A.remainingMs(state.session))
        state = await A.change(st => A.submitRound(st,state.session.id,gradeAnswer));
      const history = await ctx.history(state);
      if (!current()) return;
      const stats = A.ratings(state.events, state.session?.placement && !state.session.closed ? state.session.id : null);
      const s = state.session;
      if (route.review) await review(ctx,state,stats,route);
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
