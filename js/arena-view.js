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
    <p>Placement is untimed. The next problem adapts to how you answered the previous ones. You get two tries per problem in placement and in rated sets. Each result is compared with that problem’s own Elo. A first-try solve earns full rating credit and a second-try solve earns half.</p>
    <p>The placement set establishes a provisional starting rating for all four subjects. Later sets update each subject independently. Each subject stays provisional until you correctly answer ${A.SUBJECT_PROVISIONAL} rated problems in that subject. Overall Elo stays provisional while any subject rating is provisional.</p>
    <p>Rated sets have one timer. Harder problems add more time to the set: 2, 3, 5, 7 or 9 minutes per problem at Elo cutoffs of 1000, 1600, 2200 and 2800. Submitting grades any saved answers. Unanswered problems count as misses.</p>
    <p>Each problem updates the subjects it covers. Overall Elo is the average of your three lowest subject ratings. Solving a harder problem earns more Elo, and missing an easier one costs more. Early ratings adjust faster.</p></details>`;
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
          <a href="${reviewUrl(event.session)}">${placement ? 'Placement' : ratedSetTitle(ctx,focus,events)} <small>${date}</small></a>
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
  function distinctStudyRows(rows) {
    const anchors = new Set();
    return rows.filter(row => {
      if (anchors.has(row.missedSlug)) return false;
      anchors.add(row.missedSlug);
      return true;
    });
  }
  function reviewedProblemLink(ctx, event) {
    const p = ctx.lookup(event.item);
    const name = ctx.escape(p ? ctx.refShort(p.ref) : event.item);
    return `<a href="${reviewUrl(event.session)}/${event.reviewNumber}">${name}</a>`;
  }
  function reviewedProblemsHtml(ctx, examples) {
    const links = examples.map(event => reviewedProblemLink(ctx,event));
    if (links.length < 3) return links.join(' and ');
    return links.slice(0,-1).join(', ') + ', and ' + links.at(-1);
  }
  function studyReasonHtml(ctx, examples) {
    const missed = examples.filter(event => event.outcome === 'incorrect');
    const retried = examples.filter(event => event.outcome === 'correct');
    const reasons = [];
    if (missed.length) reasons.push('you missed ' + reviewedProblemsHtml(ctx,missed));
    if (retried.length) reasons.push('you needed two tries on ' + reviewedProblemsHtml(ctx,retried));
    return 'Because ' + reasons.join(' and ') + '.';
  }
  function studyRowsHtml(ctx, rows) {
    return `<div class="arena-study-list">${rows.map(r => {
      const lesson = ctx.studyLink(r.id, r.missedSlug), practice = ctx.practiceLink(r.id);
      return `<article class="arena-study-row"><div><h4>${ctx.topicLabel(ctx.nodes.get(r.id))}</h4>
        <p class="arena-note">${studyReasonHtml(ctx,r.examples)}</p></div>
        <ul class="study-links">
          ${lesson ? `<li><span>Study</span>${lesson}</li>` : ''}
          ${practice ? `<li><span>Practice</span>${practice}</li>` : ''}
        </ul></article>`;
    }).join('')}</div>`;
  }
  function studyHtml(ctx, rows) {
    if (!rows.length) return '<p class="arena-note">Missed topics from Arena will appear here with links to review and practice them.</p>';
    return `<p class="arena-note">Review recent misses and problems that took two tries.</p>
      ${studyRowsHtml(ctx,rows.slice(0,3))}
      ${rows.length > 3 ? '<button type="button" class="hp-btn hp-btn-soft" data-study-all aria-haspopup="dialog">See all</button>' : ''}`;
  }
  function subjectDetails(ctx, id, stats, reviews) {
    const results = stats.points.filter(point => point.event.subjects.includes(id));
    const subject = stats.subjects.get(id);
    const rated = results.filter(point => !point.calibration);
    const latest = results.slice(-3).reverse();
    const correct = subject?.wins || 0;
    const provisional = stats.baseline && correct < A.SUBJECT_PROVISIONAL ?
      `<p class="arena-note">${correct} of ${A.SUBJECT_PROVISIONAL} correctly answered rated problems to finish subject placement.</p>` : '';
    const change = stats.baseline && subject ? subject.rating - stats.baseline.rating : null;
    const trend = change != null && rated.length ?
      `<p>${change === 0 ? '−<strong>0 Elo</strong>' : `<strong>${signed(change)} Elo</strong>`} since placement ·
        ${rated.length} rated ${rated.length === 1 ? 'problem' : 'problems'}</p>` : '';
    return `${trend}${provisional}${latest.length ? `<h4>Recent results</h4><ul>${latest.map(({event}) => {
      const review = reviews.get(event.slug);
      return `<li>${review ? reviewedProblemLink(ctx,review) : ctx.escape(event.slug)}
        <span>${statusLabel(event.outcome)}</span></li>`;
    }).join('')}</ul>` : '<p>No graded problems in this subject yet.</p>'}`;
  }
  function dashboard(ctx, state, stats, history) {
    const t = stats.overall, placed = !!stats.baseline, s = state.session, active = s && !s.closed;
    const prev = s || {};
    const established = ctx.roots.filter(root => stats.subjects.get(root.id)?.wins >= A.SUBJECT_PROVISIONAL).length;
    const arenaHistory = history.filter(event => event.source === 'arena' && event.session && event.reviewNumber);
    const reviews = new Map(arenaHistory.map(event => [event.item,event]));
    const recommendations = A.recommendations(arenaHistory, ctx.lookup).filter(row => ctx.nodes.has(row.id));
    const studyRows = distinctStudyRows(recommendations);
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
        <p class="arena-note">${!postPlacement.length ? 'Starting Elo from placement' : signed(delta) + ' Elo in your latest set'}</p>` :
        `<p>Take one set of ${A.PLACEMENT_SIZE} problems across a range of difficulties. Your starting Elo applies to all four subjects.</p>
        ${t.count ? `<small>${t.count} earlier results included</small>` : ''}`}</div>
      ${placed ? `<div class="arena-plot"><h4>Rating trend</h4>${chart(stats.points)}</div>` :
        `<div class="arena-placement"><h4>How placement works</h4><p>You get two tries per problem. A second-try solve earns half credit toward your placement rating. Blanks count as misses when you submit. Placement shows one problem at a time.</p></div>`}
      ${placed ? `<div class="arena-metrics">
        <div><strong>${number(setPoints(stats.points).reduce((max,p) => Math.max(max, p.rating), stats.baseline.rating))}</strong><small>Peak Elo</small></div>
        ${ratedAnswers.length ? `<div><strong>${accuracy(ratedAnswers)}</strong><small>Overall accuracy on submitted rated answers</small></div>` : ''}
        ${postPlacement.length ? `<div><strong>${new Set(postPlacement.map(p => p.event.session)).size}</strong><small>Rated sets</small></div>` : ''}</div>` : ''}
      </section>
      <section class="sh-section" id="arena-session"><h3>${(active ? s.placement : !placed) ? 'Placement set' : 'Rated session'}</h3>
      ${active ? `<p class="arena-note">${s.placement ? 'Mixed subjects' : (opts.get(s.focus) || 'Mixed subjects') + ' · ' + paceNames[s.pace]} · ${s.round ? s.placement ? s.length + ' problems · Untimed' : s.round.items.length + ' problems · ' + s.round.limitMs / 60000 + ' min' : (s.length - A.remaining(state)) + ' of ' + s.length + ' answered'}</p>
        <div class="arena-resume"><a class="hp-btn arena-primary" href="${sessionUrl}">${A.remaining(state) ? 'Resume session' : 'View results'} ${ctx.icon('arrow-right')}</a>
        ${s.round && !s.placement ? '<span class="arena-resume-time"><span class="arena-clock" aria-label="Time remaining" role="timer"></span> left</span>' : ''}</div>` :
        `<form id="arena-start">${placed ? `${selector('focus', 'Subject', [...opts], opts.has(prev.focus) ? prev.focus : opts.keys().next().value)}
        ${selector('pace','Difficulty',Object.entries(paceNames),prev.pace || 'matched')}
        ${selector('length','Problems',A.LENGTHS.map(n => [String(n), String(n)]), String(A.LENGTHS.includes(prev.length) ? prev.length : 5))}<p class="arena-note" data-arena-target aria-live="polite"></p>` :
        '<p class="arena-note">Work at your own pace.</p>'}
        <button class="hp-btn arena-primary">${placed ? 'Start rated session' : 'Start placement'} ${ctx.icon('arrow-right')}</button></form>`}${rules}</section>
      <section class="sh-section" id="arena-subjects"><h3>Subject ratings</h3>
        <div class="arena-table-wrap"><table class="arena-subject-table"><thead><tr><th>Subject</th><th>Elo</th><th>Accuracy on submitted answers</th></tr></thead><tbody>
        ${[...opts].map(([id, label]) => { const r = stats.subjects.get(id);
          return `<tr><th scope="row"><button type="button" class="arena-subject-toggle" data-subject-toggle aria-expanded="false" aria-controls="arena-subject-${id}">${label}</button></th><td>${placed && r ? number(r.rating) : '—'}${placed && r && r.wins < A.SUBJECT_PROVISIONAL ? '<small>Provisional</small>' : ''}</td>
          <td>${accuracy(stats.points.filter(p => p.event.answer && p.event.subjects.includes(id)))}</td></tr>
          <tr class="arena-subject-details" id="arena-subject-${id}" hidden><td colspan="3">${subjectDetails(ctx,id,stats,reviews)}</td></tr>`; }).join('')}</tbody></table></div></section>
      <section class="sh-section" id="arena-study"><h3>What to study</h3>${studyHtml(ctx, studyRows)}</section>
      <section class="sh-section" id="arena-history"><h3>Session history</h3><div id="arena-history-list"></div><button type="button" class="hp-btn hp-btn-soft" data-arena-history-toggle aria-controls="arena-history-list" aria-expanded="false" hidden>Show all</button></section></div>`;
    for (const button of ctx.container.querySelectorAll('[data-subject-toggle]')) {
      button.onclick = () => {
        const detail = document.getElementById(button.getAttribute('aria-controls'));
        detail.hidden = !detail.hidden;
        button.setAttribute('aria-expanded', String(!detail.hidden));
        if (!detail.hidden) ctx.renderMath(detail);
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
    const studyAll = ctx.container.querySelector('[data-study-all]');
    if (studyAll) studyAll.onclick = () => {
      const filters = selector('study-subject','Subject',[['all','All subjects'],...opts],'all');
      const dialog = ctx.openDialog(`<header class="arena-study-dialog-head">
        <div><h2 id="arena-study-modal-title">Study recommendations</h2>
        <button type="button" class="hp-btn hp-btn-soft" autofocus>Close</button></div>${filters}</header>
        <div class="arena-study-dialog-body">${studyRowsHtml(ctx,studyRows)}</div>`, d => {
        d.classList.add('arena-study-dialog');
        d.setAttribute('aria-labelledby','arena-study-modal-title');
        d.querySelector('button').onclick = () => d.close();
        const list = d.querySelector('.arena-study-dialog-body');
        d.addEventListener('change',e => {
          if (e.target.name !== 'study-subject') return;
          const subject = e.target.value;
          const rows = subject === 'all' ? studyRows : distinctStudyRows(recommendations.filter(row =>
            row.id === subject || row.id.startsWith(subject + '.')));
          list.innerHTML = rows.length ? studyRowsHtml(ctx,rows) : '<p class="arena-note">No recommendations in this subject yet.</p>';
          list.scrollTop = 0;
          ctx.renderMath(list);
        });
        const close = () => { if (d.open) d.close(); };
        window.addEventListener('hashchange',close);
        d.addEventListener('close',() => window.removeEventListener('hashchange',close),{once:true});
      });
      ctx.renderMath(dialog);
    };
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
    const accepted = acceptedAnswer(ctx,slug);
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
              aria-label="Problem ${i+1}, ${statusLabel(row.outcome)}" ${i === index ? 'aria-current="step"' : ''}>${i+1}</a>`).join('')}</nav></section>
        <section class="sh-section practice-question"><h3 tabindex="-1">Problem ${index+1}${p ?
          ' · <a class="practice-prob-link" href="#/problem/' + p.slug + '">' + ctx.escape(ctx.refShort(p.ref)) + '</a>' : ''}</h3>
          ${!p ? '<p>This problem is no longer available.</p>' : event.external && p.url ? ctx.paperPrompt(p) :
            `<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement">Loading statement…</div></div>`}</section>
        <section class="sh-section practice-review detail"><h3>Your answer</h3>
          <p class="practice-result">${statusLabel(event.outcome)}${event.outcome !== 'seen' ? ' · ' + responseText(ctx,event) : ''}</p>
          <div data-arena-explanation></div>
          <div class="practice-problem-nav">${index ? `<a class="hp-btn hp-btn-soft" href="${detailUrl(index-1)}">Previous</a>` : ''}
          ${index+1 < events.length ? `<a class="hp-btn hp-btn-soft" href="${detailUrl(index+1)}">Next</a>` : ''}</div></section></div>`;
      const explanation = ctx.container.querySelector('[data-arena-explanation]');
      ctx.container.querySelector('.practice-question h3').focus({preventScroll:true});
      ctx.renderMath(ctx.container);
      if (!p) return;
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
    const note = [
      events.some(e => e.timedOut) ? 'Submitted when time ran out.' : '',
      placement ? startedHere ? 'Your starting Elo applies to all four subjects.' :
        points.length ? 'These results count toward your starting rating.' : 'Submit an answer in placement to establish a starting rating.' : ''
    ].filter(Boolean).join(' ');
    ctx.container.innerHTML = ctx.reviewResults({back:back(ctx), title, subtitle, arena:true, stats:figures, rows,
      reviewUrl:detailUrl(0), insights:ctx.reviewInsights(outcomes,counts,detailUrl),
      intro:ratingChange, meta:note ? `<p class="practice-results-meta">${note}</p>` : ''});
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
  async function findProblem(ctx, seen, stats, session, current, savedSlug, picked = []) {
    let p = savedSlug && ctx.lookup(savedSlug);
    const pool = ctx.pool;
    const allowExternal = ctx.allowExternal;
    while (current()) {
      p ||= A.choose(pool, seen, stats, session, p => subjectIds(ctx,p), Math.random, picked);
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
    const visibleAnswer = slot.draft || (locked && slot.firstMiss) || '';
    let response = box.querySelector('.arena-response');
    const opened = !response;
    if (opened) {
      box.insertAdjacentHTML('beforeend', `${slot.external ? ctx.paperPrompt(p) :
        `<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement"></div></div>`}<div class="arena-response"></div>`);
      response = box.querySelector('.arena-response');
      if (!slot.external) ctx.showPrompt(p);
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
        if (saved.session?.id === session.id && saved.session.closed &&
            (location.hash === homeUrl || location.hash === sessionUrl || location.hash.startsWith(sessionUrl + '/'))) ctx.refresh();
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
  async function ratedSet(ctx, state, stats, history, index) {
    const s = state.session, id = s.id;
    const box = loading(ctx, s.round ? 'Loading your set…' : s.placement ? 'Finding your first problem…' : 'Building your set…');
    if (!s.round) {
      const seen = seenProblems(ctx, history, state), problems = [];
      const total = s.placement ? 1 : A.remaining(state);
      const current = () => box.isConnected;
      while (problems.length < total && current()) {
        const {status, p} = await findProblem(ctx, seen, stats, s, current, !problems.length && s.slot?.slug, problems);
        if (!current()) return;
        if (status === 'offline') return promptError(ctx, box, 'The timer starts after your set loads. Check your connection and try again.');
        if (status === 'empty') break;
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
      watchDeadline(ctx,state.session);
    }
    const round = state.session.round;
    index = s.placement ? A.placementIndex(round) : Math.min(index, round.items.length-1);
    const item = round.items[index], p = ctx.lookup(item.slug);
    const controller = roundController = new AbortController();
    const onLeave = () => controller.abort();
    window.addEventListener('hashchange',onLeave,{once:true,signal:controller.signal});
    let finishing = false, saveFailed = false, latest = state;
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
      <div class="practice-session-top"><div><h1>${s.placement ? 'Placement set' : ratedSetTitle(ctx,s.focus,round.items)}</h1><p>${s.placement ? s.length + ' problems · Untimed' : round.items.length + ' problems · ' + round.limitMs/60000 + ' minutes'}</p></div>
      ${s.placement ? '' : '<span class="arena-clock" aria-label="Time remaining" role="timer"></span>'}</div>
      <nav class="cn-nums" aria-label="Set problems">${Array.from({length:s.placement ? s.length : round.items.length},(_,i) => {
        const row = round.items[i];
        const result = row?.outcome ? statusLabel(row.outcome) : row?.firstMiss ? 'Incorrect' : '';
        const label = result || (row?.draft ? 'Draft saved' : 'Unanswered');
        const tint = result ? ' practice-reviewed' : row?.draft ? ' practice-answered' : '';
        const current = i === index ? ' aria-current="step"' : '';
        const retry = row?.firstMiss && !row.outcome ? ' data-retry' : '';
        const attributes = `class="cn-num${tint}${i === index ? ' cn-here' : ''}" data-problem-index="${i}" data-result="${result}" aria-label="Problem ${i+1}, ${label}"${current}${retry}`;
        return s.placement ? `<span ${attributes}>${i+1}</span>` :
          `<a ${attributes} href="${setProblemUrl(i)}">${i+1}</a>`;
      }).join('')}</nav>
      <div class="practice-session-actions"><span data-arena-checked>${round.items.filter(row => row.outcome && row.outcome !== 'seen').length} of ${s.placement ? s.length : round.items.length} finished</span>
      <button type="button" class="hp-btn hp-btn-soft" data-submit-set>Submit set</button></div>
      <p class="arena-note" data-arena-finish-note role="status"${A.roundComplete(state.session) ? '' : ' hidden'}>Set complete. Submitting in three seconds…</p></section>`);
    const nav = box.previousElementSibling, timer = nav.querySelector('.arena-clock');
    if (timer) showCountdown(timer,state.session,() => { if (!saveFailed) submit(); });
    nav.querySelector('[data-submit-set]').onclick = async () => {
      if (saveFailed || A.roundComplete(latest.session)) { submit(); return; }
      try {
        const current = await A.read();
        if (!box.isConnected || finishing) return;
        if (current.session?.id !== id || current.session.closed) { ctx.refresh(); return; }
        if (A.roundComplete(current.session) || await ctx.confirm({title:'Submit this set?',
          text:s.placement ? 'Saved answers will be graded. Opened problems left blank count as misses.' :
            'Saved answers will be graded. Any unanswered problems count as misses.',
          ok:'Submit set',signal:controller.signal})) submit();
      } catch { saveError(nav); }
    };
    const ready = p && (item.external && p.url ? 'external' : await ctx.loadPrompt(p));
    if (!box.isConnected || finishing) return;
    if (ready !== 'ready' && ready !== 'external') return promptError(ctx, box, 'Your answers are saved. Reconnect to view this problem.');
    box.classList.add('practice-question');
    box.innerHTML = `<h2 class="arena-question-heading" tabindex="-1">Problem ${index+1}</h2>`;
    const selected = nav.querySelector('[aria-current="step"]');
    let nextButton;
    const lastPlacementProblem = () => round.adaptive ? round.items.length >= s.length :
      latest.session.round.items.every(row => row.outcome);
    function showSlot(slot) {
      showQuestion(ctx, box, id, p, slot, async result => {
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
        selected.setAttribute('aria-label', `Problem ${index+1}, ${label}${updated.outcome ? '' : ', retry available'}`);
        selected.classList.remove('practice-answered');
        selected.classList.add('practice-reviewed');
        nav.querySelector('[data-arena-checked]').textContent =
          latest.session.round.items.filter(row => ['correct','incorrect'].includes(row.outcome)).length +
          ' of ' + (s.placement ? s.length : round.items.length) + ' finished';
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
      actions.className = 'arena-actions';
      actions.innerHTML = '<button type="button" class="hp-btn hp-btn-soft">Next problem</button>';
      nextButton = actions.querySelector('button');
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
              note.textContent = status === 'offline' ? 'The next problem could not load. Try again.' : 'No fresh problems remain. Submit to save your results.';
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
      if (index+1 < round.items.length) box.insertAdjacentHTML('beforeend', `<div class="arena-actions">
        <a class="hp-btn hp-btn-soft" href="${setProblemUrl(index+1)}">Next problem ${ctx.icon('arrow-right')}</a></div>`);
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
      if (state.session?.round && !state.session.closed && Date.now() >= A.submissionAt(state.session))
        state = await expireRatedSet(state.session.id);
      const history = await ctx.history(state);
      if (!current()) return;
      watchDeadline(ctx,state.session);
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
