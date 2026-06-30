(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var panelIds = panels.map(function (panel) { return panel.id; });

  function activate(id, shouldFocus) {
    if (panelIds.indexOf(id) === -1) id = 'overview';
    panels.forEach(function (panel) {
      panel.classList.toggle('is-active', panel.id === id);
    });
    links.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-tab') === id);
      if (link.getAttribute('data-tab') === id) link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    if (shouldFocus) {
      var target = document.getElementById(id);
      if (target) target.focus({ preventScroll: true });
    }
  }

  document.addEventListener('click', function (event) {
    var anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    var id = anchor.getAttribute('href').slice(1);
    if (panelIds.indexOf(id) === -1) return;
    event.preventDefault();
    activate(id, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('hashchange', function () {
    activate(location.hash.replace('#', ''), false);
  });

  activate(location.hash.replace('#', '') || 'overview', false);
})();
