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
    await page.goto(base + '/#/practice');
    await page.locator('#pr-mock').waitFor();
    assert.equal(await page.locator('#search-input').getAttribute('aria-label'), 'Search the reference');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true);
    if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `skip-${theme}-${width}.png`) });
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'content');
    assert.equal(new URL(page.url()).hash, '#/practice');
    const colors = await page.evaluate(() => {
      const result = {};
      for (const name of ['--text-faint', '--bg', '--bg-panel', '--bg-card', '--bg-card-hover']) {
        const span = document.createElement('span'); span.style.color = 'var(' + name + ')'; document.body.append(span);
        result[name] = getComputedStyle(span).color; span.remove();
      }
      return result;
    });
    for (const [name, color] of Object.entries(colors)) if (name !== '--text-faint') assert.ok(contrast(colors['--text-faint'], color) >= 4.5, name);
    const contest = page.locator('[role="radiogroup"][aria-label="Contest"]');
    await radio(contest, 'ArrowRight', 'AMC 8'); await radio(contest, 'End', 'HMMT February');
    await radio(contest, 'ArrowRight', 'Any contest'); await radio(contest, 'Home', 'Any contest');
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

    await navigate('#/settings', '.settings-page');
    assert.match(await page.title(), /^Settings — /);
    assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H2');
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
    const focus = await page.locator('#search-input').evaluate(el => ({ visible:el.matches(':focus-visible'), width:getComputedStyle(el).outlineWidth, style:getComputedStyle(el).outlineStyle }));
    assert.ok(focus.visible && focus.width === '2px' && focus.style === 'solid');
    await page.locator('#search-input').fill('power');
    await page.waitForFunction(() => document.title.startsWith('Search: power'));
    assert.equal(await page.evaluate(() => document.activeElement.id), 'search-input');
    await page.locator('#search-input').fill('');
    await page.waitForFunction(() => document.title.startsWith('Pythagorean Theorem'));
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
    const link = page.locator('#formula-nav .nav-section.open .nav-sub-link:not([aria-disabled="true"])').first();
    const target = await link.getAttribute('href');
    if (width === 1280) {
      const opened = context.waitForEvent('page'); await link.click({ modifiers:['Control'] });
      const popup = await opened; await popup.waitForLoadState(); assert.equal(new URL(popup.url()).hash, target); await popup.close();
      assert.equal(new URL(page.url()).hash, '#/formulas/geometry');
    }
    await link.focus(); await link.press('Enter'); await page.waitForURL(url => url.hash === target);
    assert.ok(await page.evaluate(() => document.activeElement.closest('#content') !== null));
    if (width === 375) {
      assert.equal(await page.locator('#sidebar').evaluate(el => el.inert), true);
      await page.locator('#nav-toggle').click(); await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'nav-toggle');
    }
    scenarios++;

    await navigate('#/problems/amc-10/2018', '.ct-yearbar');
    if (width === 375) {
      const tabs = page.locator('[role="tablist"][aria-label="Contest papers"]');
      await tabs.locator('[tabindex="0"]').focus(); await tabs.locator('[tabindex="0"]').press('ArrowRight');
      assert.equal(await tabs.locator('[aria-selected="true"]').innerText(), 'AMC 10B');
      assert.match(await page.title(), /2018 AMC 10B/);
      assert.equal(await page.locator('#ct-paper-panel-1').isVisible(), true); assert.equal(await page.locator('#ct-paper-panel-0').isVisible(), false);
      await tabs.locator('[tabindex="0"]').press('Home'); assert.equal(await tabs.locator('[aria-selected="true"]').innerText(), 'AMC 10A');
      await tabs.locator('[tabindex="0"]').press('End'); assert.equal(await tabs.locator('[aria-selected="true"]').innerText(), 'AMC 10B');
    } else assert.equal(await page.locator('.db-group:visible').count(), 2);
    scenarios++;

    await navigate('#/settings', '.settings-page'); await page.locator('[data-set="scroll"][data-val="fast"]').click();
    await navigate('#/f/pythagorean-theorem', '.detail'); await page.emulateMedia({ reducedMotion:'reduce' });
    assert.equal(await page.evaluate(() => window.AppAccessibility.scrollBehavior()), 'instant');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.ok(await page.locator('.nav-subs').first().evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .001));
    const immediate = await page.evaluate(() => { window.scrollTo({ top:0, behavior:'instant' }); document.body.dispatchEvent(new WheelEvent('wheel', { deltaY:120, bubbles:true, cancelable:true })); return window.scrollY; });
    assert.ok(immediate > 0, 'reduced-motion wheel scrolling is immediate');
    await page.emulateMedia({ reducedMotion:'no-preference' });
    assert.equal(await page.evaluate(() => window.AppAccessibility.scrollBehavior()), 'smooth');
    await navigate('#/formulas/geometry', '.card');
    const targets = await page.locator('.card-actions button').first().evaluate(el => ({ w:el.getBoundingClientRect().width, h:el.getBoundingClientRect().height }));
    assert.ok(targets.w >= (width === 375 ? 40 : 24) && targets.h >= (width === 375 ? 40 : 24));
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
    await navigate('#/list/a11y-check', '[data-group-edit]');
    await page.locator('[data-group-edit]').first().click(); await page.locator('.ge').waitFor();
    if (width === 375) assert.ok(await page.locator('.ge-ico').first().evaluate(el => el.getBoundingClientRect().width >= 40 && el.getBoundingClientRect().height >= 40));
    await page.locator('[data-ge-chip="casework-method"]').click();
    await page.locator('[data-ge-act="moveto"][data-i="1"]').click();
    assert.equal(await page.locator('[data-ge-zone="1"] [data-ge-chip="casework-method"]').count(), 1);
    await page.locator('[data-ge-act="undo"]').click();
    assert.equal(await page.locator('[data-ge-zone="0"] [data-ge-chip="casework-method"]').count(), 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    if (artifactDir) await page.screenshot({ path:path.join(artifactDir, `editor-${theme}-${width}.png`) });
    assert.deepEqual(errors, []); scenarios++; await context.close();
  }
  await browser.close(); console.log(`${scenarios} accessibility scenarios passed across light/dark and desktop/touch: contrast, skip link, named search/groups, radio keys/focus restoration, real sidebar URLs/modifier clicks, hidden-navigation focus, contest tabs, route titles/focus, reduced motion and target sizes.`);
})().catch(error => { console.error(error); process.exit(1); });
