# CCS Catering — Landing Donaciones

Proyecto inicial React + Vite + Supabase.

## Setup

```bash
npm install
cp .env.example .env
# completa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
npm run dev
```

## Estructura

```
├── src/
│   ├── lib/supabase.js   # cliente Supabase
│   ├── App.jsx           # landing (vacía)
│   ├── main.jsx
│   └── index.css
├── supabase/
│   ├── config.toml
│   └── migrations/
├── .env / .env.example
├── index.html
├── vite.config.js
└── package.json
```
