# Copilot Agent Guide

## Mission & Context
- This repo hosts **davidfischer.dev**, a personal site now implemented with **Next.js 16 (App Router + Route Groups)**, React 19, TypeScript, and Emotion. The previous Vite SPA still exists inside `src/pages` and `src/services` for legacy reference, but all new UX must target the App Router surface under `src/app`.
- The public site renders everything through `src/components/AppShell.tsx`, which combines theming, the split-content layout, and the animated vertical navigation. Preserve that shell when adding or reworking views.
- The blog, admin CMS, major-system tool, and split-content renderer all run in a single repo. When you touch one subsystem, check how the others import shared components (usually via the `@/*` alias defined in `tsconfig.json`).

## Tooling Expectations
- **Package manager**: Yarn 1.22 (see `package.json#packageManager`). Prefer `yarn <script>` over `npm` so lockfiles stay consistent.
- **Key scripts** (package.json):
  - `yarn dev` → `next dev`
  - `yarn build` → `next build`
  - `yarn start` → `next start`
  - `yarn lint` → `next lint`
  - Docker helpers: `yarn docker:build`, `yarn docker:build-prod`, `yarn docker:run`, plus compose variants referenced in the README and `docker-compose*.yml`.
- **Environment**: `.env*` files expose `VITE_API_BASE_URL` (legacy) and Next config sets `NEXT_PUBLIC_API_BASE_URL`. The Major System feature reads `process.env.NEXT_PUBLIC_API_BASE_URL || '/api'`; make sure any new API integration uses the Next-style env name and is mirrored in `next.config.mjs` if it must be available client-side.
- **CI/CD**: GitHub Actions (see `.github/workflows/ci-cd.yml`) run install → lint/tests → `npm run build` → Docker build/push. Keep scripts idempotent and avoid adding steps that would break this pipeline.

## Repository Map (what matters most)
- `src/app/` – App Router. There is a `(main)` route group holding the split-layout pages (`home`, `about`, `projects`, `media`, `contact`, `imprint`). `app/blog/**` hosts the public blog, tag filters, server actions, and admin surface. `app/actions` contains all server actions (blog + auth). `robots.ts` & `sitemap.ts` are generated routes; update them if you add public pages.
- `src/components/` – Shared UI and logic. Critical pieces: `AppShell`, `SplitContentContext.tsx`, `SplitContentRenderer.tsx`, `VerticalMenu.tsx`, `VerticalSettings.tsx`, `ThemeProvider.tsx`, `Blog/*` components, and utilities like `useMediaQueryCustom`. All client components must begin with `'use client'`.
- `src/styles.ts` – Theme tokens (light/dark). Toggle logic lives in `VerticalSettings` and persists to `localStorage`.
- `src/lib/db.ts` – File-based persistence for the blog (`data/blog-posts.json`). Server actions read/write here, so wrap every mutation with `revalidatePath` the way `blogActions.ts` does.
- `src/services/` & `src/pages/` – Remaining Vite SPA utilities (Major System, mock blog/auth services). Treat them as reference code; don’t delete unless you intend to finish the migration.
- `public/` & `data/` – Static assets and JSON content. Keep `data/blog-posts.json` formatted, sorted newest-first to match UI expectations.

## Core Architectural Patterns
- **Split content layout**: Each `(main)` page is a client component that calls `useSplitContentDispatch()` inside `useEffect` (or memoized functions) to provide `upperContent` and `lowerContent`. The renderer animates a horizontal bar that tracks menu hover. When building a new page, follow the examples in `src/app/(main)/about/page.tsx` or `projects/page.tsx` and clean up the context on unmount. The in-depth rationale is documented in `SPLIT_CONTENT_DOCS.md`.
- **AppShell contract**: `AppShell` wraps everything with `ThemeProvider` + `SplitContentProvider`, renders the vertical menu/settings UI, and passes children into `SplitContentRenderer`. Never bypass the shell; route-level layouts should just return `<AppShell>{children}</AppShell>`.
- **Blog system**: Server actions in `src/app/actions/blogActions.ts` perform CRUD against `data/blog-posts.json`, then call `revalidatePath` for `/blog` (and per-slug pages). Client components (`src/components/Blog/*`) handle searching, tagging, editing, and markdown rendering. Admin auth is cookie-based via `authActions.ts` and uses env-configurable credentials (`ADMIN_USERNAME`, `ADMIN_PASSWORD`). When adding admin routes, call `await requireAuth()` at the top of the server component.
- **Major System tool**: Lives at `src/app/(main)/projects/major-system`. It relies on axios to hit `/v1/words/number/:split` under `NEXT_PUBLIC_API_BASE_URL`, with graceful fallback to local mock data. Keep the query parameter updates in sync (`useSearchParams`, `URLSearchParams`) so deep links continue working.
- **Styling**: Global resets are in `src/index.css`. Most split-layout pages use inline styles for fast iteration; blog/editor surfaces rely on `app/blog/blog.css`. When you need richer styling, use Emotion (`@emotion/styled`) to stay consistent with the rest of the project.

## Working Agreements
- TypeScript is strict; fix or annotate errors instead of suppressing them. Prefer functional React components and hooks. Remember that files under `src/app` are **server components by default**—explicitly add `'use client'` when using state, effects, context hooks, or browser APIs.
- Imports should use the `@/*` alias. Only use relative paths for sibling files.
- Reuse existing primitives (`Button`, `ThemeProvider`, `SplitContent` hooks). Before adding a new UI primitive, confirm there isn’t already one in `src/components`.
- When persisting blog data or other JSON assets, run them through Prettier/`JSON.stringify(..., null, 2)` for stable diffs.
- If you add new public routes, also update:
  1. `src/app/sitemap.ts` (so crawlers discover them),
  2. `src/app/robots.ts` if necessary,
  3. `src/components/VerticalMenu.tsx` so navigation stays in sync.
- Keep accessibility in mind: keyboard focus for menu links, alt text on images, clear headings.

## Verification & QA
- Local dev: `yarn dev` (Next dev server at default 3000). Static assets in `public/` automatically reload.
- Production parity: `yarn build && yarn start` (simulates the Docker container). For container testing use `yarn docker:build-prod` then `yarn docker:run`.
- Linting: `yarn lint` (ESLint + Next rules). Run it before shipping React/TS changes.
- There are currently no automated Jest/Vitest suites; rely on lint + manual verification of critical flows (split layout, blog CRUD, major-system calls). Consider adding targeted tests if you introduce complex business logic.

## Do / Don’t Checklist
- **Do** Use playwright mcp tool to verify changes to critical flows if breaking changes are made.
- **Do** respect the `use client` boundary, clean up `useSplitContent` assignments on unmount, and gate admin routes with `requireAuth()`.
- **Do** keep theme-aware colors in sync with `styles.ts`; derive palette values from there rather than hardcoding.
- **Do** document new workflows inside README or this file if they change how agents should operate.
- **Do** Use context7 to query the documentation when uncertain about best practices for a library or framework.
- **Don’t** remove `src/pages` or `src/services` until the migration plan is explicit. Other tooling (like the Major System generator) still imports pieces from there.
- **Don’t** introduce `npm install`/`package-lock` churn. Stick to Yarn and touch dependencies intentionally.
- **Don’t** commit secrets. Example credentials live in env files; rely on Next runtime variables for the real values.

## References
- Project overview & deployment: `README.md`
- Split layout deep dive: `SPLIT_CONTENT_DOCS.md`
- Blog + auth actions: `src/app/actions/*.ts`
- Theme + layout primitives: `src/components/*.tsx`
- File-backed blog data: `data/blog-posts.json`

Keep this document aligned with reality whenever you adjust tooling, scripts, routing, or architectural patterns—the Copilot agent relies on it to operate safely.
