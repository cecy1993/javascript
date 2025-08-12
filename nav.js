// nav.js - Sidebar navigation modular
function initNav() {
  const nav = document.getElementById('mainNav');
  const toggleBtn = document.getElementById('menuToggle');
  const backdrop = document.getElementById('sidebarBackdrop');
  const links = nav.querySelectorAll('a');
  let isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  function openNav() {
    nav.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Cerrar menú');
    nav.focus();
    trapFocus();
    if (!isDesktop) localStorage.setItem('sidebarOpen', 'true');
  }
  function closeNav() {
    nav.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Abrir menú');
    toggleBtn.focus();
    if (!isDesktop) localStorage.setItem('sidebarOpen', 'false');
  }
  function toggleNav() {
    if (nav.classList.contains('open')) closeNav();
    else openNav();
  }
  function trapFocus() {
    if (isDesktop) return;
    const focusable = nav.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    nav.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'Escape') closeNav();
    });
  }
  toggleBtn.addEventListener('click', toggleNav);
  toggleBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNav();
    }
  });
  backdrop.addEventListener('click', closeNav);
  links.forEach(link => {
    link.addEventListener('click', function() {
      if (!isDesktop) closeNav();
    });
  });
  document.addEventListener('keydown', function(e) {
    if (!isDesktop && nav.classList.contains('open') && e.key === 'Escape') closeNav();
  });
  document.addEventListener('click', function(e) {
    if (!isDesktop && nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggleBtn) closeNav();
  });
  window.addEventListener('resize', function() {
    isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop) {
      nav.classList.add('open');
      backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Cerrar menú');
    } else {
      const persisted = localStorage.getItem('sidebarOpen');
      if (persisted === 'true') openNav();
      else closeNav();
    }
  });
  // Inicialización
  if (isDesktop) {
    nav.classList.add('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Cerrar menú');
  } else {
    const persisted = localStorage.getItem('sidebarOpen');
    if (persisted === 'true') openNav();
    else closeNav();
  }
  setActiveLink();
}

function setActiveLink() {
  const links = document.querySelectorAll('#mainNav a');
  const sections = ['inicio', 'tarifas', 'empresa', 'excursiones', 'contacto'];
  const sectionEls = sections.map(id => document.getElementById(id));
  function updateActive() {
    let activeIdx = 0;
    sectionEls.forEach((el, idx) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80) activeIdx = idx;
      }
    });
    links.forEach(link => link.classList.remove('active'));
    if (links[activeIdx]) links[activeIdx].classList.add('active');
  }
  updateActive();
  window.addEventListener('scroll', updateActive);
}

document.addEventListener('DOMContentLoaded', initNav);
