
<p align="center">
  <img src="./logo/logo.png" width="200px" />
</p>

# :dvd: Dynamics Tips 
[![MEGA](https://img.shields.io/badge/MEGA-Download-green)](https://mega.nz/file/kFFGAT4T#hCPWpJDciRYSmvtML8wnv1ZZ_rxX62ozvP5EjPWnKRY)
[![NPM](https://img.shields.io/badge/NPM-dytips-orange)](https://www.npmjs.com/package/dytips)
[![LICENSE](https://img.shields.io/badge/LICENSE-MIT-purple)](https://github.com/FedeManzano/dynamics-tips/blob/master/LICENSE)
[![VERSION](https://img.shields.io/badge/VERSION-2.5.0-red)](https://github.com/FedeManzano/bodystyle/releases/tag/v4.8.0)

Componentes que se incorporan de manera dinámica que le permiten al usuario disponer de información sobre determinados elementos dentro del DOM. <br>
Esta biblioteca se creó con el fin de disponer de las funcionalidades que permitan posicionar todos los elementos dinámicos informativos de   [Bodystyle](https://github.com/FedeManzano/bodystyle) una biblioteca dedicada al desarrollo del FrontEnd y que por razones de modularización 
y reutilización del código se define por separado aumentando su disponibilidad.
 
## :green_book: Documentación

### :link: Enlaces 

- [ToolTips](https://bodystyle.webcindario.com/paginas/tooltips.html) 
- [Comentarios](https://bodystyle.webcindario.com/paginas/comentarios.html) 
- [Dropdown](https://bodystyle.webcindario.com/paginas/dropdown.html) 
- [TipsPropios](https://bodystyle.webcindario.com/paginas/personalizados.html) 
- [Toast](https://bodystyle.webcindario.com/paginas/toast.html) 

### :arrow_down: Descarga

Se puede descargar la documentación de **Bodystyle** la cual incluye toda la información necesaria para poder utilizar los 
elementos dinámicos.

[Bodystyle Docs 2.0.0](https://mega.nz/file/dMVCXDDB#NjUByyoEAFTZKKITqbqSyvF9FXN4j4H--NtKDdy2xEk)

## :clipboard: Estructura

- :open_file_folder: dist
  - :open_file_folder: css
    - :pencil: dynamics.css
    - :pencil: dynamics.min.css
  - :open_file_folder: js
    - :pencil: dynamics.min.js
    - :pencil: dynamics.js
- :open_file_folder: logo
  - :pencil: logo.png
- :open_file_folder: sass
  - :pencil: dynamics.scss
  - :pencil: _tips.scss
  - :pencil: _comments.scss
  - :pencil: _dropdown.scss
  - :pencil: _toasts.scss
  - :pencil: _general.scss
- :open_file_folder: src
  - :open_file_folder: modulos
    - :open_file_folder: posicionamiento
      - :pencil: Desplazar.js
      - :pencil: Direccion.js
      - :pencil: DireccionAbajo.js
      - :pencil: DireccionDerecha.js
      - :pencil: DireccionIzquierda.js
      - :pencil: DireccionDerecha.js
      - :pencil: Posicionamiento.js
    - :pencil: ComentariosDinamicos.js
    - :pencil: DropDown.js
    - :pencil: Personalizado.js
    - :pencil: Toast.js
    - :pencil: ToolTips.js
  - :pencil: app.js

## :dvd: Instalación

Existen tres formas de agregar la biblioteca a los proyectos:
1. Descarga *Descarga de los archivos procesados*.
2. CDN *Plantilla con los enlaces CDN*.
3. NPM *A través del gestor de paquetes de NodeJs*.

### :arrow_down: Descarga

La primera forma es la descarga y la incorporación de los archivos JS y CSS al proyecto en desarrollo. <br>
En esta sección se descargarán los archivos procesados y transpilados sin incluir los archivos con el código fuente, los cuales 
pueden obtenerse clonando este mismo repositorio.

[Dynamics 2.5.0](https://mega.nz/file/kFFGAT4T#hCPWpJDciRYSmvtML8wnv1ZZ_rxX62ozvP5EjPWnKRY)

### :link: CDN

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../dist/css/dynamics.css">

    <style>
        .estilos {
            width: 70%;
            margin: auto;
            margin-top: 100px;
            display: flex;
            justify-content: space-around;
        }
    </style>


    <title>Plantilla</title>
</head>
<body>
    
    <div id="test" class="estilos">
        <h1>Plantillade prueba de Dynamics-Tips</h1>
        <button class="com-trigger" data-info="Esto es un Comentario Derecho" data-pos="right">Derecha</button>
        <button class="com-trigger" data-info="Esto es un Comentario Izquierdo" data-pos="left">Izquierda</button>
        <button class="com-trigger" data-info="Esto es un Comentario Abajo" data-pos="bottom">Abajo</button>
        <button class="com-trigger" data-info="Esto es un Comentario Arriba" data-pos="top">Arriba</button>
        <button class="com-trigger" data-info="Esto es un Comentario Click" data-pos="top" data-evt="click">Click</button>
    </div>
    
    <script src="../dist/js/dynamics.js"></script>
</body>
</html>
```

### :package: NPM 

La otra forma de disponer de la biblioteca es através del gestor de paquetes de Nodejs ingresando el siguiente comando 
desde el shell.

```shell
npm install dytips
```
## :pushpin: Utilización

Lo primero que hay que hacer cuando queremos utilizar esta biblioteca es inicializar los módulos que necesitemos, dependiendo
de los elementos que disparan los eventos estáticos (incluidos dentro del HTML) o dinámicos (se incorporan dentro del html luego de iniciada la página).
  1. Automática (Con añadir el archivo *dynamics.min.js* se inicializan todos los módulos)
  2. Manual (Cada módulo se inicializará con su función específica a través del objeto *DY*)

> Cuando los elementos dinámicos están asociados a componentes que no están definidos de manera estática dentro del DOM, sino que 
se ingresan dinámicamente a través de JS, es necesario inicializar los módulos manualmente.

### :pencil: Modificación

Todos los elementos dinámicos bienen con estilos predefinidos, los cuales pueden ser modificados para poder ajustrlos a nuestras 
necesidades, desde el código fuente podemos clonar el repositorio, de manera tal de disponer de los archivos ```SASS```.

```shell
git clone https://github.com/FedeManzano/dynamics-tips
```

```shell
sass -s compressed sass/dynamics.scss dist/css/dinamics.css
```

#### ToolTips 

Desde el archivo ```sass/_tips.scss``` podemos modificar algunas propiedades que permitirán ajustar los estilos y utlizar los elementos dinámicos adaptados al sitio o app en desarrollo.

```sass
/**
    Estilos de para los Tooltips
*/

// Color de fondo
$bg: rgba(0, 0, 0, 0.863);

// Padding 
$padding: 2px 5px 5px 5px;

// Color de la letra
$color: white;

// Redondeado de los bordes
$border-radius: 5px;

// Tamaño de el elemento donde apunta el tooltips
$tam-flecha: 5px;


.tips 
{
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    position: absolute !important; 
    padding: $padding !important;
    color: $color !important;
    background-color: $bg !important;
    border-radius: $border-radius !important;
    white-space: nowrap !important;
    transform: translate(0);
    transition: transform 0.3s ease;


    @mixin flecha_derecha () {
        position: absolute;
        border-top: $tam-flecha solid transparent;
        border-bottom: $tam-flecha solid transparent;
        border-left: $tam-flecha solid $bg;
        top: calc(50% - 4.5px);
        left: calc(100% - 1px);
    }
    
     @mixin flecha_izquierda () {
        position: absolute !important;
        border-top: $tam-flecha solid transparent !important;
        border-bottom: $tam-flecha solid transparent !important;
        border-right: $tam-flecha solid  $bg !important;
        top: calc(50% - 4.5px) !important;
        left: -4px !important;
    }    

    @mixin flecha_abajo () {
        position: absolute;
        border-left: $tam-flecha solid transparent;
        border-top: $tam-flecha solid $bg;
        border-right: $tam-flecha solid transparent;
        bottom: -4.5px;
        left: calc(50% - 4.5px)
    }

    @mixin flecha_arriba() {
        position: absolute;
        border-left: $tam-flecha solid transparent;
        border-bottom: $tam-flecha solid $bg;
        border-right: $tam-flecha solid transparent;
        top: -4px;
        left: calc(50% - 4.5px)
    }

    .mueca-der {
        @include flecha_derecha()
    }

    .mueca-izq {
        @include flecha_izquierda()
    }

    .mueca-arr {
        @include flecha_arriba()
    }


    .mueca-aba {
        @include flecha_abajo()
    }

}

.tips-ele {
    z-index: 0;
    position: relative ;
    overflow: visible !important;
}
```

#### Comentarios

Desde el archivo ```_comments.scss``` podemos realizar la misma acción que con los tooltips.

```sass
/**
  Desde estas variables podemos modificar los estilos del comentario
  manteniendo las funciones lógicas que permiten el funcionamiento
*/
$bg: rgb(255, 255, 255);
$border: 1px solid rgba(0, 0, 0, 0.295);
$border-radius: 5px;
$padding: 10px;
$color: rgb(48, 48, 48);
$fz: 14px;


.com-dinamico {
    position: absolute !important;
    background-color: $bg;
    max-width: 270px !important;
    font-size: $fz;
    padding: $padding;
    border-radius: $border-radius;
    border: $border;
    color: $color;
    line-height: 20px;
    transform: translate(0);
    transition: transform 0.3s;
}

.com-trigger {
    overflow: visible !important;
}
```

#### Dropdown

Desde el archivo ```dropdown.scss``` podemos modificar la lista desplegable del dropdown.

```sass
.dropdown-toggle {
    z-index: 10000000;
    position: relative;
    padding-right: 20px !important;
}

.dropdown-toggle .f-abajo {
    position: absolute; 
}

.dropdown {
    position: absolute;
    background-color: white !important;
    border: 1px solid rgba(0, 0, 0, 0.123);
    min-width: 150px;
    height: fit-content;
    overflow: hidden;
    border-radius: 4px;
    transform: translate(0);
    transition: transform 0.3s;

    ul {
        list-style: none !important;
        padding: 0px !important;
        margin: 0px !important;
        a {
            display: block;
            width: 100%;
            color: black;
            text-decoration: none;
            padding: 5px;
            white-space: nowrap;
            margin: 0px !important;
            &:hover{
                background-color: rgba(0, 0, 0, 0.068);
            }
        }
    }
}

```

#### Toast

```sass
.toast {
    position: fixed;
    padding: 15px;
    border-radius: 5px;
    right: 30px;
    top: 250px;
    transition: top 1s;
    background-color: rgb(21, 23, 32);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: subir 1s  0s 1  linear;
    box-shadow: 0 1px 1px 2px rgba(0, 0, 0, 0.137);
}


.toast .cerrar {
    position: relative;
    border-radius: 3px;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    margin-left: 5px;
}

.toast .cerrar:hover {
    background-color: rgba(255, 255, 255, 0.397);
}

.toast .cerrar::before,
.toast .cerrar::after  {
    content:  "";
    position: absolute;
    width: 15px;
    height: 3px;
    background-color: white;
    left:  calc(50% - 7.2px);
    top:  calc(50% - 3px);
}
.toast .cerrar::before {
    transform: rotate(45deg);
}


.toast .cerrar::after {
    transform: rotate(-45deg);
}

@keyframes subir {
    from {
        top: 300px;
    }to {
        top: 75px;
    }
}
```


## :one: Tooltips

Uno de los elementos dinámicos más utilizados son los Tooltips, en la biblioteca se incluyen a través de una clase CSS 
y un atributo ```data-tips```, luego de manera opcional podemos definir otros atributos como son: ```data-pos``` y ```data-evt``` que 
establecen la posición y el evento disparador de la aparición del tooltips.

### Ejemplo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- 
        Inclusión del archivos de estilos o por CDN como se muestra en la sección correspondiente 
        de esta documentación
     -->
    <link rel="stylesheet" href="[RUTA DEL ARCHIVO]/dynamics.min.css">

    <style>
        .estilos {
            width: 70%;
            margin: auto;
            margin-top: 100px;
            display: flex;
            justify-content: space-around;
        }
    </style>


    <title>ToolTips</title>
</head>
<body>
    
    <div id="test" class="estilos">
        <button class="tips-ele" data-tips="Esto es un Tips Derecho" data-pos="right">Derecha</button>
        <button class="tips-ele" data-tips="Esto es un Tips Izquierdo" data-pos="left">Izquierda</button>
        <button class="tips-ele" data-tips="Esto es un Tips Abajo" data-pos="bottom">Abajo</button>
        <button class="tips-ele" data-tips="Esto es un Tips Arriba" data-pos="top">Arriba</button>
        <button class="tips-ele" data-tips="Esto es un Tips Click" data-pos="top" data-evt="click">Click</button>
    </div>


    <!-- JQUERY se utiliza solamente para añadir el elemento dinámico que se muestra debajo -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- Archivo JS de la biblioteca o por CDN -->
    <script src="[RUTA DEL ARCHIVO]/dynamics.min.js"></script>

    <script>

        /**
         *  Función que permite cargar correctamente los ToolTips
         *  a elementos dinámicos  
         */
        window.onload = () => {
            setTimeout( () => {

                // Inicializa los Tooltips
                DY.ToolTipsInit()
            }, 100)
        }

        // Elemento dinámico que obliga a la inicialización manual
        $("#test").append(`<button class='tips-ele' data-tips='Esto es un botón dinámico'>Dinámico</button>`)
    </script>
</body>
</html>
```
### Tabla de Atributos

| Attr      | Descripción |
|---------  |-------------|
|data-tips  | Almacena el html que se le quiere mostrar al usuario cuando aparece el tooltips                 |
|data-pos   | Posición donde se pretende que aparezca (TOP / LEFT / RIGHT / BOTTOM) Default: bottom           |
|data-evt   | Evento disparador (click | hover) por defecto (hover)                                           |