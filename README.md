# Geleia Barber Club — Site com Agendamento e Painel Administrativo

Site institucional com sistema de agendamento (sem necessidade de login do cliente)
e painel administrativo protegido por senha.

## Como rodar localmente

```bash
npm install
npm run dev
```

## Painel administrativo

Acesse pelo link "Painel administrativo" no rodapé do site, ou diretamente em `/admin/login`.

- **E-mail:** geleiabarber@admin.com
- **Senha:** geleiabarber2026

Recomendo trocar essa senha antes de publicar o site (veja `src/lib/authService.js`).

## Como funciona o agendamento

- Os agendamentos ficam salvos automaticamente no navegador (localStorage) — funciona
  imediatamente, mesmo sem configurar um banco de dados.
- Para persistência real em produção (acessível de qualquer dispositivo, não só do
  navegador de quem agendou), configure o Supabase:
  1. Crie um projeto em https://supabase.com
  2. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
  3. Crie as tabelas `appointments` e `services` no Supabase

## Horários e serviços

- Horário de funcionamento: `src/data/siteContent.js` (objeto `businessHours`)
- Serviços e preços: também em `src/data/siteContent.js`, e editáveis pelo painel
  administrativo (aba "Serviços") — atenção: a edição pelo painel só afeta o que é
  salvo localmente/Supabase; o arquivo de conteúdo é o que aparece por padrão.

## Build de produção

```bash
npm run build
```

## Pendências conhecidas

- Nenhuma galeria de fotos foi incluída (página mantida enxuta, por pedido do cliente).
