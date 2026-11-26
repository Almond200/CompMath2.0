// Font-independent UI symbols. Mathematical notation remains text/KaTeX.
(function () {
  const star = 'M12 3.4 14.8 9.1 21.1 10 16.55 14.45 17.62 20.7 12 17.75 6.38 20.7 7.45 14.45 2.9 10 9.2 9.1Z';
  const line = d => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  const icons = {
    menu: '<path d="M5 6h14M5 12h14M5 18h14" fill="none" stroke="currentColor" stroke-width="2.3"/>',
    star: `<path d="${star}" fill="currentColor" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>`,
    'star-outline': `<path d="${star}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,
    close: line('M5 5l14 14M19 5 5 19'),
    plus: line('M5 12h14M12 5v14'),
    minus: line('M5 12h14'),
    diamond: '<path d="m12 3 9 9-9 9-9-9Z" fill="currentColor"/>',
    'arrow-left': line('M21 12H3m6-6-6 6 6 6'),
    'arrow-right': line('M3 12h18m-6-6 6 6-6 6'),
    'arrow-up-right': line('M5 19 19 5M6 5h13v13'),
    'chevron-left': line('m15.5 5-7 7 7 7'),
    'chevron-right': line('m8.5 5 7 7-7 7'),
    'triangle-right': '<path d="m7.5 5 9 7-9 7Z" fill="currentColor"/>',
    'triangle-up': '<path d="m4 19 8-14 8 14Z" fill="currentColor"/>',
    'triangle-down': '<path d="M4 5h16l-8 14Z" fill="currentColor"/>',
    empty: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>' + line('m4 20 16-16'),
    info: '<circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="7" r="1" fill="currentColor"/>' + line('M12 11v7'),
    backspace: line('M9.5 5h12v14h-12l-7-7 7-7Z M12.5 9l6 6m0-6-6 6')
  };
  function svg(name) {
    if (!Object.prototype.hasOwnProperty.call(icons, name)) throw new Error('Unknown UI icon: ' + name);
    return `<svg class="ui-icon ui-icon-${name}" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
  }
  window.AppIcons = { svg };
})();
