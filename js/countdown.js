function initializeCountdown() {
  const targetDate = new Date('2027-03-05T00:00:00').getTime();
  const fields = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };

  if (!fields.days) return;

  const pad = (value) => String(value).padStart(2, '0');

  const updateCountdown = () => {
    const remaining = Math.max(targetDate - Date.now(), 0);
    fields.days.textContent = pad(Math.floor(remaining / 86400000));
    fields.hours.textContent = pad(Math.floor((remaining / 3600000) % 24));
    fields.minutes.textContent = pad(Math.floor((remaining / 60000) % 60));
    fields.seconds.textContent = pad(Math.floor((remaining / 1000) % 60));
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

initializeCountdown();
