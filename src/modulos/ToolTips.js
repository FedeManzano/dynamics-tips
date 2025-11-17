
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
        Direccion.posicionar(pos, origen, ele, true)
        activo = true
    }

    const activar = (origen, ele) => {
        $("body").append(ele)
        realizarAparicion(origen, ele)
    }


    const eventoClick = (e) => {
        comp = $("<div class='tips-complemento'>")
        $("body").append(comp)
        $(e).click((e) => {
            $(".tips").remove()
            origen = e.target 
            ele = $("<div class='tips'></div>")
            $(ele).append($(origen).data("tips"))
            $(comp).show()
            activar(origen, ele)
        })
        
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
