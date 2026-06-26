# 🌌 NeuralGrid — Next-Gen AI Data Automation Platform

A premium, high-converting, high-performance landing page for an advanced AI-driven data automation platform, engineered to satisfy strict constraints for speed, SEO hygiene, motion choreography, and layout responsiveness.

Live Sandbox URL: **[https://neuralgrid.vercel.app](https://neuralgrid.vercel.app)** *(Placeholder/Demo Link)*

---

## 🚀 Key Features & Architectural Highlights

### ⚡ Feature 1: Matrix-Driven Pricing & Performance-Isolated Currency Switcher
*   **Dynamic Matrix Logic**: Implements a complete multi-dimensional rate matrix mapping pricing plans (`Core Compute`, `Neural Hub`, `Synapse Grid`) against currencies (`USD`, `INR`, `EUR`), factoring in regional tariff coefficients (`USD: 1.0`, `INR: 1.08`, `EUR: 0.95`) and a flat **20% annual discount multiplier** dynamically.
*   **Zero-Re-render State Isolation Guardrail**: Changes to the billing cycle toggle or currency dropdown **do not trigger React state re-renders** or page layout reflows. Using a target-ref model (`useRef`), the component directly mutates the `textContent` of the pricing text nodes in the DOM. This isolates updates strictly to the target DOM elements, achieving maximum rendering performance.

### 🍱 Feature 2: Bento-to-Accordion Wrapper with Context Lock
*   **Adaptive Layout**: Desktop viewports feature an asymmetric, interactive Bento Grid. On mobile viewports (<768px), the layout refactors into a fluid, touch-optimized Accordion list.
*   **Context Lock Mechanism**: If a user hovers over/interacts with a specific bento node on desktop and resizes the viewport past the mobile breakpoint, the active index context is programmatically transferred to the mobile Accordion state, keeping the corresponding panel open smoothly.
*   **Zero-Dependency Animation**: Crafted strictly from scratch without external runtime animation engines or UI component libraries (no Radix, Shadcn, Framer Motion, HeadlessUI, or GSAP). Uses native hardware-accelerated CSS transitions/animations and curves.

### ⏱️ Initial Loading Sequence Performance
*   **Non-Blocking Page Hydration**: Features a micro-loader overlay executing and fading out within a strict **500ms threshold** (`400ms` progress loading bar + `100ms` fade-out transition).
*   **TTI Optimization**: The React tree renders immediately underneath the overlay; semantic HTML crawling and Time to Interactive (TTI) are completely unaffected.

### 🌐 SEO Hygiene & Semantic HTML
*   **Semantic DOM Structure**: Built with clean, accessible landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<blockquote/>`, `<footer>`) avoiding deep, nested division loops.
*   **Full OG/Meta Spec**: Integrated metadata headers, including:
    *   Primary page headers (`title`, `description`, `canonical`)
    *   Open Graph Tags (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`, etc.)
    *   Twitter Card Tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
    *   Indexing crawl control (`robots`, `author`, `theme-color`)
*   **Accessibility (a11y)**: Proper descriptive image text, label bindings, keyboard navigation hooks, and unique element ID identifiers.

---

## 🎨 Asset Compliance & Visual Guidelines
*   **Color Palette**: Strictly constraints layout styling using CSS custom properties matching the design brief (Canvas `#172836`, Glass `#114C5A`, Arctic `#F1F6F4`, Mint `#D9E8E2`, Forsythia `#FFC801`, Saffron `#FF9932`).
*   **Typography**: Loaded through custom CSS Head links, setting two primary families: `Inter` for body copy/text headings and `JetBrains Mono` for tabular metrics and technical terminal components.
*   **SVG Pack**: Integrates the standard SVG icons (from the provided package) for brand identifiers, arrow path animations, pricing signals, card icons, and accordion toggles.

---

## 🛠️ Tech Stack & Scripts
*   **Core**: React 19 + Vite 8 (ES Modules)
*   **Styling**: Tailwind CSS + Custom CSS Variables
*   **Linter**: Oxlint (High-speed linting)

### Scripts
In the project directory, you can run:

```bash
# Install dependencies
npm install

# Run the development server (local: http://localhost:5173)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
