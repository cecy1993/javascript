/**
 * NAVEGACIÓN RESPONSIVE - JavaScript Vanilla
 * Funcionalidades: Toggle, Persistencia, Accesibilidad, Smooth Scroll
 */

// Estado global de la navegación
const NavState = {
  isOpen: false,
  isDesktop: false,
  focusableElements: [],
  firstFocusable: null,
  lastFocusable: null
};

// Elementos del DOM
let elements = {};
console.log('')

/**
 * INICIALIZACIÓN PRINCIPAL
 */
function initNav() {
  // Obtener elementos del DOM
  elements = {
    navbar: document.getElementById('mainNav'),
    toggle: document.getElementById('menuToggle'),
    backdrop: document.getElementById('navBackdrop'),
    links: document.querySelectorAll('.navbar-links a'),
    body: document.body
  };

  // Verificar que los elementos existen
  if (!elements.navbar || !elements.toggle) {
    console.warn('Nav: Elementos requeridos no encontrados');
    return;
  }

  // Detectar si es desktop
  updateScreenSize();

  // Configurar event listeners
  setupEventListeners();

  // Restaurar estado desde localStorage
  restoreNavState();

  // Marcar enlace activo
  setActiveLink();

  // Configurar elementos focusables para trap
  updateFocusableElements();

  console.log('Nav: Inicializado correctamente');
}

/**
 * CONFIGURAR EVENT LISTENERS
 */
function setupEventListeners() {
  // Toggle del menú
  elements.toggle.addEventListener('click', toggleNav);

  // Cerrar con backdrop
  if (elements.backdrop) {
    elements.backdrop.addEventListener('click', closeNav);
  }

  // Cerrar al hacer clic en enlaces (solo mobile)
  elements.links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', handleKeyDown);

  // Detectar cambios de tamaño de pantalla
  window.addEventListener('resize', debounce(updateScreenSize, 250));

  // Focus trap en mobile
  document.addEventListener('keydown', handleFocusTrap);

  // Smooth scroll para anclas
  setupSmoothScroll();
}

/**
 * TOGGLE DEL MENÚ
 */
function toggleNav() {
  if (NavState.isOpen) {
    closeNav();
  } else {
    openNav();
  }
}

function openNav() {
  NavState.isOpen = true;
  
  // Aplicar clases CSS
  elements.navbar.classList.add('open');
  if (elements.backdrop) {
    elements.backdrop.classList.add('open');
  }
  
  // Actualizar atributos ARIA
  elements.toggle.setAttribute('aria-expanded', 'true');
  elements.toggle.setAttribute('aria-label', 'Cerrar menú');
  
  // Prevenir scroll en mobile
  if (!NavState.isDesktop) {
    elements.body.classList.add('nav-open');
    
    // Focus en el primer enlace
    setTimeout(() => {
      if (elements.links[0]) {
        elements.links[0].focus();
      }
    }, 100);
  }
  
  // Guardar estado
  saveNavState();
}

function closeNav() {
  NavState.isOpen = false;
  
  // Remover clases CSS
  elements.navbar.classList.remove('open');
  if (elements.backdrop) {
    elements.backdrop.classList.remove('open');
  }
  
  // Actualizar atributos ARIA
  elements.toggle.setAttribute('aria-expanded', 'false');
  elements.toggle.setAttribute('aria-label', 'Abrir menú');
  
  // Restaurar scroll
  elements.body.classList.remove('nav-open');
  
  // Focus de vuelta al toggle
  elements.toggle.focus();
  
  // Guardar estado
  saveNavState();
}

/**
 * MANEJO DE ENLACES
 */
function handleLinkClick(event) {
  const link = event.currentTarget;
  const href = link.getAttribute('href');
  
  // Si es una ancla interna, hacer smooth scroll
  if (href && href.startsWith('#')) {
    event.preventDefault();
    smoothScrollToAnchor(href);
  }
  
  // Cerrar menú en mobile
  if (!NavState.isDesktop && NavState.isOpen) {
    closeNav();
  }
  
  // Actualizar enlace activo
  setTimeout(setActiveLink, 100);
}

/**
 * SMOOTH SCROLL
 */
function setupSmoothScroll() {
  // Configurar smooth scroll para todos los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        event.preventDefault();
        smoothScrollToAnchor(href);
      }
    });
  });
}

function smoothScrollToAnchor(anchor) {
  const target = document.querySelector(anchor);
  if (target) {
    const headerHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-height')) || 70;
    
    const targetPosition = target.offsetTop - headerHeight - 16;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * MANEJO DE TECLADO
 */
function handleKeyDown(event) {
  // Cerrar con Escape
  if (event.key === 'Escape' && NavState.isOpen && !NavState.isDesktop) {
    closeNav();
  }
}

function handleFocusTrap(event) {
  // Solo aplicar focus trap en mobile con menú abierto
  if (!NavState.isOpen || NavState.isDesktop || event.key !== 'Tab') {
    return;
  }
  
  if (NavState.focusableElements.length === 0) {
    updateFocusableElements();
  }
  
  const isTabPressed = event.key === 'Tab';
  if (!isTabPressed) return;
  
  const activeElement = document.activeElement;
  
  if (event.shiftKey) {
    // Shift + Tab (hacia atrás)
    if (activeElement === NavState.firstFocusable) {
      event.preventDefault();
      NavState.lastFocusable.focus();
    }
  } else {
    // Tab (hacia adelante)
    if (activeElement === NavState.lastFocusable) {
      event.preventDefault();
      NavState.firstFocusable.focus();
    }
  }
}

function updateFocusableElements() {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');
  
  NavState.focusableElements = Array.from(
    elements.navbar.querySelectorAll(focusableSelectors)
  ).filter(el => {
    return el.offsetWidth > 0 && el.offsetHeight > 0;
  });
  
  NavState.firstFocusable = NavState.focusableElements[0];
  NavState.lastFocusable = NavState.focusableElements[NavState.focusableElements.length - 1];
}

/**
 * ENLACE ACTIVO
 */
function setActiveLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  // Remover clase active de todos los enlaces
  elements.links.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });
  
  // Encontrar y marcar el enlace activo
  elements.links.forEach(link => {
    const href = link.getAttribute('href');
    const dataPage = link.getAttribute('data-page');
    
    let isActive = false;
    
    // Comparar por ruta exacta
    if (href && currentPath.endsWith(href)) {
      isActive = true;
    }
    // Comparar por hash
    else if (href && href.startsWith('#') && currentHash === href) {
      isActive = true;
    }
    // Comparar por data-page
    else if (dataPage && currentPath.includes(dataPage)) {
      isActive = true;
    }
    // Página de inicio por defecto
    else if ((currentPath === '/' || currentPath.endsWith('index.html')) && 
             (href === 'index.html' || href === '/' || dataPage === 'inicio')) {
      isActive = true;
    }
    
    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * PERSISTENCIA EN LOCALSTORAGE
 */
function saveNavState() {
  const state = {
    isOpen: NavState.isOpen && !NavState.isDesktop, // Solo guardar estado mobile
    timestamp: Date.now()
  };
  
  try {
    localStorage.setItem('navState', JSON.stringify(state));
  } catch (error) {
    console.warn('Nav: No se pudo guardar el estado:', error);
  }
}

function restoreNavState() {
  try {
    const saved = localStorage.getItem('navState');
    if (!saved) return;
    
    const state = JSON.parse(saved);
    
    // Solo restaurar en mobile y si no ha pasado mucho tiempo
    const maxAge = 30 * 60 * 1000; // 30 minutos
    if (!NavState.isDesktop && 
        state.timestamp && 
        (Date.now() - state.timestamp) < maxAge) {
      
      if (state.isOpen) {
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
          openNav();
        }, 100);
      }
    }
  } catch (error) {
    console.warn('Nav: No se pudo restaurar el estado:', error);
  }
}

/**
 * RESPONSIVE
 */
function updateScreenSize() {
  const wasDesktop = NavState.isDesktop;
  NavState.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  
  // Si cambió a desktop, cerrar menú mobile
  if (!wasDesktop && NavState.isDesktop && NavState.isOpen) {
    closeNav();
  }
  
  // Actualizar elementos focusables
  updateFocusableElements();
}

/**
 * UTILIDADES
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * API PÚBLICA
 */
window.NavAPI = {
  init: initNav,
  open: openNav,
  close: closeNav,
  toggle: toggleNav,
  setActive: setActiveLink,
  getState: () => ({ ...NavState })
};

/**
 * AUTO-INICIALIZACIÓN
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}

// Exportar para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initNav, NavAPI };
}