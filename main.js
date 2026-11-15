(function () {
  const S = window.SITE;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (i) =>
    /\.(png|jpe?g|svg|webp)$/i.test(i)
      ? `<img src="${esc(i)}" alt="" />`
      : `<span aria-hidden="true">${esc(i)}</span>`;
  const $ = (sel) => document.querySelectorAll(sel);

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
  if (document.body.dataset.page === "home") document.title = `${S.brand} — Mac diagnostic apps`;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // App cards
  const grid = document.getElementById("app-grid");
  if (grid) {
    grid.classList.toggle("single", S.apps.length === 1);
    grid.innerHTML = S.apps
      .map(
        (a) => `
      <article class="card" id="${esc(a.id)}">
        <div class="card-head">
          <div class="app-icon">${icon(a.icon)}</div>
          <div>
            <h3>${a.page ? `<a href="${esc(a.page)}">${esc(a.name)}</a>` : esc(a.name)}</h3>
            <p class="muted">${esc(a.summary)}</p>
          </div>
        </div>
        <p>${esc(a.description)}</p>
        <ul class="features">${a.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="card-foot">
          ${a.status === "coming-soon"
            ? `<span class="pill">Coming soon</span>
          <div class="card-actions">
            ${a.page ? `<a class="btn btn-ghost btn-small" href="${esc(a.page)}">Learn more</a>` : ""}
            <a class="btn btn-small" href="mailto:${esc(S.supportEmail)}?subject=${encodeURIComponent("Notify me: " + a.name)}">Get notified</a>
          </div>`
            : `<span class="price">${esc(a.price)}</span>
          <div class="card-actions">
            <a class="btn btn-ghost btn-small" href="${esc(a.downloadUrl)}">Free trial</a>
            <a class="btn btn-small" href="${esc(a.buyUrl)}">Buy</a>
          </div>`}
        </div>
        <p class="meta">v${esc(a.version)} · ${esc(S.minMacOS)}</p>
      </article>`
      )
      .join("");
  }

  const forSale = S.apps.filter((a) => a.status !== "coming-soon" && a.price);
  const pricing = document.getElementById("pricing");
  if (pricing && !forSale.length) {
    pricing.hidden = true;
    $('a[href="#pricing"]').forEach((el) => (el.hidden = true));
  }

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
