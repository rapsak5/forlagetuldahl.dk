// Forlaget Uldahl: menu, header og kontaktformular.
// Kontaktformularen sendes via Web3Forms til kontakt@forlagetuldahl.dk.
// Indsæt adgangsnøglen her. Uden nøgle viser formularen en besked med mailadressen.
const FORM_KEY = '';

const knap = document.querySelector('.menu-knap');
const menu = document.querySelector('.hovedmenu');
if (knap && menu) {
  knap.addEventListener('click', () => {
    const aaben = menu.classList.toggle('aaben');
    knap.setAttribute('aria-expanded', String(aaben));
  });
}
const header = document.querySelector('.site-header');
if (header) {
  const tjek = () => header.classList.toggle('er-scrollet', window.scrollY > 8);
  window.addEventListener('scroll', tjek, { passive: true });
  tjek();
}

const form = document.querySelector('.kontaktform');
if (form) {
  const besked = form.querySelector('.form-besked');
  const sendKnap = form.querySelector('button[type=submit]');
  const t = form.dataset;
  const vis = (tekst) => { besked.textContent = tekst; besked.hidden = false; };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = form.elements;
    if (f.website.value) return; // spamfælde
    const email = f.email.value.trim();
    if (!f.fornavn.value.trim() || !f.besked.value.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      return vis(t.mangler);
    }
    if (!FORM_KEY) return vis(t.fejl);
    sendKnap.disabled = true;
    try {
      const svar = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_KEY,
          from_name: 'forlagetuldahl.dk',
          subject: f.emne.value.trim() || 'Besked fra forlagetuldahl.dk',
          name: (f.fornavn.value.trim() + ' ' + f.efternavn.value.trim()).trim(),
          email,
          message: f.besked.value.trim(),
        }),
      });
      const data = await svar.json();
      if (!data.success) throw new Error(data.message || 'fejl');
      form.reset();
      vis(t.tak);
    } catch (fejl) {
      vis(t.fejl);
    } finally {
      sendKnap.disabled = false;
    }
  });
}
