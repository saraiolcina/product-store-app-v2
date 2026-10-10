# Product Listing

A small React + TypeScript app that lists products from the public [DummyJSON](https://dummyjson.com/docs/products) API, with search, category filtering, price sorting and server-side pagination.

Built as a learning project to practice async data fetching, state management, component architecture and accessibility, using plain hooks before reaching for any data-fetching library.

## Features

- **Product list** with title, description, image and price (formatted as EUR).
- **Server-side pagination**: 4 products per page, using DummyJSON's `limit` / `skip` / `total`.
- **Sort by price**, ascending or descending, with a toggle button.
- **Search** by text, debounced so the API isn't called on every keystroke.
- **Filter by category**, with the options loaded from the API.
- Search and category are **mutually exclusive**: using one disables the other (they hit different endpoints).
- **Explicit UI states**: initial/loading, success, empty and error, with a retry button on errors.
- **Request cancellation**: a new request aborts the previous one with `AbortController`, so stale responses never overwrite newer ones.
- **Accessibility**: semantic headings, labelled controls, `role="status"` / `role="alert"` for state messages, and `aria-current` on the current page.
- **Responsive**, mobile-first layout using `min-width` breakpoints.

## Tech stack

- [React](https://react.dev/) with function components and hooks
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (dev server and build)
- [lucide-react](https://lucide.dev/) for icons
- Plain CSS (`src/index.css`) with CSS custom properties and light/dark colour schemes

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm (or your package manager of choice)

### Install and run

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (Vite's default is `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check and create a production build
npm run preview   # serve the production build locally
```

No API key or environment variables are needed: DummyJSON is public.

## Project structure

```
src/
├── main.tsx                     # App entry point (StrictMode)
├── App.tsx                      # Renders MainView
├── index.css                    # Design tokens, layout and component styles
├── declarations.d.ts            # Module declaration for image imports
├── types/
│   └── types.ts                 # StatusType, SortingType, Product, ProductResponse
├── hooks/
│   ├── useFetchData.ts          # Fetches products; handles status, abort, errors
│   ├── useGetCategories.ts      # Fetches the category list once on mount
│   └── useDebounce.ts           # Debounces a string value
├── ui/
│   └── MainView.tsx             # Owns page/search/category/sort state, wires everything
└── components/
    ├── HeaderComponent.tsx      # Search input, category select, sort button
    ├── ProductList.tsx          # Renders product cards
    ├── Pagination.tsx           # Previous / next buttons and current page
    ├── LoadingComponent.tsx
    ├── EmptyComponent.tsx
    └── ErrorComponent.tsx       # Error message with retry button
```

## How it works

`MainView` holds the UI state (`currentPage`, `selectedCategory`, `searchValue`, `orderToSort`). Whenever the page, category, sort order or debounced search value changes, an effect calls `fetchData` from `useFetchData`.

`useFetchData` picks the endpoint and sends the request:

| Situation | Endpoint |
| --- | --- |
| A category is selected | `GET /products/category/{category}?limit&skip&sortBy=price&order` |
| Otherwise (including empty search) | `GET /products/search?q={query}&limit&skip&sortBy=price&order` |

The hook keeps the current `AbortController` in a `useRef`. Each call aborts the previous request before starting a new one, and `AbortError`s are ignored instead of being treated as failures.

The request status is modelled as an enum (`INITIAL`, `LOADING`, `SUCCESS`, `ERROR`, `EMPTY`), and `MainView` renders a different component for each one.

## Possible next steps:

- Tests (Vitest + React Testing Library)
- A page-number list instead of previous/next only, and syncing filters and page to the URL.

## Data source

Product data comes from [DummyJSON](https://dummyjson.com/). All products and images belong to that service and are used here for demonstration purposes only.
