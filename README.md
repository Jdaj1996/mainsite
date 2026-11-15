# mainsite

Storefront for Mac diagnostic apps sold directly (outside the Mac App Store).
Plain HTML/CSS/JS — no build step.

## Editing

Almost everything lives in **`site.config.js`**: brand name, support email, apps, prices,
checkout links and download links. Each app has:

| field         | what it is                                                        |
|---------------|-------------------------------------------------------------------|
| `icon`        | an emoji, or an image path like `img/macdiag-256.png`             |
| `status`      | `"available"` (price + Buy/Trial) or `"coming-soon"` (Get notified) |
| `page`        | optional link to the app's own page, e.g. `macdiag/`              |
| `buyUrl`      | checkout link from your payment provider                          |
| `downloadUrl` | link to the notarized `.dmg`                                      |

Each app can have its own page in a folder (see `macdiag/index.html`, which reuses `styles.css`
and adds `macdiag/macdiag.css`). The Pricing section hides itself until an app is on sale.

`privacy.html` and `terms.html` describe the site as it is now, with nothing on sale. Before selling,
add license, refund and payment-provider sections to both. FAQ entries marked `data-on-sale` in
`index.html` (licensing, trials, refunds) stay hidden until an app has `status: "available"` and a price.

## Preview locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Selling outside the App Store — checklist

1. **Payments:** use a *merchant of record* (Lemon Squeezy, Paddle, or Gumroad) so they handle
   sales tax/VAT worldwide. Lemon Squeezy and Paddle also generate **license keys** and have a
   license-validation API your apps can call. Create one product per app (+ the bundle) and paste
   each checkout link into `buyUrl`.
2. **Code signing:** join the Apple Developer Program ($99/yr), sign each app with a
   **Developer ID Application** certificate, and enable the Hardened Runtime.
3. **Notarization:** `xcrun notarytool submit App.dmg --keychain-profile <profile> --wait`,
   then `xcrun stapler staple App.dmg`. Without this, macOS Gatekeeper blocks the app.
4. **Hosting the DMGs:** GitHub Releases, Cloudflare R2, or your payment provider's file delivery.
5. **Updates:** add [Sparkle](https://sparkle-project.org) to each app for in-app updates.

## Deploy (GitHub Pages)

Push to `main`, then on GitHub: **Settings → Pages → Deploy from a branch → `main` / root**.
To use your own domain, add it under Pages and create a `CNAME` DNS record.
