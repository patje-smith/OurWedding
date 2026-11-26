# Patrik & Francesca — Wedding Website

A static, modular wedding website for GitHub Pages. The default language is English (`en`); Italian and Hungarian are available through the language switcher.

## Structure

```text
index.html          Hero, countdown, Our Story, and the combined travel distance card
program.html        Wedding-day timeline
travel.html         Flights, accommodation, and map link
guests.html         Dietary needs and shared wedding-day photos
css/variables.css   Design tokens: colors, fonts, radius, shadows
css/main.css        Responsive BEM styles and layout
js/app.js           Mobile menu, active navigation, and module startup
js/journey.js       CSV-driven combined travel distance card
js/i18n.js          JSON loading and localStorage language persistence
js/countdown.js     March 5, 2027 countdown for the home page
locales/*.json      English, Italian, and Hungarian translations
images/icons.svg    Shared SVG symbols used by the schedule
```

The home page travel distance card reads the CSV travel log in the repository root. It locates the table header by its column names, so summary rows above the table are ignored.

## Design tokens

Defined in `css/variables.css`:

- Sand: `--color-sand-50` `#fdfbf7`, `--color-sand-100` `#f7f3eb`, `--color-sand-200` `#efe6d5`, `--color-sand-300` `#e3d2b4`, `--color-sand-400` `#d5b98f`, `--color-sand-500` `#c59d68`
- Olive: `--color-olive-600` `#606c38`, `--color-olive-800` `#283618`
- Terracotta: `--color-terracotta-500` `#bc6c25`, `--color-terracotta-600` `#a3571a`
- Gold: `--color-gold-400` `#d4af37`, `--color-gold-500` `#aa7c11`
- Fonts: `--font-serif` (Cormorant Garamond), `--font-sans` (Montserrat)
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-xl`

## BEM Convention

Use block, element, and modifier names:

- Block: `.story`
- Element: `.story__title`
- Modifier: `.button--dark`, `.nav__link--active`

Keep layout rules in `css/main.css` and reusable design values in `css/variables.css`.

## GitHub Pages

Push the repository to GitHub, open **Settings → Pages**, and publish the repository's default branch. No build step or package installation is required.

ES modules require a web server. GitHub Pages provides this automatically. For local preview, run `python -m http.server 8000` and visit `http://localhost:8000`.

## Adding or Changing Content

1. Update the semantic HTML in the appropriate page.
2. Add any translatable text with `data-i18n="unique.key"`.
3. Add the same key to all three JSON files in `locales/`.
4. Add visual styles using BEM names in `css/main.css`.
5. Place colors and fonts in `css/variables.css` when reused.
6. Load page-specific behavior in `js/app.js` or a dedicated module; do not add it inline.
7. Keep schedule icon definitions in `images/icons.svg` and reference them with SVG `<use>` elements.

## Instructions for Future AI Sessions

- Keep this site static and build-tool-free; use semantic HTML and ES modules.
- Keep English as the fallback and default language, with Italian and Hungarian translations.
- Keep shared navigation and footer markup consistent on every page.
- Add each translation key to every file in `locales/` and keep language switchers in sync.
- Use BEM class names, preserve the Puglia visual style and existing external assets, and keep navigation links pointed to the `.html` pages.
