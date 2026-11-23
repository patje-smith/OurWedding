# Patrik & Francesca — Wedding Website

A static, modular wedding website for GitHub Pages. The default language is English (`en`); Italian and Hungarian are available through the language switcher.

## Structure

```text
index.html          Hero, countdown, and Our Story
program.html        Wedding-day timeline
travel.html         Flights, accommodation, and map link
gallery.html        Photo gallery
css/variables.css   Design tokens: colors, fonts, radius, shadows
css/main.css        Responsive BEM styles and layout
js/app.js           Mobile menu, active navigation, and module startup
js/i18n.js          JSON loading and localStorage language persistence
js/countdown.js     March 5, 2027 countdown for the home page
locales/*.json      English, Italian, and Hungarian translations
```

## Colors

- Sand 50: `#fdfbf7`
- Sand 100: `#f7f3eb`
- Sand 200: `#efe6d5`
- Sand 300: `#e3d2b4`
- Sand 400: `#d5b98f`
- Terracotta: `#bc6c25`
- Stone 800: `#292524`
- Stone 900: `#1c1917`

## Typography

- Serif: Cormorant Garamond
- Sans serif: Montserrat

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

## Instructions for Future AI Sessions

- Preserve the existing Puglia-inspired sand, terracotta, stone, and olive visual tone.
- Keep all pages static and build-tool-free.
- Maintain English as the fallback and default language.
- Keep navigation and footer markup consistent across all four pages.
- Update every translation file together; never leave a key missing.
- Use semantic HTML5 and ES6+ JavaScript.
- Preserve Google Fonts, FontAwesome, Unsplash image URLs, and working cross-page links.
