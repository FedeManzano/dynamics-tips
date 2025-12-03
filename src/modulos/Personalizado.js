import Direccion from "./posicionamineto/Direccion";


(function () {

    let origen = null
    let ele = null
    let elemento = null
    let comp = null
    let activo = false


    const eventoResize = () => {
        if (activo && origen && ele) {
            realizarAparicion(origen, ele)
        }
    }

    const eventoScroll = () => {
        if (activo && origen && ele) {
            realizarAparicion(origen, ele)
        }
    }

    const realizarAparicion = (origen, ele) => {
        let pos = origen.dataset.pos || "abajo"
        Direccion.posicionar(pos, origen, ele, false)
        activo = true
    }

    const activar = (origen, ele) => {
        document.body.appendChild(ele)
        realizarAparicion(origen, ele)
    }

    // Funciones nombradas para event handlers - Click
    const handleClickTrigger = function (evt) {
        ele = document.createElement("div")
        if (elemento) {
            ele.classList.add(elemento)
        }
        ele.style.zIndex = 10000000
        ele.style.position = "absolute"
        ele.style.maxWidth = "270px"
        ele.innerHTML = this.dataset.info || ""

        origen = this

        if (comp) {
            comp.style.display = "block"
        }

        activar(origen, ele)
    }

    const handleCompClick = (evt) => {
        if (ele) {
            ele.remove()
            ele = null
        }
        if (comp) {
            comp.style.display = "none"
        }
        activo = false
    }

    const eventoClick = (e) => {
        if (!comp) {
            comp = document.createElement("div")
            comp.classList.add("tips-complemento")
            document.body.appendChild(comp)
            comp.addEventListener("click", handleCompClick)
        }

        e.addEventListener("click", handleClickTrigger)
    }

    // Funciones nombradas para event handlers - Hover
    const handleMouseEnter = function (evt) {
        origen = this
        ele = document.createElement("div")
        if (elemento) {
            ele.classList.add(elemento)
        }
        ele.style.zIndex = 10000000
        ele.style.position = "absolute"
        ele.style.maxWidth = "270px"
        ele.innerHTML = this.dataset.info || ""

        activar(origen, ele)
    }

    const handleMouseLeave = function (evt) {
        if (ele) {
            ele.remove()
            ele = null
        }
        activo = false
    }

    const eventoHover = (e) => {
        e.addEventListener("mouseenter", handleMouseEnter)
        e.addEventListener("mouseleave", handleMouseLeave)
    }

    const eventos = (e) => {
        let evt = e.dataset.evt
        if (evt === "click") {
            eventoClick(e)
        } else {
            eventoHover(e)
        }
    }

    const inicializar = ({ ori = "sinOrigen", ele = "" }) => {
        if (ori === "sinOrigen")
            return

        origen = ori
        elemento = ele

        document.querySelectorAll("." + ori).forEach((e) => {
            eventos(e)
        })

        window.addEventListener("resize", eventoResize)
        window.addEventListener("scroll", eventoScroll)
    }

    const destroy = () => {
        // Remover event listeners de elementos
        document.querySelectorAll("." + origen).forEach((e) => {
            e.removeEventListener("click", handleClickTrigger)
            e.removeEventListener("mouseenter", handleMouseEnter)
            e.removeEventListener("mouseleave", handleMouseLeave)
        })

        // Limpiar elementos del DOM
        if (ele) {
            ele.remove()
        }

        if (comp) {
            comp.removeEventListener("click", handleCompClick)
            comp.remove()
        }

        // Remover window listeners
        window.removeEventListener("resize", eventoResize)
        window.removeEventListener("scroll", eventoScroll)

        origen = null
        ele = null
        elemento = null
        comp = null
        activo = false
    }


    const Personalizado = {
        iniciar: (config) => inicializar(config),
        destroy: () => destroy()
    }

    window.Personalizado = Personalizado
})()

export default Personalizado
