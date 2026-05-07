# Design System: phucbm.com

## 1. Visual Theme & Atmosphere

**Editorial Minimalism — Content as Structure.**

The site fuses personal publishing with frontend craft. The overall mood is
**quiet confidence** — warm typographic hierarchy and generous whitespace, but
never sparse. The parchment substrate and Garamond headings signal a person
who reads and thinks, not just ships.

The design philosophy: content does the talking. No gradients, no shadows, no
decorative elements. Sections are separated by whitespace and hairline rules.
When something appears, it earns its place.

**Key Characteristics:**
- Serif headings (EB Garamond) paired with geometric sans body (Plus Jakarta Sans)
- Hairline 0.5px borders as the only UI structure
- Warm parchment background softens the editorial column
- Single dusty blue accent for all interactive and link states
- Italic section titles as the primary visual rhythm marker
- No cards, no badges, no custom MDX components in content files

---

## 2. Color Palette & Roles

### Light Mode
- **Parchment** (`#F5F3EF`) — Page background. Warm, unbleached, not pure white.
- **Ink** (`#1E1C18`) — Primary text, headings, structural elements.
- **Stone** (`#3A3830`) — Body text, paragraph content.
- **Graphite** (`#5A5248`) — Secondary text, descriptions, metadata.
- **Dust** (`#8A8070`) — Muted text, dates, italic footnotes, currently line.
- **Hairline** (`#D6D3CC`) — All borders: nav, section dividers, footer.
- **Surface** (`#FAF9F6`) — Subtle background for hover states only.

### Dark Mode
- Tokens swap via `.dark` class. Warm dark background, not pure black.
- All color tokens defined as CSS variables, dark variants set on `.dark`.

### Accent (both modes)
- **Dusty Blue** (`#2D5A8E`) — The single accent color. Used for: link hover
  states, "open to work" indicator, section "view all" links, footer link
  hovers. High contrast, accessible, never decorative.
- **Blue tint** (`#2D5A8E14`) — Accent background, used sparingly.
- **Blue border** (`#2D5A8E44`) — Underline on links at rest.

---

## 3. Typography Rules

**Heading font:** EB Garamond (`subset=vietnamese`)
**Body font:** Plus Jakarta Sans (`subset=vietnamese`)
**Both fonts must include Vietnamese subset** — the site publishes Vietnamese
content and language learning notes.

**Base size:** 18px · **Line height:** 1.85 (body), 1.3 (headings)

**Hard rule: No UI element may render below 18px font size.** This applies to
nav links, footer links, metadata, descriptions, labels — everything visible
to the user. The only exception is sub-pixel decorative borders.

Two fonts carry the full typographic system. EB Garamond handles all headings
and section titles. Plus Jakarta Sans handles all body, navigation, labels, and
metadata. Weight is kept light throughout — Garamond at 400, Plus Jakarta Sans
at 300 for body and 400 for UI elements.

### Scale

| Role | Font | Size | Weight | Style |
|---|---|---|---|---|
| Page heading h1 | EB Garamond | 30px | 400 | Normal |
| Section title | EB Garamond | 20px | 400 | Italic |
| Item title | Plus Jakarta Sans | 18px | 400 | Normal |
| Body / description | Plus Jakarta Sans | 18px | 300 | Normal |
| Nav links | Plus Jakarta Sans | 18px | 400 | Normal |
| Meta / dates / muted | Plus Jakarta Sans | 18px | 300 | Italic |
| Footer links | Plus Jakarta Sans | 18px | 300 | Normal |
| Nav logo | EB Garamond | 18px | 400 | Normal |

**Section titles** are always italic EB Garamond. This is the primary visual
rhythm marker across the homepage and all section pages.

**Never use font-weight above 500.** The pairing relies on contrast between
serif and sans, not weight contrast.

---

## 4. Component Styling

### Navigation
- Logo: pixel art icon, links to homepage.
- Links (curated): Bookmarks, Components only. Plus Jakarta Sans 18px,
  color `#5A5248` at rest, `#2D5A8E` on hover.
- ThemeSwitch on the right.
- `border-bottom: 0.5px solid #D6D3CC` separates nav from content.
- No active underline, no hamburger menu, no icons, no decorative brackets.

### Hero / Bio Section
- H1 in EB Garamond 30px, two lines max.
- Body paragraph in Plus Jakarta Sans 18px weight 300.
- Currently line: italic, 18px, color `#8A8070`, inline with "open to work"
  link in dusty blue.
- `border-bottom: 0.5px solid #D6D3CC` closes the section.

### Section Headers
- Section title (italic Garamond 20px) on its own line.
- `margin-bottom: 1.5rem` before content.

### Project / Writing Lists
- Plain `<ul>` with no bullets. Each item: title link + description paragraph.
- Title: 18px weight 400, `#1E1C18`, underline `#1E1C1830` at rest, goes
  dusty blue on hover.
- Description: 18px weight 300, `#5A5248`, line-height 1.7.
- Gap between items: `1.5rem`.
- No cards, no borders, no background fills on items.

### Writing Placeholder
- Single italic paragraph in `#8A8070` when no posts exist yet.
- Replaced by writing list once posts are published.

### Previously / Clients
- Single prose paragraph. Client names bolded (`font-weight: 400`,
  `color: #1E1C18`) within surrounding weight-300 text.
- No logo grid, no list, no cards.

### Footer
- `border-top: 0.5px solid #D6D3CC`.
- Left: copyright, 18px weight 300, `#8A8070`.
- Right: secondary links (all non-nav pages + GitHub, RSS), same style.

### Horizontal Rules
- `border-top: 0.5px solid #D6D3CC`. Hairline only, never accent color.

---

## 5. Layout Principles

### Container
- Max content width: **640px**, centered.
- Outer padding: `2.5rem` horizontal.
- Full-bleed parchment background behind the centered column.

### Spacing Rhythm
- Section padding: `2.5rem` top and bottom.
- Hero padding: `4rem` top, `3rem` bottom.
- Item gaps within sections: `1.25rem` to `1.5rem`.
- Nav padding: `1.5rem` vertical, `2.5rem` horizontal.

### MDX Content Rules
- All content pages are `.mdx`.
- MDX files use only standard markdown syntax: headings, paragraphs, links,
  lists, code blocks, blockquotes.
- No custom layout components called inside `.mdx` files.
- Registry-specific components (RegistryInstall, RegistryDemo, etc.) are
  allowed inside component documentation pages only.

### Borders
- All borders are `0.5px solid`. Never 1px, never 2px.
- Only hairline `#D6D3CC` in structural use. Dusty blue border only on
  interactive link underlines.
- No `box-shadow` anywhere.
- `border-radius: 0` on all elements.

### Dark Mode
- Warm dark background, not `#000000`.
- All tokens via CSS variables, dark variants on `.dark` class.
- Vietnamese diacritics must render correctly in both modes — test with
  ắ ặ ổ ợ ữ ế ồ ơ ư.

### Design Decisions to Preserve
- Two fonts only: EB Garamond and Plus Jakarta Sans. Never add a third.
- One accent color only: `#2D5A8E`. Never introduce a second accent.
- No custom layout components inside MDX content files.
- No cards, badges, tags, or chip elements anywhere on the site.
- Font weight ceiling: 500. Never use 600, 700, or bold.
- Section titles are always italic EB Garamond. Never break this pattern.
- No UI element may render below 18px font size. This is a hard rule.
