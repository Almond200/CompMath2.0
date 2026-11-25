// Run against a served checkout: CHROME=/path/to/chrome COMPMATH_URL=http://localhost:8765 node tools/check-accessibility.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const artifactDir = process.env.UI_ARTIFACT_DIR;
if (artifactDir) fs.mkdirSync(artifactDir, { recursive:true });
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const base = (process.env.COMPMATH_URL || 'http://localhost:8765').replace(/\/$/, '');
const luminance = rgb => rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => v / 255)
  .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
  .reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);

(async () => {
  const browser = await chromium.launch({ ...(process.env.CHROME ? { executablePath:process.env.CHROME } : {}), args:['--no-sandbox'] });
  let scenarios = 0;
  for (const theme of ['light', 'dark']) for (const width of [1280, 375]) {
    const context = await browser.newContext({ viewport:{ width, height:950 }, hasTouch:width === 375, isMobile:width === 375 });
    await context.addInitScript(t => {
      localStorage.setItem('theme', t);
      localStorage.setItem('mq-recent', JSON.stringify(['l:S5.1','b:amc-geometry','l:S6.1','l:S4.1','l:S4.5','l:R5.4',
        'p:2025-amc-8-2','p:2020-amc-8-22','p:2025-amc-10a-12','p:2019-hmmt-february-geometry-10','p:2019-hmmt-february-geometry-9','p:2005-aime-ii-2']));
      if (!localStorage.getItem('mq-lists')) localStorage.setItem('mq-lists', JSON.stringify({ items:[
        { id:'starred', builtin:true, name:'Starred', ids:[] },
        { id:'a11y-check', name:'Accessibility check', ids:['permutations-combinations','casework-method','recursive-counting'], customSections:[
          { title:'First', ids:['permutations-combinations','casework-method'] }, { title:'Second', ids:['recursive-counting'] }
        ] }
      ] }));
    }, theme);
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.setDefaultTimeout(15000);
    async function navigate(hash, selector) {
      await page.evaluate(h => { location.hash = h; }, hash);
      await page.waitForURL(url => url.hash === hash);
      await page.locator(selector).first().waitFor({ state:'attached' });
    }
    async function radio(group, key, value) {
      await group.locator('[tabindex="0"]').focus();
      await group.locator('[tabindex="0"]').press(key);
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-checked') === 'true');
      if (value) assert.equal(await group.locator('[aria-checked="true"]').innerText(), value);
      assert.equal(await group.locator('[tabindex="0"]').count(), 1);
      assert.equal(await group.locator('[tabindex="0"]').getAttribute('aria-checked'), 'true');
    }
    async function searchBorder(input) {
      await input.focus();
      await page.waitForTimeout(180); // The normal border-color transition lasts 150ms.
      assert.ok(await input.evaluate(el => {
        const probe=document.createElement('span'); probe.style.color='var(--accent)'; document.body.append(probe);
        const accent=getComputedStyle(probe).color; probe.remove();
        const style=getComputedStyle(el);
        return style.outlineStyle==='none' && style.borderColor===accent && style.boxShadow==='none';
      }), 'search uses one visible focus border without a second ring');
    }
    await page.goto(base + '/#/practice');
    await page.locator('#pr-mock').waitFor();
    assert.equal(await page.locator('#search-input').getAttribute('aria-label'), 'Search the reference');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true);
    if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `skip-${theme}-${width}.png`) });
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'content');
    assert.equal(new URL(page.url()).hash, '#/practice');
    await searchBorder(page.locator('#topic-name'));
    await searchBorder(page.locator('#mock-paper-name'));
    const colors = await page.evaluate(() => {
      const result = {};
      for (const name of ['--text-faint', '--bg', '--bg-panel', '--bg-card', '--bg-card-hover']) {
        const span = document.createElement('span'); span.style.color = 'var(' + name + ')'; document.body.append(span);
        result[name] = getComputedStyle(span).color; span.remove();
      }
      return result;
    });
    for (const [name, color] of Object.entries(colors)) if (name !== '--text-faint') assert.ok(contrast(colors['--text-faint'], color) >= 4.5, name);
    assert.equal(await page.getByRole('heading',{name:'Open a random problem'}).count(),0);
    await radio(page.locator('[aria-label="Mock type"]'), 'ArrowRight', 'Generate a mock');
    await radio(page.locator('[aria-label="Mock contest"]'), 'ArrowDown', 'AMC 10');
    scenarios++;

    // Answer choices use the same keyboard rules, retain saved answers, and become read-only on review.
    const setId = await page.evaluate(() => {
      const s = window.PracticeSessions.create('Keyboard check', 'Any', ['2018-amc-10a-1']);
      window.PracticeSessions.save(localStorage, s); location.hash = '#/practice/set/' + s.id; return s.id;
    });
    await page.locator('[data-practice-answer="A"]').waitFor();
    const answer = page.locator('[role="radiogroup"][aria-label="Your answer"]');
    await radio(answer, 'ArrowRight', 'B'); await radio(answer, 'Home', 'A'); await radio(answer, 'End', 'E');
    await page.locator('#finish-practice').click(); await page.locator('[data-result-index="0"]').click();
    const locked = page.locator('[role="radiogroup"][aria-label="Submitted answer"]');
    assert.equal(await locked.locator('[tabindex="0"]').count(), 0);
    assert.equal(await locked.locator('[aria-checked="true"]').innerText(), 'E');
    assert.ok((await page.title()).startsWith('Review'));
    assert.equal(await page.evaluate(id => JSON.parse(localStorage.getItem('mq-practice-sets')).find(s => s.id === id).answers['2018-amc-10a-1'], setId), 'E');
    scenarios++;

    await navigate('#/settings', '.settings-head');
    assert.match(await page.title(), /^Settings — /);
    assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H1');
    await searchBorder(page.locator('.settings-head input[type="search"]'));
    await radio(page.locator('[role="radiogroup"][aria-label="Theme"]'), 'ArrowRight');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-set')), 'theme');
    await page.locator('[data-set="tools"][data-val="on"]').click();
    await navigate('#/f/pythagorean-theorem', '.page-tools');
    assert.match(await page.title(), /^Pythagorean Theorem — /);
    for (const name of ['Text size', 'Theme']) {
      const group = page.locator('.page-tools [role="radiogroup"][aria-label="' + name + '"]');
      await radio(group, 'ArrowRight');
    }
    assert.equal(await page.locator('[role="radiogroup"]:not([aria-label]):not([aria-labelledby])').count(), 0);
    await page.locator('#search-input').focus(); await page.keyboard.press('Tab'); await page.locator('#search-input').focus();
    await searchBorder(page.locator('#search-input'));
    await page.locator('#search-input').fill('power');
    await page.waitForFunction(() => document.title.startsWith('Search: power'));
    assert.equal(await page.evaluate(() => document.activeElement.id), 'search-input');
    await page.locator('#search-input').fill('');
    await page.waitForFunction(() => document.title.startsWith('Pythagorean Theorem'));
    scenarios++;
    await page.locator('#adv-btn').click();
    assert.equal(await page.evaluate(() => document.activeElement.matches('.adv-tagmodal .modal-head h3')), true);
    assert.equal(await page.locator('#adv-tag-search').evaluate(el => el===document.activeElement), false);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.matches('.adv-tagmodal .modal-close')), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'adv-tag-search');
    await searchBorder(page.locator('#adv-tag-search'));
    if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `tag-search-${theme}-${width}.png`) });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.adv-tagmodal').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'adv-btn');
    await page.keyboard.press('/');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'search-input');
    await searchBorder(page.locator('#search-input'));
    scenarios++;

    await navigate('#/formulas/geometry', '.nav-section.open');
    assert.equal(await page.locator('#formula-nav a:not([href])').count(), 0);
    assert.equal(await page.locator('#sidebar').evaluate(el => el.inert), width === 375);
    if (width === 375) {
      await page.locator('#nav-toggle').click();
      assert.equal(await page.locator('#nav-toggle').getAttribute('aria-expanded'), 'true');
      assert.ok(await page.evaluate(() => document.activeElement.closest('#sidebar') !== null));
    }
    const inertStates = await page.locator('#formula-nav .nav-section').evaluateAll(es => es.map(el => el.querySelector('.nav-subs').inert === !el.classList.contains('open')));
    assert.ok(inertStates.every(Boolean));
    const subjectNav = page.locator('#formula-nav .nav-group:not([hidden]) .nav-section.open');
    const topics = subjectNav.locator('.nav-sub-link:not([aria-disabled="true"])');
    const link = topics.first();
    const target = await link.getAttribute('href');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(350); // Let the expanding sidebar settle before checking clipping.
    for (const control of [subjectNav.locator('.nav-section-btn').first(), link, topics.last()]) {
      await control.focus();
      assert.ok(await control.evaluate(el => {
        const r=el.getBoundingClientRect(), s=getComputedStyle(el);
        if(s.outlineStyle!=='solid' || s.outlineOffset!=='-3px')return false;
        for(let a=el.parentElement;a && a!==document.body;a=a.parentElement){
          const q=a.getBoundingClientRect(), c=getComputedStyle(a);
          if(c.overflowX!=='visible' && (r.left<q.left-1 || r.right>q.right+1))return false;
          if(c.overflowY!=='visible' && (r.top<q.top-1 || r.bottom>q.bottom+1))return false;
        }
        return true;
      }), 'sidebar subject and first/last topic rings remain inside every clipping boundary');
      if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `sidebar-${control===link?'topic':'edge'}-${theme}-${width}.png`) });
    }
    if (width === 1280) {
      const opened = context.waitForEvent('page'); await link.click({ modifiers:['Control'] });
      const popup = await opened; await popup.waitForLoadState(); assert.equal(new URL(popup.url()).hash, target); await popup.close();
      assert.equal(new URL(page.url()).hash, '#/formulas/geometry');
    }
    await link.focus(); await link.press('Enter'); await page.waitForURL(url => url.hash === target);
    // Focus moves to the page once it has rendered; wait for that, not for the address alone.
    await page.waitForFunction(() => document.activeElement.closest('#content') !== null);
    if (width === 375) {
      assert.equal(await page.locator('#sidebar').evaluate(el => el.inert), true);
      await page.locator('#nav-toggle').click(); await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'nav-toggle');
    }
    scenarios++;

    await navigate('#/problems/amc-10/2018', '.ct-yearbar');
    {
      // The paper toggle is on every width (2026-11-11): one paper shows at a time.
      const tabs = page.locator('[role="tablist"][aria-label="Contest papers"]');
      await tabs.locator('[tabindex="0"]').focus(); await tabs.locator('[tabindex="0"]').press('ArrowRight');
      assert.equal(await tabs.locator('[aria-selected="true"]').innerText(), 'AMC 10B');
      assert.match(await page.title(), /2018 AMC 10B/);
      assert.equal(await page.locator('#ct-paper-panel-1').isVisible(), true); assert.equal(await page.locator('#ct-paper-panel-0').isVisible(), false);
      await tabs.locator('[tabindex="0"]').press('Home'); assert.equal(await tabs.locator('[aria-selected="true"]').innerText(), 'AMC 10A');
      await tabs.locator('[tabindex="0"]').press('End'); assert.equal(await tabs.locator('[aria-selected="true"]').innerText(), 'AMC 10B');
      assert.equal(await page.locator('.db-group:visible').count(), 1);
    }
    scenarios++;

    await navigate('#/settings', '.settings-head'); await page.locator('[data-set="scroll"][data-val="fast"]').click();
    await navigate('#/f/pythagorean-theorem', '.detail'); await page.emulateMedia({ reducedMotion:'reduce' });
    assert.equal(await page.evaluate(() => window.AppAccessibility.scrollBehavior()), 'instant');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.ok(await page.locator('.nav-subs').first().evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .001));
    const immediate = await page.evaluate(() => { window.scrollTo({ top:0, behavior:'instant' }); document.body.dispatchEvent(new WheelEvent('wheel', { deltaY:120, bubbles:true, cancelable:true })); return window.scrollY; });
    assert.ok(immediate > 0, 'reduced-motion wheel scrolling is immediate');
    await page.emulateMedia({ reducedMotion:'no-preference' });
    assert.equal(await page.evaluate(() => window.AppAccessibility.scrollBehavior()), 'smooth');
    await navigate('#/formulas/geometry', '.card');
    // A touch target is at least 40px, but the drawn button keeps its 24px: the extra is an
    // invisible margin, so a finger 17px off the centre still lands on the button.
    const hitArea = el => { const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const hits = (dx, dy) => { const t = document.elementFromPoint(cx + dx, cy + dy); return !!t && (t === el || el.contains(t)); };
      return { w:r.width, h:r.height, reach:[[-17,0],[17,0],[0,-17],[0,17]].filter(([dx,dy]) => hits(dx, dy)).length }; };
    const targets = await page.locator('.card-actions button').first().evaluate(hitArea);
    assert.ok(targets.w >= 24 && targets.h >= 24 && targets.w <= 32 && targets.h <= 32, 'the drawn button stays small');
    if (width === 375) assert.ok(targets.reach >= 3, 'the touch area reaches about 40px: ' + JSON.stringify(targets));
    assert.equal(await page.locator('.star-btn').first().getAttribute('aria-label'), 'Star for later');
    assert.ok((await page.locator('.card-name > a').first().getAttribute('href')).startsWith('#/f/'));
    const cardLink = page.locator('.card-name > a').first();
    const cardHash = await cardLink.getAttribute('href');
    await cardLink.focus(); await cardLink.press('Enter'); await page.waitForURL(url => url.hash === cardHash);
    await page.goBack(); await page.waitForURL(url => url.hash.startsWith('#/formulas/geometry'));
    assert.ok(await page.evaluate(() => document.activeElement.closest('#content') !== null));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    assert.equal(await page.locator('.katex-error').count(), 0);
    if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `cards-${theme}-${width}.png`) });
    scenarios++;
    // Recent rows stay one line without hiding keyboard stops; clipped tiles keep an inward ring.
    for (const hash of ['#/learn', '#/practice']) {
      await navigate(hash, '.rc-chips');
      const last = page.locator('.rc-chips .rc-row').last();
      await last.focus(); await last.press('Tab'); await page.keyboard.press('Shift+Tab');
      assert.ok(await last.evaluate(el => {
        const box=el.getBoundingClientRect(), parent=el.parentElement.getBoundingClientRect(), style=getComputedStyle(el);
        return el===document.activeElement && style.outlineStyle==='solid' && style.outlineOffset==='-3px'
          && box.top>=parent.top-1 && box.bottom<=parent.bottom+1 && box.left>=parent.left-1 && box.right<=parent.right+1;
      }), hash + ': last recent link is fully visible with an unclipped ring');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `recent-${hash.slice(2)}-${theme}-${width}.png`) });
      const space = hash.slice(2);
      const label = space === 'learn' ? 'Learn' : 'Practice';
      if (width === 375) await page.locator('#nav-toggle').click();
      const side = page.locator(`#sidebar .nav-group[data-group="${space}"]`);
      const toggle = side.getByRole('button', { name: label, exact: true });
      const links = side.locator('.nav-space-link');
      assert.deepEqual(await links.allInnerTexts(), space === 'learn' ? ['Textbooks','Lists'] :
        ['Practice a concept','Mock a contest','Contests','Resume a set','Completed sets']);
      await toggle.press('Enter');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.ok(await links.first().evaluate(el => !!el.closest('[inert]')));
      await toggle.press('Space');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      const info = side.getByRole('button', { name: `About ${label}` });
      await info.click();
      const about = page.getByRole('dialog', { name: `About ${label}` });
      assert.doesNotMatch(await about.innerText(), /Recently opened/);
      await page.keyboard.press('Escape');
      assert.ok(await info.evaluate(el => el === document.activeElement));
      const link = links.last(), target = await link.getAttribute('data-goto');
      await link.press('Enter');
      await page.waitForFunction(id => document.activeElement === document.querySelector(`#${id} h3`), target);
      assert.equal(await page.locator('body.nav-open').count(), 0);
      assert.equal(new URL(page.url()).hash, hash);
      const current = side.locator('.nav-space-link.active[aria-current="location"]');
      assert.equal(await current.getAttribute('data-goto'), target);
      assert.ok(await current.evaluate(el => {
        const style = getComputedStyle(el);
        return style.color === style.borderLeftColor;
      }), 'the selected section uses its space color for text and the sidebar line');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      const first = await links.first().getAttribute('data-goto');
      await current.and(side.locator(`[data-goto="${first}"]`)).waitFor({ state: 'attached' });
      if (space === 'practice') {
        await page.evaluate(() => window.scrollTo({
          top: window.scrollY + document.getElementById('pr-contests').getBoundingClientRect().top - document.querySelector('.topbar').offsetHeight - 12,
          behavior: 'instant'
        }));
        await current.and(side.locator('[data-goto="pr-contests"]')).waitFor({ state: 'attached' });
      }
    }
    if (width === 1280) {
      await navigate('#/', '.hm-space');
      // Reference groups its three spaces as links; Learn, Practice and Arena are whole-tile links.
      assert.deepEqual(await page.locator('.hm-refcell .hm-ref-link b').allInnerTexts(), ['Formulas', 'Methods', 'Patterns']);
      assert.deepEqual(await page.locator('.hm-space-name').allTextContents(), ['Learn', 'Practice', 'Arena']);
      for (const tile of await page.locator('.hm-space').all()) {
        await tile.focus();
        assert.equal(await tile.evaluate(el => getComputedStyle(el).outlineOffset), '-3px');
      }
      if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `home-focus-${theme}.png`) });
    }
    // The main region and the page heading take script focus without drawing a ring, even once a
    // key has been pressed; Tab then moves on to a real control, which does show one.
    await navigate('#/f/pythagorean-theorem', '.contest-profile');
    await page.evaluate(() => document.getElementById('content').focus()); await page.keyboard.press('Shift');
    assert.equal(await page.evaluate(() => document.activeElement.id + ':' + getComputedStyle(document.activeElement).outlineStyle), 'content:none');
    await page.evaluate(() => window.AppAccessibility.focusMain()); await page.keyboard.press('Shift');
    assert.equal(await page.evaluate(() => document.activeElement.tagName + ':' + getComputedStyle(document.activeElement).outlineStyle), 'H1:none');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.matches('button, a') && getComputedStyle(document.activeElement).outlineStyle), 'solid');
    await navigate('#/', '.hm-book');
    await page.keyboard.press('Tab');
    const books=page.locator('.hm-book');
    for(const row of await books.all()) {
      await row.focus();
      assert.ok(await row.evaluate(el=>{
        const r=el.getBoundingClientRect(),s=getComputedStyle(el),cover=el.querySelector('.bk-cover').getBoundingClientRect();
        const title=el.querySelector('.hm-book-t').getBoundingClientRect(),count=el.querySelector('.hm-book-n').getBoundingClientRect();
        return s.outlineOffset==='-3px' && Math.abs((cover.top+cover.height/2)-(title.top+title.height/2))<1
          && Math.abs((cover.top+cover.height/2)-(count.top+count.height/2))<1 && r.height<=51;
      }), 'home textbook rows stay compact and vertically centered with contained focus');
    }
    scenarios++;
    await navigate('#/list/a11y-check', '[data-group-edit]');
    await page.locator('[data-group-edit]').first().click(); await page.locator('.ge').waitFor();
    await searchBorder(page.locator('.ge-find-input'));
    if (width === 375) assert.equal(await page.locator('.ge-ico').first().evaluate(el => { const a = getComputedStyle(el, '::after'); return parseFloat(a.width) >= 40 && parseFloat(a.height) >= 40 && el.getBoundingClientRect().width < 40; }), true, 'editor icons: small drawn size, 40px touch area');
    await page.locator('[data-ge-chip="casework-method"]').click();
    await page.locator('[data-ge-act="moveto"][data-i="1"]').click();
    assert.equal(await page.locator('[data-ge-zone="1"] [data-ge-chip="casework-method"]').count(), 1);
    await page.locator('[data-ge-act="undo"]').click();
    assert.equal(await page.locator('[data-ge-zone="0"] [data-ge-chip="casework-method"]').count(), 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `editor-${theme}-${width}.png`) });
    if (width === 375) {
      async function activateExpandedCorner(button, width, height) {
        await button.scrollIntoViewIfNeeded();
        const box = await button.boundingBox();
        assert.deepEqual([box.width, box.height], [width, height]);
        const x = box.x + width / 2 + 19, y = box.y + height / 2 + 19;
        assert.ok(await button.evaluate((el, point) => {
          const hit = document.elementFromPoint(point.x, point.y);
          if (!el.contains(hit)) return false;
          hit.click();
          return true;
        }, { x, y }));
      }
      await navigate('#/settings', '.settings-head');
      await page.getByRole('radio', { name: 'Opens in the lesson', exact: true }).click();
      await navigate('#/learn/amc-geometry/s5/6', '.lp-body');
      await page.locator('.lp-body a[data-card="circle-in-angle"]').first().click();
      const drawer = page.locator('.lp-drawer');
      await activateExpandedCorner(drawer.getByRole('button', { name: 'Close the card' }), 24, 22);
      await drawer.waitFor({ state: 'hidden' });

      await navigate('#/browse/topics', '.tt-list');
      await page.waitForFunction(() => document.activeElement.matches('#content h1'));
      const toggle = page.locator('button[data-tt="geo"]');
      const expanded = await toggle.getAttribute('aria-expanded');
      await activateExpandedCorner(toggle, 22, 22);
      await page.waitForFunction(value => document.querySelector('button[data-tt="geo"]')?.getAttribute('aria-expanded') !== value, expanded);
      const topic = page.locator('.tt-row').filter({ has: toggle }).locator('.tt-name');
      await topic.tap({ position: { x: 2, y: 12 } });
      await page.waitForURL(url => url.hash === '#/browse/topics/geo');
      scenarios++;
    }
    assert.deepEqual(errors, []); scenarios++; await context.close();
  }
  await browser.close(); console.log(`${scenarios} accessibility scenarios passed across light/dark and desktop/touch: contrast, skip link, named search/groups, radio keys/focus restoration, real sidebar URLs/modifier clicks, hidden-navigation focus, contest tabs, route titles/focus, reduced motion and target sizes.`);
})().catch(error => { console.error(error); process.exit(1); });
