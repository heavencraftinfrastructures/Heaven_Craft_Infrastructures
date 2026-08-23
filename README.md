# Heaven Craft — Premium Website

A cinematic, dark-luxury marketing site for Heaven Craft (interior design, exterior
design, construction, and architectural planning), built with Next.js 16 (App
Router), Tailwind CSS v4, and Framer Motion.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** with custom theme tokens (dark charcoal + brushed gold palette)
- **Framer Motion** for scroll reveals, parallax, staggered animation, and transitions
- Fully responsive, mobile-first layout
- `prefers-reduced-motion` fallback built into global styles

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx        Root layout, metadata
    page.tsx           Assembles all sections
    globals.css         Theme tokens, blueprint grid, grain, utility classes
  components/
    Navbar.tsx           Sticky nav, scroll morph, active-section highlight, mobile menu
    Hero.tsx             Cinematic parallax hero
    About.tsx            Company story, animated stat counters, Mission/Roles/Why cards
    ConstructionWork.tsx Filterable service grid (Interior/Exterior/Building/Road/Government)
    Planning.tsx          Planning story, step timeline, before/after slider,
                           simulation tabs, video showcase
    Showcase.tsx          Bento-style visual showcase grid
    Contact.tsx           Contact form (dummy submit), studio info, team contacts
    Footer.tsx            Footer links, services, socials
    ui/
      MagneticButton.tsx   CTA buttons with magnetic hover motion
      Counter.tsx           Animated count-up stat
      BeforeAfterSlider.tsx Drag-to-compare concept vs. completed image slider
      VideoCard.tsx          Hover-to-play muted video preview card
  lib/
    data.ts             All site copy, service data, planning steps, and media URLs
                         in one place — edit here to update content.
```

## Editing Content

Nearly everything text- and media-related lives in `src/lib/data.ts`:

- `IMG` — image URLs (currently high-quality Unsplash placeholders; swap for real
  project photography or local files under `/public/media/...`).
- `VIDEO` — placeholder video paths (`/media/planning/*.mp4`). Drop real MP4 files
  into `public/media/planning/` with matching names, or update the paths.
- `stats`, `advantageCards` — About section content and counters.
- `services` — Construction Work grid entries (category, title, description, image).
- `planningSteps` — the 7-step planning timeline.
- `simulationTabs` — Interior / Exterior / Structural simulation gallery images.
- `videoShowcase` — the three video preview cards in Planning.
- `showcaseItems` — the bento visual showcase grid.
- `teamContacts` — the two editable contact people (name, role, phone, email).
- `projectTypes` — dropdown options in the contact form.

## Using Real Media

1. Create `public/media/planning/` and `public/media/projects/` folders.
2. Add your MP4 clips (muted, looping, ideally < 10MB each, H.264) and HD images.
3. Update the corresponding paths in `src/lib/data.ts`.
4. If using an external image host other than Unsplash, add its hostname to
   `next.config.ts` under `images.remotePatterns`.

## Contact Form

The form in `src/components/Contact.tsx` currently does a dummy client-side
submit (simulated delay + success state). To wire it up for real, replace the
`handleSubmit` function with a call to your API route, email service (e.g.
Resend, SendGrid), or a form backend (e.g. Formspree).

## Notes

- Fonts use system font stacks (no external Google Fonts dependency) so the
  project builds reliably offline or behind restrictive networks. If you'd like
  to switch to the originally specified typefaces (Sora / Inter / Cormorant
  Garamond), reintroduce `next/font/google` in `src/app/layout.tsx` and update
  the `--font-display` / `--font-body` / `--font-serif` variables in
  `globals.css`.
- All animations respect `prefers-reduced-motion`.
