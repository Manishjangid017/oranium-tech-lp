/**
 * animation.js — Premium scroll reveal
 * Assigns [data-reveal] + [data-delay] to every section's elements,
 * then fires an IntersectionObserver to add .is-visible on scroll.
 *
 * Principle: each section gets its own tailored reveal pattern.
 * No heavy libraries — pure Intersection Observer API.
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Respect reduced-motion preference — bail early if set
  --------------------------------------------------------------- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ---------------------------------------------------------------
     Helper: assign data-reveal + data-delay to a list of elements
     items = [{ el, reveal, delay }]
  --------------------------------------------------------------- */
  function tag(el, reveal, delay) {
    if (!el) return;
    el.setAttribute('data-reveal', reveal);
    if (delay) el.setAttribute('data-delay', delay);
  }

  function tagAll(selector, reveal, startDelay, parent) {
    const root = parent || document;
    root.querySelectorAll(selector).forEach((el, i) => {
      tag(el, reveal, startDelay != null ? startDelay + i : null);
    });
  }

  /* ---------------------------------------------------------------
     Section-by-section tagging
  --------------------------------------------------------------- */

  /* ── Hero ── */
  (function heroReveal() {
    tag(document.querySelector('.hero-title'), 'fade-up', 1);
    tag(document.querySelector('.hero-desc'), 'fade-up', 2);
    tag(document.querySelector('.hero-stats'), 'fade-up', 3);
    tag(document.querySelector('.hero-section .btn-brand'), 'fade-up', 4);
    tag(document.querySelector('.hero-form-wrap'), 'slide-right', 2);
  })();

  /* ── Alumni ── */
  (function alumniReveal() {
    tag(document.querySelector('.alumni-title'), 'fade-up', 1);
    tag(document.querySelector('.alumni-box'), 'fade-up', 2);
  })();

  /* ── Learn ── */
  (function learnReveal() {
    tag(document.querySelector('.learn-head'), 'slide-left', null);
    // stagger each learn item
    tagAll('.learn-item', 'fade-up', 1);
  })();

  /* ── Why Oranium Tech ── */
  (function whyReveal() {
    tag(document.querySelector('.why-head'), 'fade-up', null);
    tagAll('.why-card', 'scale', 1);
  })();

  /* ── Certificate ── */
  (function certReveal() {
    tag(document.querySelector('.cert-content'), 'slide-left', null);
    tag(document.querySelector('.cert-wrap'), 'slide-right', null);
  })();

  /* ── Tools ── */
  (function toolsReveal() {
    tag(document.querySelector('.tools-title'), 'fade-up', null);
    tag(document.querySelector('.tools-box'), 'scale', 1);
    tag(document.querySelector('.tools-more'), 'fade', 2);
  })();

  /* ── Offer ── */
  (function offerReveal() {
    tag(document.querySelector('.offer-left'), 'slide-left', null);
    tag(document.querySelector('.offer-divider'), 'fade', 1);
    tag(document.querySelector('.offer-right'), 'slide-right', null);
  })();

  /* ── Testimonials ── */
  (function testiReveal() {
    tag(document.querySelector('.testi-title'), 'fade-up', null);
    tag(document.querySelector('.testi-featured'), 'fade-up', 1);
    tagAll('.testi-card', 'fade-up', 1);
  })();

  /* ── FAQ ── */
  (function faqReveal() {
    tag(document.querySelector('.faq-title'), 'fade-up', null);
    tag(document.querySelector('.faq-sub'), 'fade-up', 1);
    tagAll('.faq-section .accordion-item', 'fade-up', 1);
  })();

  /* ── CTA ── */
  (function ctaReveal() {
    tag(document.querySelector('.cta-badge'), 'fade-up', null);
    tag(document.querySelector('.cta-title'), 'scale', 1);
    tag(document.querySelector('.cta-section .btn-brand'), 'fade-up', 2);
  })();

  /* ---------------------------------------------------------------
     IntersectionObserver — watches all [data-reveal] elements
  --------------------------------------------------------------- */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold: 0.12,   // 12% visible before triggering
      rootMargin: '0px 0px -40px 0px', // slight bottom offset — feels more natural
    }
  );

  /* Observe every tagged element */
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });

  /* ---------------------------------------------------------------
     Hero fires immediately (above the fold — no scroll needed)
  --------------------------------------------------------------- */
  (function heroImmediate() {
    const heroEls = document.querySelectorAll('.hero-section [data-reveal], .hero-form-wrap[data-reveal]');
    heroEls.forEach(function (el) {
      // small RAF delay so CSS transition has time to register
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      });
    });
  })();

})();
