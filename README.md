# forlagetuldahl.dk

Hjemmesiden for Forlaget Uldahl. Ren HTML og CSS uden byggetrin. Hostes på GitHub Pages fra `main`.

## Struktur

- `index.html`: dansk forside. `en/index.html`: engelsk forside. Alt indhold ligger på de to sider.
- De gamle adresser (`om-forlaget/`, `kontakt/`, `en/about/` osv.) sender videre til det rigtige sted på forsiden.
- `assets/css/style.css`: animationer, hover og formular. Resten af designet står som inline styles i HTML.
- `assets/js/site.js`: årstidsvælgeren og takkebeskeden efter kontaktformularen.
- Kontaktformularen sendes med FormSubmit til kasper@ai-workshop.dk, ligesom på Kaspers andre sider.
- `assets/images/`: `maerke.png` (logo og favicon), `skilt.jpg` (åbningen), `kasper.jpg`.
- Teksterne til årstiderne står i `window.AARSTIDER` nederst i hver HTML-fil.

## Regler ved ændringer

- Hver ændring skal laves på både dansk og engelsk.
- Forlaget er nyt. Tekster må ikke love mere, end et nyt forlag kan stå inde for.
- Ingen partnernavne, bogomslag eller mockups af titler, før der er en aftale.
- Danske tekster: korte sætninger, almindeligt sprog, ingen hype, ingen tankestreger.
- Farver: navy #1C2330, skov #0D1F16, guld #B08A52 og #C9A86A, papir #F4F0EC. Skrifter: Cormorant Garamond, Lora, Inter.
