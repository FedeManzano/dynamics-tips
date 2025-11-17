
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
pueden obtenerse conando este mismo repositorio.

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

Lo primero que hay que hacer cuando queremos utilizar esta biblioteca es inicializar los módulos quq necesitemos, para comodidad 
del desarrollador existen dos formas: 
  - Automática (Con añadir el archivo *dynamics.min.js* se inicializan todos los módulos)
  - Manual (Cada módulo se inicializará con su función específica a través del objeto *DY*)

> Cuando los elementos dinámicos están asociados a componentes que no están definidos de manera estática dentro del DOM, sino que 
se ingresan dinámicamente a través de JS, es necesario inicializar los módulos manualmente.

### Tooltips

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../css/dynamics.css">

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


    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="../dist/js/dynamics.js"></script>

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