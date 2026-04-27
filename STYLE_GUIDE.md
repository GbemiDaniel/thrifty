# Style Guide: Frontend Architecture

This project follows a strict styling architecture optimized for Next.js (App Router) and React (JSX). All AI agents and developers must adhere to these rules to prevent CSS bloat and layout collisions.

## 1. Core Stack
- **Framework:** Next.js (App Router).
- **Library:** React (JSX - No TypeScript).
- **Styling:** Tailwind CSS v4 + CSS Modules.

## 2. Tailwind v4 (The Macro Layer)
Use Tailwind utility classes directly in JSX for structural layout.
- **Scope:** Containers, sections, page-level grids, and flexbox alignment.
- **Theming:** Tailwind v4 does NOT use `tailwind.config.js`. All custom tokens (colors, fluid typography, spacing) are defined natively via the `@theme` directive in `app/globals.css`.
- **Fluid Typography:** Always use the clamp-based fluid scales defined in the theme (e.g., `text-fluid-p`, `text-fluid-h1`) rather than fixed pixel sizes.

## 3. CSS Modules (The Micro Layer)
Use CSS Modules strictly for the internal aesthetics of reusable components.
- **Scope:** Buttons, cards, complex hover states, pseudo-elements, and bespoke animations.
- **File Naming:** Create `[ComponentName].module.css` alongside its respective `.jsx` file.
- **The Golden Rule:** NEVER mix Tailwind layout classes and CSS Module classes on the exact same HTML element. Wrap the stylized module component in a Tailwind layout container.

## 4. Brand Placeholders
If a global brand name or tagline is required in the copy but has not yet been finalized by design, use the following placeholder exactly:

> **"Thrifty, Elevate your style effortlessly"**

---
