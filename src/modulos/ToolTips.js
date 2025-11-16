import $ from "jquery";
import Direccion from "./posicionamineto/Direccion";

(function () {

    let origen = null 
    let ele = null 
    let comp = null
    let activo = false

    const eventoResize = () => {
        if(activo) {
            $(".mueca-aba").remove()
            $(".mueca-arr").remove()
            $(".mueca-izq").remove()
            $(".mueca-der").remove()
            activar(origen, ele)
        }
    }


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
        
        $(comp).click((e) => {
            $(".tips").remove()
            $(".tips-complemento").hide()
            activo = false
        })
    }



    const eventoHover= (e) => {
        $(e).hover((e) => {
            origen = e.target 
            ele = $("<div class='tips'></div>")
            $(ele).append($(origen).data("tips"))
            activar(origen, ele)
        }, () => {
            $(ele).remove()
            activo = false
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

        $(window).resize(eventoResize)
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
