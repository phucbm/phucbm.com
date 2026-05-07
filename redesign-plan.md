# phucbm.com Redesign Plan

## Scope

Migrate current UI to match `DESIGN.md`. Typography, color palette, navigation, footer, global spacing. Do not touch content files in `content/`. Do not change routing or MDX configuration. No new npm packages.

---

## 1. Fonts

**Install** – Download both `.ttf` files into `public/fonts/`:
- `public/fonts/EBGaramond[wght].ttf`
- `public/fonts/InstrumentSans-VariableFont_tnum,wght.ttf`

**Import** – in `src/app/layout.tsx`:

```tsx
import localFont from 'next/font/local'

const garamond = localFont({
  src: '../../public/fonts/EBGaramond[wght].ttf',
  variable: '--font-garamond',
  display: 'swap',
})

const sans = localFont({
  src: '../../public/fonts/InstrumentSans-VariableFont_tnum,wght.ttf',
  variable: '--font-sans',
  display: 'swap',
})
```

Apply to `<html>`:
```tsx
<html className={`${garamond.variable} ${sans.variable}`} …>
```

Tailwind usage: `font-garamond`, `font-sans`.

---

## 2. CSS Variables

**File:** `src/styles/theme.css`

### Light Mode (`:root`)

```css
--color-background: #F5F3EF;  /* Parchment */
--color-foreground: #1E1C18;   /* Ink – headings */
--color-muted: #3A3830;        /* Stone – body text */
--color-secondary: #5A5248;    /* Graphite – secondary text */
--color-accent: #2D5A8E;       /* Dusty Blue – links/hover */
--color-accent-subtle: #2D5A8E14; /* Blue tint */
--color-accent-underline: #2D5A8E44; /* Blue border */
--color-border: #D6D3CC;       /* Hairline */
--color-surface: #FAF9F6;      /* Hover surface */
--color-current: #8A8070;      /* Dust – muted text */
```

### Dark Mode (`.dark`)

```css
--color-background: #1E1C18;
--color-foreground: #F5F3EF;
--color-muted: #D6D3CC;
--color-secondary: #8A8070;
--color-accent: #5B9BD5;
--color-accent-subtle: #5B9BD514;
--color-accent-underline: #5B9BD544;
--color-border: #3A3830;
--color-surface: #2A2820;
--color-current: #5A5248;
```

**Remove** – all `brand`, `chart-*`, `sidebar-*` vars. All old colors.

---

## 3. Globals

**File:** `src/styles/globals.css`

### Base Reset

```css
@layer base {
  html {
    font-size: 18px;     /* Base size from DESIGN.md */
    line-height: 1.85;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-muted);
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.3;
    color: var(--color-foreground);
  }
}
```

### Typography Utilities

```css
@layer utilities {
  .font-garamond { font-family: var(--font-garamond), serif; }
  .font-sans { font-family: var(--font-sans), sans-serif; }

  .h1 { font-family: var(--font-garamond); font-size: 1.67rem; font-weight: 400; line-height: 1.3; color: var(--color-foreground); }
  .section-title { font-family: var(--font-garamond); font-size: 1.11rem; font-weight: 400; font-style: italic; color: var(--color-foreground); }
  .item-title { font-family: var(--font-sans); font-size: 0.78rem; font-weight: 400; }
  .body-text { font-family: var(--font-sans); font-size: 0.83rem; font-weight: 300; }
  .nav-link { font-family: var(--font-sans); font-size: 1rem; font-weight: 400; color: var(--color-secondary); text-decoration: none; }
  .nav-link:hover { color: var(--color-accent); }
  .meta-text { font-family: var(--font-sans); font-size: 0.72rem; font-weight: 300; font-style: italic; color: var(--color-current); }
  .footer-link { font-family: var(--font-sans); font-size: 0.67rem; font-weight: 300; color: var(--color-current); text-decoration: none; }
  .footer-link:hover { color: var(--color-accent); }

  .hairline { border-width: 0.5px; border-style: solid; border-color: var(--color-border); }
}
```

### List Styles

```css
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

li a.title-link {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--color-foreground);
  text-decoration: underline;
  text-decoration-color: var(--color-foreground);
  text-decoration-color: color-mix(in srgb, var(--color-foreground) 20%, transparent);
}
li a.title-link:hover {
  color: var(--color-accent);
}

li p.description {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 300;
  color: var(--color-secondary);
  line-height: 1.7;
  margin-top: 0.25rem;
}
```

### Horizontal Rules

```css
hr {
  border: none;
  border-top: 0.5px solid var(--color-border);
  margin: 0;
}
```

---

## 4. Layout

**File:** `src/app/layout.tsx`

Wrap `<article>` with container:

```tsx
<div className="bg-[var(--color-background)]">
  <div className="max-w-[640px] mx-auto px-10">
    <Gap height={4} className="!border-t-0"/>
    <CustomHeader/>
    <Gap height={14}/>
    <div className="py-2 px-1">
      {children}
    </div>
    <Gap height={14}/>
    <CustomFooter/>
    <Gap height={4} className="!border-b-0"/>
  </div>
</div>
```

---

## 5. Navigation

**File:** `src/components/custom-header.tsx`

Simplify to plain text links, no hamburger menu, no icons.

```tsx
<div className="flex items-center justify-between py-4 px-10 border-b hairline">
  <Logo/>
  <nav className="flex gap-6">
    {navItems.map(({href, title}) => (
      <Link key={href} href={href} className="nav-link">
        {title}
      </Link>
    ))}
  </nav>
</div>
```

- Logo: EB Garamond 17px → 0.94rem
- Nav links: Instrument Sans 16px (1rem), `color-secondary` at rest, `color-accent` on hover
- Hairline bottom border

---

## 6. Footer

**File:** `src/components/custom-footer.tsx`

```tsx
<div className="border-t hairline py-6 px-10 flex justify-between items-center" data-pagefind-ignore="all">
  <span className="footer-link">© {new Date().getFullYear()} Phuc Bui</span>
  <div className="flex gap-6">
    <a href="/reading" className="footer-link">Reading</a>
    <a href="/stats" className="footer-link">Stats</a>
    <a href="https://github.com/phucbm" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="/feed.xml" className="footer-link">RSS</a>
  </div>
</div>
```

- 12px (0.67rem) footer links allowed (not nav)
- Hairline top border

---

## 7. Section Titles

**Component:** `src/components/section-header.tsx`

```tsx
export function SectionHeader({title, href}: {title: string; href: string}) {
  return (
    <div className="mb-6">
      <h2 className="section-title inline">{title}</h2>
      <br/>
      <Link href={href} className="text-[18px] font-sans text-[var(--color-accent)] underline underline-offset-2" style={{textDecorationColor: 'var(--color-accent-underline)'}}>
        View all →
      </Link>
    </div>
  )
}
```

- Title: italic EB Garamond 20px (1.11rem)
- "View all →": same size as body (18px), dusty blue, underline

---

## 8. Project List Items

**Component:** `src/components/project-item.tsx`

```tsx
export function ProjectItem({title, href, description}: {title: string; href: string; description: string}) {
  return (
    <li>
      <Link href={href} className="title-link">{title}</Link>
      <p className="description">{description}</p>
    </li>
  )
}
```

---

## 9. Dark Mode

All colors via CSS variables, dark variants set in `.dark` block of `theme.css`. Hairline and accent color adjust automatically.

Vietnamese diacritics must render correctly in both modes (fonts include `subset=vietnamese`).

---

## 10. Cleanup

**Remove / disable:**
- `src/styles/theme.css` → remove dev utilities (`.decor-marks`, `.dev-*`, `.px-*`, brutalist article styles)
- `src/components/menu-bar.tsx` → not needed
- `src/components/mobile-menu.tsx` → not needed
- `src/components/navbar-link.tsx` → not needed
- `src/components/logo.tsx` → simplify to text only (no pixel art)
- Remove `nextra-theme-blog/style.css` import (or keep if Nextra requires it for layout)
- Remove CRT scanlines, dot patterns, diagonal bg utilities

---

## 11. Testing Checklist

- [ ] Base font size: 18px
- [ ] All text ≥ 18px (no 13px, 12px anywhere visible)
- [ ] EB Garamond headings, italic section titles
- [ ] Instrument Sans body/nav/UI
- [ ] Light mode: parchment background, correct palette
- [ ] Dark mode: warm dark background, vars swap correctly
- [ ] Nav: plain text, no hamburger, no icons
- [ ] Hairline borders throughout (0.5px)
- [ ] Center column max-640px
- [ ] Section titles italic Garamond
- [ ] Project/writing lists: no bullets, title + description
- [ ] Footer: copyright left, links right
- [ ] No cards, badges, shadows anywhere
- [ ] Vietnamese diacritics render correctly (ắ ặ ổ ợ ữ ế ồ ơ ư)