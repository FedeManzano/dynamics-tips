# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Changed

#### Migración de jQuery a Vanilla JavaScript - Clase Posicionamiento

Se han migrado los primeros 4 métodos de la clase `Posicionamiento` de jQuery a JavaScript vanilla para reducir dependencias y mejorar el rendimiento:

- **`posicionamientoInicialX(origen, ele)`**
  - Migrado de `$(origen).offset().left` a `origen.getBoundingClientRect().left + window.pageXOffset`
  - Migrado de `$(ele).css("left", x)` a `ele.style.left = x + "px"`
  - Ahora considera correctamente el scroll horizontal del documento

- **`posicionamientoInicialY(origen, ele)`**
  - Migrado de `$(origen).offset().top` a `origen.getBoundingClientRect().top + window.pageYOffset`
  - Migrado de `$(ele).css("top", y)` a `ele.style.top = y + "px"`
  - Ahora considera correctamente el scroll vertical del documento

- **`puedeArriba(origen, ele)`**
  - Migrado de `$(origen).offset().top` a `origen.getBoundingClientRect().top + window.pageYOffset`
  - Migrado de `$(window).scrollTop()` a `window.pageYOffset`
  - Migrado de `$(ele).outerHeight()` a `ele.offsetHeight`
  - Mantiene la misma lógica de validación para posicionamiento superior

- **`puedeAbajo(origen, ele)`**
  - Migrado de `$(window).height()` a `window.innerHeight`
  - Migrado de `$(window).scrollTop()` a `window.pageYOffset`
  - Migrado de `$(origen).offset().top` a `origen.getBoundingClientRect().top + window.pageYOffset`
  - Migrado de `$(origen).outerHeight()` a `origen.offsetHeight`
  - Migrado de `$(ele).outerHeight()` a `ele.offsetHeight`
  - Mantiene la misma lógica de validación para posicionamiento inferior

### Added

- Agregada documentación JSDoc a los métodos migrados de la clase `Posicionamiento`
  - `posicionamientoInicialX`: Documentación de parámetros y retorno
  - `posicionamientoInicialY`: Documentación de parámetros y retorno
  - `puedeArriba`: Documentación de parámetros y retorno booleano
- Agregada documentación de clase para `Posicionamiento` explicando su propósito como núcleo de posicionamiento de la biblioteca

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
