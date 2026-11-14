# forlagetuldahl.dk

Hjemmesiden for Forlaget Uldahl. Ren HTML og CSS uden byggetrin. Hostes på GitHub Pages fra `main`.

## Struktur

- Danske sider i roden: `index.html`, `om-forlaget/`, `udgivelser/`, `for-forfattere/`, `kontakt/`
- Engelske sider under `en/`: `en/`, `en/about/`, `en/books/`, `en/for-authors/`, `en/contact/`
- `assets/css/style.css`: hele designet. Farver og skrifter står som variabler øverst.
- `assets/js/site.js`: mobilmenu og kontaktformular. Formularens nøgle står i `FORM_KEY`.
- `assets/images/`: `maerke-guld.png` (header og favicon), `logo.png` (footer), `mockup-skilt.png` (banner), `kasper.jpg`

## Regler ved ændringer

- Header, menu og footer står i hver HTML-fil. En ændring dér skal laves i alle sider.
- Hver side findes på dansk og engelsk. Ret altid begge.
- Links er relative (`../`), så siden også virker på en github.io-adresse.
- Forlaget er nyt. Tekster må ikke love mere, end et nyt forlag kan stå inde for.
- Ingen partnernavne, bogomslag eller mockups af titler, før der er en aftale.
- Danske tekster: korte sætninger, ingen hype, ingen tankestreger.
- Designet er godkendt. Hold dig til variablerne i `style.css`.
