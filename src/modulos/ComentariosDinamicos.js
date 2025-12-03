
import Direccion from "./posicionamineto/Direccion";

(function () {

    let comentario = null,
        origen = null,
        comp = null,
        activo = false

    // Singleton para el elemento complemento
    let complementoElement = null

    const arrancar = (origen, comentario) => {
        let pos = origen.dataset.pos || "abajo"
        Direccion.posicionar(pos, origen, comentario, true)
        activo = true
    }

    // Funciones nombradas para event handlers - Click
    const handleClickTrigger = function (evt) {
        // Crear complemento si no existe (Singleton)
        if (!complementoElement) {
            complementoElement = document.createElement("div")
            complementoElement.classList.add("com-complemento")
            document.body.appendChild(complementoElement)
            complementoElement.addEventListener("click", handleCompClick)
        }

        comentario = document.createElement("div")
        comentario.classList.add("com-dinamico")
        document.body.appendChild(comentario)
        comentario.style.display = "block"
        comentario.innerHTML = this.dataset.info || ""
        complementoElement.style.display = "block"

        origen = this
        arrancar(origen, comentario)
    }

    const handleCompClick = (evt) => {
        document.querySelectorAll(".com-dinamico").forEach((e) => {
            e.remove()
        })
        if (complementoElement) {
            complementoElement.style.display = "none"
        }
        activo = false
    }

    // Funciones nombradas para event handlers - Hover
    const handleMouseEnter = function (e) {
        comentario = document.createElement("div")
        comentario.classList.add("com-dinamico")
        document.body.appendChild(comentario)
        comentario.style.display = "block"
        origen = this
        comentario.innerHTML = origen.dataset.info || ""
        arrancar(origen, comentario)
    }

    const handleMouseLeave = function (e) {
        document.querySelectorAll(".com-dinamico").forEach((e) => {
            e.remove()
        })
        activo = false
    }

    const eventoClick = (elemento) => {
        elemento.addEventListener("click", handleClickTrigger)
    }

    const eventoHover = (elemento) => {
        elemento.addEventListener("mouseenter", handleMouseEnter)
        elemento.addEventListener("mouseleave", handleMouseLeave)
    }

    const inicializar = () => {
        document.querySelectorAll(".com-trigger").forEach((elemento) => {
            const tipoEvento = elemento.dataset.evt || "hover"

            switch (tipoEvento) {
                case "hover":
                    eventoHover(elemento)
                    break;
                case "click":
                    eventoClick(elemento)
                    break;
                default:
                    eventoHover(elemento)
            }
        })

        window.addEventListener("scroll", () => {
            if (activo) {
                arrancar(origen, comentario)
            }
        })

        window.addEventListener("resize", () => {
            if (activo) {
                arrancar(origen, comentario)
            }
        })
    }

    const destroy = () => {
        document.querySelectorAll(".com-trigger").forEach((elemento) => {
            elemento.removeEventListener("click", handleClickTrigger)
            elemento.removeEventListener("mouseenter", handleMouseEnter)
            elemento.removeEventListener("mouseleave", handleMouseLeave)
        })

        // Limpiar elementos del DOM
        document.querySelectorAll(".com-dinamico").forEach((e) => e.remove())

        if (complementoElement) {
            complementoElement.removeEventListener("click", handleCompClick)
            complementoElement.remove()
            complementoElement = null
        }

        comentario = null
        origen = null
        comp = null
        activo = false
    }

    const ComentarioDinamico = {
        iniciar: () => inicializar(),
        destroy: () => destroy()
    }

    window.ComentarioDinamico = ComentarioDinamico
})()

export default ComentarioDinamico