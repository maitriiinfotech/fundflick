<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FundFlick Project Guidelines & Theme Rules (STRICT)

All AI agents editing this repository must strictly adhere to the styling, theme, layout, and animation guidelines described below. Do not deviate.

---

## 1. Typography & Fonts
* **Headers & Display Titles** (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `.font-display`): **Outfit** (loaded via direct `@import` from Google Fonts in [globals.css](file:///c:/Users/PC/Desktop/fundlfick2/fundflick-new/app/globals.css)).
* **Body Text & General UI** (`body`, `.font-sans`): **Plus Jakarta Sans** (loaded from Google Fonts).
* **Code/Numbers** (`.font-mono`): **Geist Mono** (Next.js default mono font).

---

## 2. Color Palette & Classes
* **Primary Deep Navy/Dark Blue**: `#131c33` (Use classes: `bg-primaryColor`, `text-blue-600`, `text-customcolor`).
* **Accent Electric Blue**: `#2b7fff` (Use classes: `bg-secondaryColor`, `text-purple-600`, `text-secondaryColor`).
* **Background Light Theme Grid**: Radial dot pattern `bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px]`.
* **Light Theme Text**: Use `text-slate-800` (body descriptions), `text-slate-900` (headings), and `text-slate-600` (subtext).

---

## 3. Navbar & Global Layout Rules
* The **Navbar** is rendered as a global fixed component in [layout.tsx](file:///c:/Users/PC/Desktop/fundlfick2/fundflick-new/app/layout.tsx). 
  * It has `fixed` position and `z-[9999]`.
  * **DO NOT** duplicate or redeclare the Navbar inside landing page files (e.g., `page.tsx` or `Hero.tsx`).
* **Theme Containers**: The root layout body defaults to dark bg (`bg-[#0f1729]`). Light pages (like the landing page) must explicitly wrap themselves in `bg-white` and use `pt-20` (to push main content below the fixed navbar).

---

## 4. Hero Animation Rules (GSAP & Flip)
To avoid jitter and maintain seamless animations in [Hero.tsx](file:///c:/Users/PC/Desktop/fundlfick2/fundflick-new/app/components/landing/Hero.tsx):
* **Curtain Z-Index**: The loading curtain element (`curtainRef`) **MUST** have `z-[99999]` to render *above* the fixed navbar during page load.
* **Flip Animations**:
  * **DO NOT** set `absolute: true` in the `Flip.from(...)` call. It injects inline layouts that conflict with CSS positions.
  * **DO NOT** use `onComplete` props to strip inline styling inside the `Flip.from(...)` call (this triggers sudden shifts/snaps in cards).
* **Card Position Management**: All card layout percentages (`top`, `left`, `transform: scale() rotate()`) **MUST** be defined in [globals.css](file:///c:/Users/PC/Desktop/fundlfick2/fundflick-new/app/globals.css#L346-L365) inside `@media (max-width: 768px)` and `@media (min-width: 769px)` media queries targeting `.animated-grid .img-card:nth-child(i)`. Do not inline offsets or positional coordinates in TypeScript files.
* **Organic Scattered Positions**: Keep cards scattered across all quadrants of the hero area (Top-Left, Top-Right, Center-Middle, Bottom-Left, Bottom-Right) rather than grouping them in one place, so the background looks balanced behind the front title.

