const circumferenceKm = 40075;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"' && quoted && text[index + 1] === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && text[index + 1] === '\n') index += 1;
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }
  return rows;
}

function normalize(value) {
  return value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function parseKilometers(value) {
  const digits = value.replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}

function readTravelRows(csvText) {
  const rows = parseCsv(csvText);
  const headerIndex = rows.findIndex((row) =>
    normalize(row[0]) === 'date(s)' &&
    normalize(row[1]) === 'traveler(s)' &&
    normalize(row[10]) === 'notes & milestones'
  );
  if (headerIndex < 0) throw new Error('The travel CSV header row could not be found.');

  return rows.slice(headerIndex + 1)
    .filter((row) => row.length >= 11 && row[0].trim() && normalize(row[0]) !== 'total')
    .map((row) => ({
      patrikKm: parseKilometers(row[5]),
      francescaKm: parseKilometers(row[6]),
      togetherKm: parseKilometers(row[7])
    }));
}

function calculateStats(rows) {
  const combinedKm = rows.reduce((total, row) => total + row.patrikKm + row.francescaKm + row.togetherKm, 0);
  return { combinedKm, combinedPercent: combinedKm / circumferenceKm * 100 };
}

function formatNumber(number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(number);
}

function animateCounter(element, target) {
  const duration = 1100;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = formatNumber(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function showStats(stats) {
  [
    ['combined-km', stats.combinedKm],
    ['combined-percent', Math.round(stats.combinedPercent)]
  ].forEach(([name, value]) => {
    const element = document.querySelector(`[data-stat="${name}"]`);
    if (element) animateCounter(element, value);
  });

  const percentage = stats.combinedPercent;
  const progress = document.querySelector('[data-progress="combined"]');
  const track = progress?.parentElement;
  if (!progress || !track) return;
  track.setAttribute('aria-valuenow', String(Number(percentage.toFixed(1))));
  track.setAttribute('aria-valuetext', `${percentage.toFixed(1)}%`);
  requestAnimationFrame(() => { progress.style.width = `${Math.min(percentage, 100)}%`; });
}

async function initializeJourney() {
  const csvUrl = new URL('../Patrik & Francesca - 2026 Travel Timeline & Stats - Travel Timeline & Stats.csv', import.meta.url);
  const response = await fetch(csvUrl);
  if (!response.ok) throw new Error(`Could not load the travel data (${response.status}).`);

  const rows = readTravelRows(await response.text());
  if (!rows.length) throw new Error('The travel CSV contains no travel records.');
  showStats(calculateStats(rows));
}

initializeJourney().catch((error) => {
  console.error('Could not initialize the travel distance section:', error);
  const status = document.querySelector('#journey-status');
  if (status) status.textContent = 'Our travel distance could not be loaded. Please try again later.';
});
