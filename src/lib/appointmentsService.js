import { supabase, isSupabaseConfigured } from './supabaseClient';

const LOCAL_KEY = 'geleia_appointments_v1';

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(list) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Lista todos os agendamentos (uso do painel admin). */
export async function listAppointments() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });
      if (error) throw error;
      return data;
    } catch {
      // cai para localStorage em caso de erro de rede/tabela inexistente
    }
  }
  return readLocal().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

/** Lista horários já ocupados (status != cancelado) numa data específica. */
export async function listBookedTimes(dateKey) {
  const all = await listAppointments();
  return all
    .filter((a) => a.date === dateKey && a.status !== 'cancelado')
    .map((a) => a.time);
}

export async function createAppointment(payload) {
  const record = {
    id: uid(),
    status: 'pendente',
    created_at: new Date().toISOString(),
    ...payload,
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('appointments').insert(record).select().single();
      if (error) throw error;
      return data;
    } catch {
      // segue para fallback local
    }
  }

  const list = readLocal();
  list.push(record);
  writeLocal(list);
  return record;
}

export async function updateAppointmentPaid(id, paid) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ paid })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch {
      // segue para fallback local
    }
  }

  const list = readLocal();
  const idx = list.findIndex((a) => a.id === id);
  if (idx >= 0) {
    list[idx].paid = paid;
    writeLocal(list);
    return list[idx];
  }
  return null;
}

export async function deleteAppointment(id) {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch {
      // segue para fallback local
    }
  }
  writeLocal(readLocal().filter((a) => a.id !== id));
  return true;
}
