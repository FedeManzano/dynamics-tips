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
        $(e).click((e) => {
            comentario = $("<div class='com-dinamico'></div>")
            origen = e.target
            $(comentario).append($(origen).data("info"))
            $("body").append(comentario) 
            $(comentario).show()
            $(comp).show()
            arrancar(origen, comentario)
        })

        $(comp).click((e) => {
            $(".com-dinamico").remove()
            $(".com-complemento").hide()
            activo = false
        })
    }

    const eventoHover = (e) => {
        $(e).hover((e) => {
            comentario = $("<div class='com-dinamico'></div>")
            origen = e.target
            $(comentario).append($(origen).data("info"))
            $("body").append(comentario) 
            $(comentario).show()
            arrancar(origen, comentario)
        }, () => {
            $(".com-dinamico").remove()
            activo = false
        })
    }
    const inicializar = () => {
        $(".com-trigger").each((index, e) => {
            let evt = $(e).data("evt")
            if(evt === "hover") {
                eventoHover(e)
            }else if(evt === "click") {
                eventoClick(e)
            }else {
                eventoHover(e)
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