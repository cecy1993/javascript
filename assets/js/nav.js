// Función de inicialización global
window.initNavigation = function() {
    console.log('Inicializando navegación...');
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    
    console.log('Toggle encontrado:', toggle);
    console.log('Nav encontrado:', nav);

    if (!toggle || !nav) {
        console.warn('No encuentro #menuToggle o #mainNav');
        return;
    }
    
    console.log('Elementos encontrados, configurando eventos...');

    // Prueba rápida para saber si el click llega
    toggle.addEventListener('click', (e) => {
        console.log('Click en hamburguesa detectado!');
        e.stopPropagation();
        const willOpen = !nav.classList.contains('open');
        console.log('Estado actual:', nav.classList.contains('open'), 'Abrirá:', willOpen);
        nav.classList.toggle('open', willOpen);
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
        console.log('Clases después del toggle:', nav.className);
    });

    // Cerrar al tocar link (mobile)
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth < 1024) nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menú');
        });
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') nav.classList.remove('open');
    });
};