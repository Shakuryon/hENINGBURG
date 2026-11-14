# Heningburg's Pressure Washing LLC — demo site

One-page redesign demo for Heningburg's Pressure Washing LLC (Mobile, AL), built by [ShakurWebsites](https://www.shakuryon.com).

Hand-coded HTML, CSS and JavaScript. No frameworks, no build step, flexbox only.

## Structure

```
public/
  index.html   page markup, SEO tags, LocalBusiness schema
  styles.css   base styles and animations
  media.css    every breakpoint (1100px, 900px, 600px), touch and reduced-motion rules
  index.js     nav, hero effects, scroll reveal, gallery filter, spray demo, quote form
  assets/      empty for now, see "Images" below
```

## Run it

Open `public/index.html` in a browser, or serve the `public/` folder with VS Code Live Server.

## Theme

Sunshine, water and speed in the colors of his logo:

| Token | Hex | Use |
| --- | --- | --- |
| `--wave` | `#2299CC` | main logo blue |
| `--deep` | `#006688` | dark logo teal |
| `--splash` | `#22EEEE` | logo spray cyan |
| `--abyss` | `#04384D` | text, outlines |
| `--sun` | `#FFD23F` | buttons, highlights |
| `--sand` | `#FFF8E3` | page background |

All artwork (sun, waves, droplets, speed lines) is original CSS. No game assets are used.

## Images

The logo and photos are loaded straight from his current site's image CDN, so the demo works right away. Before a real launch, save them into `public/assets/` and swap each `src`. Every spot is marked with an `<!-- IMAGE: ... -->` comment in `index.html`.

## Placeholders to confirm with Darren

Search `index.html` for `PLACEHOLDER`:

1. Founding year (shown as 2015, taken from the "since 11/04/2015" dates on his About page)
2. Blurbs for gutter, deck, fence and commercial services (his site lists them with no description)
3. Gallery alt text (generic for now)
4. Crew names matched to the right headshots
5. Business hours (shows "Call for availability")
6. Google reviews link for a "Read more on Google" button

## Notes

- "Book" buttons go to his existing Acuity scheduler, so nothing he uses today is lost.
- The quote form has no backend. It opens the visitor's email app with the request filled in. Swap for Netlify Forms or Formspree at launch.
