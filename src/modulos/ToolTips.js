
/*!
 * Módulo que permite la gestión de los Tooltips
 * A partir de la versión 2.5.0 se mejoró 
 * la apariencia y se cambiaron las funciones DEPRECATED
 * por las actuales de JQUERY.
 */

// Dependencia de desarrollo y producción jquery
import $ from "jquery";

// Módulo de posicionamiento general de todos los módulos
import Direccion from "./posicionamineto/Direccion";

(function () {

    // Guarda el elemento origen
    // o sea el elemento disparador
    let origen = null 

    // Elemento dinámico
    let ele = null 

    // Complemento permite desaparecer el 
    // elemento dinámico asignado
    let comp = null

    // Permite conocer el estado de los 
    // tootips
    let activo = false

    /**
     * Evento que permite gestionar los 
     * tooltips cuando se redimensiona la pantalla.
     */
    const eventoResize = () => {
        if(activo) {
            $(".mueca-aba").remove()
            $(".mueca-arr").remove()
            $(".mueca-izq").remove()
            $(".mueca-der").remove()
            activar(origen, ele)
        }
    }


    /**
     * Función encargada de posicionar el elemento dinámico
     * y mostrarlo en pantalla cuando lo requiera el usuario.
     * @param {Ellmento de origen. Disparador} origen 
     * @param {Elemento dinámico} ele 
     */
    const realizarAparicion = (origen, ele) => {
        let pos = $(origen).data("pos")

        // Método que utliza el núcleo de posicionamiento
        // para ublicar de manera correcta el elemento
        Direccion.posicionar(pos, origen, ele, true)
        activo = true
    }

    /**
     * Añade el elemento dinámico al body de 
     * la página.
     * @param {Elemento de origen} origen 
     * @param {Elemento dinámico a agregar} ele 
     */
    const activar = (origen, ele) => {
        $("body").append(ele)
        realizarAparicion(origen, ele)
    }


    /**
     * Función que gestiona el evento click del usuario
     * @param {Elemento origen que desencadena el evento} e 
     */
    const eventoClick = (e) => {

        // Complemento que permite desaparecer el elemento 
        // dinámico presionando en cualquier parte 
        // de la pantalla
        comp = $("<div class='tips-complemento'>")

        // Añade el complemento al DOM
        $("body").append(comp)

        /**
         * Evento click al elemento origen
         */        
        $(e).on("click",(e) => {
            // Primero remueve todos los tips
            // limpia la pantalla 
            $(".tips").remove()

            // Asigna al objeto origen el disparador del evento
            origen = e.target 

            // crea tips y le añade el contenidof del data-tips del
            // orgen
            ele = $("<div class='tips'></div>")
            $(ele).append($(origen).data("tips"))

            // Apararece el complemento
            // para poder desaparecer al elemento
            $(comp).show()

            // Aparece el elemento dinámico en pantalla
            activar(origen, ele)
        })
        
        /**
         * Cuando se hace click en el 
         * complemento desaparece el tooltips
         */
        $(comp).on("click",(e) => {
            $(".tips").remove()
            $(".tips-complemento").hide()
            activo = false
        })
    }

    const MouseEnter = (e) => {
        origen = e.target 
        ele = $("<div class='tips'></div>")
        $(ele).append($(origen).data("tips"))
        activar(origen, ele)
    }

    const MouseLeave = (e) => {
        $(ele).remove()
        activo = false
    }

    const eventoHover = (e) => {
        $(e).on({
            mouseenter : MouseEnter,
            mouseleave: MouseLeave
        })
    }
    const inicializar = () => {
        
        $(".tips-ele").each((index, e) => {
            let evento = $(e).data("evt")
            if(evento === "click")
                eventoClick(e)
            else if(evento === "hover")
                eventoHover(e)
            else 
                eventoHover(e)
        })

        $(window).on("resize",eventoResize)
    }

    const destroy = () => {
        $(".tips-ele").off()
        $(window).off("resize", eventoResize)
        origen = null 
        ele = null 
        comp = null
        activo = false
    }


    const ToolTips = {
        iniciar: () => inicializar(),
        destroy: () => destroy()
    }

    window.ToolTips = ToolTips
}) ()

export default ToolTips
