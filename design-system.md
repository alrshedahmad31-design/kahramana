# Design System — Kahramana Baghdad

> **Scope**: This document describes the core design tokens, rules, and component specifications used in the Kahramana Baghdad project. It is optimized for a premium, mobile-first, and bilingual (Arabic/English) experience.

---

## 0) Core Principles

- **Mobile‑first & Premium**: All dimensions and spacing are calculated for high-end mobile experiences.
- **Bilingual (RTL/LTR)**: Fully supports `dir="rtl"` (Arabic) and `dir="ltr"` (English) using CSS Logical Properties.
- **Token-Driven**: No hardcoded values. All styles must reference the defined CSS variables.

---

# 1) Foundations

## 1.1 Color Palette

### 1.1.1 Base Palette
| Token | Hex | Description |
|---|---:|---|
| `--color-gold` | `#d4af37` | Primary Gold accent |
| `--color-saddle` | `#944e2c` | Secondary Saddle (Spice) |
| `--color-coffee` | `#6e4531` | Deep Coffee (Primary BG) |
| `--color-walnut` | `#5f311a` | Dark Walnut (Secondary Surface) |

### 1.1.2 Semantic Application
- **Background**: `--bg-primary` (Coffee), `--bg-secondary` (Walnut), `--bg-surface` (Gold tint).
- **Text**: `--text-primary` (Gold), `--text-body` (Ivory), `--text-muted` (Sand).
- **Interactive**: `--brand-gold` (Alias for Gold), `--brand-spice` (Alias for Saddle).
- **Borders**: `--border-1` (Light gold tint), `--border-2` (Medium gold tint).

---

## 1.2 Typography

### Font Stack
- **Primary**: `Cairo`, system-ui, sans-serif.
- **Scale**:
  - **H1**: 1.75rem (28px).
  - **H2**: 1.375rem (22px).
  - **H3**: 1.125rem (18px).
  - **Body**: 1rem (16px).
  - **Small**: 0.875rem (14px).

---

## 1.3 Layout & Spacing

### Spacing Scale
- `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (24px), `6` (32px), `7` (48px), `8` (64px).
- **Page Gutter**: `--page-gutter` (16px).

### Radius
- `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `2xl` (32px), `pill` (9999px).

### 1.5 Breakpoints (Tailwind Defaults)
- **sm**: `640px` (Small tablets / Large phones)
- **md**: `768px` (Tablets)
- **lg**: `1024px` (Laptops / Desktop)
- **xl**: `1280px` (Large Desktop)
- **2xl**: `1536px` (Ultra-wide)

### Dimension Targets
- **Header Top**: 60px.
- **Bottom Navigation**: 64px.
- **Tap Target**: 48px.

---

## 1.4 Effects & Motion

- **Shadows**:
  - `shadow-1`: subtle card elevation.
  - `shadow-2`: float / tooltip.
  - `shadow-3`: sheet / drawer.
  - `shadow-gold`: CTA glow.
- **Liquid Gold**: Animated gradient text for premium branding.
- **Motion**:
  - `--motion-instant` (80ms), `--motion-fast` (150ms), `--motion-base` (250ms), `--motion-slow` (400ms).
  - Easing: `--easing-standard` (cubic-bezier(0.4, 0, 0.2, 1)).

---

# 2) Component System

- **Hero**: Consistent full-width component with gradient overaly for readability.
- **Cards**: branchCard, MenuCard, and RecipeCard sharing the same surface logic.
- **Navigation**:
  - **Top Bar**: Minimalist logo and primary actions.
  - **Bottom Bar**: Floating capsule design for mobile navigation.
- **Cart System**: A custom client-side cart (`public/js/cart.js`) handling BHD currency and branch-specific WhatsApp orders. Loaded via `next/script` in the root layout.

---

# 3) Best Practices

- Use **CSS Logical Properties** (e.g., `margin-inline-start` instead of `margin-left`).
- Ensure **44px minimum tap targets**.
- Use `.icon-dir` or `.icon--mirror-rtl` for directional icons that need flipping in RTL.
- Always prefer `.webp` for image assets and confirm background patterns have low opacity (3-4%).
