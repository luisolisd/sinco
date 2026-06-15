(function () {
  "use strict";
  /* SINCO — main.js  (IIFE, classic script, no modules) */

  const $  = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- Splash (double safety net) ---------- */
  function initSplash() {
    const splash = $("[data-splash]");
    if (!splash) return;
    const hide = () => splash.classList.add("is-out");
    if (document.readyState === "complete") setTimeout(hide, 500);
    else window.addEventListener("load", () => setTimeout(hide, 350));
    setTimeout(hide, 3800); // additional JS safety (CSS also covers at 4.5s)
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const nav = $("[data-nav]");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("[data-nav-toggle]");
    const drawer = $("[data-nav-drawer]");
    if (toggle && drawer) {
      const setOpen = (open) => {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      };
      toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
      drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    }
  }

  /* ---------- Smooth-scroll anchors (native) ---------- */
  function initAnchors() {
    const navOffset = 78;
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth",
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  function initScrollSpy() {
    const links = $$(".nav-links a");
    if (!links.length) return;
    const map = links.map((a) => ({ a, el: document.querySelector(a.getAttribute("href")) }))
                     .filter((o) => o.el);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        const match = map.find((o) => o.el === entry.target);
        if (match) match.a.classList.add("is-active");
      });
    }, { threshold: 0.05, rootMargin: "-45% 0px -50% 0px" });
    map.forEach((o) => io.observe(o.el));
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    const items = $$(".reveal");
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));

    // Mandatory safety: force-reveal anything still hidden after 6s
    setTimeout(() => {
      $$(".reveal:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Count-up stats ---------- */
  function initCounters() {
    const nums = $$(".stat-num[data-count]");
    if (!nums.length) return;
    const run = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -20% 0px" });
    nums.forEach((el) => io.observe(el));
    // Safety: numbers are hardcoded in HTML, so they read correctly even if this never fires.
  }

  /* ---------- CAD coordinate HUD (signature) ---------- */
  function initCoords() {
    if (!fineHover) return;
    const hud = $("[data-coords]");
    if (!hud) return;
    const xEl = $(".coords-x", hud);
    const yEl = $(".coords-y", hud);
    const pad = (n) => String(Math.round(n)).padStart(4, "0");
    let firstMove = false, rafId = null, mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (!firstMove) { firstMove = true; hud.classList.add("is-ready"); }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        hud.style.transform = `translate(${mx + 16}px, ${my + 18}px)`;
        if (xEl) xEl.textContent = "X:" + pad(mx);
        if (yEl) yEl.textContent = "Y:" + pad(my);
        rafId = null;
      });
    }, { passive: true });
    window.addEventListener("mouseleave", () => hud.classList.remove("is-ready"));
  }

  /* ---------- Hero parallax (subtle, gated by reduced-motion) ---------- */
  function initParallax() {
    if (reduced) return;
    const fig = $("[data-parallax] img");
    if (!fig) return;
    let rafId = null;
    const update = () => {
      const rect = fig.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-26, Math.min(26, center * -0.05));
      fig.style.transform = `translateY(${shift}px) scale(1.06)`;
      rafId = null;
    };
    fig.style.transform = "scale(1.06)";
    window.addEventListener("scroll", () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ---------- Hexagon background rotation on scroll ---------- */
  function initHexagon() {
    const hex = $("[data-hex] img");
    if (!hex) return;
    const factor = reduced ? 0.015 : 0.04; // gentler when reduced-motion
    let rafId = null;
    const update = () => {
      hex.style.transform = `rotate(${window.scrollY * factor}deg)`;
      rafId = null;
    };
    window.addEventListener("scroll", () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ---------- Project filters ---------- */
  function initFilters() {
    const bar = $("[data-filters]");
    const grid = $("[data-projects]");
    if (!bar || !grid) return;
    const cards = $$(".project", grid);
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      const cat = btn.dataset.filter;
      $$(".filter", bar).forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      cards.forEach((card) => {
        const show = cat === "todos" || card.dataset.category === cat;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---------- Contact form (Formspree) ---------- */
  function initForm() {
    const form = $("[data-form]");
    if (!form) return;
    const errorEl = $("[data-form-error]");
    const successEl = $("[data-form-success]");
    const submitBtn = $("[data-submit]", form);
    const label = submitBtn ? $(".btn-label", submitBtn) : null;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;
      if (!form.reportValidity()) return;
      if (submitBtn) { submitBtn.classList.add("is-loading"); }
      if (label) label.textContent = "Enviando…";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.hidden = true;
          if (successEl) successEl.hidden = false;
        } else {
          throw new Error("bad status");
        }
      } catch (err) {
        if (errorEl) errorEl.hidden = false;
      } finally {
        if (submitBtn) submitBtn.classList.remove("is-loading");
        if (label) label.textContent = "Enviar mensaje";
      }
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = `© ${new Date().getFullYear()} SINCO — Servicios Integrales de Construcción. Todos los derechos reservados.`;
  }

  /* ---------- Boot ---------- */
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initAnchors, "initAnchors");
    safe(initScrollSpy, "initScrollSpy");
    safe(initReveals, "initReveals");
    safe(initCounters, "initCounters");
    safe(initCoords, "initCoords");
    safe(initParallax, "initParallax");
    safe(initHexagon, "initHexagon");
    safe(initFilters, "initFilters");
    safe(initForm, "initForm");
    safe(initYear, "initYear");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
    }
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
