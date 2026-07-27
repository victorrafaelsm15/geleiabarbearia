import { supabase, isSupabaseConfigured } from './supabaseClient';
import { services as defaultServices } from '../data/siteContent';

const LOCAL_KEY = 'geleia_services_v1';

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : defaultServices;
  } catch {
    return defaultServices;
  }
}

function writeLocal(list) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
}

export async function listServices() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('name');
      if (error) throw error;
      if (data?.length) return data;
    } catch {
      // cai para fallback local
    }
  }
  return readLocal();
}

export async function upsertService(service) {
  const record = { id: service.id || `${Date.now()}`, ...service };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('services').upsert(record).select().single();
      if (error) throw error;
      return data;
    } catch {
      // segue para fallback local
    }
  }

  const list = readLocal();
  const idx = list.findIndex((s) => s.id === record.id);
  if (idx >= 0) list[idx] = record;
  else list.push(record);
  writeLocal(list);
  return record;
}

export async function deleteService(id) {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch {
      // segue para fallback local
    }
  }
  writeLocal(readLocal().filter((s) => s.id !== id));
  return true;
}
