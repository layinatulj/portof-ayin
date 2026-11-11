(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const pages = [
    ["Home", "index.html"], ["About", "about.html"], ["Skills", "skills.html"],
    ["Projects", "projects.html"], ["Experience", "experience.html"], ["Contact", "contact.html"]
  ];
  const currentPage = location.pathname.split("/").pop() || "index.html";

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="nav-wrap">
          <a class="brand" href="index.html">LAYINATUL JANIBAH<span></span></a>
          <button class="menu-toggle" aria-label="Buka navigasi" aria-expanded="false"><span></span><span></span></button>
          <nav class="main-nav" aria-label="Navigasi utama">
            ${pages.map(([label, href]) => `<a href="${href}" ${currentPage === href ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
            <button class="theme-toggle" type="button" aria-label="Aktifkan dark mode" title="Ganti tema"><span class="theme-icon">☾</span></button>
          </nav>
        </div>
      </header>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer"><div class="section-shell footer-inner">
        <a class="brand brand-footer" href="index.html">LAYINATUL JANIBAH<span>.</span></a>
        <p>Building meaningful learning experiences through technology.</p>
        <span class="footer-copy">© <span class="current-year"></span> Layinatul Janibah</span>
      </div></footer>`;
  }

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Theme preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";
  const themeToggle = document.querySelector(".theme-toggle");
  const updateThemeIcon = () => {
    if (!themeToggle) return;
    const dark = document.documentElement.dataset.theme === "dark";
    themeToggle.querySelector(".theme-icon").textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", dark ? "Aktifkan light mode" : "Aktifkan dark mode");
  };
  updateThemeIcon();
  themeToggle?.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    updateThemeIcon();
  });

  // External profile and document links
  document.querySelectorAll("[data-cv-link]").forEach(link => {
    if (config.cvUrl) link.href = config.cvUrl;
    else {
      link.href = "#";
      link.addEventListener("click", e => { e.preventDefault(); alert("Tambahkan link CV pada js/config.js terlebih dahulu."); });
    }
  });

  const profileImage = document.querySelector("[data-profile-image]");
  const profilePlaceholder = document.querySelector("[data-profile-placeholder]");
  if (profileImage && config.profileImage) {
    profileImage.src = config.profileImage;
    profileImage.hidden = false;
    profilePlaceholder?.setAttribute("hidden", "");
    profileImage.addEventListener("error", () => {
      profileImage.hidden = true;
      profilePlaceholder?.removeAttribute("hidden");
    });
  }
  const aboutImage = document.querySelector("[data-about-image]");
  const aboutPlaceholder = document.querySelector("[data-about-placeholder]");
  if (aboutImage && (config.aboutImage || config.profileImage)) {
    aboutImage.src = config.aboutImage || config.profileImage;
    aboutImage.hidden = false;
    aboutPlaceholder?.setAttribute("hidden", "");
    aboutImage.addEventListener("error", () => {
      aboutImage.hidden = true;
      aboutPlaceholder?.removeAttribute("hidden");
    });
  }

  const socialLinks = document.querySelector("[data-social-links]");
  if (socialLinks) {
    const links = [["GitHub", config.github], ["LinkedIn", config.linkedin], ["Email", config.email ? `mailto:${config.email}` : ""]];
    socialLinks.innerHTML = links.filter(x => x[1]).map(([label, href]) =>
      `<a href="${escapeAttr(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${label} ↗</a>`
    ).join("");
  }
  const contactLinks = document.querySelector("[data-contact-links]");
  if (contactLinks) {
    const items = [
      ["Email", config.email ? `mailto:${config.email}` : "", config.email],
      ["LinkedIn", config.linkedin, "Kunjungi profil LinkedIn"],
      ["GitHub", config.github, "Lihat repository"]
    ].filter(x => x[1]);
    contactLinks.innerHTML = items.length ? items.map(([label, href, detail]) =>
      `<a class="contact-link" href="${escapeAttr(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}><span>${label}</span><strong>${escapeHTML(detail)} ↗</strong></a>`
    ).join("") : `<p class="muted">Tambahkan email, LinkedIn, dan GitHub pada file <code>js/config.js</code>.</p>`;
  }

  document.querySelectorAll("[data-link-placeholder]").forEach(link => {
    link.addEventListener("click", e => {
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
        alert("Ganti tautan placeholder ini dengan link dokumentasi atau sertifikat Anda.");
      }
    });
  });
  document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());

  // Subtle reveal animation
  const revealItems = document.querySelectorAll(".reveal, .feature-card, .value-card, .skill-card, .experience-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else revealItems.forEach(el => el.classList.add("is-visible"));

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function escapeAttr(value) { return escapeHTML(value); }
})();

document.querySelectorAll("[data-about-image]").forEach(img => {
    const placeholder = img
        .closest(".about-photo")
        ?.querySelector("[data-about-placeholder]");

    img.addEventListener("load", () => {
        if (placeholder) placeholder.hidden = true;
    });

    img.addEventListener("error", () => {
        if (placeholder) placeholder.hidden = false;
    });

    if (img.complete && img.naturalWidth > 0) {
        if (placeholder) placeholder.hidden = true;
    }
});