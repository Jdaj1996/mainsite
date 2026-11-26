# anothernetworkguy.com

Studio site for Another Network Guy: Mac apps and indie games. Plain HTML, CSS and JavaScript with no build step, served by GitHub Pages.

## Preview locally

```
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Adding a project

1. Add an entry to `projects` in `site.config.js` with `kind: "app"` or `kind: "game"`. The comments in that file list every field.
2. Put its icon in `img/` (256 px for cards, 64 px for the favicon).
3. Optional: give it its own page in a folder (`macdiag/`, `pocketrealm/`) and set `page` to that folder.

Apps show under **Mac apps** and are sold here (price, trial, buy). Games show under **Games** and link out to their stores: add `{ label: "itch.io", url: "…" }` to a game's `stores` and its "Get notified" buttons turn into store buttons, on the home page and on `pocketrealm/`.

A section with no projects in it hides itself. The Pricing section and the license, trial and refund FAQ entries stay hidden until a Mac app is `available` with a price.

When you change `styles.css`, `site.config.js` or `main.js`, bump the `?v=` number where the pages load them so browsers pick up the new file.
