// Forlaget Uldahl: årstidsvælger og kontaktformular.
// Kontaktformularen sendes via Web3Forms til kontakt@forlagetuldahl.dk.
// Indsæt adgangsnøglen i FORM_KEY. Uden nøgle åbner formularen besøgerens mailprogram med beskeden udfyldt.
const FORM_KEY = '';

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
  const form = document.querySelector('.kform');
  if (!form) return;
  const status = form.querySelector('.status');
  const knap = form.querySelector('button[type=submit]');
  const t = form.dataset;
  const vis = (tekst) => { status.textContent = tekst; status.hidden = false; };
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = form.elements;
    if (f.website.value) return; // spamfælde
    const email = f.email.value.trim();
    const navn = (f.fornavn.value.trim() + ' ' + f.efternavn.value.trim()).trim();
    const besked = f.besked.value.trim();
    const emne = f.emne.value.trim() || 'Besked fra forlagetuldahl.dk';
    if (!f.fornavn.value.trim() || !besked || !/^\S+@\S+\.\S+$/.test(email)) return vis(t.mangler);
    if (!FORM_KEY) {
      window.location.href = 'mailto:kontakt@forlagetuldahl.dk?subject=' + encodeURIComponent(emne) +
        '&body=' + encodeURIComponent(besked + '\n\n' + navn + '\n' + email);
      return;
    }
    knap.disabled = true;
    try {
      const svar = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: FORM_KEY, from_name: 'forlagetuldahl.dk', subject: emne, name: navn, email, message: besked }),
      });
      const res = await svar.json();
      if (!res.success) throw new Error(res.message || 'fejl');
      form.reset();
      vis(t.tak);
    } catch (fejl) {
      vis(t.fejl);
    } finally {
      knap.disabled = false;
    }
  });
})();
