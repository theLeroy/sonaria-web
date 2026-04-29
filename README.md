# Project Template: Nuxt

Boilerplate for frontend-only Nuxt web projects (no backend/CMS required).

## Getting Started

Set up a local `.env` file and **replace all occurrences of `REPLACE_ME` in your `.env` file with your own values.**

```bash
cp .env.example .env
```

Install dependencies:

```bash
pnpm install
```

Update dependencies. The skeleton will be updated from time to time, but you may want to start with the latest package versions.

```bash
pnpm update
```

## Development Server

Start the development server at `http://localhost:3000`.

```bash
pnpm dev
```

(Optional) Host on a `.novu.io` domain

```bash
# Laravel Herd
herd proxy workshop-web.novu.io http://localhost:3000

# Laravel Valet
valet proxy workshop-web.novu.io http://localhost:3000
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview the production build:

```bash
pnpm preview
```

## Structure

- `app/pages/`: regular Nuxt pages (`index`, `legal`, …)
- `app/components/app/`: app shell components (navigation, language switcher)
- `app/components/ui/`: reusable UI building blocks
- `app/components/utils/`: low-level layout/debug primitives
