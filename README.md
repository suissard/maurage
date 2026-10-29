# Alice Maurage — Art-Thérapie Clinique (`maurage.fr`)

Site officiel d'**Alice Maurage**, Art-Thérapeute Clinique certifiée RNCP (Niveau 6), intervenant à domicile et en établissement de santé (EHPAD, résidences autonomie, cliniques, IME) sur **Cap Atlantique** et la **Presqu'île de Guérande** (Guérande, La Baule-Escoublac, Pornichet, Le Pouliguen, Saint-Molf, Saint-Nazaire).

## Architecture du Projet

- [`index.html`](./index.html) : Page d'accueil principale (Approche clinique, public accompagné, médiums, déroulement, témoignages, simulateur tarifaire par commune, FAQ, contact & réservation Cal.com).
- [`la-baule-pornichet.html`](./la-baule-pornichet.html) : Page dédiée à l'accompagnement à domicile sur la baie de La Baule, Pornichet et Le Pouliguen.
- [`ehpad-institutions.html`](./ehpad-institutions.html) : Page B2B dédiée aux EHPAD et structures médico-sociales (objectifs cliniques, témoignage institutionnel, coordination soignante et demande de devis).
- [`js/main.js`](./js/main.js) : Script applicatif factorisé (animations progressives respectant `prefers-reduced-motion`, soulignements organiques SVG, simulateur de frais kilométriques, accordéon FAQ WCAG, modales avec Focus Trap WCAG 2.1 AA, préchargement différé Cal.com et télémétrie PostHog / Web3Forms).
- [`css/input.css`](./css/input.css) & [`tailwind.config.js`](./tailwind.config.js) : Design System Tailwind CSS v3 (typographie fluide `clamp()`, palette `teal` / `warm` / `sage` / `terracotta`).
- [`favicon.svg`](./favicon.svg), [`sitemap.xml`](./sitemap.xml), [`robots.txt`](./robots.txt) : Ressources techniques et SEO.

## Commandes de Développement

```bash
# Compiler et minifier le CSS de production
npm run build:css

# Mode watch pendant le développement
npm run watch:css
```
