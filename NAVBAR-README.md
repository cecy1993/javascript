# 🚀 Sistema de Navegación Responsive

Sistema completo de navegación responsive con HTML, CSS y JavaScript vanilla que incluye todas las funcionalidades modernas requeridas.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Responsive Design**: Mobile-first con breakpoint en 1024px
- **Toggle Menu**: Botón hamburguesa con animaciones suaves
- **Persistencia**: Estado guardado en localStorage
- **Accesibilidad**: ARIA, focus trap, navegación por teclado
- **Smooth Scroll**: Navegación suave con compensación de header
- **Enlace Activo**: Detección automática de página/sección actual

### 📱 Comportamiento Responsive
- **Mobile (< 1024px)**: Menú colapsable tipo overlay
- **Desktop (≥ 1024px)**: Barra horizontal siempre visible
- **Transiciones**: Animaciones CSS suaves sin "saltos"

### ♿ Accesibilidad
- Navegación completa por teclado
- Atributos ARIA correctos
- Focus trap en mobile
- Contraste adecuado
- Soporte para lectores de pantalla

## 📁 Estructura de Archivos

```
proyecto/
├── components/
│   └── header.html          # Componente HTML reutilizable
├── css/
│   └── navbar-styles.css    # Estilos completos del navbar
├── js/
│   └── nav.js              # Lógica JavaScript
└── ejemplo-integracion.html # Ejemplo de uso completo
```

## 🚀 Instalación y Uso

### 1. Incluir Archivos

```html
<!-- En el <head> -->
<link rel="stylesheet" href="css/navbar-styles.css">

<!-- Antes del cierre de </body> -->
<script src="js/nav.js"></script>
```

### 2. HTML del Header

```html
<header id="mainHeader" class="header">
  <nav id="mainNav" class="navbar">
    <!-- Botón hamburguesa -->
    <button id="menuToggle" class="menu-toggle" 
            aria-controls="mainNav" 
            aria-expanded="false" 
            aria-label="Abrir menú">
      ☰
    </button>
    
    <!-- Logo -->
    <div class="navbar-brand">
      <img src="Images/logo.png" alt="Logo" class="logo">
    </div>
    
    <!-- Enlaces -->
    <ul class="navbar-links">
      <li><a href="index.html" data-page="inicio">Inicio</a></li>
      <li><a href="Pages/tarifas.html" data-page="tarifas">Tarifas</a></li>
      <li><a href="Pages/Empresa.html" data-page="empresa">Empresa</a></li>
      <li><a href="Pages/excursiones.html" data-page="excursiones">Excursiones</a></li>
      <li><a href="Pages/contacto.html" data-page="contacto">Contacto</a></li>
    </ul>
    
    <!-- Elementos extra (opcional) -->
    <div class="navbar-extra">
      <div class="calendario-contenedor">
        <input type="date" class="calendario" aria-label="Seleccionar fecha">
      </div>
    </div>
  </nav>
  
  <!-- Backdrop para mobile -->
  <div id="navBackdrop" class="backdrop"></div>
</header>
```

### 3. Inicialización

El JavaScript se inicializa automáticamente, pero también puedes usar la API:

```javascript
// Inicialización manual (opcional)
document.addEventListener('DOMContentLoaded', function() {
  if (typeof initNav === 'function') {
    initNav();
  }
});

// Usar la API
NavAPI.toggle();     // Alternar menú
NavAPI.open();       // Abrir menú
NavAPI.close();      // Cerrar menú
NavAPI.setActive();  // Actualizar enlace activo
NavAPI.getState();   // Obtener estado actual
```

## ⚙️ Configuración

### Variables CSS Personalizables

```css
:root {
  --navbar-height: 70px;                    /* Altura del navbar */
  --navbar-bg: rgba(30, 40, 60, 0.95);     /* Color de fondo */
  --navbar-text: #ffffff;                   /* Color del texto */
  --navbar-accent: #0d6efd;                 /* Color de acento */
  --transition-speed: 0.3s;                 /* Velocidad de transiciones */
}
```

### Clases CSS Importantes

- `.navbar`: Contenedor principal
- `.navbar-links`: Lista de enlaces
- `.navbar.open`: Estado abierto (mobile)
- `.active`: Enlace activo
- `.backdrop`: Fondo semitransparente
- `.nav-open`: Clase en body cuando menú está abierto

## 🎮 Controles y Funcionalidades

### Controles de Teclado
- **Escape**: Cierra el menú en mobile
- **Tab/Shift+Tab**: Navegación por elementos
- **Enter/Space**: Activar enlaces y botones

### Funcionalidades Automáticas
- **Detección de enlace activo**: Por pathname, hash o data-page
- **Persistencia**: Estado guardado en localStorage
- **Responsive**: Adaptación automática al tamaño de pantalla
- **Focus management**: Focus trap en mobile
- **Smooth scroll**: Para enlaces internos (#ancla)

## 📱 Comportamiento por Dispositivo

### Mobile (< 1024px)
- Menú colapsado por defecto
- Botón hamburguesa visible
- Overlay completo al abrir
- Backdrop para cerrar
- Focus trap activo
- Prevención de scroll del body

### Desktop (≥ 1024px)
- Menú siempre visible
- Botón hamburguesa oculto
- Sin overlay ni backdrop
- Navegación horizontal
- Sin restricciones de focus

## 🔧 API JavaScript

### Métodos Disponibles

```javascript
// Inicialización
initNav()                    // Inicializar el sistema

// Control del menú
NavAPI.open()               // Abrir menú
NavAPI.close()              // Cerrar menú
NavAPI.toggle()             // Alternar estado

// Utilidades
NavAPI.setActive()          // Actualizar enlace activo
NavAPI.getState()           // Obtener estado actual
```

### Estado del Sistema

```javascript
const state = NavAPI.getState();
console.log(state);
// {
//   isOpen: false,
//   isDesktop: true,
//   focusableElements: [...],
//   firstFocusable: Element,
//   lastFocusable: Element
// }
```

## 🎨 Personalización de Estilos

### Cambiar Colores

```css
:root {
  --navbar-bg: rgba(52, 73, 94, 0.95);     /* Fondo más oscuro */
  --navbar-accent: #e74c3c;                 /* Acento rojo */
}
```

### Modificar Animaciones

```css
:root {
  --transition-speed: 0.5s;                /* Más lento */
  --transition-easing: ease-in-out;         /* Diferente curva */
}
```

### Ajustar Breakpoint

```css
/* Cambiar el breakpoint de responsive */
@media (min-width: 768px) {  /* En lugar de 1024px */
  /* Estilos desktop */
}
```

## 🧪 Testing y Validación

### ✅ Criterios de Aceptación

- [ ] **Mobile**: Menú se despliega/cierra con botón
- [ ] **Mobile**: Menú se cierra al seleccionar enlace
- [ ] **Desktop**: Menú permanece visible siempre
- [ ] **Persistencia**: Estado se mantiene entre recargas
- [ ] **Enlace activo**: Corresponde a página/sección actual
- [ ] **Accesibilidad**: Navegación por teclado funcional
- [ ] **Smooth scroll**: Sin solapamiento con header
- [ ] **Escape**: Cierra menú en mobile
- [ ] **Focus trap**: Funciona en mobile
- [ ] **Responsive**: Adaptación correcta en todos los tamaños

### 🔍 Pruebas Recomendadas

1. **Responsive**: Redimensionar ventana y verificar comportamiento
2. **Teclado**: Navegar solo con Tab, Enter y Escape
3. **Persistencia**: Recargar página y verificar estado
4. **Enlaces**: Probar navegación y detección de activo
5. **Performance**: Verificar transiciones suaves

## 🐛 Troubleshooting

### Problemas Comunes

**El menú no se abre/cierra:**
- Verificar que existen los elementos `#mainNav` y `#menuToggle`
- Comprobar que se incluye el archivo `nav.js`
- Revisar la consola por errores JavaScript

**El enlace activo no se marca:**
- Verificar que los enlaces tienen `href` o `data-page` correctos
- Comprobar que `setActiveLink()` se ejecuta
- Revisar la lógica de comparación de rutas

**Las transiciones no funcionan:**
- Verificar que se incluye `navbar-styles.css`
- Comprobar que las variables CSS están definidas
- Revisar conflictos con otros estilos

**Focus trap no funciona:**
- Verificar que hay elementos focusables en el menú
- Comprobar que `updateFocusableElements()` se ejecuta
- Revisar que el menú está marcado como abierto

## 📄 Licencia

Este código es de uso libre para proyectos personales y comerciales.

## 🤝 Contribuciones

Para mejoras o reportar bugs, crear un issue o pull request en el repositorio del proyecto.

---

**Desarrollado con ❤️ usando HTML5, CSS3 y JavaScript Vanilla**