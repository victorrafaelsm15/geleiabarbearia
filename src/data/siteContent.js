// Dados reais da Geleia Barber Club — @geleiabarberclub

export const siteInfo = {
  name: 'Geleia Barber Club',
  tagline: 'Transformamos aparência em presença',
  subtagline: 'Especialistas em cortes masculinos premium',
  whatsapp: '5586988678664',
  phone: '(86) 98867-8664',
  instagram: '@geleiabarberclub',
  instagramUrl: 'https://instagram.com/geleiabarberclub',
  address: 'Av. Marechal Juarez Tavora, Quadra 01, Casa 19 — Parque Piauí, Teresina - PI',
};

// Serviços oferecidos (id estável usado nos agendamentos)
export const services = [
  { id: 'corte', name: 'Corte', price: 35, durationMin: 30 },
  { id: 'barba', name: 'Barba', price: 25, durationMin: 30 },
  { id: 'combo', name: 'Combo (Corte + Barba)', price: 50, durationMin: 60 },
  { id: 'sobrancelha', name: 'Sobrancelha', price: 10, durationMin: 15 },
];

// Horário de funcionamento real, por dia da semana (0 = domingo ... 6 = sábado)
// Cada dia pode ter uma ou duas janelas (manhã/tarde). Dia ausente = fechado.
export const businessHours = {
  1: [{ start: '14:30', end: '19:30' }], // Segunda
  2: [{ start: '08:30', end: '12:30' }, { start: '14:30', end: '19:30' }], // Terça
  3: [{ start: '08:30', end: '12:30' }, { start: '14:30', end: '19:30' }], // Quarta
  4: [{ start: '08:30', end: '12:30' }, { start: '14:30', end: '19:30' }], // Quinta
  5: [{ start: '08:30', end: '12:30' }, { start: '14:30', end: '19:30' }], // Sexta
  6: [{ start: '08:30', end: '12:30' }, { start: '14:30', end: '19:30' }], // Sábado
  // 0 (domingo) fechado
};

export const SLOT_INTERVAL_MIN = 30;

export const weekdayLabels = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
