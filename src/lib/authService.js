// Login simples do painel administrativo.
// As credenciais podem ser sobrescritas por variáveis de ambiente no momento do build
// (VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD). Caso não configuradas, usa os valores padrão abaixo.

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'geleiabarber@admin.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'geleiabarber2026';

const SESSION_KEY = 'geleia_admin_session';

export function login(email, password) {
  const ok = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
  if (ok) {
    sessionStorage.setItem(SESSION_KEY, '1');
  }
  return ok;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}
