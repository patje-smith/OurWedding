import { initializeI18n } from './i18n.js';

function initializeMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu__button');
  const menu = document.querySelector('.mobile-menu');
  const icon = document.querySelector('#menu-icon');

  if (!menuButton || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('mobile-menu--open');
    menuButton.setAttribute('aria-expanded', 'false');
    icon?.classList.replace('fa-xmark', 'fa-bars');
  };

  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('mobile-menu--open');
    menuButton.setAttribute('aria-expanded', String(open));
    icon?.classList.toggle('fa-bars', !open);
    icon?.classList.toggle('fa-xmark', open);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

function markActiveNavigationLink() {
  const page = new URL(window.location.href).pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach((link) => {
    const active = link.dataset.page === page;
    link.classList.toggle('nav__link--active', active);
    link.classList.toggle('mobile-menu__link--active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

initializeI18n();
initializeMobileMenu();
markActiveNavigationLink();

if (document.querySelector('.hero__countdown')) {
  import('./countdown.js').then(({ initializeCountdown }) => initializeCountdown());
}
