/* ============================================
   Plano Invisible — Main JS (Multi-page)
   ============================================ */

(function () {
  'use strict';

  // ---- Navbar scroll effect ----
  var navbar = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- Mobile slide menu ----
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navCollapse = document.getElementById('navbarNav');

  // Lock body scroll when menu open
  if (navCollapse) {
    navCollapse.addEventListener('show.bs.collapse', function () {
      document.body.style.overflow = 'hidden';
    });
    navCollapse.addEventListener('hide.bs.collapse', function () {
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // ---- Active nav link based on current page URL ----
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- IntersectionObserver for fade-up animations ----
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Contact form ----
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action');
      // If no backend URL configured, use mailto fallback
      if (!action || action === '#') {
        e.preventDefault();
        var nombre = form.querySelector('[name="nombre"]').value;
        var email = form.querySelector('[name="email"]').value;
        var tipo = form.querySelector('[name="tipo"]').value;
        var mensaje = form.querySelector('[name="mensaje"]').value;
        var subject = encodeURIComponent('Contacto web – ' + tipo);
        var body = encodeURIComponent(
          'Nombre: ' + nombre + '\nEmail: ' + email + '\nTipo: ' + tipo + '\n\n' + mensaje
        );
        window.location.href = 'mailto:info@planoinvisible.com?subject=' + subject + '&body=' + body;
      }
      // If action is a real URL (e.g. Google Apps Script), let the form submit normally
    });
  }
})();
