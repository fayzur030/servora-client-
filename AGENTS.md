<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

Next.js 16.4.6 (App Router, Turbopack by default) · React 19.3 · Tailwind CSS v4 · shadcn CLI 4 with the **Base UI** style (`@base-ui/react`, *not* Radix) · TypeScript strict.

## Commands

```bash
npm run dev            # dev server on :3000
npm run build          # production build (Turbopack)
npm run lint           # ESLint 9 flat config; with no path argument it lints the whole project
npx tsc --noEmit       # typecheck (no npm script exists for this)
npx next typegen && npx tsc --noEmit   # typecheck after adding/removing routes
npx shadcn add <name>  # add a shadcn component
```

- There is **no test framework and no test script**. Don't assume `npm test` works.
- `next lint` was removed in Next 16 and `next build` no longer lints — run `npm run lint` separately.

## Conventions that differ from defaults

- **`cn` comes from the `cn` package**, re-exported by `src/lib/utils.ts`. Do not add `clsx`/`tailwind-merge` or rewrite `cn` as `twMerge(clsx(...))`; the shadcn template you remember does not apply here.
- **Tailwind is CSS-first** (v4): there is no `tailwind.config.js`. Theme tokens live in `src/app/globals.css` under `@theme inline`; `shadcn/tailwind.css` only ships utilities/variants, not colors.
- **Route props come from generated types.** The root layout uses the global `LayoutProps<"/">`; use `PageProps<'/route'>` / `LayoutProps<'/route'>` for new routes instead of hand-written prop interfaces. Run `npx next typegen` after route changes so the types exist.
- **`src/app` is App Router with route groups** — `src/app/(root)/` holds the root route; `(root)` is not part of the URL. Folders starting with `_` are private and are **not** routable.
- **Dark mode is class-based** (`@custom-variant dark (&:is(.dark *))`): add `.dark` to `<html>`. No theme toggle/`next-themes` is installed — don't assume one exists.

## Design system

`src/app/globals.css` is the single source of truth for color and typography. Never hardcode hex/oklch in components.

- Semantic tokens are declared once in `:root` and `.dark` (brand, surfaces, text, borders, status colors) and bridged to Tailwind via `@theme inline`. New color = add a variable in **both** blocks + a `--color-*` entry.
- `destructive` is an alias of `error` (`text-destructive` → `var(--error)`); don't re-add a separate `--destructive` variable.
- Fonts come from `next/font/google` in `src/app/layout.tsx`: Inter `--font-inter` (body/UI), Plus Jakarta Sans `--font-jakarta` (headings), Geist Mono `--font-geist-mono`. `font-sans` / `font-heading` / `font-mono` utilities are already wired up.

## Verifying work

- The dev server exposes a Next.js MCP server at `http://localhost:3000/_next/mcp` (`get_compilation_issues`, `compile_route`) — use it instead of a full build to check for errors.
- `next dev` writes its PID/port to `.next/dev/lock`. If a server is already running, reuse it rather than starting another.
- `next dev` also rewrites the managed block above in this file. Keep your own notes **outside** the `BEGIN/END:nextjs-agent-rules` markers, or they will be lost.
