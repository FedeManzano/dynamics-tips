import $ from "jquery";
import Direccion from "./posicionamineto/Direccion";

(function () {
    let  comp  
    let press = false
    let elemento = null


    const posicionar = (origen) => {
        let dropdown = $(origen).data("target")
        $(dropdown).show()
        let pos = $(origen).data("pos")
        Direccion.posicionar(pos, origen, dropdown, false)
        press = true
    }

    const activar = (e) => {

        if($(e.target).hasClass("desactivado"))
            return
        if(press) {
            $(".dropdown").hide() 
            press = false
        }
        $(".drop-complemento").show()
        let origen = e.target
        posicionar(origen)
    }

    const eventoClick = (e) => {
        $(e).click((e) =>{
            if(press) {
                $(comp).hide()
                $(".dropdown").hide()
                press = false
                return 
            }
            activar(e)
        })

        $(comp).click((e) => {
            $(".dropdown").hide()
            $(".drop-complemento").hide()
            press = false
        })
    }

    const eventoHover = (e) => {
        $(e).hover((e) =>{
            activar(e)
        })

        $(comp).click((e) => {
            $(".dropdown").hide()
            $(".drop-complemento").hide()
            press = false
        })
    }


    const inicializar = () => {
        comp = $("<div class='drop-complemento'>")
        $("body").append(comp)
        $(".dropdown-toggle").each((index, e) => {
            if(!$(e).hasClass("desactivado")) {
                elemento = e
                let evt = $(e).data("evt")
                let flecha = $("<span class='f-abajo'></span>")
                $(e).append(flecha)
    
                let color = $(e).data("color")
    
                if(color !== undefined)
                    $(flecha).css("border-top", "5px solid " + color)
                else 
                    $(flecha).css("border-top", "5px solid white")
                $(flecha).css("border-left", "5px solid transparent")
                $(flecha).css("border-right", "5px solid transparent")
                $(flecha).css("left", "80%")
                $(flecha).css("top", "calc(50% - 2.5px)")
                if(evt === "hover")
                    eventoHover(e)
                else
                    eventoClick(e) 
            } else {
                let flecha = $("<span class='f-abajo'></span>")
                $(flecha).css("border-top", "5px solid grey")
                $(flecha).css("border-left", "5px solid transparent")
                $(flecha).css("border-right", "5px solid transparent")
                $(flecha).css("left", "80%")
                $(flecha).css("top", "calc(50% - 2.5px)")
                $(e).append(flecha)
            }
                
        })

        $(".dropdown").click((e)=> {
            $(comp).hide()
            $(".dropdown").hide()
            press = false
        })


        $(window).resize(() => {
            if(press) {
                posicionar(elemento)
            }
        })

        $(window).scroll(() => {
            $(comp).hide()
            $(".dropdown").hide()
            press = false
        })

        
    }

    const destroy = () => {
        $(".dropdown-toggle").off()
        $(".drop-complemento").off()
        comp  = null
        press = false
        elemento = null
    }

    const DropDown = {
        iniciar: () => inicializar(),
        destroy: () => destroy()
    }

    window.DropDown = DropDown
}) ()

export default DropDown
