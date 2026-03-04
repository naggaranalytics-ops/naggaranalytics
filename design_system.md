# Naggar Analytics Design System

This file serves as a reference for any AI agent or developer working on the Naggar Analytics website. It contains the exact guidelines for branding, colors, typography, and logos.

## 1. Typography (Fonts)
The application uses the following three Google Fonts:
- **Inter** (Primary English font)
  - Used for headings, body text, and general English UI elements.
  - Weights: 300 (light), 400 (regular), 600 (semibold), 800 (extrabold).
- **IBM Plex Sans Arabic** (Primary Arabic font)
  - Used for any Arabic text blocks, RTL sections, and translations.
  - Weights: 300 (light), 400 (regular), 700 (bold).
- **Courier Prime** (Monospace/Code font)
  - Used for technical subtitles, statistical terms (e.g., p-values, "Raw Data"), and stylized small headers.
  - Weights: 400 (regular), 700 (bold).

## 2. Color Palette
The primary design aesthetic is dark, sleek, and neon-accented.
- **Primary Accent (`primary` / `#16a085`)**: A vibrant teal/emerald green used for vital buttons, links, active states, glowing particle effects, and prominent borders.
- **Dark Background (`dark` / `#111821` & `#050a10`)**: The core background colors for the app sections.
- **Text (`white` & `slate-300`/`slate-400`)**: Standard text is white (`#FFFFFF`) for headers, and slate grays for body paragraphs to reduce eye strain.
- **Warning/Significance Accent (`#fbbf24`)**: A golden-yellow used to highlight statistical significance (e.g., p < 0.05) and the regression curve line.

## 3. Logos & Assets
When referencing or displaying the company logo, always use the SVG variant or the high-resolution transparent PNG counterparts in `public/logo/`.
- **Primary Logo:** `/logo/logo.svg` (High quality, infinitely scalable, transparent vector).
- **Fallback PNG (Light Text):** `/logo/logo-light.png`
- **Fallback PNG (Dark Text):** `/logo/logo-dark.png`
- **Icon Only:** `/logo/icon-light.png`, `/logo/icon-dark.png`
- **Arabic Text Variants:** `/logo/logo-arabic-light.png`, `/logo/logo-arabic-dark.png`

## 4. General Aesthetics
- **Transparency & Glassmorphism:** Cards and containers use translucent backgrounds (e.g., `bg-white/5` or `bg-dark/70`) with `backdrop-blur` to create a "glass" effect over the background.
- **Particles:** The global background utilizes `particles.js` with a dark radial gradient and glowing primary-color orbs underneath to simulate data nodes.
