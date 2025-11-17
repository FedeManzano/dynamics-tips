
import $ from "jquery";
import Direccion from "./posicionamineto/Direccion";

(function(){

    let comentario = null, 
        origen = null,
        comp = null,
        activo = false

    const arrancar = (origen, comentario) => {
        let pos = $(origen).data("pos")
        Direccion.posicionar(pos, origen, comentario, true)
        activo = true
    }

    const eventoClick = (e) => {
        comp = $("<div class='com-complemento'>")
        $("body").append(comp)
        $(e).on("click",(e) => {
            comentario = $("<div class='com-dinamico'></div>")
            origen = e.target
            $(comentario).append($(origen).data("info"))
            $("body").append(comentario) 
            $(comentario).show()
            $(comp).show()
            arrancar(origen, comentario)
        })

        $(comp).on("click",(e) => {
            $(".com-dinamico").remove()
            $(".com-complemento").hide()
            activo = false
        })
    }

    const MouseEnter = (e) => {
        comentario = $("<div class='com-dinamico'></div>")
        origen = e.target
        $(comentario).append($(origen).data("info"))
        $("body").append(comentario) 
        $(comentario).show()
        arrancar(origen, comentario)
    }

    const MouseLeave = (e) => {
        $(".com-dinamico").remove()
        activo = false
    }

    const eventoHover = (e) => {
        $(e).on({
            mouseenter: MouseEnter,
            mouseleave: MouseLeave
        })
    }
    const inicializar = () => {
        $(".com-trigger").each((index, e) => {
            switch($(e).data("evt")) {
                case "hover": eventoHover(e)
                    break;
                case "click": eventoClick(e)
                    break;
                default:  
                    eventoHover(e)
                    return
            }
        })


        $(window).scroll(() => {
            if(activo) {
                arrancar(origen, comentario)
            }
        })

        $(window).resize(() => {
            if(activo) {
                arrancar(origen, comentario)
            }
        })
    }

    const destroy = () => {
        $(".com-trigger").off()
        $(".com-dinamico").off()
        comentario = null, 
        origen = null,
        comp = null
    }

    const ComentarioDinamico = {
        iniciar: () => inicializar(),
        destroy: () => destroy()
    }

    window.ComentarioDinamico = ComentarioDinamico
})()

export default ComentarioDinamico