# Implementation Plan: Homepage Sections (Tailwind Migration)

## Overview

Migrate `app/page.tsx` from its inline CSS approach (the `styles` constant with ~300 lines of vanilla CSS) to Tailwind CSS utility classes. The five-section structure, semantic markup, placeholder content, and responsive behavior are preserved — only the styling mechanism changes. Each task provides Why/Where/How coaching so you can implement the conversion yourself.

## Tasks

- [x] 1. Clean up page structure and globals
  - [x] 1.1 Remove the `styles` constant and fix the page wrapper
    - **Why:** The `styles` const is a ~300-line CSS string that's already commented out. The page also renders its own `<main id="main-content">` inside layout's `<main className="flex-1">`, creating a nested `<main>` — a semantic HTML violation (Req 6.1). Cleaning this up first gives you a blank canvas for the Tailwind conversion.
    - **Where:** `app/page.tsx` — the top-level `styles` template literal, the `Eyebrow` helper component, the `PlaceholderBlock` helper component, and the `HomePage` default export's `<main>` wrapper.
    - **How:**
      - Delete the entire `styles` constant (lines ~6–300 approximately)
      - Delete the `Eyebrow` and `PlaceholderBlock` helper components (you'll inline their styling with Tailwind)
      - In the `HomePage` export, replace `<><main id="main-content">…</main></>` with just `<>…</>` (fragments only, sections as direct children) — the layout already provides the `<main>` landmark
      - Remove the commented-out `{/* <style>{styles}</style> */}` line
    - _Requirements: 1.1, 5.1, 5.2, 6.1_

  - [x] 1.2 Add smooth-scroll and reduced-motion styles to globals.css
    - **Why:** Requirement 2.3 asks for smooth-scroll on fragment navigation. This is a CSS-only solution — no JS scroll handlers needed. It belongs in `globals.css` since it targets `html` globally.
    - **Where:** `app/globals.css` — append after the existing `body` rule.
    - **How:**
      - Add `html { scroll-behavior: smooth; }`
      - Add a `@media (prefers-reduced-motion: reduce)` block that sets `html { scroll-behavior: auto; }`
    - _Requirements: 2.3, 2.4_

- [x] 2. Convert Hero section to Tailwind
  - [x] 2.1 Refactor `HeroSection` with Tailwind utility classes
    - **Why:** The Hero uses ~25 custom CSS classes for its dark background, gradient overlay, 2-column grid, badge, headline, stats row, and placeholder cards. Converting to Tailwind brings it in line with the design system and removes dependency on the deleted CSS.
    - **Where:** `app/page.tsx` — the `HeroSection` function component.
    - **How:**
      - Section element: `<section id="hero" aria-labelledby="hero-heading" className="bg-zinc-950 text-white py-16 lg:py-28 overflow-hidden relative">`
      - Gradient overlay: Add a `<div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(91,79,233,0.22) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255,107,53,0.12) 0%, transparent 60%)' }} />` — the radial gradient is too complex for Tailwind utilities, so an inline style is acceptable here
      - Container: `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`
      - Inner grid: `<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">`
      - Badge: `inline-flex items-center gap-2 bg-[#5B4FE9]/20 border border-[#5B4FE9]/40 rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#A89EF6] mb-6`
      - Headline `<h1>`: `text-4xl lg:text-7xl font-extrabold leading-tight tracking-tight` with `<em className="not-italic text-[#5B4FE9]">`
      - Body paragraph: `mt-5 text-base lg:text-lg leading-relaxed text-zinc-400 max-w-md`
      - Actions div: `flex gap-3.5 mt-9 flex-wrap`
      - Primary button: `bg-[#FF6B35] hover:bg-[#D9531E] text-white rounded-md px-7 py-3.5 text-sm font-bold transition-colors`
      - Ghost button: `bg-transparent text-zinc-400 border border-zinc-600 hover:text-white hover:border-zinc-400 rounded-md px-7 py-3.5 text-sm font-semibold transition-colors`
      - Stats row: `flex gap-8 mt-12 pt-8 border-t border-white/10`
      - Stat value: `text-3xl font-extrabold tracking-tight`; stat label: `text-xs text-zinc-500 mt-0.5 font-medium`
      - Visual column: `hidden lg:flex flex-col gap-4` (preserves mobile-hide behavior)
      - Placeholder cards: `bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4`
      - Placeholder icon box: `w-11 h-11 rounded-md bg-[#5B4FE9]/25 shrink-0`
      - Placeholder lines: `h-2.5 rounded bg-white/10 mb-2` with varying widths
      - Animate badge dot: Use Tailwind's `animate-pulse` on the dot span (`w-2 h-2 bg-[#5B4FE9] rounded-full animate-pulse`)
    - _Requirements: 1.1, 1.2, 1.4, 2.1, 3.1, 3.3, 4.1, 4.4, 5.1, 5.3, 5.4, 6.1, 6.2_

- [x] 3. Convert Coming Up section to Tailwind
  - [x] 3.1 Refactor `ComingUpSection` with Tailwind utility classes
    - **Why:** Event cards use a 3→2→1 column responsive grid. The section has a header row with eyebrow/title/subtitle on the left and a CTA button on the right.
    - **Where:** `app/page.tsx` — the `ComingUpSection` function component.
    - **How:**
      - Section: `<section id="coming-up" aria-labelledby="coming-up-heading" className="bg-white py-16 lg:py-28 border-b border-zinc-200">`
      - Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
      - Header row: `flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12`
      - Eyebrow pattern (inline, replacing the helper): `<p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B4FE9] border-l-[3px] border-[#5B4FE9] pl-2.5 mb-5">Coming Up</p>`
      - Section title `<h2>`: `text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-zinc-950`
      - Subtitle: `mt-3 text-base leading-relaxed text-zinc-500 max-w-lg`
      - Button: same primary button pattern as Hero, add `shrink-0`
      - Event grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` with `role="list"`
      - Event card `<article>`: `border border-zinc-200 rounded-xl overflow-hidden` with `role="listitem"`
      - Card image placeholder: `h-40 bg-zinc-100` with `aria-hidden="true"`
      - Card body: `p-5`
      - Tag: `inline-block bg-[#EAE8FD] text-[#5B4FE9] rounded px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide`
      - Title/info skeleton lines: `h-3.5 rounded bg-zinc-100 mb-2.5` (vary widths with inline style or arbitrary w-)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 4.1, 4.2, 4.3, 5.1, 5.3, 5.4, 6.1, 6.2, 6.3_

- [x] 4. Convert About section to Tailwind
  - [x] 4.1 Refactor `AboutSection` with Tailwind utility classes
    - **Why:** 2-column layout (text + visual) with a 2×2 value cards grid. Uses the light surface background (`zinc-50`) to visually separate from the white sections above/below.
    - **Where:** `app/page.tsx` — the `AboutSection` function component.
    - **How:**
      - Section: `<section id="about" aria-labelledby="about-heading" className="bg-zinc-50 py-16 lg:py-28">`
      - Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
      - Inner grid: `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`
      - Text column: eyebrow + h2 + subtitle (same patterns as Coming Up)
      - Value cards grid: `mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4` with `role="list"`
      - Value card: `<div className="bg-white border border-zinc-200 rounded-xl p-5" role="listitem">`
      - Icon placeholder: `w-9 h-9 rounded-md bg-[#EAE8FD] mb-3` with `aria-hidden="true"`
      - Title/body skeleton lines: `h-3 rounded bg-zinc-100 w-[70%] mb-2` and `h-2.5 rounded bg-zinc-100`
      - Visual column: `<div className="h-60 lg:h-96 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 text-sm font-semibold">Community photo / illustration</div>`
      - On mobile, visual should appear first — use `order-first lg:order-none` on the visual div or restructure the grid with `lg:order-` utilities
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 4.1, 4.2, 4.3, 4.4, 5.1, 5.3, 5.4, 6.1, 6.2, 6.3_

- [x] 5. Convert Explore Groups section to Tailwind
  - [x] 5.1 Refactor `ExploreGroupsSection` with Tailwind utility classes
    - **Why:** 4-column group cards on desktop, 2 on tablet, 1 on mobile. Structurally similar to Coming Up but with a different card anatomy (avatar, name, description, footer with members count and join button).
    - **Where:** `app/page.tsx` — the `ExploreGroupsSection` function component.
    - **How:**
      - Section: `<section id="explore-groups" aria-labelledby="explore-groups-heading" className="bg-white py-16 lg:py-28 border-b border-zinc-200">`
      - Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
      - Header: same pattern as Coming Up (eyebrow + title + subtitle + button)
      - Group grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5` with `role="list"`
      - Group card: `border border-zinc-200 rounded-xl p-5 flex flex-col gap-3.5` with `role="listitem"`
      - Avatar placeholder: `w-13 h-13 rounded-full bg-zinc-100` with `aria-hidden="true"`
      - Name skeleton: `h-3.5 rounded bg-zinc-100 w-3/4`
      - Description skeletons: `h-2.5 rounded bg-zinc-100` (first full width, second `w-[55%]`)
      - Card footer: `flex justify-between items-center mt-1 pt-3.5 border-t border-zinc-200`
      - Members placeholder: `h-2.5 w-1/2 rounded bg-zinc-100`
      - Join button placeholder: `h-7 w-15 rounded-md bg-[#EAE8FD]`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 4.1, 4.2, 4.3, 4.4, 5.1, 5.3, 5.4, 6.1, 6.2, 6.3_

- [x] 6. Convert Sponsors section to Tailwind
  - [x] 6.1 Refactor `SponsorsSection` with Tailwind utility classes
    - **Why:** Centered layout with tiered logo rows (Gold, Silver, Bronze). Light surface background. CTA area at the bottom with a border separator.
    - **Where:** `app/page.tsx` — the `SponsorsSection` function component.
    - **How:**
      - Section: `<section id="sponsors" aria-labelledby="sponsors-heading" className="bg-zinc-50 py-12 lg:py-20">`
      - Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
      - Header: `text-center mb-12`
      - Eyebrow (centered variant): add `justify-center` and use `border-l-0` or omit the left border, using the standard eyebrow classes otherwise
      - Section title: add `text-center` to the h2
      - Intro paragraph: `text-base text-zinc-500 max-w-md mx-auto mt-2.5 leading-relaxed`
      - Tier container: `mb-10` (last tier: `mb-0`)
      - Tier label: `text-xs font-bold uppercase tracking-widest text-zinc-500 text-center mb-6`
      - Logos row: `flex justify-center items-center gap-6 flex-wrap`
      - Logo placeholder (gold): `w-44 h-[72px] border border-zinc-200 rounded-md bg-white flex items-center justify-center text-zinc-400 text-xs font-semibold`
      - Logo placeholder (silver): `w-36 h-14` (same base classes, different size)
      - Logo placeholder (bronze): `w-28 h-12` (same base classes, different size)
      - CTA area: `text-center mt-12 pt-10 border-t border-zinc-200`
      - CTA paragraph: `text-zinc-500 text-sm mb-4`
      - CTA button: same primary button pattern
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 4.1, 4.2, 4.3, 4.4, 5.1, 5.3, 5.4, 6.1, 6.2, 6.3_

- [x] 7. Checkpoint — Visual verification and build check
  - Ensure all tests pass, ask the user if questions arise.
  - Run `npm run build` to confirm no TypeScript or compilation errors
  - Visually compare the rendered page at 375px, 800px, and 1280px viewports to confirm layout parity
  - Verify no horizontal scrollbar appears at any width
  - Confirm the `styles` constant and all old CSS class names are fully removed
  - _Requirements: 3.4, 5.1, 5.2_

- [x] 8. Add component unit tests
  - [x] 8.1 Set up Vitest and React Testing Library
    - **Why:** The project has no test framework yet. Vitest integrates well with Next.js and Tailwind. React Testing Library provides DOM-level assertions to verify semantic structure without needing a browser.
    - **Where:** Create `vitest.config.ts` at project root; add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` as dev dependencies in `package.json`; add a `"test"` script.
    - **How:**
      - Install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`
      - Create `vitest.config.ts` with `plugins: [react()]`, `test: { environment: 'jsdom', setupFiles: ['./vitest.setup.ts'] }`
      - Create `vitest.setup.ts` that imports `@testing-library/jest-dom`
      - Add `"test": "vitest --run"` to `package.json` scripts
    - _Requirements: (infrastructure for validating 1.1, 1.4, 2.1, 6.1, 6.2, 6.3)_

  - [x] 8.2 Write unit tests for section structure and accessibility
    - **Why:** Verify the five sections render in correct order with proper IDs, aria attributes, heading hierarchy, and placeholder item counts — catching regressions if the markup is accidentally changed.
    - **Where:** Create `app/page.test.tsx`
    - **How:**
      - Test: renders exactly 5 `<section>` elements → `getAllByRole('region')` or query by tag
      - Test: sections appear in correct DOM order → check `id` attributes sequence: `hero`, `coming-up`, `about`, `explore-groups`, `sponsors`
      - Test: each section has `aria-labelledby` referencing its heading → for each section, verify the `aria-labelledby` value matches an element's `id` within that section
      - Test: Hero contains exactly one `<h1>` → `getAllByRole('heading', { level: 1 })` has length 1
      - Test: Other sections use `<h2>` → verify 4 `<h2>` elements exist
      - Test: decorative elements have `aria-hidden="true"` → query elements with `aria-hidden` and confirm they exist
      - Test: container pattern is present → query for elements with class containing `max-w-7xl`
      - Test: Coming Up has ≥ 2 event cards, About has ≥ 2 value cards, Explore Groups has ≥ 2 group cards, Sponsors has ≥ 2 logo placeholders per tier
    - _Requirements: 1.1, 1.4, 2.1, 2.2, 4.3, 5.3, 6.1, 6.2, 6.3_

- [x] 9. Final checkpoint — All tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Run `npm run test` and `npm run build` to confirm everything is green
  - Confirm no `<style>` tags or CSS module imports remain in the output
  - _Requirements: 5.1, 5.2_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The design explicitly states property-based testing does NOT apply to this feature (static UI with no input variation), so no PBT tasks are included
- The coaching style (Why/Where/How) is intentional — the developer implements the code themselves using this guidance
- The `styles` constant removal in task 1.1 is the single breaking change; all subsequent tasks build the Tailwind replacements section by section
- Brand colors use arbitrary values (`[#5B4FE9]`, `[#FF6B35]`) matching the Header's approach with `[#5865F2]`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "5.1", "6.1"] },
    { "id": 2, "tasks": ["8.1"] },
    { "id": 3, "tasks": ["8.2"] }
  ]
}
```
