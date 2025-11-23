<p align="center">
  <img src="./logo/logo.png" width="200px" alt="Dynamics Tips Logo" />
</p>

<h1 align="center">Dynamics Tips</h1>

<p align="center">
  <strong>Componentes dinámicos modernos para interfaces web interactivas</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/dytips"><img src="https://img.shields.io/npm/v/dytips?color=orange&label=npm" alt="NPM Version"></a>
  <a href="https://github.com/FedeManzano/dynamics-tips/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-purple" alt="License MIT"></a>
  <a href="https://github.com/FedeManzano/dynamics-tips/releases"><img src="https://img.shields.io/badge/version-2.5.2-red" alt="Version"></a>
  <a href="https://mega.nz/file/kFFGAT4T#hCPWpJDciRYSmvtML8wnv1ZZ_rxX62ozvP5EjPWnKRY"><img src="https://img.shields.io/badge/download-MEGA-green" alt="Download"></a>
</p>

<p align="center">
  <a href="#-características">Características</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-inicio-rápido">Inicio Rápido</a> •
  <a href="#-componentes">Componentes</a> •
  <a href="#-documentación">Documentación</a> •
  <a href="#-licencia">Licencia</a>
</p>

---

## 📖 Descripción

**Dynamics Tips** es una biblioteca JavaScript ligera y modular que proporciona componentes dinámicos interactivos para aplicaciones web. Originalmente desarrollada como parte del ecosistema [Bodystyle](https://github.com/FedeManzano/bodystyle), se separó para ofrecer mayor modularidad y reutilización.

### ¿Por qué Dynamics Tips?

- ✅ **Ligera y Rápida** - Código optimizado y minificado
- ✅ **Fácil de Usar** - API simple basada en data attributes
- ✅ **Personalizable** - Variables SASS para adaptar a tu diseño
- ✅ **Modular** - Importa solo lo que necesitas
- ✅ **Bien Documentada** - Ejemplos claros y documentación completa

---

## ✨ Características

- 🎯 **ToolTips** - Información contextual al pasar el cursor
- 💬 **Comentarios** - Cuadros de información expandidos
- 📋 **Dropdown** - Listas desplegables personalizables
- 🔔 **Toast** - Notificaciones temporales elegantes
- 🎨 **Personalizable** - Crea tus propios componentes dinámicos

---

## 📦 Instalación

### NPM (Recomendado)

```bash
npm install dytips
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://rawcdn.githack.com/FedeManzano/dynamics-tips/refs/heads/master/dist/css/dynamics.min.css">

<!-- JavaScript -->
<script src="https://rawcdn.githack.com/FedeManzano/dynamics-tips/refs/heads/master/dist/js/dynamics.min.js"></script>
```

### Descarga Manual

[Descargar Dynamics Tips 2.5.2](https://mega.nz/file/kFFGAT4T#hCPWpJDciRYSmvtML8wnv1ZZ_rxX62ozvP5EjPWnKRY)

---

## 🚀 Inicio Rápido

### 1. Incluye los archivos

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Dynamics Tips CSS -->
    <link rel="stylesheet" href="path/to/dynamics.min.css">
    
    <title>Mi Aplicación</title>
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <!-- Dynamics Tips JS -->
    <script src="path/to/dynamics.min.js"></script>
</body>
</html>
```

### 2. Usa los componentes

```html
<!-- ToolTip simple -->
<button class="tips-ele" data-tips="¡Hola! Soy un tooltip" data-pos="top">
    Pasa el cursor aquí
</button>

<!-- Comentario con más información -->
<button class="com-trigger" 
        data-info="<strong>Información importante:</strong> Este es un comentario con más detalles."
        data-pos="right">
    Ver información
</button>

<!-- Toast programático -->
<button onclick="DY.Toast({html: '¡Operación exitosa!', tiempo: 3000})">
    Mostrar notificación
</button>
```

### 3. ¡Listo! 🎉

Los componentes se inicializan automáticamente. Para elementos dinámicos, usa la inicialización manual:

```javascript
// Después de agregar elementos dinámicamente
DY.ToolTipsInit();
DY.CommentsInit();
DY.DropdownInit();
```

---

## 🎯 Componentes

### 1️⃣ ToolTips

Información contextual que aparece al interactuar con un elemento.

```html
<button class="tips-ele" 
        data-tips="Texto del tooltip"
        data-pos="top|bottom|left|right"
        data-evt="hover|click">
    Elemento
</button>
```

**Atributos:**

| Atributo | Descripción | Valores | Default |
|----------|-------------|---------|---------|
| `data-tips` | Contenido del tooltip | HTML/Texto | - |
| `data-pos` | Posición | `top`, `bottom`, `left`, `right` | `bottom` |
| `data-evt` | Evento disparador | `hover`, `click` | `hover` |

[Ver ejemplos completos →](https://bodystyle.webcindario.com/paginas/tooltips.html)

---

### 2️⃣ Comentarios

Cuadros de información más grandes para contenido extenso.

```html
<button class="com-trigger" 
        data-info="<p>Contenido del comentario</p>"
        data-pos="right"
        data-evt="hover">
    Ver detalles
</button>
```

**Atributos:**

| Atributo | Descripción | Valores | Default |
|----------|-------------|---------|---------|
| `data-info` | Contenido del comentario | HTML/Texto | - |
| `data-pos` | Posición | `top`, `bottom`, `left`, `right` | `bottom` |
| `data-evt` | Evento disparador | `hover`, `click` | `hover` |

[Ver ejemplos completos →](https://bodystyle.webcindario.com/paginas/comentarios.html)

---

### 3️⃣ Dropdown

Listas desplegables vinculadas a elementos disparadores.

```html
<!-- Disparador -->
<button class="dropdown-toggle" 
        data-target="#miLista" 
        data-pos="bottom"
        data-evt="click">
    Abrir menú
</button>

<!-- Lista -->
<div class="dropdown" id="miLista">
    <ul>
        <li><a href="#opcion1">Opción 1</a></li>
        <li><a href="#opcion2">Opción 2</a></li>
        <li><a href="#opcion3">Opción 3</a></li>
    </ul>
</div>
```

**Atributos:**

| Atributo | Descripción | Valores | Default |
|----------|-------------|---------|---------|
| `data-target` | ID de la lista | Selector CSS | - |
| `data-pos` | Posición | `top`, `bottom`, `left`, `right` | `bottom` |
| `data-evt` | Evento disparador | `hover`, `click` | `click` |
| `data-color` | Color de la flecha | Color CSS | `#000` |

[Ver ejemplos completos →](https://bodystyle.webcindario.com/paginas/dropdown.html)

---

### 4️⃣ Toast

Notificaciones temporales que aparecen en pantalla.

```javascript
DY.Toast({
    html: '<p>¡Operación completada!</p>',
    clases: ['mi-clase-custom'],
    tiempo: 3000,  // Duración en milisegundos
    cerrar: true   // Mostrar botón de cierre
});
```

**Configuración:**

| Propiedad | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `html` | String | Contenido HTML | - |
| `clases` | Array | Clases CSS adicionales | `[]` |
| `tiempo` | Number | Duración en ms | `3000` |
| `cerrar` | Boolean | Botón de cierre manual | `false` |

[Ver ejemplos completos →](https://bodystyle.webcindario.com/paginas/toast.html)

---

### 5️⃣ Componentes Personalizados

Crea tus propios componentes dinámicos.

```javascript
DY.PerInit({
    ori: '.mi-disparador',    // Clase del elemento disparador
    ele: '.mi-componente'     // Clase del elemento dinámico
});
```

[Ver ejemplos completos →](https://bodystyle.webcindario.com/paginas/personalizados.html)

---

## 🎨 Personalización

### Modificar Estilos con SASS

Clona el repositorio para acceder a los archivos fuente:

```bash
git clone https://github.com/FedeManzano/dynamics-tips
cd dynamics-tips
```

Edita las variables en los archivos SASS:

#### ToolTips (`sass/_tips.scss`)

```scss
// Variables personalizables
$bg: rgba(0, 0, 0, 0.863);
$padding: 2px 5px 5px 5px;
$color: white;
$border-radius: 5px;
$tam-flecha: 5px;
```

#### Comentarios (`sass/_comments.scss`)

```scss
$bg: rgb(255, 255, 255);
$border: 1px solid rgba(0, 0, 0, 0.295);
$border-radius: 5px;
$padding: 10px;
$color: rgb(48, 48, 48);
$fz: 14px;
```

#### Compilar SASS

```bash
# Instalar dependencias
npm install

# Compilar CSS
sass --style compressed sass/dynamics.scss dist/css/dynamics.min.css
```

---

## 📚 Documentación

### Documentación Completa

- [Documentación Bodystyle](https://bodystyle.webcindario.com/)
- [Descargar Docs PDF](https://mega.nz/file/dMVCXDDB#NjUByyoEAFTZKKITqbqSyvF9FXN4j4H--NtKDdy2xEk)

### API Global

Todas las funcionalidades están disponibles a través del objeto global `DY`:

```javascript
// Toasts
DY.Toast(config)

// ToolTips
DY.ToolTipsInit()      // Inicializar
DY.ToolTipsDestroy()   // Destruir

// Comentarios
DY.CommentsInit()
DY.CommentsDestroy()

// Dropdown
DY.DropdownInit()
DY.DropdownDestroy()

// Personalizados
DY.PerInit(config)
DY.PerDestroy()
```

### Inicialización Manual

Para elementos agregados dinámicamente al DOM:

```javascript
window.onload = () => {
    setTimeout(() => {
        // Inicializar después de agregar elementos dinámicos
        DY.ToolTipsInit();
        DY.CommentsInit();
        DY.DropdownInit();
    }, 100);
};
```

---

## 🏗️ Estructura del Proyecto

```
dynamics-tips/
├── dist/                    # Archivos compilados
│   ├── css/
│   │   ├── dynamics.css
│   │   └── dynamics.min.css
│   └── js/
│       ├── dynamics.js
│       └── dynamics.min.js
├── sass/                    # Archivos fuente SASS
│   ├── dynamics.scss
│   ├── _general.scss
│   ├── _tips.scss
│   ├── _comments.scss
│   ├── _dropdown.scss
│   └── _toast.scss
├── src/                     # Código fuente JavaScript
│   ├── app.js
│   └── modulos/
│       ├── ToolTips.js
│       ├── ComentariosDinamicos.js
│       ├── DropDown.js
│       ├── Toast.js
│       ├── Personalizado.js
│       └── posicionamineto/
├── test/                    # Archivos de prueba
├── logo/                    # Recursos gráficos
├── package.json
├── webpack.config.js
└── README.md
```

---

## 🔧 Desarrollo

### Requisitos

- Node.js >= 12.x
- npm >= 6.x

### Configuración

```bash
# Clonar repositorio
git clone https://github.com/FedeManzano/dynamics-tips
cd dynamics-tips

# Instalar dependencias
npm install

# Compilar proyecto
npm run build
```

### Scripts Disponibles

```bash
npm run build    # Compilar JavaScript con Webpack
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Changelog

### [2.5.2] - Actual

- Mejoras en la apariencia de componentes
- Actualización de funciones deprecadas de jQuery
- Optimizaciones de rendimiento

### Versiones Anteriores

Ver [Releases](https://github.com/FedeManzano/dynamics-tips/releases) para el historial completo.

---

## 🐛 Reportar Problemas

¿Encontraste un bug? [Abre un issue](https://github.com/FedeManzano/dynamics-tips/issues/new) con:

- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Capturas de pantalla (si aplica)
- Versión de Dynamics Tips
- Navegador y versión

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License - Copyright (c) 2020 Bodystyle

Se permite el uso, copia, modificación y distribución de este software
con fines comerciales y no comerciales, siempre que se incluya el aviso
de copyright y esta licencia.
```

---

## 👨‍💻 Autor

**Federico Manzano**

- GitHub: [@FedeManzano](https://github.com/FedeManzano)
- Proyecto Bodystyle: [bodystyle](https://github.com/FedeManzano/bodystyle)

---

## 🌟 Proyectos Relacionados

- [Bodystyle](https://github.com/FedeManzano/bodystyle) - Framework CSS completo
- [Bodystyle Docs](https://bodystyle.webcindario.com/) - Documentación oficial

---

## ⭐ Agradecimientos

Si este proyecto te resulta útil, considera darle una estrella ⭐ en GitHub.

---

<p align="center">
  Hecho con ❤️ por <a href="https://github.com/FedeManzano">Federico Manzano</a>
</p>