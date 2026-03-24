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

  // ---- IntersectionObserver for scroll animations ----
  var fadeEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in, .scale-in');
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

  // ---- Contact form (JotForm) ----
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var btnText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      var formData = new FormData(form);

      fetch('https://submit.jotform.com/submit/260822191837359', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).then(function () {
        form.reset();
        btn.textContent = '¡Mensaje enviado!';
        btn.classList.remove('btn-accent');
        btn.classList.add('btn-success');
        setTimeout(function () {
          btn.textContent = btnText;
          btn.disabled = false;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-accent');
        }, 3000);
      }).catch(function () {
        btn.textContent = 'Error, inténtalo de nuevo';
        btn.disabled = false;
        setTimeout(function () {
          btn.textContent = btnText;
        }, 3000);
      });
    });
  }
})();
