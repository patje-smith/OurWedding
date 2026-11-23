const SUPPORTED_LANGUAGES = ['en', 'nl', 'it', 'hu'];
const STORAGE_KEY = 'wedding-language';

export function getStoredLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(stored) ? stored : 'en';
}

export async function setLanguage(language) {
  const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : 'en';

  try {
    const response = await fetch(`locales/${nextLanguage}.json`);
    if (!response.ok) throw new Error(`Could not load ${nextLanguage}.json`);

    const translations = await response.json();
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(STORAGE_KEY, nextLanguage);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[key]) element.textContent = translations[key];
    });

    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === nextLanguage;
      button.classList.toggle('language-switcher__button--active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  } catch (error) {
    console.error(error);
  }
}

export function initializeI18n() {
  const language = getStoredLanguage();
  setLanguage(language);

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
}
