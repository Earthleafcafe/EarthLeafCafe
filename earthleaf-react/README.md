# earthleaf-react

React port of the [earthleaf.lk](../earthleaf.lk) static site. Bilingual (EN `/`, SI `/si`) lunch-spot
brochure site for Earth Leaf, Ratmalana.

**Migration in progress.** Full plan: [`../earthleaf.lk/docs/REACT-MIGRATION-PLAN.md`](../earthleaf.lk/docs/REACT-MIGRATION-PLAN.md).
Repo conventions: [`../earthleaf.lk/CLAUDE.md`](../earthleaf.lk/CLAUDE.md).

**Current state: Phase 0 (scaffold).** Vite + React 19 + TypeScript + react-router-dom, with the
folder structure from the plan in place. Routing, the anti-FOUC theme script, and the base token
layer are wired up; sections and content dictionaries are stubbed and land in later phases.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview
```

## Stack

- Vite 8 + React 19 + TypeScript
- react-router-dom (routes: `/` → en, `/si` → si)
- CSS Modules only — no inline styles, no CSS-in-JS (see CLAUDE.md)
- Prerendering (vite-react-ssg) and react-helmet-async land in phase 7
