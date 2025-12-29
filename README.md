# Sum App — Webpack (Backend + Frontend)

A small full‑stack project split into `server/` (Express) and `frontend/` (Vue 3 + Less), with a **single setup** and **single dev command** powered by Webpack and Concurrently.

- API: `POST /api/sum` → `{ sum }`
- UI: Simple Vue form to input two numbers and show the sum.

## Prerequisites
- Node.js **>= 18** and npm

## Install
```bash
npm install
```

## Development (single command)
```bash
npm run dev
```
- Backend: http://localhost:3000
- Frontend dev server: http://localhost:8080 (Webpack Dev Server)
- Proxy: Webpack dev server proxies `/api` → server

## Tests (backend)
```bash
npm test
```

## Production build & run
```bash
npm run build       # builds frontend to frontend/dist
npm start           # starts server; serves frontend/dist
# Visit http://localhost:3000
```

## Structure
```
sum-up-app/
  ├─ server/
  │   ├─ src/
  │   │   ├─ app.js
  │   │   └─ index.js
  │   └─ tests/app.test.js
  ├─ frontend/
  │   └─ src/
  │      ├─ App.vue
  │      ├─ index.js
  │      └─ styles/main.less
  │   
  ├─ webpack.config.js
  ├─ jest.config.js
  ├─ babel.config.js
  ├─ package.json
  ├─ .gitignore
  └─ README.md
```

## Notes
- Single `package.json` to install and run both.
- Webpack dev server proxies API; backend serves built assets in production.
