# كهرمانة بغداد — Kahramana Baghdad
## Next.js 14 + App Router + next-intl + Tailwind CSS

---

## Quick Start

```bash
npm install
npm run dev
```

Open: http://localhost:3000 → redirects to /ar

---

## Assets Setup

Copy your assets folder to /public:

```
public/
├── assets/         ← copy from your assets/ folder
│   ├── brand/
│   ├── hero/
│   ├── gallery/
│   ├── catering/
│   ├── branches/
│   ├── founder/
│   ├── pattern/
│   ├── recipes/
│   ├── seating/
│   └── story/
└── fonts/          ← copy from assets/fonts/
    ├── cairo-arabic-400.woff2
    ├── cairo-arabic-600.woff2
    ├── cairo-arabic-700.woff2
    └── cairo-arabic-900.woff2
```

---

## Project Structure

```
app/
  [locale]/
    layout.tsx          ← Root layout (HTML dir, fonts, providers)
    page.tsx            ← Home /ar or /en
    menu/page.tsx       ← /ar/menu
    our-story/page.tsx  ← /ar/our-story
    events/page.tsx     ← /ar/events
    branches/page.tsx   ← /ar/branches
    recipes/page.tsx    ← /ar/recipes

components/
  layout/
    Header.tsx          ← Top bar: logo + lang switcher + order CTA
    BottomNav.tsx       ← Mobile bottom navigation (5 tabs)
    Footer.tsx          ← Links + hours + social + WhatsApp

  ui/
    Hero.tsx            ← Unified hero (360/420/520px)
    Button.tsx          ← Primary / Secondary / Ghost / Icon
    SectionTitle.tsx    ← Section heading + subtitle

  cards/
    MenuItemCard.tsx
    BranchCard.tsx
    EventCard.tsx
    RecipeCard.tsx

  menu/
    MenuTabs.tsx        ← Category tabs + search (Client Component)

data/
  menu.json            ← Categories + items (static)
  events.json          ← Catering event types
  recipes.json         ← 3 Iraqi recipes with video

messages/
  ar.json             ← Arabic translations
  en.json             ← English translations

i18n/
  routing.ts          ← Locale config (ar default, en)
  request.ts          ← Server-side message loader
```

---

## Design Tokens

All tokens are in `app/globals.css`. Key variables:

```css
--color-bg             /* lace: #f5ebdb */
--color-surface        /* white */
--color-primary        /* gold: #d9ae24 */
--color-secondary      /* saddle: #944e2c */
--color-text           /* walnut: #5f311a */
--color-text-muted     /* coffee: #6e4531 */
--color-border         /* rgba(95,49,26,.18) */
```

---

## i18n (next-intl)

- Default locale: **ar** (RTL)
- Supported: **ar**, **en**
- Switch via the 🌐 button in Header
- All translations in `/messages/ar.json` and `/messages/en.json`

---

## Adding shadcn/ui components

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add [component]
```

components.json is not included — run init first.

---

## Icon System

Uses **Material Symbols Rounded** (Google CDN in globals.css).
Usage: `<span className="ms">home</span>`
Filled: `<span className="ms ms-filled">home</span>`
