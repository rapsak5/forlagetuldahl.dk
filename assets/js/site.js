// Forlaget Uldahl: årstidsvælger og kontaktformular.
// Kontaktformularen sendes med FormSubmit, samme tjeneste som Kaspers andre sider.

(function () {
  const data = window.AARSTIDER;
  const faner = document.querySelectorAll('.fane[data-aarstid]');
  if (!data || !faner.length) return;
  const sol = document.getElementById('sol');
  const timer = document.getElementById('timer');
  const lys = document.getElementById('lys');
  const note = document.getElementById('solnote');
  const dal = document.getElementById('dal');
  const hvor = document.querySelectorAll('[data-t="hvor"]');
  const hvad = document.querySelectorAll('[data-t="hvad"]');
  function vis(id) {
    const d = data[id];
    if (!d) return;
    faner.forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.aarstid === id)));
    sol.style.transform = 'translateY(' + d.solY + 'px)';
    timer.textContent = d.timerTekst;
    lys.style.width = Math.round((d.timer / 24) * 1000) / 10 + '%';
    note.textContent = d.note;
    dal.setAttribute('aria-label', d.navn + '. ' + d.timerTekst);
    d.ting.forEach((t, i) => { hvor[i].textContent = t.hvor; hvad[i].textContent = t.hvad; });
  }
  faner.forEach((f) => f.addEventListener('click', () => vis(f.dataset.aarstid)));
  // Start på den årstid, det er nu.
  const m = new Date().getMonth();
  vis(m <= 1 || m === 11 ? 'vinter' : m <= 4 ? 'forar' : m <= 7 ? 'sommer' : 'efterar');
})();

(function () {
  const form = document.getElementById('kontaktformular');
  if (!form) return;
  // Send besøgeren tilbage til den side, de kom fra, uanset domæne.
  form.elements._next.value = location.origin + location.pathname + '?tak=1#kontakt';
  if (new URLSearchParams(location.search).get('tak') === '1') {
    document.getElementById('kform-tak').hidden = false;
  }
})();
