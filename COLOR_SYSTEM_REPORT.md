# Color System Report

Summary
1) Tailwind dark mode is configured as `class`, but no `ThemeProvider` is wired in `src/app/layout.tsx`, so no global dark class is applied by default.
2) The core theme tokens live in `src/app/globals.css` (`:root` + `.dark`) and are mapped to Tailwind color utilities via the `@theme` block.
3) Global base styles apply `bg-background` and `text-foreground` to `body`, but most key screens (including `/`) override colors with hardcoded hex/rgba classes.
4) UI primitives (Button, Card, Badge, Separator) use token-based Tailwind classes (`bg-primary`, `text-foreground`, `border-border`).
5) The home page relies heavily on bespoke gradients and hex colors (e.g. `bg-[#0b0e1a]`, `text-[#5ef2ff]`), bypassing tokens.
6) Dark styling is effectively “always on” for the home page due to explicit classes, not because of a global dark theme.

---

## A) Dark Mode Default

**Is it default?** NO (not applied globally).

**Evidence**
- `tailwind.config.ts` uses class-based dark mode:
```ts
// tailwind.config.ts
const config: Config = {
  darkMode: "class",
  // ...
};
```
- Theme tokens are defined for light and dark, but `.dark` only activates when a `.dark` class exists:
```css
/* src/app/globals.css */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  /* ... */
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```
- There is a `ThemeProvider` with `defaultTheme="dark"`, but it is not used in the app layout:
```tsx
// src/components/ui/theme-provider.tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem={false}
>
```
```tsx
// src/app/layout.tsx
<html lang="en">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
  </body>
</html>
```

**How to change default to light mode**
- If you plan to use `next-themes`:
  1) Wrap `children` with `ThemeProvider` in `src/app/layout.tsx`.
  2) Set `defaultTheme="light"` (or omit it and use `enableSystem={true}` if you want system preference).
- If you do not plan to use `next-themes`: keep as-is. Light tokens are already the default because `.dark` is never applied globally.

---

## B) Color Tokens Map

**Where tokens are defined**
- Light values: `src/app/globals.css` `:root` block.
- Dark values: `src/app/globals.css` `.dark` block.

**Tokens declared**
- Base: `--background`, `--foreground`
- Surfaces: `--card`, `--card-foreground`, `--popover`, `--popover-foreground`
- Brand/Actions: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--destructive`
- Utility: `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring`
- Data viz: `--chart-1` … `--chart-5`
- Sidebar: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`
- Other: `--radius`

**How tokens apply**
- `body` uses tokens by default:
```css
/* src/app/globals.css */
@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```
- UI components use token-based classes (examples below in section C).

---

## C) Tailwind Usage (Token Mapping)

**Where the mapping exists**
- The token-to-Tailwind color mapping is defined in `src/app/globals.css` via `@theme` (Tailwind v4 style):
```css
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... */
}
```

**Examples of token-backed utilities in use**
- Buttons use `bg-primary` / `text-primary-foreground` and related tokens:
```tsx
// src/components/ui/button.tsx
variant: {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}
```
- Cards and separators use token utilities:
```tsx
// src/components/ui/card.tsx
"bg-card text-card-foreground ... border"
```
```tsx
// src/components/ui/separator.tsx
"bg-border ..."
```

---

## D) Real Screens (Home Page `/`)

**Page background**
- Hardcoded in home root, not token-based:
```tsx
// src/components/home/HomeClient.tsx
<main className="min-h-screen bg-[#0b0e1a] text-white selection:bg-white/10">
```

**Header background + border**
- Hardcoded values in `SiteHeader`:
```tsx
// src/components/site-header.tsx
<header className="... border-b border-white/10 bg-[#050914]/80 ...">
```

**Headings text**
- In the hero, text inherits `text-white` from the section:
```tsx
// src/components/home/HomeClient.tsx
<section className="... bg-[#070b16] text-white ...">
  <motion.h1 className="text-3xl font-semibold ...">...</motion.h1>
```

**Body text**
- Explicit white with opacity:
```tsx
// src/components/home/HomeClient.tsx
<motion.p className="... text-white/70 ...">...</motion.p>
```

**Primary button background/text**
- Primary CTA overrides token styles with a fixed cyan/ink pair:
```tsx
// src/components/home/HomeClient.tsx
<Button className="... bg-[#35f0ff] text-[#050914] ...">
```

**Secondary button background/text**
- Ghost variant plus overrides:
```tsx
// src/components/home/HomeClient.tsx
<Button variant="ghost" className="... text-white hover:bg-white/5 ...">
```

**Links and hover states**
- Example: inline CTA link uses hardcoded cyan + hover to white:
```tsx
// src/components/home/HomeClient.tsx
className="... text-[#5ef2ff] hover:text-white ..."
```

**Cards/sections background**
- Multiple sections use hardcoded dark surfaces rather than `bg-card`:
```tsx
// src/components/home/HomeClient.tsx
<Section id="enhanced-capabilities" className="... bg-[#070a11]">
```
- Card-like containers use semi-transparent white on dark:
```tsx
// src/components/home/HomeClient.tsx
className="... border border-white/10 bg-white/3 ..."
```

---

## E) Inconsistencies / Overrides

**Hardcoded colors bypassing tokens (examples)**
- Home root/background and hero/section surfaces:
  - `src/components/home/HomeClient.tsx` uses many `bg-[#...]` and `text-[#...]` classes (e.g. `bg-[#0b0e1a]`, `bg-[#070b16]`, `text-[#5ef2ff]`).
- Header and menu styling:
  - `src/components/site-header.tsx` uses `bg-[#050914]/80`, `border-white/10`, gradients with `from-[#59e6ff] to-[#8f5eff]`.
- Consent banner and other pages also hardcode palettes:
  - `src/components/analytics/ConsentBanner.tsx` (`bg-[#050914]/95`, `text-[#5ef2ff]`).
  - `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/about/page.tsx`, `src/app/web-development/page.tsx` (many `bg-[#...]`, `text-[#...]`, and inline gradients).
- Global decorative styles hardcode RGBA gradients:
  - `src/app/globals.css` `.art-glass` and background helpers use fixed RGBA values.

**Why this matters**
- The app has tokenized colors, but most of the visible UI ignores them, making global theming (light/dark or brand changes) difficult.

**Refactor recommendations**
1) Introduce brand and surface tokens (e.g. `--brand-cyan`, `--brand-violet`, `--surface-1`, `--surface-2`, `--glass-1`) in `src/app/globals.css` and map them in `@theme`.
2) Replace repeated `bg-[#...]` and `text-[#...]` with token utilities (`bg-surface-1`, `text-brand-cyan`, etc.).
3) Move gradient strings to CSS variables (e.g. `--hero-gradient`) and reference them via `bg-[var(--hero-gradient)]` to centralize styling.
4) Use `bg-card`, `text-muted-foreground`, `border-border` for general structure, and only keep hardcoded colors for unique hero art.

