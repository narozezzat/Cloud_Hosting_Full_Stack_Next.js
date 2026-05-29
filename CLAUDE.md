# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build — also runs the type-check + ESLint pass
npm run start    # serve the production build
npm run lint     # next lint (ESLint is not yet configured; build covers linting)

npx prisma generate          # regenerate the Prisma client into src/generated/prisma
npx prisma migrate dev       # apply/create a migration against DATABASE_URL
npx prisma studio            # inspect the DB
```

There is **no test runner** configured — do not assume Jest/Vitest exist. The
canonical "is it correct?" gate is `npm run build` (compiles every route and
type-checks). For a fast check while iterating: `npx tsc --noEmit`.

Required env vars: `DATABASE_URL` (PostgreSQL) and `JWT_SECRET`.

## Architecture

Next.js 14 **App Router** + TypeScript + Prisma (PostgreSQL). Path alias
`@/*` → `src/*` — always import via `@/`, never deep relative paths like
`../../../generated/prisma`.

### Data + Prisma
- The Prisma client is generated to **`src/generated/prisma`**, not the default
  `@prisma/client`. Import models/enums from `@/generated/prisma`.
- Use the shared singleton: `import prisma from "@/lib/db"`. Never `new
  PrismaClient()` in app code.
- After editing `prisma/schema.prisma`, run `npx prisma generate`.

### Auth (JWT in an httpOnly cookie)
- Login/register set a `jwtToken` cookie via `setCookie`/`generateJWT`
  (`@/lib/auth/generateToken`).
- **API routes** authenticate with `verifyToken(request)`
  (`@/lib/auth/verifyToken`) → returns `JWTPayload | null`. Admin-only routes
  check `user === null || user.isAdmin === false` and return `403`.
- **Server components/pages** read the cookie with `cookies()` then
  `verifyTokenForPage(token)`, redirecting to `/login` when null.
- `src/middleware.ts` redirects logged-in users away from `/login` and
  `/register`, and gate-keeps `/api/users/profile/*`. Keep its `matcher` in sync
  when adding protected paths.

### API route conventions (`src/app/api/**/route.ts`)
Every handler follows the same shape: wrap in `try/catch`, validate the body
with a zod schema via `.safeParse()`, and respond with
`NextResponse.json({ message }, { status })`. Schemas live in
`@/lib/validation/validationSchema`; request body types (DTOs) in
`@/lib/validation/dtos`. Validation errors return `400` with
`validation.error.errors[0].message`; unexpected errors return `500` with a
generic message. Pagination uses `ARTICLE_PER_PAGE` / `COMMENT_PER_PAGE` from
`@/lib/constants`.

### Client-side data fetching
Browser-side fetchers live in `@/lib/api/*` and build URLs from `DOMAIN`
(`@/lib/constants`, switches on `NODE_ENV`). Mutations in components use `axios`
directly against `${DOMAIN}/api/...` then `router.refresh()`.

### `lib/` layout
`@/lib` is the single home for non-component code: `db.ts`, `constants.ts`,
`types.ts`, `formatDate.ts`, `analytics.ts`, `cn.ts`, plus `api/` (fetchers),
`auth/` (tokens), and `validation/` (zod schemas + DTOs).

### UI system
- `src/components/ui/` holds the design system. **Two casing conventions, both
  intentional:** PascalCase files (`Button`, `Card`, `Input`, `Modal`,
  `Avatar`, `FormField`…) are this app's own primitives, built with
  `class-variance-authority` (cva) + `cn` (`@/lib/cn`, clsx + tailwind-merge);
  lowercase files (`dialog`, `dropdown-menu`, `sheet`, `drawer`, `table`) are
  shadcn/Radix primitives. Don't "fix" the casing.
- Feature components are grouped by domain: `components/{admin,articles,auth,
  comments,home,layout,brand,illustrations,providers}`.
- Cross-cutting helpers already extracted (reuse, don't re-create):
  `getErrorMessage` (`@/lib/getErrorMessage`), `fadeInUp`/`navSpring`
  (`@/lib/animations`), `useLoading` and `useControllableState` (`@/hooks`),
  and the `FormField` / `PasswordInput` / `Avatar` primitives.
- antd is used in a few spots (e.g. `app/error.tsx`, AntD registry/theme
  providers). Prefer the in-house `ui/` + shadcn system for new UI.

## Conventions for new code (senior frontend standards)

- **Build new UI from `components/ui` (shadcn/cva primitives) + `cn`.** Do not
  hand-roll raw `<div>`/`<input>` markup that duplicates an existing primitive.
  If a primitive is missing, add it to `components/ui` rather than inlining.
- **DRY — reuse shared components/hooks/utils.** Before writing markup or logic,
  check for an existing piece (`FormField`, `Avatar`, `getErrorMessage`,
  `useControllableState`, `fadeInUp`…). When the same pattern appears ~2–3
  times, extract it into a shared component/hook instead of copy-pasting.
- **Keep components small and single-responsibility; separate concerns.** Split
  large components into an orchestrator + focused presentational
  subcomponents, and lift static data/config into a sibling `.ts` module.
  Established examples to mirror: `HeaderClient` → `HeaderDesktopNav` /
  `HeaderAuthActions` / `HeaderMobileMenu` + `navLinks.ts`; `WebHostingPlan` →
  `PlanCard` + `plans.ts`; `AnalyticsChart` → `MetricTabs` +
  `analyticsChartConfig.ts`.
- **Errors & async in components:** `catch` → `toast.error(getErrorMessage(e))`
  (react-toastify); wrap async submits with `useLoading`'s `withLoading`; use
  `useControllableState` for controlled/uncontrolled `open` props.
- **Server vs client:** keep data fetching/auth in server components and API
  routes; add `"use client"` only when a component needs state/effects/handlers.
- Add `import` paths through `@/`. Keep API responses to the `{ message }` JSON
  shape and reuse the zod-schema + DTO validation flow.
- Before finishing: `npm run build` must pass and `npx tsc --noEmit` must be
  clean with no unused declarations.

### TypeScript
- **No `any`.** Type `catch` blocks as `unknown` and funnel through
  `getErrorMessage`. Don't reach for `as any` to silence the compiler — fix the
  type.
- **Derive, don't redeclare.** Use Prisma model types from `@/generated/prisma`
  and infer request types from the zod schemas/DTOs rather than hand-writing
  parallel interfaces that can drift.
- Type component props with a named `interface XProps`; prefer discriminated
  unions over optional-boolean soup for variant logic.

### Styling (Tailwind)
- Use the **semantic design tokens**, not raw colors: `text-foreground`,
  `text-muted-foreground`, `bg-card`, `bg-background`, `border-border`,
  `ring-ring`, and the `brand-*` / `accent-*` / `destructive` scales. Avoid
  hardcoded hex except inside isolated config (e.g. the chart.js options).
- Conditional classes go through `cn(...)`. When a component grows more than ~2
  style branches, model them as **cva variants** (see `Button`, `Badge`,
  `Avatar`) instead of nested ternaries in `className`.
- Respect the existing dark-mode pattern (`dark:` variants on tokens); never
  ship a light-only color.

### Accessibility
- Icon-only buttons must have an `aria-label` (the codebase does this
  consistently — keep it up). Decorative SVGs/blobs get `aria-hidden="true"`.
- Associate every input with its label via `FormField`'s `htmlFor` (or a direct
  `<label htmlFor>`); don't ship a bare placeholder as the only label.
- Preserve focus-visible rings and keyboard behavior already wired into the
  primitives — don't strip `focus-visible:` utilities.

### Server / Client boundaries & performance
- Default to **Server Components**. Fetch data and run auth on the server; push
  `"use client"` down to the smallest interactive leaf. Don't make a whole page
  a client component to enable one button.
- Use `export const dynamic = "force-dynamic"` on pages that must read
  per-request data (e.g. the admin dashboard reading cookies/DB) — match the
  existing pattern rather than inventing caching ad hoc.
- Add a `loading.tsx` / `error.tsx` per route segment where a meaningful
  loading or error UX helps; keep heavy client-only libs (chart.js, etc.)
  confined to their own client component so they don't bloat shared bundles.
- After any data mutation, refresh server data with `router.refresh()` rather
  than manually mutating local state to mirror the DB.

### Dependencies & scope
- Don't add a new UI/component library. antd is **legacy** here — build new UI
  on the in-house `ui/` + shadcn primitives. Introduce a new dependency only
  when there's no reasonable in-repo path, and prefer the libraries already in
  `package.json` (framer-motion, lucide-react, react-icons, zod, axios).
