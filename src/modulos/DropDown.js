import Direccion from "./posicionamineto/Direccion";

(function () {
    let comp = null
    let press = false
    let elemento = null


    const posicionar = (origen) => {
        let dropdown = origen.dataset.target
        let dropdownElement = document.querySelector(dropdown)
        if (dropdownElement) {
            dropdownElement.style.display = "block"
            let pos = origen.dataset.pos || "abajo"
            Direccion.posicionar(pos, origen, dropdownElement, false)
            press = true
        }
    }

    const activar = (origen) => {
        if (origen.classList.contains("desactivado")) {
            return
        }

        if (press) {
            document.querySelectorAll(".dropdown").forEach((e) => {
                e.style.display = "none"
            })
            press = false
        }

        if (comp) {
            comp.style.display = "block"
        }
        posicionar(origen)
    }

    // Funciones nombradas para event handlers - Click
    const handleClickToggle = function (evt) {
        if (press) {
            if (comp) {
                comp.style.display = "none"
            }
            document.querySelectorAll(".dropdown").forEach((e) => {
                e.style.display = "none"
            })
            press = false
        }
        activar(this)
    }

    const handleCompClick = (evt) => {
        document.querySelectorAll(".dropdown, .drop-complemento").forEach((e) => {
            e.style.display = "none"
        })
        press = false
    }

    const handleDropdownClick = (evt) => {
        if (comp) {
            comp.style.display = "none"
        }
        document.querySelectorAll(".dropdown").forEach((e) => {
            e.style.display = "none"
        })
        press = false
    }

    // Funciones nombradas para event handlers - Hover
    const handleMouseEnter = function (evt) {
        activar(this)
    }

    const eventoClick = (e) => {
        e.addEventListener("click", handleClickToggle)
    }

    const eventoHover = (e) => {
        e.addEventListener("mouseenter", handleMouseEnter)
    }


    const crearFlecha = (color) => {
        let flecha = document.createElement("span")
        flecha.classList.add("f-abajo")

        const borderColor = color !== undefined ? color : "white"
        flecha.style.borderTop = `5px solid ${borderColor}`
        flecha.style.borderLeft = "5px solid transparent"
        flecha.style.borderRight = "5px solid transparent"
        flecha.style.left = "80%"
        flecha.style.top = "calc(50% - 2.5px)"

        return flecha
    }

    const inicializar = () => {
        // Crear elemento complemento (Singleton)
        comp = document.createElement("div")
        comp.classList.add("drop-complemento")
        document.body.appendChild(comp)
        comp.addEventListener("click", handleCompClick)

        document.querySelectorAll(".dropdown-toggle").forEach((e) => {
            if (!e.classList.contains("desactivado")) {
                elemento = e
                let evt = e.dataset.evt
                let color = e.dataset.color
                let flecha = crearFlecha(color)
                e.appendChild(flecha)

                if (evt === "hover") {
                    eventoHover(e)
                } else {
                    eventoClick(e)
                }
            } else {
                // Elemento desactivado
                let flecha = crearFlecha("grey")
                e.appendChild(flecha)
            }
        })

        // Event listeners para dropdowns
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
            dropdown.addEventListener("click", handleDropdownClick)
        })

        // Window resize
        window.addEventListener("resize", () => {
            if (press && elemento) {
                posicionar(elemento)
            }
        })

        // Window scroll
        window.addEventListener("scroll", () => {
            if (comp) {
                comp.style.display = "none"
            }
            document.querySelectorAll(".dropdown").forEach((e) => {
                e.style.display = "none"
            })
            press = false
        })
    }

    const destroy = () => {
        // Remover event listeners de toggles
        document.querySelectorAll(".dropdown-toggle").forEach((e) => {
            e.removeEventListener("click", handleClickToggle)
            e.removeEventListener("mouseenter", handleMouseEnter)
        })

        // Remover event listeners de dropdowns
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
            dropdown.removeEventListener("click", handleDropdownClick)
        })

        // Limpiar complemento
        if (comp) {
            comp.removeEventListener("click", handleCompClick)
            comp.remove()
            comp = null
        }

        // Remover flechas
        document.querySelectorAll(".f-abajo").forEach((flecha) => {
            flecha.remove()
        })

        press = false
        elemento = null
    }

    const DropDown = {
        iniciar: () => inicializar(),
        destroy: () => destroy()
    }

    window.DropDown = DropDown
})()

export default DropDown
