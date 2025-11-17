import $ from "jquery";
import Direccion from "./posicionamineto/Direccion";


(function () {

    let origen = null 
    let ele = null
    let elemento = null 
    let comp = null
    let activo = false


    const eventoResize = () => {
        if(activo) {
            activar(origen, ele)
        }
    }


    const realizarAparicion = (origen, ele) => {
        let pos = $(origen).data("pos")
        Direccion.posicionar(pos, origen, ele, false)
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
            ele = $(`<div class='${elemento}'></div>`)
            $(ele).css("z-index",10000000 )
            origen = e.target
            $(ele).css("position", "absolute")
            $(ele).css("max-width", 270)
            $(ele).append($(e.target).data("info"))
            $(ele).remove()
            $(comp).show()

            activar(e.target, ele)
        })

        $(comp).click((e) => {
            $(ele).remove()
            $(".tips-complemento").hide()
            activo = false
        })
    }


    const eventoHover= (e) => {
        $(e).hover((e) => {
            origen = e.target 
            ele = $(`<div class='${elemento}'></div>`)
            $(ele).css("z-index",10000000 )
            $(ele).append($(origen).data("info"))
            $(ele).css("position", "absolute")
            $(ele).css("max-width", 270)
            activar(origen, ele)
        }, () => {
            $(ele).remove()
            activo = false
        })
    }

    const eventos = (e) => {
        let evt = $(e).data("evt")
        if(evt === "click") {
            eventoClick(e)
        }else {
            eventoHover(e)
        }

        
    }

    const inicializar = ({ori="sinOrigen", ele=""}) => {
        if(origen === "sinOrigen") 
            return
        origen = ori 
        elemento = ele 
        $("."+origen).each((index, e) => {
            eventos(e)
        })

        $(window).resize(eventoResize)
        $(window).scroll(() => {
            if(activo) {
                arrancar(origen, comentario)
            }
        })
    }

    const destroy = () => {
        origen = null 
        ele = null
        elemento = null 
        comp = null
        activo = false
        $(origen).off()
        $(comp).off()
        $(window).off("resize", eventoResize)
    }


    const Personalizado = {
        iniciar: (config) => inicializar(config),
        destroy: () => destroy()
    }

    window.Personalizado = Personalizado
}) ()

export default Personalizado
