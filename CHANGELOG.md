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
