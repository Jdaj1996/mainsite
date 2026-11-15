// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change your store name, apps, and prices.
//  Everything on the site is rendered from this data.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  brand: "Another Networking Guy",
  tagline: "Know exactly what's going on inside your Mac.",
  supportEmail: "support@anothernetworkingguy.com", // set up this mailbox (e.g. iCloud+ custom domain)
  minMacOS: "macOS 13 Ventura or later",
  architectures: "Apple silicon & Intel",
  refundDays: 14,

  // Optional bundle offer. Set to null to hide it.
  bundle: {
    name: "Complete Toolkit",
    price: "$39",
    was: "$56",
    blurb: "Every app, every update for that major version, one license.",
    buyUrl: "#", // TODO: checkout link from Lemon Squeezy / Paddle / Gumroad
  },

  // TODO: replace these placeholder apps with your real ones.
  // icon: any emoji or a path like "img/diskpulse.png"
  apps: [
    {
      id: "diskpulse",
      name: "DiskPulse",
      icon: "💽",
      summary: "SSD & drive health at a glance.",
      description:
        "Reads SMART data from internal and external drives, tracks wear level, reallocated sectors and temperature, and warns you before a drive fails.",
      features: ["SMART attribute viewer", "SSD wear & TBW tracking", "Menu bar alerts", "Exportable reports"],
      price: "$14",
      version: "1.0",
      buyUrl: "#",      // TODO: checkout link
      downloadUrl: "#", // TODO: link to the notarized .dmg (trial or full)
    },
    {
      id: "thermawatch",
      name: "ThermaWatch",
      icon: "🌡️",
      summary: "Live temperatures, fans and power draw.",
      description:
        "Monitors CPU/GPU temperatures, fan speeds and package power in real time, with history graphs so you can spot thermal throttling.",
      features: ["Per-sensor readings", "Fan RPM monitor", "Throttling detection", "History graphs"],
      price: "$12",
      version: "1.0",
      buyUrl: "#",
      downloadUrl: "#",
    },
    {
      id: "batterylab",
      name: "BatteryLab",
      icon: "🔋",
      summary: "The full story of your MacBook battery.",
      description:
        "Shows real capacity versus design capacity, cycle count, cell voltages and charge history, so you know when a battery service is worth it.",
      features: ["Health & cycle count", "Cell voltage readout", "Charge history", "Adapter details"],
      price: "$10",
      version: "1.0",
      buyUrl: "#",
      downloadUrl: "#",
    },
    {
      id: "systemreport",
      name: "SysReport",
      icon: "🩺",
      summary: "One-click full hardware report.",
      description:
        "Runs a complete hardware check and produces a shareable PDF — handy for repair shops, resale listings, or support tickets.",
      features: ["Full hardware inventory", "Pass / warn / fail checks", "PDF & JSON export", "Command-line mode"],
      price: "$20",
      version: "1.0",
      buyUrl: "#",
      downloadUrl: "#",
    },
  ],
};
