# Skillex Task

A React SPA with two main features: **Products** (catalog with filters and modal details) and **System Bet Calculator** (combinations and payouts). Built with TypeScript, Vite, and a Feature-Sliced Design–inspired structure.

---

## Tech Stack

| Category       | Technology                                     |
| -------------- | ---------------------------------------------- |
| **Runtime**    | React 19, TypeScript 5.9                       |
| **Build**      | Vite 7, @vitejs/plugin-react                   |
| **Styling**    | Tailwind CSS 4, tailwind-merge, clsx           |
| **Routing**    | React Router 7                                 |
| **Data & API** | TanStack React Query 5, Axios                  |
| **State**      | Zustand 5 (e.g. product filters)               |
| **UI**         | Lucide React (icons), custom shared components |
| **Testing**    | Vitest 4, React Testing Library, jsdom         |
| **Lint**       | ESLint 9, typescript-eslint                    |

---

## Architecture

The project follows **Feature-Sliced Design (FSD)**–inspired layers and segments. High-level flow:
In most cases I don't use whole FSD Architecture patterns, cause it's very complex 99% of projects can be maintained with shared, features, app folders:

- **App** → entry (`src/app`), global styles, root providers.
- **Pages** → route-level components that compose features and shared layout.
- **Features** → self-contained slices (e.g. `products`, `bet-calculator`) with **ui** (blocks/elements), **model** (store, API, hooks), and **lib** (utils, types, constants).
- **Shared** → reusable **ui**, **lib**, **hooks**, **services**, and **icons** used across the app.

### Project Structure

```
src/
├── app/                    # Entry, providers wiring
│   └── index.tsx
├── pages/                  # Route pages
│   ├── index.ts
│   ├── products-page.tsx
│   └── bet-calculation-page.tsx
├── features/
│   ├── products/           # Product catalog
│   │   ├── ui/             # Products, filters, card, modal, pagination, not-found
│   │   ├── model/          # API, filters store, use-products-query, use-filters-query
│   │   └── lib/            # types, constants, utils
│   └── bet-calculator/     # System bet calculator
│       ├── ui/             # SystemBetCalculator, form, results, odds-input
│       ├── model/          # (state in component)
│       └── lib/            # types, constants, utils, validation
├── shared/
│   ├── ui/                 # Button, Card, Input, Select, Modal, Navbar, NavLink,
│   │   │                   # PageHeader, Pagination, Image, Layout, SkillexIcon
│   │   └── icons/
│   ├── lib/                # utils (cn), combinatorics, types, constants
│   ├── hooks/              # useToggle, useDebouncedValue
│   └── services/           # base-api, api.service
├── providers/               # QueryClientProvider, RouterProvider
├── test/
│   └── setup.ts            # RTL / Vitest setup
└── index.css               # Tailwind + theme (primary, base styles)
```

### Routes

- `/` — **Products**: grid, filters (category, brand, price, rating), pagination, product modal.
- `/bet-calculation` — **System Bet Calculator**: system type, odds inputs, stake, results table and totals.

---

## Scripts

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Start dev server (default port **3002**)    |
| `npm run build`      | Type-check + production build               |
| `npm run preview`    | Serve production build locally              |
| `npm run lint`       | Run ESLint                                  |
| `npm run test`       | Run Vitest once                             |
| `npm run test:watch` | Run Vitest in watch mode                    |
| `npm run start:api`  | Start local products API (Express, for dev) |

---

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3002](http://localhost:3002).

3. **products API**

   If the products list depends on a local API, start it in another terminal:

   ```bash
   npm run start:api
   ```

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

## Testing

- **Runner:** Vitest (config in `vite.config.ts`, globals, jsdom).
- **Setup:** `src/test/setup.ts` (e.g. React Testing Library / jest-dom).
- **Placement:** Tests next to code (e.g. `*.test.ts` / `*.test.tsx`) or under `tests/` in features.

Run tests:

```bash
npm run test
# or
npm run test:watch
```

---

## Styling

- **Tailwind CSS 4** with `@tailwindcss/vite` and `index.css` as the main style entry.
- **Theme:** Dark base (`bg-zinc-950`), primary palette (purple), and utility classes for layout and components.
- **Conventions:** Tailwind-only for UI; `cn()` (from `shared/lib/utils`) for conditional classes; shared components live in `shared/ui`.

---

## License

All rights reserved to me (David), except for any materials or terms that belong to Skillex or are provided under the Skillex task.

## Ending

If you reached this part, here's a little gift for you: 🎁✨ Thanks for reading!
