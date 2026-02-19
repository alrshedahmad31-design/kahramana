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

### 1.1.1 Base Palette (Dark)
| Token | Hex | Description |
|---|---:|---|
| `--brand-60-ebony` | `#452C23` | Deep primary bg (Ebony) |
| `--brand-20-terracotta` | `#5F311A` | Secondary surfaces (Terracotta) |
| `--brand-10-gold` | `#C5A059` | Primary brand accent (Gold) |
| `--brand-10-orange` | `#BF5C26` | Interaction accent (Spice) |

### 1.1.2 Semantic Application
- **Background**: `--bg-primary` (Ebony), `--bg-secondary` (Terracotta), `--bg-tertiary` (Subtle gold tint).
- **Text**: `--text-primary` (Gold titles), `--text-body` (Warm sand), `--text-muted` (Muted sand), `--text-on-dark` (White).
- **Interactive**: `--brand-gold` (Primary gold), `--brand-spice` (Interaction/Spice).
- **Borders**: `--border-subtle` (Light translucent gold tint).

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
- **Cart System**: A custom client-side cart (`cart.js`) handling BHD currency and branch-specific WhatsApp orders.

---

# 3) Best Practices

- Use **CSS Logical Properties** (e.g., `margin-inline-start` instead of `margin-left`).
- Ensure **44px minimum tap targets**.
- Use `.icon-dir` or `.icon--mirror-rtl` for directional icons that need flipping in RTL.
- Always prefer `.webp` for image assets and confirm background patterns have low opacity (3-4%).
