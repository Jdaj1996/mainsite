// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change your store name, apps, and prices.
//  Everything on the home page is rendered from this data.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  brand: "Another Networking Guy",
  tagline: "Diagnostics for the Macs on your network.",
  supportEmail: "support@anothernetworkingguy.com", // set up this mailbox (e.g. iCloud+ custom domain)
  minMacOS: "macOS 15 Sequoia or later",
  architectures: "Apple silicon",
  refundDays: 14,

  // Optional bundle offer. Set to null to hide it (shown only when 2+ apps have a price).
  bundle: null,

  // icon: any emoji or a path like "img/macdiag-256.png"
  // status: "available" shows price + Buy/Trial buttons;
  //         "coming-soon" hides them and shows "Learn more" + "Get notified".
  // page: optional link to the app's own page.
  apps: [
    {
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
        "Signed .pkg for Mosyle, Jamf and other MDMs",
      ],
      status: "coming-soon",
      page: "macdiag/",
      price: "",       // TODO: set when pricing is decided, then status: "available"
      version: "0.1",
      buyUrl: "#",      // TODO: checkout link
      downloadUrl: "#", // TODO: link to the notarized .pkg
    },
  ],
};
