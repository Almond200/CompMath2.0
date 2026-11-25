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
  function chart(points) {
    // Start the public trend at the placement result. The initial six are estimates.
    const data = points.slice(A.PLACEMENT - 1).slice(-30);
    if (data.length < 2) return '<p class="arena-note">Your trend starts here. Your next rated answer adds a second point.</p>';
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
      <div class="arena-chart-caption"><span>${points.length - data.length + 1 === A.PLACEMENT ? 'Placement' : 'Answer ' + (points.length - data.length + 1)}</span><span>Latest answer</span></div>`;
  }
  const rules = `<details class="arena-rules"><summary>How ratings work</summary><p>Six adaptive problems establish your starting Elo. After placement, solving a harder problem earns more points, and missing an easier one costs more. Early ratings adjust faster. The archive includes estimated problem difficulties.</p><p>Each tagged subject has its own rating and six-answer placement. A mixed problem counts once overall and once in each subject it covers. Practice results help choose study topics. Only Arena answers change your Elo.</p></details>`;
  function selector(name, legend, options, value) {
    return `<fieldset class="arena-options"><legend>${legend}</legend><div>${options.map(([id, label]) =>
      `<label><input type="radio" name="${name}" value="${id}" ${id === value ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></fieldset>`;
  }
  function showHistory(ctx, stats) {
    const box = ctx.container.querySelector('[data-arena-log]');
    if (!stats.points.length) {
      box.innerHTML = '<p class="arena-note">Your submitted answers will appear here with their problem ratings and results.</p>';
      return;
    }
    const sessions = new Map();
    stats.points.forEach((point, i) => {
      const key = point.event.session;
      if (!sessions.has(key)) sessions.set(key, { points: [], placement: i < A.PLACEMENT });
      sessions.get(key).points.push(point);
    });
    const groups = [...sessions.values()].reverse();
    let shown = 0;
    function more() {
      const next = groups.slice(shown, shown + 4);
      shown += next.length;
      for (const { points, placement } of next) {
        const latest = points.at(-1), date = new Date(latest.event.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        const wins = points.filter(p => p.event.outcome === 'correct').length;
        const detail = document.createElement('details');
        detail.className = 'arena-log';
        detail.innerHTML = `<summary><span>${placement ? 'Placement' : 'Rated session'} <small>${date}</small></span>
          <span>${wins}/${points.length} correct · ${number(latest.rating)} Elo</span></summary>`;
        detail.addEventListener('toggle', () => {
          if (!detail.open || detail.querySelector('ol')) return;
          const rows = points.map(({ event: e, rating, delta }) => {
            const p = ctx.lookup(e.slug);
            return `<li><div>${p ? `<a href="#/problem/${p.slug}">${ctx.escape(ctx.refShort(p.ref))}</a>` : ctx.escape(e.slug)}
              <small>${number(e.elo)} Elo · ${e.outcome === 'correct' ? 'Correct' : 'Incorrect'}${e.answer ? ' · Your answer ' + ctx.escape(e.answer) : ' · Gave up'}</small></div>
              <span>${number(rating)} <small>${signed(delta)}</small></span></li>`;
          });
          detail.insertAdjacentHTML('beforeend', '<ol>' + rows.join('') + '</ol>');
        });
        box.append(detail);
      }
      button.hidden = shown === groups.length;
    }
    const button = box.parentElement.querySelector('[data-earlier]');
    button.onclick = () => {
      const before = box.children.length;
      more();
      box.children[before]?.querySelector('summary')?.focus();
    };
    more();
  }
  function studyHtml(ctx, history, stats) {
    const rows = A.recommendations(history, ctx.lookup).filter(row => ctx.nodes.has(row.id));
    if (!rows.length) {
      if (stats.overall.count < A.PLACEMENT) return '<p class="arena-note">When you miss a topic in Arena or Practice, you’ll find a focused next step here.</p>';
      const count = n => stats.subjects.get(n.id)?.count || 0;
      const least = [...ctx.roots].sort((a, b) => count(a) - count(b))[0];
      return `<p class="arena-note">Your recent graded problems have gone well. ${ctx.topicLabel(least)} has the fewest rated answers (${count(least)}). Choose that subject for your next session to get a clearer picture.</p>`;
    }
    const selected = [rows[0]];
    // Prefer another independent weakness over two tags from the same missed question.
    const other = rows.find(r => r.id !== selected[0].id && r.id.split('.')[0] !== selected[0].id.split('.')[0]);
    if (other) selected.push(other);
    return `<p class="arena-note">From your most recent graded Arena and Practice problems (up to 60).</p>
      ${selected.map(r => `<div class="arena-study-row"><div><strong>${ctx.topicLabel(ctx.nodes.get(r.id))}</strong>
        <small>Missed ${r.misses} of ${r.attempts} attempted</small></div>
        <div class="study-links">${[ctx.practiceLink(r.id), ctx.studyLink(r.id, r.missedSlug)].filter(Boolean).join(' · ')}</div></div>`).join('')}`;
  }
  function dashboard(ctx, state, stats, history) {
    const t = stats.overall, placed = t.count >= A.PLACEMENT, s = state.session, active = s && !s.closed;
    const prev = s || {}, accuracy = n => n.count ? Math.round(100 * n.wins / n.count) + '%' : '—';
    const recent = stats.points.at(-1);
    const opts = new Map(ctx.roots.map(n => [n.id, ctx.topicLabel(n)]));
    const title = !placed ? 'Find your starting rating' : 'Your rating';
    ctx.container.innerHTML = `<div class="space-home arena">
      <header class="space-home-head"><h1>Arena</h1><p class="sh-ask">Measure your growth on real contest problems.</p></header>
      <section class="sh-section arena-hero" id="arena-overview"><div><h3>${title}</h3>
      ${placed ? `<div class="arena-big">${number(t.rating)} <small>Elo</small></div>
        <p class="arena-note">${t.count === A.PLACEMENT ? 'Starting rating established' : signed(recent.delta) + ' on your latest answer'}</p>` :
        `<p>Work through six untimed problems across subjects. Each answer helps choose the difficulty of the next one.</p>
        ${steps(t.count, A.PLACEMENT)}<small>${t.count} of ${A.PLACEMENT} placement answers</small>`}</div>
      ${placed ? `<div class="arena-plot"><h4>Rating trend</h4>${chart(stats.points)}</div>` :
        `<div class="arena-placement"><h4>What counts</h4><p>Submit an answer or give up to record a result. If you recognize a problem, mark it as seen for a fresh one.</p></div>`}
      ${placed ? `<div class="arena-metrics">
        <div><strong>${number(stats.points.slice(A.PLACEMENT-1).reduce((max,p) => Math.max(max, p.rating), 0))}</strong><small>Peak Elo</small></div>
        <div><strong>${accuracy(t)}</strong><small>Rated accuracy</small></div><div><strong>${t.wins} / ${t.count}</strong><small>Problems solved</small></div></div>` : ''}
      </section>
      <section class="sh-section" id="arena-session"><h3>${!placed ? 'Placement session' : 'Rated session'}</h3>
      ${active ? `<p class="arena-note">${s.placement ? 'Mixed subjects' : (opts.get(s.focus) || 'Mixed subjects') + ' · ' + paceNames[s.pace]} · ${s.length - A.remaining(state)} of ${s.length} answered</p>
        <a class="hp-btn arena-primary" href="${sessionUrl}">${A.remaining(state) ? 'Resume session' : 'See session result'} ${ctx.icon('arrow-right')}</a>` :
        `<form id="arena-start">${placed ? `${selector('focus', 'Subject', [['mixed','Mixed subjects'], ...opts], opts.has(prev.focus) ? prev.focus : 'mixed')}
        ${selector('pace','Difficulty',Object.entries(paceNames),prev.pace || 'matched')}
        ${selector('length','Problems',A.LENGTHS.map(n => [String(n), String(n)]), String(A.LENGTHS.includes(prev.length) ? prev.length : 5))}<p class="arena-note" data-arena-target aria-live="polite"></p>` :
        '<p class="arena-note">You can leave between problems and pick up here later.</p>'}
        <button class="hp-btn arena-primary">${placed ? 'Start rated session' : 'Start placement'} ${ctx.icon('arrow-right')}</button></form>`}${rules}</section>
      <section class="sh-section" id="arena-subjects"><h3>Subject ratings</h3>
        <div class="arena-table-wrap"><table class="arena-subject-table"><thead><tr><th>Subject</th><th>Elo</th><th>Solved</th><th>Accuracy</th></tr></thead><tbody>
        ${[...opts].map(([id, label]) => { const r = stats.subjects.get(id);
          return `<tr><th scope="row">${label}</th><td>${r ? number(r.rating) : '—'}${r && r.count < A.PLACEMENT ? '<small>Provisional</small>' : ''}</td>
          <td>${r ? r.wins + '/' + r.count : '—'}</td><td>${r ? accuracy(r) : '—'}</td></tr>`; }).join('')}</tbody></table></div></section>
      <section class="sh-section" id="arena-study"><h3>What to study</h3>${studyHtml(ctx, history, stats)}</section>
      <section class="sh-section" id="arena-history"><h3>Session history</h3><div data-arena-log></div><button class="hp-btn hp-btn-soft" data-earlier hidden>Earlier sessions</button></section></div>`;
    showHistory(ctx, stats);
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
  function feedback(ctx, state, stats) {
    const s = state.session, point = stats.points.find(p => p.event.slug === s.last);
    const finish = !A.remaining(state), p = ctx.lookup(s.last);
    const title = finish ? (s.placement ? 'Placement complete' : 'Session complete') : 'Answer recorded';
    const e = point?.event;
    const exact = e && grade.exactKey(e.slug);
    const accepted = e && (exact ? exact.answers.map(v => ctx.answerHtml(v, exact)).join(' or ') :
      grade.choiceAnswers(e.slug).join(' or ') || ctx.escape(String(grade.officialKey(e.slug) ?? '')));
    const thisSession = stats.points.filter(pt => pt.event.session === s.id);
    ctx.container.innerHTML = `<div class="space-home arena arena-play">${back(ctx)}
      <section class="sh-section"><h1 tabindex="-1">${title}</h1>
      ${finish ? `<div class="arena-big">${number(stats.overall.rating)} <small>Elo</small></div>
        <p>${thisSession.filter(pt => pt.event.outcome === 'correct').length} of ${thisSession.length} solved this session.</p>` : ''}
      ${e ? `<h3>${e.outcome === 'correct' ? 'Correct' : 'Incorrect'} · ${p ? ctx.escape(ctx.refShort(p.ref)) : ctx.escape(e.slug)}</h3>
      <p>${e.answer ? 'Your answer ' + ctx.answerHtml(e.answer, exact || {}) : 'You gave up on this problem.'}${e.outcome === 'incorrect' && accepted ? ' · Accepted answer ' + accepted : ''}</p>
      <p class="arena-note">Problem ${number(e.elo)} Elo · ${number(point.rating)} ${stats.overall.count < A.PLACEMENT ? 'provisional Elo' : 'Elo'} (${signed(point.delta)})</p>
      ${p ? `<div class="study-links"><a href="#/problem/${p.slug}">Review problem and solution</a></div>` : ''}` : ''}
      <div class="arena-actions"><button type="button" class="hp-btn arena-primary" data-continue>${finish ? 'View my ratings' : 'Next problem'} ${ctx.icon('arrow-right')}</button>
        ${!finish && !s.placement ? '<button type="button" class="hp-btn hp-btn-soft" data-end>Finish session here</button>' : ''}</div>
      <div role="status" class="arena-status"></div></section></div>`;
    ctx.container.querySelector('h1').focus({preventScroll:true});
    const button = ctx.container.querySelector('[data-continue]');
    async function advance(end) {
      button.disabled = true;
      try {
        await A.change(current => {
          if (current.session?.id !== s.id || current.session.last !== s.last) return false;
          current.session.last = null;
          current.session.closed = end || !A.remaining(current);
        });
        if (button.isConnected) { if (end || finish) location.hash = homeUrl; else ctx.refresh(); }
      } catch { saveError(button.parentElement); button.disabled = false; }
    }
    button.onclick = () => advance(false);
    const end = ctx.container.querySelector('[data-end]');
    if (end) end.onclick = () => advance(true);
    ctx.renderMath(ctx.container);
  }
  async function play(ctx, state, stats, history) {
    const s = state.session;
    if (!s || (s.closed && !s.last)) { location.replace(homeUrl); return; }
    if (s.last || !A.remaining(state)) { feedback(ctx, state, stats); return; }
    ctx.container.innerHTML = `<div class="space-home arena arena-play">${back(ctx)}<section class="sh-section" data-arena-loading><p role="status">Finding your next problem…</p></section></div>`;
    const box = ctx.container.querySelector('[data-arena-loading]');
    const current = () => box.isConnected && location.hash === sessionUrl;
    // Avoid previous rated attempts, recognized questions, studied solutions, and reserved Practice work.
    const seen = new Set([...history.filter(e => e.kind === 'problem').map(e => e.canonicalId), ...ctx.priorSeen().map(A.canonical)]);
    let p = s.slot && ctx.lookup(s.slot.slug);
    while (current()) {
      if (!p) p = A.choose(ctx.pool, seen, stats, s, p => subjectIds(ctx,p));
      if (!p) {
        box.innerHTML = '<h1>No fresh problems in this pool</h1><p>Your existing ratings and results are saved.</p><button class="hp-btn arena-primary">Finish this session</button>';
        box.querySelector('button').onclick = async () => {
          try { await A.change(st => { if (st.session?.id !== s.id) return false; st.session.closed = true; }); if (current()) location.hash = homeUrl; }
          catch { saveError(box); }
        };
        return;
      }
      const ready = missing.has(p.slug) ? 'missing' : await ctx.loadPrompt(p);
      if (!current()) return;
      if (ready === 'offline') {
        box.innerHTML = '<h1>Problem could not load</h1><p>Check your connection and try again. Your rating is saved.</p><button class="hp-btn arena-primary">Try again</button>';
        box.querySelector('button').onclick = ctx.refresh;
        return;
      }
      if (ready === 'ready' && ctx.pool.includes(p) && !seen.has(A.canonical(p.identity))) break;
      // A previously reserved prompt may have since been studied, removed or voided.
      if (ready === 'missing') missing.add(p.slug);
      seen.add(A.canonical(p.identity)); p = null;
    }
    if (!current()) return;
    if (s.slot?.slug !== p.slug) {
      const fresh = await A.change(st => {
        const live = st.session;
        if (live?.id !== s.id || live.closed || live.last || live.slot?.slug !== s.slot?.slug || !A.remaining(st)) return false;
        live.slot = { slug: p.slug, identity: p.identity, draft: '' };
      });
      if (!current()) return;
      if (fresh.session?.slot?.slug !== p.slug || fresh.session.closed) { ctx.refresh(); return; }
      state = fresh;
    }
    question(ctx, state, p, box);
  }
  function question(ctx, state, p, box) {
    const s = state.session, slot = s.slot, exact = grade.exactKey(p.slug);
    const numeric = !exact && /^\d+$/.test(grade.officialKey(p.slug) || ''), typed = exact || numeric;
    const set = { answers: { [p.slug]: slot.draft }, status: 'active' };
    let draft = slot.draft;
    const n = s.length - A.remaining(state) + 1;
    box.className += ' practice-question';
    box.innerHTML = `<div class="arena-problem-top"><div><p class="arena-kicker">${s.placement ? 'Placement' : 'Rated session'}</p>
      <h1 tabindex="-1">Problem ${n} of ${s.length}</h1></div><strong>${number(p.elo)} Elo</strong></div>
      ${steps(n-1,s.length)}<div class="arena-st" data-slug="${p.slug}"><div class="prob-statement"></div></div>
      <form class="practice-answer"><h3>Your answer</h3>
      ${typed ? `<label for="practice-answer">${exact ? ctx.escape(ctx.exactLabel(exact)) : 'Integer from 000 to 999'}</label>
        <input id="practice-answer" type="text" maxlength="120" autocomplete="off" value="${ctx.escape(draft)}" aria-describedby="practice-answer-error">${ctx.keypad()}` : ctx.choices(set,p.slug,false)}
      <button type="button" class="practice-answer-clear" data-clear ${draft ? '' : 'disabled'}>Clear answer</button>
      <div class="arena-actions"><button type="submit" class="hp-btn arena-primary" ${draft ? '' : 'disabled'}>Submit answer</button>
        <button type="button" class="hp-btn hp-btn-soft" data-giveup>Give up</button>
        <button type="button" class="arena-seen" data-seen>I’ve seen this problem</button></div>
      <p class="arena-status" role="status"></p></form>`;
    ctx.showPrompt(p);
    const form = box.querySelector('form'), input = form.querySelector('#practice-answer');
    const submit = form.querySelector('[type="submit"]'), status = form.querySelector('.arena-status');
    const choices = [...form.querySelectorAll('[data-practice-answer]')], multi = grade.allowsMultipleChoices(p.slug);
    const clear = form.querySelector('[data-clear]');
    function writeDraft(value) {
      draft = value;
      clear.disabled = !value;
      submit.disabled = !value.trim();
      choices.forEach(b => b.setAttribute('aria-checked', String(draft.includes(b.dataset.practiceAnswer))));
      A.saveDraft(s.id, p.slug, value).catch(() => saveError(form));
    }
    for (const b of choices) b.onclick = () => {
      const letter = b.dataset.practiceAnswer;
      writeDraft(!multi ? letter : draft.includes(letter) ? draft.replace(letter,'') : draft + letter);
    };
    if (input) { ctx.wireKeys(input, exact); input.addEventListener('input', () => writeDraft(input.value)); }
    clear.onclick = () => {
      if (input) { input.value = ''; input.dispatchEvent(new Event('input')); }
      else writeDraft('');
      (input || choices[0])?.focus({preventScroll:true});
    };
    let busy = false;
    async function finish(outcome, answer) {
      if (busy || !form.isConnected) return;
      busy = true;
      try {
        await A.change(st => A.finishProblem(st, s.id, p, subjectIds(ctx,p), outcome, answer));
        if (form.isConnected) ctx.refresh();
      } catch { saveError(form); }
      finally { busy = false; }
    }
    form.onsubmit = e => {
      e.preventDefault();
      if (!draft.trim()) return;
      if (!grade.answer(set, p.slug, draft, numeric)) {
        status.textContent = exact ? 'Check the answer format before submitting.' : 'Enter an integer from 000 to 999.';
        input?.focus(); return;
      }
      const result = grade.result(set, p.slug);
      if (!['Correct','Incorrect'].includes(result)) { status.textContent = 'This answer could not be graded.'; return; }
      finish(result.toLowerCase(), set.answers[p.slug]);
    };
    form.querySelector('[data-seen]').onclick = () => finish('seen', '');
    form.querySelector('[data-giveup]').onclick = async () => {
      if (await ctx.confirm({title:'Give up on this problem?', text:'This records an incorrect answer and reveals the result.', ok:'Give up'})) finish('incorrect','');
    };
    box.querySelector('h1').focus({preventScroll:true});
  }
  let draw = 0;
  async function render(ctx, playing) {
    const renderId = ++draw, hash = location.hash;
    const current = () => draw === renderId && location.hash === hash;
    ctx.container.innerHTML = '<section class="sh-section"><h1>Arena</h1><p role="status">Loading your progress…</p></section>';
    try {
      const state = await A.read(), history = await ctx.history(state);
      if (!current()) return;
      const stats = A.ratings(state.events);
      if (playing) await play(ctx,state,stats,history);
      else dashboard(ctx,state,stats,history);
      if (current()) ctx.didRender();
    } catch {
      if (!current()) return;
      ctx.container.innerHTML = '<section class="sh-section"><h1>Arena progress is unavailable</h1><p>Check browser storage or restore a progress backup in <a href="#/settings">Settings</a>.</p></section>';
    }
  }
  window.ArenaView = { render };
})();
