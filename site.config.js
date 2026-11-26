// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change the studio name, projects and prices.
//  Everything on the home page is rendered from this data.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  brand: "Another Network Guy",
  tagline: "Mac tools and indie games, made by one network guy.",
  supportEmail: "support@anothernetworkguy.com", // set up this mailbox (e.g. iCloud+ custom domain)

  // Mac app defaults (shown on app cards)
  minMacOS: "macOS 15 Sequoia or later",
  architectures: "Apple silicon",
  refundDays: 14,

  // Optional bundle offer for Mac apps. Set to null to hide it
  // (shown only when 2+ apps have a price).
  bundle: null,

  // Every project on the site. Each one becomes a card in its section.
  //
  //   kind:   "app"  → listed under "Mac apps"; sold here with your own checkout.
  //           "game" → listed under "Games"; sold through stores (itch.io, Steam).
  //   icon:   an emoji or a path like "img/macdiag-256.png"
  //   status: "coming-soon" | "in-development" → "Learn more" + "Get notified"
  //           "available" → apps: price + Trial/Buy; games: store buttons
  //   page:   optional link to the project's own page.
  //
  // Game-only fields:
  //   stage:     "Alpha", "Demo", "Early Access"… shown on the card
  //   platforms: list shown on the card
  //   stores:    [{ label: "itch.io", url: "…" }, { label: "Steam", url: "…" }]
  //              Leave empty until a store page exists; the card falls back
  //              to "Get notified".
  projects: [
    {
      kind: "app",
      id: "macdiag",
      name: "MacDiag",
      icon: "img/macdiag-256.png",
      summary: "Wi-Fi diagnostics for managed Mac fleets.",
      description:
        "Records what the Mac saw before, during and after a Wi-Fi drop — signal, roams, gateway and DNS checks, system logs — and saves it as an evidence bundle you can line up with your access point and RADIUS logs.",
      features: [
        "Live link view: RSSI, SNR, Tx rate, roams",
        "Rules that capture bundles automatically",
        "One-key comments on the same timeline",
        "Reversible low-level Wi-Fi controls",
        "One .pkg for Mosyle, Jamf and other MDMs",
      ],
      status: "coming-soon",
      page: "macdiag/",
      price: "",       // TODO: set when pricing is decided, then status: "available"
      version: "0.1",
      buyUrl: "#",      // TODO: checkout link
      downloadUrl: "#", // TODO: link to the .pkg
    },
    {
      kind: "game",
      id: "pocketrealm",
      name: "Pocket Realm",
      icon: "img/pocketrealm-256.png",
      summary: "A cozy roguelite city builder.",
      description:
        "Grow history's great cities one short run at a time, racing to a golden age before history catches up. Keep your people fed, clothed and happy while the Nile floods a little further every cycle.",
      features: [
        "Short runs: fill Prosperity before Unrest",
        "Homes that visibly grow, fade and fall",
        "Floods, hard years and rising needs",
        "Cozy mode that never ends the run",
      ],
      status: "in-development",
      page: "pocketrealm/",
      stage: "Alpha",
      platforms: ["Windows", "macOS", "Linux"],
      stores: [], // TODO: add { label: "itch.io", url: "https://…itch.io/pocket-realm" } when the page is live
    },
  ],
};
