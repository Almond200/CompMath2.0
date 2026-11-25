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
  function steps(done, total) {
    return `<div class="arena-steps" aria-hidden="true">${Array.from({length: total}, (_, i) =>
      `<i class="${i < done ? 'complete' : i === done ? 'current' : ''}"></i>`).join('')}</div>`;
  }
  function setPoints(points) {
    return points.slice(A.PLACEMENT - 1).filter((point, i, all) => i === 0 || all[i+1]?.event.session !== point.event.session);
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
      <div class="arena-chart-caption"><span>${data[0] === points[A.PLACEMENT-1] ? 'Placement' : 'Earlier set'}</span><span>Latest set</span></div>`;
  }
  const rules = `<details class="arena-rules"><summary>How ratings work</summary>
    <p>Six untimed placement problems establish your starting Elo. Each allows two tries. A solve on either try counts once.</p>
    <p>Rated sets have one timer. Harder problems add more time to the set: 2, 3, 5, 7 or 9 minutes per problem at Elo cutoffs of 1000, 1600, 2200 and 2800. Submitting grades any saved answers. Unanswered problems count as misses. Mark familiar problems as seen to leave them out of the rating.</p>
    <p>Each set updates your overall rating and the subjects its problems cover. Solving a harder problem earns more Elo, and missing an easier one costs more. Early ratings adjust faster.</p></details>`;
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
    stats.points.forEach((point, i) => {
      const entry = bySession.get(point.event.session) || {delta:0, placement:i < A.PLACEMENT};
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
  function studyHtml(ctx, history, stats) {
    const rows = A.recommendations(history, ctx.lookup).filter(row => ctx.nodes.has(row.id));
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
    const coverage = stats.overall.count >= A.PLACEMENT && answered(least) < A.PLACEMENT ?
      `<div class="arena-study-coverage"><h4>Get a clearer subject rating</h4>
        <p class="arena-note">${ctx.topicLabel(least)} has ${answered(least)} of the ${A.PLACEMENT} results needed for an established rating.</p>
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
  function dashboard(ctx, state, stats, history) {
    const t = stats.overall, placed = t.count >= A.PLACEMENT, s = state.session, active = s && !s.closed;
    const prev = s || {};
    const postPlacement = stats.points.slice(A.PLACEMENT);
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
        <p class="arena-note">${t.count === A.PLACEMENT ? 'Starting rating established' : signed(delta) + ' Elo in your latest set'}</p>` :
        `<p>Work through six untimed problems across subjects. Each answer helps choose the difficulty of the next one.</p>
        ${steps(t.count, A.PLACEMENT)}<small>${t.count} of ${A.PLACEMENT} placement answers</small>`}</div>
      ${placed ? `<div class="arena-plot"><h4>Rating trend</h4>${chart(stats.points)}</div>` :
        `<div class="arena-placement"><h4>What counts</h4><p>Submit an answer or give up to record a result. If you recognize a problem, mark it as seen for a fresh one.</p></div>`}
      ${placed ? `<div class="arena-metrics">
        <div><strong>${number(setPoints(stats.points).reduce((max,p) => Math.max(max, p.rating), 0))}</strong><small>Peak Elo</small></div>
        ${ratedAnswers.length ? `<div><strong>${accuracy(ratedAnswers)}</strong><small>Accuracy on submitted answers</small></div>` : ''}
        ${postPlacement.length ? `<div><strong>${new Set(postPlacement.map(p => p.event.session)).size}</strong><small>Rated sets</small></div>` : ''}</div>` : ''}
      </section>
      <section class="sh-section" id="arena-session"><h3>${!placed ? 'Placement session' : 'Rated session'}</h3>
      ${active ? `<p class="arena-note">${s.placement ? 'Mixed subjects' : (opts.get(s.focus) || 'Mixed subjects') + ' · ' + paceNames[s.pace]} · ${s.round ? s.round.items.length + ' problems · ' + s.round.limitMs / 60000 + ' min' : (s.length - A.remaining(state)) + ' of ' + s.length + ' answered'}</p>
        <a class="hp-btn arena-primary" href="${sessionUrl}">${A.remaining(state) ? 'Resume session' : 'See session result'} ${ctx.icon('arrow-right')}</a>` :
        `<form id="arena-start">${placed ? `${selector('focus', 'Subject', [['mixed','Mixed subjects'], ...opts], opts.has(prev.focus) ? prev.focus : 'mixed')}
        ${selector('pace','Difficulty',Object.entries(paceNames),prev.pace || 'matched')}
        ${selector('length','Problems',A.LENGTHS.map(n => [String(n), String(n)]), String(A.LENGTHS.includes(prev.length) ? prev.length : 5))}<p class="arena-note" data-arena-target aria-live="polite"></p>` :
        '<p class="arena-note">You can leave between problems and pick up here later.</p>'}
        <button class="hp-btn arena-primary">${placed ? 'Start rated session' : 'Start placement'} ${ctx.icon('arrow-right')}</button></form>`}${rules}</section>
      <section class="sh-section" id="arena-subjects"><h3>Subject ratings</h3>
        <div class="arena-table-wrap"><table class="arena-subject-table"><thead><tr><th>Subject</th><th>Elo</th><th>Submitted accuracy</th></tr></thead><tbody>
        ${[...opts].map(([id, label]) => { const r = stats.subjects.get(id);
          return `<tr><th scope="row">${label}</th><td>${r ? number(r.rating) : '—'}${r && r.count < A.PLACEMENT ? '<small>Provisional</small>' : ''}</td>
          <td>${accuracy(stats.points.filter(p => p.event.answer && p.event.subjects.includes(id)))}</td></tr>`; }).join('')}</tbody></table></div></section>
      <section class="sh-section" id="arena-study"><h3>What to study</h3>${studyHtml(ctx, history, stats)}</section>
      <section class="sh-section" id="arena-history"><h3>Session history</h3><div data-arena-log></div><button class="hp-btn hp-btn-soft" data-earlier hidden>Earlier sessions</button></section></div>`;
    showHistory(ctx, state, stats);
    ctx.renderMath(ctx.container);
    const startForm = ctx.container.querySelector('#arena-start');
    const reportTarget = () => {
      const target = startForm?.querySelector('[data-arena-target]');
      if (!target) return;
      const {focus, pace} = Object.fromEntries(new FormData(startForm));
      const basis = stats.subjects.has(focus) ? opts.get(focus) : 'overall';
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
  function responseText(ctx, event) {
    const {slug, outcome, answer, firstMiss, invalidDraft} = event;
    if (outcome === 'seen') return '';
    const format = value => ctx.answerHtml(value, grade.exactKey(slug) || {});
    const first = firstMiss ? 'First try ' + format(firstMiss) + ' · ' : '';
    const response = answer ? (firstMiss ? 'Second try ' : 'Your answer ') + format(answer) :
      invalidDraft ? 'Unaccepted answer format · ' + format(invalidDraft) :
        outcome === 'incorrect' ? 'Gave up' : 'No answer submitted';
    const accepted = acceptedAnswer(ctx, slug);
    return first + response + (outcome !== 'correct' && accepted ? ' · Accepted answer ' + accepted : '');
  }
  function review(ctx, state, stats, id) {
    const events = state.events.filter(e => e.session === id);
    if (!events.length || state.session?.id === id && !state.session.closed) { location.replace(homeUrl); return; }
    const points = stats.points.filter(p => p.event.session === id);
    const byProblem = new Map(points.map(point => [point.event.slug, point]));
    const placement = events.some(e => e.placement) || points.some(p => stats.points.indexOf(p) < A.PLACEMENT);
    const rating = points.at(-1)?.rating;
    const delta = points.reduce((total, point) => total + point.delta, 0);
    const count = outcome => events.filter(e => e.outcome === outcome).length;
    const summary = ['correct','incorrect','unanswered','seen'].filter(outcome => count(outcome))
      .map(outcome => count(outcome) + ' ' + statusLabel(outcome).toLowerCase()).join(' · ');
    ctx.container.innerHTML = `<div class="space-home arena arena-play">${back(ctx)}
      <section class="sh-section"><h1 tabindex="-1">${placement ? 'Placement complete' : 'Set results'}</h1>
      ${Number.isFinite(rating) ? `<div class="arena-result-rating"><strong>${number(rating)} Elo</strong>
        <span>${placement ? 'Starting rating' : signed(delta) + ' Elo this set'}</span></div>` : '<p>No problems in this set counted toward your rating.</p>'}
      <p class="arena-note">${summary}${events[0].limitMs ? ' · ' + events[0].limitMs / 60000 + ' min' : ''}
      ${events.some(e => e.timedOut) ? ' · Submitted when time ran out' : ''}</p></section>
      <section class="sh-section"><h2>Review problems</h2><ol class="arena-review-list">
        ${events.map((event, i) => {
          const p = ctx.lookup(event.slug), point = byProblem.get(event.slug);
          return `<li><div><h3>${i+1}. ${p ? `<a href="#/problem/${p.slug}">${ctx.escape(ctx.refShort(p.ref))}</a>` : ctx.escape(event.slug)}</h3>
            <p class="arena-note">${responseText(ctx, event)}</p></div>
            <span class="arena-result-status" data-result="${event.outcome}">${statusLabel(event.outcome)}
            ${point && !placement ? `<small>${signed(point.delta)} Elo</small>` : ''}</span></li>`;
        }).join('')}</ol></section></div>`;
    ctx.container.querySelector('h1').focus({preventScroll:true});
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
  async function findProblem(ctx, seen, stats, session, current, savedSlug) {
    let p = savedSlug && ctx.lookup(savedSlug);
    while (current()) {
      p ||= A.choose(ctx.pool, seen, stats, session, p => subjectIds(ctx,p));
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
    box.innerHTML = '<h1>No fresh problems in this pool</h1><p>Try mixed subjects or return to your saved ratings.</p><button class="hp-btn arena-primary">Back to Arena</button>';
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
  async function placement(ctx, state, stats, history) {
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
    const {status, p} = await findProblem(ctx, seenProblems(ctx, history, state), stats, s, current, s.slot?.slug);
    if (!current()) return;
    if (status === 'offline') return promptError(ctx, box, 'Check your connection and try loading the problem again.');
    if (status === 'empty') return noFreshProblems(ctx, box, s);
    if (p.slug !== s.slot?.slug) {
      state = await A.change(st => {
        const live = st.session;
        if (live?.id !== s.id || live.closed || live.last || live.slot?.slug !== s.slot?.slug) return false;
        live.slot = {slug:p.slug, identity:A.canonical(p.identity), draft:''};
      });
      if (!current()) return;
      if (state.session?.slot?.slug !== p.slug) { ctx.refresh(); return; }
    }
    box.classList.add('practice-question');
    box.innerHTML = `<h1 tabindex="-1">Problem ${A.PLACEMENT - A.remaining(state) + 1} of ${A.PLACEMENT}</h1>`;
    function showSlot(slot) {
      showQuestion(ctx, box, s.id, p, slot, async result => {
        const latest = await A.change(st => A.placeAnswer(st,s.id,p,subjectIds(ctx,p),result.outcome,result.answer,!!slot.firstMiss));
        if (!current()) return;
        if (latest.session?.id === s.id && latest.session.slot?.slug === p.slug) showSlot(latest.session.slot);
        else ctx.refresh();
      }, true);
    }
    showSlot(state.session.slot);
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
      box.querySelector('h1').focus({preventScroll:true});
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
        <button type="button" class="arena-seen" data-seen>I’ve seen this problem</button></div>
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
    form.querySelector('[data-seen]').onclick = () => finish({outcome:'seen', answer:''});
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
      const seen = seenProblems(ctx, history, state), problems = [], total = A.remaining(state);
      const current = () => box.isConnected;
      while (problems.length < total && current()) {
        const {status, p} = await findProblem(ctx, seen, stats, s, current, !problems.length && s.slot?.slug);
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
      if (!problems.length) return noFreshProblems(ctx, box, s);
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
      <div class="practice-session-top"><div><h2>Rated set</h2><p>${round.items.length} problems · ${round.limitMs/60000} minutes</p></div>
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
    box.innerHTML = `<div class="arena-problem-top"><h1 tabindex="-1">Problem ${index+1} of ${round.items.length}</h1>
      <strong>${number(item.elo)} Elo</strong></div>`;
    const selected = nav.querySelector('[aria-current="step"]');
    showQuestion(ctx, box, id, p, item, async result => {
      const latest = await A.change(st => A.checkRoundAnswer(st,id,item.slug,result));
      if (!box.isConnected || finishing) return;
      const updated = latest.session?.id === id && latest.session.round?.items[index];
      if (!updated?.outcome || latest.session.closed) { ctx.refresh(); return; }
      const label = statusLabel(updated.outcome);
      selected.dataset.result = label;
      selected.setAttribute('aria-label', `Problem ${index+1}, ${label}`);
      selected.classList.remove('practice-answered');
      selected.classList.toggle('practice-reviewed', updated.outcome !== 'seen');
      nav.querySelector('[data-arena-checked]').textContent =
        latest.session.round.items.filter(row => ['correct','incorrect'].includes(row.outcome)).length + ' checked';
      showQuestion(ctx, box, id, p, updated);
    });
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
      const stats = A.ratings(state.events);
      const s = state.session;
      if (route.review) review(ctx,state,stats,route.review);
      else if (!route.playing) dashboard(ctx,state,stats,history);
      else if (!s) location.replace(homeUrl);
      else if (s.closed && !s.last) {
        location.replace(state.events.some(e => e.session === s.id) ? reviewUrl(s.id) : homeUrl);
      } else if (s.placement || s.last) await placement(ctx,state,stats,history);
      else await ratedSet(ctx,state,stats,history,route.index);
      if (current()) ctx.didRender();
    } catch {
      if (!current()) return;
      ctx.container.innerHTML = '<section class="sh-section"><h1>Arena progress is unavailable</h1><p>Check browser storage or restore a progress backup in <a href="#/settings">Settings</a>.</p></section>';
    }
  }
  window.ArenaView = { render };
})();
