import { businessHours, SLOT_INTERVAL_MIN } from '../data/siteContent';

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

/** Retorna todos os horários possíveis (strings "HH:MM") para um dado dia da semana. */
export function getSlotsForWeekday(weekday) {
  const windows = businessHours[weekday];
  if (!windows) return [];
  const slots = [];
  windows.forEach(({ start, end }) => {
    let cur = timeToMinutes(start);
    const endMin = timeToMinutes(end);
    while (cur < endMin) {
      slots.push(minutesToTime(cur));
      cur += SLOT_INTERVAL_MIN;
    }
  });
  return slots;
}

/** Gera os próximos N dias que têm expediente (pula dias fechados), a partir de hoje. */
export function getNextAvailableDays(count = 14) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let cursor = new Date(today);
  while (days.length < count) {
    const weekday = cursor.getDay();
    if (businessHours[weekday]) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/** Remove horários já passados (se o dia selecionado for hoje) e horários já reservados. */
export function getAvailableSlots(date, bookedTimes = []) {
  const weekday = date.getDay();
  let slots = getSlotsForWeekday(weekday);

  const isToday = new Date().toDateString() === date.toDateString();
  if (isToday) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((s) => timeToMinutes(s) > nowMin);
  }

  return slots.filter((s) => !bookedTimes.includes(s));
}

export function formatDateKey(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}
