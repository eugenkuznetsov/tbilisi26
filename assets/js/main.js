(function () {
  'use strict';

  // Mobile nav toggle
  const navmenu = document.getElementById('navmenu');
  const toggle = document.getElementById('mobileNavToggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      navmenu.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.navmenu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navmenu.classList.contains('mobile-nav-active')) {
        navmenu.classList.remove('mobile-nav-active');
        if (toggle) {
          toggle.classList.add('bi-list');
          toggle.classList.remove('bi-x');
        }
      }
    });
  });

  // Header shadow on scroll
  const header = document.getElementById('header');
  function toggleHeaderScrolled() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', toggleHeaderScrolled);

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  function toggleScrollTop() {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('active', window.scrollY > 300);
    }
  }
  window.addEventListener('scroll', toggleScrollTop);
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navmenu a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 90;
    let found = false;
    sections.forEach(function (section) {
      if (found) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
        found = true;
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
})();
