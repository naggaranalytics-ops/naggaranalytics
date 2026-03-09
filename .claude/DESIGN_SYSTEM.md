# Naggar Analytics — Design System Reference

This file is the single source of truth for colors, fonts, and theme behavior.
AI agents and developers must follow these guidelines for all UI work.

---

## Theme System

- **Mechanism**: CSS custom properties on `<html>` via `data-theme="dark|light"` attribute
- **Provider**: `context/ThemeProvider.tsx` — React Context with `useTheme()` hook
- **Persistence**: `localStorage` key `"na-theme"`, default `"dark"`
- **Transitions**: Global 0.15s ease on `background-color, border-color, color`
- **CSS overrides**: `globals.css` overrides hardcoded Tailwind classes in light mode (e.g., `.text-white`, `.bg-[#050a10]`)

### Rules for Components
1. **Prefer CSS variables** (`var(--text-primary)`, `var(--bg-secondary)`) in `style` props
2. If using Tailwind classes like `text-white`, `bg-white/5`, `text-slate-*` — they are auto-overridden in light mode by `globals.css`
3. **Never use raw hex colors** for backgrounds or text that need to adapt to theme (e.g., `#fff`, `#000`)
4. **Brand color `#16a085`** is theme-invariant — use it directly
5. **Accent color `#fbbf24`** is theme-invariant — use it directly
6. For canvas/JS drawings, use `useTheme()` hook and adapt colors programmatically

---

## Color Palette

### Brand Colors (Theme-Invariant)
| Token        | Value     | Usage                      |
|--------------|-----------|----------------------------|
| `primary`    | `#16a085` | CTA buttons, links, badges |
| `primary-light` | `#48c9b0` | Canvas dots (dark mode)  |
| `accent`     | `#fbbf24` | Highlights, regression line |

### Dark Theme (Default)
| CSS Variable        | Value                        | Usage           |
|---------------------|------------------------------|-----------------|
| `--bg-primary`      | `#111821`                    | Main background |
| `--bg-secondary`    | `#0d141d`                    | Sidebar, cards  |
| `--bg-tertiary`     | `#050a10`                    | Footer, deep bg |
| `--bg-card`         | `rgba(17, 24, 33, 0.6)`     | Card backgrounds|
| `--text-primary`    | `#ffffff`                    | Headings, body  |
| `--text-secondary`  | `#94a3b8`                    | Descriptions    |
| `--text-muted`      | `#64748b`                    | Captions, hints |
| `--border-color`    | `rgba(255, 255, 255, 0.05)`  | Borders         |
| `--border-hover`    | `rgba(255, 255, 255, 0.1)`   | Hover borders   |
| `--glass-bg`        | `radial-gradient(...)` dark  | Glass cards     |
| `--glass-border`    | `rgba(248, 249, 250, 0.08)`  | Glass borders   |
| `--glass-shadow`    | `rgba(0, 0, 0, 0.8)`        | Glass shadows   |
| `--navbar-bg`       | `rgba(17, 24, 33, 0.7)`     | Navbar          |
| `--footer-bg`       | `#050a10`                    | Footer          |
| `--input-bg`        | `rgba(255, 255, 255, 0.05)`  | Form inputs     |
| `--input-border`    | `rgba(255, 255, 255, 0.1)`   | Input borders   |

### Light Theme
| CSS Variable        | Value                        | Usage           |
|---------------------|------------------------------|-----------------|
| `--bg-primary`      | `#ffffff`                    | Main background |
| `--bg-secondary`    | `#f8fafc`                    | Sidebar, cards  |
| `--bg-tertiary`     | `#f1f5f9`                    | Footer, deep bg |
| `--bg-card`         | `rgba(255, 255, 255, 0.7)`   | Card backgrounds|
| `--text-primary`    | `#0f172a`                    | Headings, body  |
| `--text-secondary`  | `#475569`                    | Descriptions    |
| `--text-muted`      | `#64748b`                    | Captions, hints |
| `--border-color`    | `rgba(0, 0, 0, 0.05)`       | Borders         |
| `--border-hover`    | `rgba(0, 0, 0, 0.1)`        | Hover borders   |
| `--glass-bg`        | `rgba(255, 255, 255, 0.8)`   | Glass cards     |
| `--glass-border`    | `rgba(255, 255, 255, 0.4)`   | Glass borders   |
| `--glass-shadow`    | `rgba(0, 0, 0, 0.05)`       | Glass shadows   |
| `--navbar-bg`       | `rgba(255, 255, 255, 0.8)`   | Navbar          |
| `--footer-bg`       | `#f8fafc`                    | Footer          |
| `--input-bg`        | `rgba(0, 0, 0, 0.02)`       | Form inputs     |
| `--input-border`    | `rgba(0, 0, 0, 0.06)`       | Input borders   |

---

## Fonts

| Family                  | CSS Variable                      | Tailwind Class  | Usage                        |
|-------------------------|-----------------------------------|-----------------|------------------------------|
| **Inter**               | `var(--font-inter)`               | `font-sans`     | Default body text, headings  |
| **IBM Plex Sans Arabic**| `var(--font-ibm-plex-sans-arabic)`| `font-arabic`   | Arabic text, bilingual UI    |
| **Courier Prime**       | `var(--font-courier-prime)`       | `font-mono`     | Code, labels, badges, stats  |

### Font Weights
- **Inter**: 100–900 (variable)
- **IBM Plex Sans Arabic**: 300 (light), 400 (regular), 700 (bold)
- **Courier Prime**: 400 (regular), 700 (bold)

---

## Logos

| File                          | Theme | Usage                |
|-------------------------------|-------|----------------------|
| `/logo/logo-light.svg`       | Light | Navbar, sidebar (light mode) |
| `/logo/logo-dark.svg`        | Dark  | Navbar, sidebar (dark mode)  |
| `/logo/logo.svg`             | —     | Fallback / favicon   |
| `/logo/logo-arabic-light.png`| Light | Arabic branding      |
| `/logo/logo-arabic-dark.png` | Dark  | Arabic branding      |

---

## Key Files

| File                           | Purpose                                    |
|--------------------------------|--------------------------------------------|
| `app/globals.css`              | CSS variables, theme overrides, glass cards|
| `context/ThemeProvider.tsx`    | Theme state, toggle, persistence           |
| `context/LanguageProvider.tsx` | Language (en/ar), RTL, translations        |
| `tailwind.config.ts`          | Tailwind color/font extensions             |
| `app/layout.tsx`              | Font loading, provider wrapping            |

---

## Do's and Don'ts

**DO:**
- Use `style={{ color: 'var(--text-primary)' }}` for theme-adaptive inline styles
- Use `.glass-card` class for card components
- Use `useTheme()` in client components that need programmatic theme access
- Test both themes when adding any new UI

**DON'T:**
- Use raw `bg-white`, `bg-black`, `bg-gray-*` — they won't adapt
- Hardcode hex colors for backgrounds/text without a globals.css override
- Forget to handle both themes in canvas/JS-rendered elements
- Use `dark:` Tailwind prefix — this project uses `data-theme` attribute, not Tailwind dark mode
