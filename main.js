(function () {
  const S = window.SITE;
  const projects = S.projects || S.apps || [];
  const apps = projects.filter((p) => (p.kind || "app") === "app");
  const games = projects.filter((p) => p.kind === "game");

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (i) =>
    /\.(png|jpe?g|svg|webp)$/i.test(i)
      ? `<img src="${esc(i)}" alt="" />`
      : `<span aria-hidden="true">${esc(i)}</span>`;
  const $ = (sel) => document.querySelectorAll(sel);
  const notify = (p) =>
    `mailto:${esc(S.supportEmail)}?subject=${encodeURIComponent("Notify me: " + p.name)}`;
  const isUpcoming = (p) => p.status !== "available";

  // Global text bits
  $("[data-brand]").forEach((el) => (el.textContent = S.brand));
  $("[data-tagline]").forEach((el) => (el.textContent = S.tagline));
  $("[data-arch]").forEach((el) => (el.textContent = "✓ " + S.architectures));
  $("[data-minos]").forEach((el) => (el.textContent = "✓ " + S.minMacOS));
  $("[data-refund]").forEach((el) => (el.textContent = S.refundDays));
  $("[data-email]").forEach((el) => {
    el.href = "mailto:" + S.supportEmail;
    if (el.textContent.includes("@")) el.textContent = S.supportEmail;
  });
  if (document.body.dataset.page === "home") document.title = `${S.brand} — Mac tools and indie games`;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const cardHead = (p) => `
        <div class="card-head">
          <div class="app-icon">${icon(p.icon)}</div>
          <div>
            <h3>${p.page ? `<a href="${esc(p.page)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
            <p class="muted">${esc(p.summary)}</p>
          </div>
        </div>
        <p>${esc(p.description)}</p>
        <ul class="features">${(p.features || []).map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`;

  const upcomingFoot = (p) => `
          <span class="pill">${p.status === "in-development" ? "In development" : "Coming soon"}</span>
          <div class="card-actions">
            ${p.page ? `<a class="btn btn-ghost btn-small" href="${esc(p.page)}">Learn more</a>` : ""}
            <a class="btn btn-small" href="${notify(p)}">Get notified</a>
          </div>`;

  // App cards
  const appCard = (a) => `
      <article class="card" id="${esc(a.id)}">
        ${cardHead(a)}
        <div class="card-foot">
          ${isUpcoming(a)
            ? upcomingFoot(a)
            : `<span class="price">${esc(a.price)}</span>
          <div class="card-actions">
            <a class="btn btn-ghost btn-small" href="${esc(a.downloadUrl)}">Free trial</a>
            <a class="btn btn-small" href="${esc(a.buyUrl)}">Buy</a>
          </div>`}
        </div>
        <p class="meta">v${esc(a.version)} · ${esc(S.minMacOS)}</p>
      </article>`;

  // Game cards. Store links (itch.io, Steam) replace "Get notified" once they exist.
  const gameCard = (g) => {
    const stores = g.stores || [];
    const foot = stores.length
      ? `<span class="pill">${esc(g.stage || (isUpcoming(g) ? "In development" : "Out now"))}</span>
          <div class="card-actions">
            ${g.page ? `<a class="btn btn-ghost btn-small" href="${esc(g.page)}">Learn more</a>` : ""}
            ${stores.map((s, i) => `<a class="btn btn-small${i ? " btn-ghost" : ""}" href="${esc(s.url)}" rel="noopener">${esc(s.label)}</a>`).join("")}
          </div>`
      : upcomingFoot(g);
    const meta = [g.stage, ...(g.platforms || [])].filter(Boolean).map(esc).join(" · ");
    return `
      <article class="card game" id="${esc(g.id)}">
        ${cardHead(g)}
        <div class="card-foot">${foot}</div>
        ${meta ? `<p class="meta">${meta}</p>` : ""}
      </article>`;
  };

  const fill = (gridId, sectionId, list, render) => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    if (!list.length) {
      const section = document.getElementById(sectionId);
      if (section) section.hidden = true;
      $(`a[href="#${sectionId}"]`).forEach((el) => (el.hidden = true));
      return;
    }
    grid.classList.toggle("single", list.length === 1);
    grid.innerHTML = list.map(render).join("");
  };
  fill("app-grid", "apps", apps, appCard);
  fill("game-grid", "games", games, gameCard);

  // Pricing covers Mac apps only; games are sold through their stores.
  const forSale = apps.filter((a) => !isUpcoming(a) && a.price);
  const pricing = document.getElementById("pricing");
  if (pricing && !forSale.length) {
    pricing.hidden = true;
    $('a[href="#pricing"]').forEach((el) => (el.hidden = true));
  }
  // FAQ entries about licenses, trials and refunds only make sense once something is on sale.
  $("[data-on-sale]").forEach((el) => (el.hidden = !forSale.length));

  // Bundle
  const bundle = document.getElementById("bundle");
  if (bundle && S.bundle && forSale.length > 1) {
    const b = S.bundle;
    bundle.innerHTML = `
      <div class="bundle">
        <div>
          <p class="eyebrow">Best value</p>
          <h3>${esc(b.name)}</h3>
          <p class="muted">${esc(b.blurb)}</p>
          <p class="bundle-apps">${forSale.map((a) => icon(a.icon) + " " + esc(a.name)).join(" &nbsp;·&nbsp; ")}</p>
        </div>
        <div class="bundle-buy">
          <div><span class="price big">${esc(b.price)}</span>${b.was ? ` <s class="muted">${esc(b.was)}</s>` : ""}</div>
          <a class="btn" href="${esc(b.buyUrl)}">Buy the bundle</a>
        </div>
      </div>`;
  }

  // Price list
  const list = document.getElementById("price-list");
  if (list) {
    list.innerHTML = forSale
      .map(
        (a) => `
      <div class="price-row">
        <span class="app-icon sm">${icon(a.icon)}</span>
        <span class="price-name">${esc(a.name)}</span>
        <span class="price">${esc(a.price)}</span>
        <a class="btn btn-small" href="${esc(a.buyUrl)}">Buy</a>
      </div>`
      )
      .join("");
  }
})();
