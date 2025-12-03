# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Changed

#### Migración de jQuery a Vanilla JavaScript - Clase Posicionamiento

Se han migrado los primeros 4 métodos de la clase `Posicionamiento` de jQuery a JavaScript vanilla para reducir dependencias y mejorar el rendimiento:

- **`posicionamientoInicialX(origen, ele)`**
  - Mantiene la misma lógica de validación para posicionamiento superior

- **`puedeAbajo(origen, ele)`**
  - Migrado de `$(window).height()` a `window.innerHeight`
  - Migrado de `$(window).scrollTop()` a `window.pageYOffset`
  - Migrado de `$(origen).offset().top` a `origen.getBoundingClientRect().top + window.pageYOffset`
  - Migrado de `$(origen).outerHeight()` a `origen.offsetHeight`
  - Migrado de `$(ele).outerHeight()` a `ele.offsetHeight`
  - Mantiene la misma lógica de validación para posicionamiento inferior

- **`puedeDerecha(origen, ele)`**
  - Migrado de `$(window).width()` a `document.documentElement.clientWidth` (excluye scrollbar para mayor precisión)
  - Migrado de `$(origen).offset().left` a `origen.getBoundingClientRect().left + window.pageXOffset`
  - Migrado de `$(origen).width()` a `origen.offsetWidth` (incluye padding/border para mejor detección de colisiones)
  - Migrado de `$(ele).width()` a `ele.offsetWidth`

- **`puedeIzquierda(origen, ele)`**
  - Migrado de `$(origen).offset().left` a `origen.getBoundingClientRect().left + window.pageXOffset`
  - Migrado de `$(ele).width()` a `ele.offsetWidth`

- **`reacomodamientoHorizontal(origen, ele)`**
  - Migrado de `$(origen).outerWidth()` a `origen.offsetWidth`
  - Migrado de `$(ele).outerWidth()` a `ele.offsetWidth`

- **`reacomodamientoVertical(origen, ele)`**
  - Migrado de `$(origen).outerHeight()` a `origen.offsetHeight`
  - Migrado de `$(ele).outerHeight()` a `ele.offsetHeight`

- **`topeIzquierda(ele)`**
  - Migrado de `$(ele).offset().left` a `ele.getBoundingClientRect().left + window.pageXOffset`

- **`topeArriba(ele)`**
  - Migrado de `$(ele).offset().top` a `ele.getBoundingClientRect().top` (simplificación)

- **`topeDerecha(ele)`**
  - Migrado de `$(window).width()` a `document.documentElement.clientWidth`
  - Migrado de `$(ele).offset().left` a `ele.getBoundingClientRect().left + window.pageXOffset`
  - Migrado de `$(ele).outerWidth()` a `ele.offsetWidth`

- **`posicionarArriba(origen, ele)`**
  - Migrado de `$(ele).css("top", ...)` a `ele.style.top = ...`
  - Migrado de `$(origen).offset().top` a `origen.getBoundingClientRect().top + window.pageYOffset`
  - Migrado de `$(ele).outerHeight()` a `ele.offsetHeight`
  - Migrado de `$(ele).css("left", ...)` a `ele.style.left = ...`
  - Migrado de `$(ele).css({ transform: ... })` a `ele.style.transform = ...`

- **`posicionarAbajo(origen, ele)`**
  - Migrado de `$(ele).css("top", ...)` a `ele.style.top = ...`
  - Migrado de `$(origen).offset().top` a `origen.getBoundingClientRect().top + window.pageYOffset`
  - Migrado de `$(origen).outerHeight()` a `origen.offsetHeight`
  - Migrado de `$(ele).css("left", ...)` a `ele.style.left = ...`
  - Migrado de `$(ele).css({ transform: ... })` a `ele.style.transform = ...`

- **`posicionarIzquierda(origen, ele)`**
  - Migrado de `$(ele).css("left", ...)` a `ele.style.left = ...`
  - Migrado de `$(origen).offset().left` a `origen.getBoundingClientRect().left + window.pageXOffset`
  - Migrado de `$(ele).width()` a `ele.offsetWidth`
  - Migrado de `$(ele).css("top", ...)` a `ele.style.top = ...`
  - Migrado de `$(ele).css({ transform: ... })` a `ele.style.transform = ...`

- **`posicionarDerecha(origen, ele)`**
  - Migrado de `$(ele).css("left", ...)` a `ele.style.left = ...`
  - Migrado de `$(origen).offset().left` a `origen.getBoundingClientRect().left + window.pageXOffset`
  - Migrado de `$(origen).outerWidth()` a `origen.offsetWidth`
  - Migrado de `$(ele).css({ transform: ... })` a `ele.style.transform = ...`

#### Migración de jQuery a Vanilla JavaScript - Clase Desplazar

Se ha migrado la clase `Desplazar` de jQuery a JavaScript vanilla:

- **`ejecutar(origen, ele, ...)`**
  - Eliminada dependencia de jQuery
  - Migrado de `$(ele).css(...)` a `ele.style.property = ...`
  - Migrado de `$(ele).append(...)` a `ele.appendChild(...)`
  - Migrado de `$("<span>...</span>")` a `document.createElement("span")`

#### Migración de jQuery a Vanilla JavaScript - Clase ToolTips

Se ha migrado la clase `ToolTips` de jQuery a JavaScript vanilla:

- **General**
  - Eliminada dependencia de jQuery
  - Reemplazo de selectores `$` por `document.querySelector` y `document.querySelectorAll`
  - Reemplazo de manejo de eventos `.on()` por `addEventListener`

- **Métodos Migrados**
  - `eventoResize`: Uso de `querySelectorAll` y `forEach` para eliminar elementos
  - `realizarAparicion`: Uso de `dataset` para acceder a data attributes
  - `activar`: Uso de `document.body.appendChild`
  - `eventoClick`: Creación de elementos con `document.createElement`, `classList.add`, y `innerHTML`
  - `MouseEnter` / `MouseLeave`: Lógica de creación y eliminación de tooltips sin jQuery
  - `inicializar`: Iteración de elementos con `forEach` y asignación de eventos
  - `destroy`: Eliminación de event listener global en `window`

- **Mejoras de Refactorización**
  - Implementación de patrón Singleton para el elemento `tips-complemento`, evitando la creación de múltiples overlays en el DOM.
  - Refactorización de manejadores de eventos a funciones nombradas (`handleClick`, `handleCompClick`, `MouseEnter`, `MouseLeave`) para permitir su correcta eliminación en el método `destroy`.
  - El método `destroy` ahora limpia correctamente todos los event listeners de los elementos y elimina el overlay del DOM.

#### Migración de jQuery a Vanilla JavaScript - Módulo ComentariosDinamicos

Se ha migrado el módulo `ComentariosDinamicos` de jQuery a JavaScript vanilla:

- **General**
  - Eliminada dependencia de jQuery completamente
  - Reemplazo de selectores `$` por `document.querySelector` y `document.querySelectorAll`
  - Reemplazo de manejo de eventos `.on()` por `addEventListener`

- **Métodos Migrados**
  - `inicializar`: Migrado de `$(".com-trigger").each()` a `querySelectorAll` + `forEach`
  - `eventoHover`: Migrado de `$(e).on({mouseenter, mouseleave})` a `addEventListener` individual
  - `eventoClick`: Migrado a `addEventListener` con funciones nombradas
  - `destroy`: Corrección completa de eliminación de event listeners

- **Bugs Críticos Corregidos**
  - **Bug en `eventoClick`**: El evento click se añadía incorrectamente al parámetro `e` en lugar del elemento trigger. Ahora se usa `this` correctamente dentro de `handleClickTrigger`.
  - **Contenido faltante**: El comentario en modo click no mostraba contenido. Ahora se asigna `comentario.innerHTML = this.dataset.info || ""`.
  - **Bug en `destroy`**: Los event listeners se intentaban remover incorrectamente (`MouseEnter` con `click`, `MouseLeave` sin `mouseenter`). Ahora se remueven correctamente todos los listeners: `click`, `mouseenter`, y `mouseleave`.
  - **Acumulación de elementos**: Se creaban múltiples elementos `.com-complemento` sin limpiar. Ahora se implementa patrón Singleton.

- **Mejoras de Refactorización**
  - Implementación de patrón Singleton para el elemento `com-complemento`, evitando la creación de múltiples overlays en el DOM.
  - Refactorización de manejadores de eventos a funciones nombradas (`handleClickTrigger`, `handleCompClick`, `handleMouseEnter`, `handleMouseLeave`) para permitir su correcta eliminación en el método `destroy`.
  - El método `destroy` ahora limpia correctamente todos los event listeners de los elementos y elimina el overlay del DOM.
  - Añadida validación por defecto: `origen.dataset.pos || "abajo"` y `origen.dataset.info || ""`
  - Mejor manejo del elemento complemento: se oculta en lugar de eliminarse en cada click, mejorando el rendimiento.

#### Migración de jQuery a Vanilla JavaScript - Módulo DropDown

Se ha migrado el módulo `DropDown` de jQuery a JavaScript vanilla:

- **General**
  - Eliminada dependencia de jQuery completamente
  - Reemplazo de selectores `$` por `document.querySelector` y `document.querySelectorAll`
  - Reemplazo de manejo de eventos `.on()`, `.click()`, `.hover()` por `addEventListener`

- **Métodos Migrados**
  - `inicializar`: Migrado de `$(".dropdown-toggle").each()` a `querySelectorAll` + `forEach`
  - `eventoHover`: Migrado de `$(e).hover()` a `addEventListener("mouseenter")`
  - `eventoClick`: Migrado a `addEventListener("click")` con funciones nombradas
  - `destroy`: Corrección completa de eliminación de event listeners
  - `crearFlecha`: Nueva función helper para crear elementos de flecha

- **Errores de Sintaxis Corregidos (de migración parcial del usuario)**
  - **`addKeyListener`**: Corregido a `addEventListener` (método correcto)
  - **`forEach` incorrecto**: Corregido `forEach("click", e => ...)` a `forEach((e) => ...)`
  - **Parámetro incorrecto en `activar`**: Cambiado de `e.target` a pasar directamente el elemento origen

- **Mejoras de Refactorización**
  - Implementación de patrón Singleton para el elemento `drop-complemento`
  - Refactorización de manejadores de eventos a funciones nombradas (`handleClickToggle`, `handleCompClick`, `handleDropdownClick`, `handleMouseEnter`)
  - Creación de función helper `crearFlecha(color)` para reducir duplicación de código
  - El método `destroy` ahora limpia correctamente todos los event listeners y elimina elementos del DOM
  - Añadida validación de existencia del dropdown antes de mostrarlo: `if (dropdownElement)`
  - Migración completa de manipulación de estilos: `$(e).css()` → `e.style.property`
  - Migración de creación de elementos: `$("<div>")` → `document.createElement()`

#### Migración de jQuery a Vanilla JavaScript - Módulo Personalizado

Se ha migrado el módulo `Personalizado` de jQuery a JavaScript vanilla:

- **General**
  - Eliminada dependencia de jQuery completamente
  - Reemplazo de selectores `$` por `document.querySelector` y `document.querySelectorAll`
  - Reemplazo de manejo de eventos `.hover()`, `.click()` por `addEventListener`

- **Métodos Migrados**
  - `inicializar`: Migrado de `$("." + origen).each()` a `querySelectorAll` + `forEach`
  - `eventoHover`: Migrado de `$(e).hover()` a `addEventListener("mouseenter")` y `addEventListener("mouseleave")`
  - `eventoClick`: Migrado a `addEventListener("click")` con funciones nombradas
  - `eventos`: Migrado de `$(e).data("evt")` a `e.dataset.evt`
  - `destroy`: Corrección completa de eliminación de event listeners
  - `eventoScroll`: Nueva función separada para manejar scroll

- **Errores Críticos Corregidos (de migración parcial del usuario)**
  - **`document.querySelector()` mal usado**: Se usaba `ele.appendChild(document.querySelector(e.target.dataset.info))` intentando buscar un elemento en el DOM cuando debía obtener el texto del data attribute. Corregido a `ele.innerHTML = this.dataset.info || ""`
  - **`ele.remove()` prematuro**: Se eliminaba el elemento justo después de crearlo, antes de mostrarlo. Línea eliminada.
  - **`comp.show()` no existe**: Método de jQuery usado en vanilla JS. Corregido a `comp.style.display = "block"`
  - **`eventoHover` en jQuery**: Función completamente en jQuery. Migrada a `addEventListener` con funciones nombradas.
  - **Variable `arrancar` inexistente**: Se llamaba a variable no definida en scroll handler. Creada función `eventoScroll` separada.
  - **`destroy()` con jQuery**: Usaba `$(origen).off()` y `$(comp).off()`. Migrado a `removeEventListener` específicos.
  - **Bug en `inicializar`**: Comparaba `origen === "sinOrigen"` cuando debía ser `ori === "sinOrigen"`
  - **Selector incorrecto**: Usaba `$("." + origen)` cuando debía ser `$("." + ori)` en inicializar

- **Mejoras de Refactorización**
  - Implementación de patrón Singleton para el elemento `tips-complemento`
  - Refactorización de manejadores de eventos a funciones nombradas (`handleClickTrigger`, `handleCompClick`, `handleMouseEnter`, `handleMouseLeave`)
  - El método `destroy` ahora limpia correctamente todos los event listeners y elimina elementos del DOM
  - Creación de función `eventoScroll` separada para mejor organización
  - Añadida validación en `eventoResize` y `eventoScroll`: `if (activo && origen && ele)`
  - Migración completa de manipulación de estilos: `$(ele).css()` → `ele.style.property`
  - Migración de creación de elementos: `$("<div>")` → `document.createElement()`
  - Corrección de `maxWidth`: de `270` (número) a `"270px"` (string con unidad)

#### Migración de jQuery a Vanilla JavaScript - Clase Toast

Se ha migrado la clase `Toast` de jQuery a JavaScript vanilla:

- **General**
  - Eliminada dependencia de jQuery completamente
  - Reemplazo de selectores `$` por `document.querySelector` y `document.querySelectorAll`
  - Reemplazo de manipulación del DOM con métodos nativos

- **Métodos Migrados**
  - `toast`: Migrado completamente a vanilla JavaScript

- **Cambios Específicos**
  - Migrado de `$(".toast").remove()` a `querySelectorAll(".toast").forEach(toast => toast.remove())`
  - Migrado de `$("<div class='toast'></div>")` a `document.createElement("div")` + `classList.add("toast")`
  - Migrado de `$(ts).append(html)` a `ts.innerHTML = html`
  - Migrado de bucle `for` con `$(ts).addClass()` a `clases.forEach(clase => ts.classList.add(clase))`
  - Migrado de `$(ts).append("<span>")` a `document.createElement("span")` + `appendChild()`
  - Migrado de `$("body").append(ts)` a `document.body.appendChild(ts)`
  - Migrado de `$(ts).css("top", 75)` a `ts.style.top = "75px"`
  - Migrado de `$(e.target).parent().hide(100)` a animación CSS con `opacity` y `setTimeout`
  - Corregido: `setInterval` → `setTimeout` (bug: setInterval no se limpiaba)

- **Mejoras de Refactorización**
  - Event listener del botón cerrar ahora se añade directamente al crear el botón
  - Animación de cierre mejorada con transición CSS
  - Corrección de bug: uso de `setTimeout` en lugar de `setInterval` para auto-remover
  - Corrección de unidades CSS: `75` → `"75px"`

### Added

- Agregada documentación JSDoc a los métodos migrados de la clase `Posicionamiento`

### Technical Details

**Equivalencias de migración aplicadas:**

| jQuery | Vanilla JavaScript | Propósito |
|--------|-------------------|-----------|
| `$(elemento).offset().left` | `elemento.getBoundingClientRect().left + window.pageXOffset` | Posición horizontal absoluta |
| `$(elemento).offset().top` | `elemento.getBoundingClientRect().top + window.pageYOffset` | Posición vertical absoluta |
| `$(elemento).outerHeight()` | `elemento.offsetHeight` | Altura con padding y border |
| `$(elemento).css(prop, val)` | `elemento.style[prop] = val` | Establecer estilos CSS |
| `$(window).height()` | `window.innerHeight` | Altura del viewport |
| `$(window).scrollTop()` | `window.pageYOffset` | Scroll vertical |

**Nota:** La migración mantiene la compatibilidad funcional completa con la versión anterior usando jQuery.

---

## Versiones anteriores

_Historial de versiones anteriores pendiente de documentación_
