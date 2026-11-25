const combinedKm = 31200;
const combinedPercent = 77.9;

function formatNumber(number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(number);
}

function animateCounter(element, target, decimalPlaces = 0) {
  const duration = 1100;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = target * eased;
    element.textContent = decimalPlaces
      ? value.toFixed(decimalPlaces)
      : formatNumber(Math.round(value));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initializeJourney() {
  const kmElement = document.querySelector('[data-stat="combined-km"]');
  const percentElement = document.querySelector('[data-stat="combined-percent"]');
  if (kmElement) animateCounter(kmElement, combinedKm);
  if (percentElement) animateCounter(percentElement, combinedPercent, 1);

  const progress = document.querySelector('[data-progress="combined"]');
  const track = progress?.parentElement;
  if (!progress || !track) return;
  track.setAttribute('aria-valuenow', String(combinedPercent));
  track.setAttribute('aria-valuetext', `${combinedPercent}%`);
  progress.style.width = '0%';
  requestAnimationFrame(() => { progress.style.width = `${combinedPercent}%`; });
}

initializeJourney();
