// Shared keyboard behavior for the app's button-based radio groups and contest tabs.
(function (root) {
  'use strict';
  const groupSelector = '[role="radiogroup"], [role="tablist"]';
  const choices = group => [...group.querySelectorAll('[role="radio"], [role="tab"]')]
    .filter(el => el.closest(groupSelector) === group);
  const enabled = el => !el.disabled && el.getAttribute('aria-disabled') !== 'true';
  const selected = el => el.getAttribute(el.getAttribute('role') === 'tab' ? 'aria-selected' : 'aria-checked') === 'true';
  function syncChoices() {
    document.querySelectorAll(groupSelector).forEach(group => {
      const items = choices(group), active = items.find(el => enabled(el) && selected(el)) || items.find(enabled);
      items.forEach(el => { el.tabIndex = el === active ? 0 : -1; });
    });
  }
  function choiceKeydown(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const button = event.target.closest?.('[role="radio"], [role="tab"]');
    const group = button?.closest(groupSelector);
    if (!group || !enabled(button)) return;
    const keys = group.getAttribute('role') === 'tablist' && group.getAttribute('aria-orientation') !== 'vertical'
      ? ['ArrowLeft', 'ArrowRight', 'Home', 'End']
      : ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    const items = choices(group).filter(enabled), at = items.indexOf(button);
    if (at < 0 || !items.length) return;
    event.preventDefault();
    const step = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const next = items[event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (at + step + items.length) % items.length];
    const groups = [...document.querySelectorAll(groupSelector)], index = groups.indexOf(group);
    const name = group.getAttribute('aria-label') || group.getAttribute('aria-labelledby');
    next.click();
    syncChoices();
    // Settings may redraw the controls. Restore focus to the same selected group after its action.
    const currentGroups = [...document.querySelectorAll(groupSelector)];
    const replacement = currentGroups[index];
    const current = group.isConnected ? group : replacement &&
      (replacement.getAttribute('aria-label') || replacement.getAttribute('aria-labelledby')) === name ? replacement : null;
    const target = next.isConnected ? next : current && choices(current).find(el => enabled(el) && selected(el));
    target?.focus({ preventScroll:true });
  }
  function focusMain() {
    const main = document.getElementById('content');
    if (!main) return;
    const heading = [...main.querySelectorAll('h1, h2')].find(el => el.getClientRects().length);
    const target = heading || main;
    target.tabIndex = -1;
    target.focus({ preventScroll:true });
  }
  function init() {
    syncChoices();
    document.addEventListener('keydown', choiceKeydown);
    document.querySelector('.skip-link')?.addEventListener('click', event => {
      event.preventDefault();
      const main = document.getElementById('content');
      main.focus({ preventScroll:true });
      main.scrollIntoView({ block:'start', behavior:'instant' });
    });
    new MutationObserver(syncChoices).observe(document.body, {
      childList:true, subtree:true, attributes:true, attributeFilter:['aria-checked', 'aria-selected', 'aria-disabled', 'disabled']
    });
  }
  root.AppAccessibility = {
    init, focusMain,
    reducedMotion: () => root.matchMedia('(prefers-reduced-motion: reduce)').matches,
    scrollBehavior: () => root.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  };
})(window);
