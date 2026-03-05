---
globs:
alwaysApply: ApplyIntelligently
---

# Next.js Frontend Guidelines
# File: .cursor/rules/nextjs-frontend-guidelines

## Architecture
- Use the App Router with **server components by default**.
- Keep UI components **pure, presentational, and reusable**.
- All API communication goes through **Axios wrappers** in `/lib/api/*`.

## API Layer (Axios)
- Never call the Symfony API directly from components.
- Create one service file per domain (e.g., `user.ts`, `auth.ts`, `orders.ts`).
- Services must:
  - Export typed functions.
  - Normalize errors.
  - Validate responses (Zod recommended).
- Components receive **clean, typed data**, not raw Axios responses.

## UI & Components (shadcn/ui)
- Use shadcn/ui as the base for all interactive components.
- Extend components only through composition, not mutation.
- Keep styling consistent with Tailwind conventions.
- Avoid global CSS except for tokens and resets.

## Data Fetching & State
- Use **server components** for initial data loading.
- Use **client components** only when interactivity is required.
- For client-side state or mutations, use:
  - React Query or SWR for async state.
  - Local state for UI-only concerns.

## Forms & Mutations
- Prefer **server actions** when possible.
- Otherwise:
  - Validate inputs with Zod.
  - Submit via Axios service functions.
  - Handle errors at the component level with friendly UI messages.

## Project Structure
- `/app/*` for routes and server components.
- `/components/*` for UI and domain components.
- `/lib/api/*` for Axios services.
- `/lib/validation/*` for Zod schemas.
- `/hooks/*` for reusable client-side logic.

## Error Handling
- Axios services convert backend errors into a consistent shape.
- UI components display user-friendly messages.
- Use Next.js error boundaries for page-level failures.

## Code Quality
- **Biome is mandatory** before committing.
- No unformatted code is allowed in PRs.
- Prefer TypeScript everywhere; avoid `any`.

