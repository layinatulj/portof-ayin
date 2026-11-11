
(() => {
  const projects = window.PROJECTS || [];
  const grid = document.getElementById("projects-grid");
  const filters = document.getElementById("project-filters");
  const count = document.getElementById("project-count");
  const empty = document.getElementById("projects-empty");
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModal = modal?.querySelector(".modal-close");
  const lightbox = document.getElementById("image-lightbox");

  let activeImages = [];
  let activeImageIndex = 0;
  let lastFocused = null;

  if (!grid) return;

  // Mengamankan teks sebelum dimasukkan ke HTML
  const esc = value =>
    String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  const validUrl = value =>
    typeof value === "string" && /^https?:\/\//i.test(value);

  // Mengubah link Google Drive menjadi URL thumbnail gambar
  function normalizeImageUrl(url) {
    if (!validUrl(url)) return "";

    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("drive.google.com")) {
        let fileId = "";

        // Format: /file/d/ID/view atau /file/d/ID/preview
        const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);

        if (match) {
          fileId = match[1];
        }

        // Format: ?id=ID
        if (!fileId) {
          fileId = parsed.searchParams.get("id") || "";
        }

        if (fileId) {
          return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`;
        }
      }

      return url;
    } catch (error) {
      return "";
    }
  }

  const linkButton = (url, label, cls = "button button-secondary button-small") =>
    validUrl(url)
      ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`
      : "";

  // Tampilan jika gambar tidak tersedia
  function imageFallback() {
    return `
      <div class="image-error">
        <span>🖼️</span>
        <small>Gambar tidak dapat dimuat</small>
      </div>
    `;
  }

  // Menampilkan daftar proyek
  function render(list) {
    grid.innerHTML = list.map(project => {
      const isGame = project.type === "game";

      const gameImages = isGame && Array.isArray(project.images)
        ? project.images.map(normalizeImageUrl).filter(Boolean)
        : [];

      let preview;

      if (isGame) {
        // Game menggunakan gambar pertama sebagai thumbnail card
        preview = gameImages.length
          ? `
            <div class="project-image-preview">
              <img
                src="${esc(gameImages[0])}"
                alt="Preview ${esc(project.title)}"
                loading="lazy"
                onerror="this.parentElement.classList.add('image-error'); this.remove();"
              >
              <span class="preview-label">GAME DOCUMENTATION</span>
            </div>
          `
          : `
            <div class="project-placeholder">
              <span>🎮</span>
              <small>GAME DOCUMENTATION</small>
            </div>
          `;
      } else if (validUrl(project.url)) {
        preview = `
          <div class="iframe-preview">
            <iframe
              src="${esc(project.url)}"
              title="Preview ${esc(project.title)}"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
            <span class="preview-label">LIVE PREVIEW</span>
          </div>
        `;
      } else {
        preview = `
          <div class="project-placeholder">
            <span>↗</span>
            <small>WEBSITE PREVIEW</small>
          </div>
        `;
      }

      return `
        <article class="project-card" data-project-id="${esc(project.id)}">
          <button
            class="project-open"
            type="button"
            data-open-project="${esc(project.id)}"
            aria-label="Lihat detail ${esc(project.title)}">

            ${preview}

            <div class="project-card-body">
              <div class="project-card-meta">
                <span>${esc(project.category || (isGame ? "Game" : "Website"))}</span>
                <span>↗</span>
              </div>

              <h2>${esc(project.title)}</h2>
              <p>${esc(project.description)}</p>

              <div class="tag-list">
                ${(project.technologies || []).map(t =>
                  `<span>${esc(t)}</span>`
                ).join("")}
              </div>

              <span class="project-detail-link">
                Lihat detail proyek <b>↗</b>
              </span>
            </div>
          </button>
        </article>
      `;
    }).join("");

    if (count) {
      count.textContent = `${list.length} proyek`;
    }

    if (empty) {
      empty.hidden = list.length > 0;
    }
  }

  render(projects);

  // Filter kategori proyek
  filters?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    filters.querySelectorAll(".filter-button").forEach(el => {
      el.classList.toggle("active", el === button);
    });

    const filter = button.dataset.filter;

    render(
      filter === "all"
        ? projects
        : projects.filter(p => p.type === filter)
    );
  });

  // Membuka detail proyek
  grid.addEventListener("click", event => {
    const trigger = event.target.closest("[data-open-project]");
    if (!trigger) return;

    const project = projects.find(
      p => p.id === trigger.dataset.openProject
    );

    if (project) openProject(project);
  });

  function openProject(project) {
    lastFocused = document.activeElement;

    const isGame = project.type === "game";

    if (isGame) {
      // Ambil gambar dari proyek yang sedang dibuka
      activeImages = Array.isArray(project.images)
        ? project.images.map(normalizeImageUrl).filter(Boolean)
        : [];

      activeImageIndex = 0;

      const gallery = Array.from({ length: 6 }, (_, i) => {
        const src = activeImages[i];

        if (!src) {
          return `
            <div class="gallery-item gallery-empty">
              <span>＋</span>
              <small>Foto ${i + 1}</small>
            </div>
          `;
        }

        return `
          <button
            class="gallery-item"
            type="button"
            data-gallery-index="${i}"
            aria-label="Lihat foto game ${i + 1}">

            <img
              src="${esc(src)}"
              alt="${esc(project.title)} - dokumentasi ${i + 1}"
              loading="lazy"
              onerror="this.parentElement.classList.add('image-error'); this.remove();"
            >
          </button>
        `;
      }).join("");

      modalContent.innerHTML = `
        <div class="modal-eyebrow">GAME DOCUMENTATION</div>

        <h2 id="modal-title">${esc(project.title)}</h2>

        <p class="modal-description">
          ${esc(project.description)}
        </p>

        <div class="game-facts">
          <div>
            <span>Penggunaan</span>
            <p>${esc(project.usage || "Tambahkan cara penggunaan game.")}</p>
          </div>

          <div>
            <span>Sasaran pengguna</span>
            <p>${esc(project.audience || "Belum diisi.")}</p>
          </div>

          <div>
            <span>Platform</span>
            <p>${esc(project.platform || "Belum diisi.")}</p>
          </div>
        </div>

        <h3 class="gallery-heading">
          Dokumentasi game
          <span>${activeImages.length} foto</span>
        </h3>

        <div class="game-gallery">
          ${gallery}
        </div>
      `;

    } else {
      activeImages = [];

      modalContent.innerHTML = `
        <div class="modal-eyebrow">
          ${esc(project.category || "WEBSITE PROJECT")}
        </div>

        <h2 id="modal-title">${esc(project.title)}</h2>

        <p class="modal-description">
          ${esc(project.description)}
        </p>

        <div class="modal-preview">
          ${
            validUrl(project.url)
              ? `
                <iframe
                  src="${esc(project.url)}"
                  title="Preview ${esc(project.title)}"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups">
                </iframe>
              `
              : `
                <div class="project-placeholder">
                  <span>↗</span>
                  <small>URL WEBSITE BELUM DIISI</small>
                </div>
              `
          }
        </div>

        <div class="modal-actions">
          ${linkButton(project.url, "Buka Live Demo", "button button-primary button-small")}
          ${linkButton(project.github, "Source Code", "button button-secondary button-small")}
        </div>

        <h3 class="gallery-heading">Teknologi yang digunakan</h3>

        <div class="tag-list">
          ${(project.technologies || []).map(t =>
            `<span>${esc(t)}</span>`
          ).join("")}
        </div>
      `;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    closeModal?.focus();
  }

  // Menutup popup proyek
  function hideModal() {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocused) lastFocused.focus();
  }

  closeModal?.addEventListener("click", hideModal);

  modal?.addEventListener("click", event => {
    if (event.target === modal) hideModal();
  });

  // Klik gambar galeri
  modalContent?.addEventListener("click", event => {
    const item = event.target.closest("[data-gallery-index]");
    if (!item) return;

    const index = Number(item.dataset.galleryIndex);

    if (!Number.isInteger(index) || !activeImages[index]) return;

    activeImageIndex = index;
    showLightbox();
  });

  // Membuka lightbox
  function showLightbox() {
    if (!lightbox || !activeImages.length) return;

    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".lightbox-caption");

    if (!image) return;

    image.src = activeImages[activeImageIndex];
    image.alt = `Dokumentasi game ${activeImageIndex + 1}`;

    if (caption) {
      caption.textContent =
        `Foto ${activeImageIndex + 1} dari ${activeImages.length}`;
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  // Menutup lightbox
  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  // Navigasi gambar
  function moveLightbox(step) {
    if (!activeImages.length) return;

    activeImageIndex =
      (activeImageIndex + step + activeImages.length) % activeImages.length;

    showLightbox();
  }

  lightbox?.querySelector(".lightbox-close")
    ?.addEventListener("click", closeLightbox);

  lightbox?.querySelector(".lightbox-prev")
    ?.addEventListener("click", () => moveLightbox(-1));

  lightbox?.querySelector(".lightbox-next")
    ?.addEventListener("click", () => moveLightbox(1));

  // Tombol Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      } else if (modal?.classList.contains("is-open")) {
        hideModal();
      }
    }
  });

})();
