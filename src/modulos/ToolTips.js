
/*!
 * Módulo que permite la gestión de los Tooltips
 * A partir de la versión 2.5.0 se mejoró 
 * la apariencia y se cambiaron las funciones DEPRECATED
 * por las actuales de JQUERY.
 */


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
        if (activo) {
            document.querySelectorAll(".mueca-aba").forEach(e => e.remove())
            document.querySelectorAll(".mueca-arr").forEach(e => e.remove())
            document.querySelectorAll(".mueca-izq").forEach(e => e.remove())
            document.querySelectorAll(".mueca-der").forEach(e => e.remove())
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
        let pos = origen.dataset.pos
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
        document.body.appendChild(ele)
        realizarAparicion(origen, ele)
    }


    /**
     * Función que gestiona el evento click del usuario
     * @param {Elemento origen que desencadena el evento} e 
     */
    const handleClick = (evt) => {
        document.querySelectorAll(".tips").forEach(el => el.remove())
        origen = evt.target
        ele = document.createElement("div")
        ele.classList.add("tips")
        ele.innerHTML = origen.dataset.tips
        if (comp) comp.style.display = 'block'
        activar(origen, ele)
    }

    const handleCompClick = () => {
        document.querySelectorAll(".tips").forEach(el => el.remove())
        if (comp) comp.style.display = 'none'
        activo = false
    }

    /**
     * Función que gestiona el evento click del usuario
     * @param {Elemento origen que desencadena el evento} e 
     */
    const eventoClick = (e) => {
        // Singleton pattern for comp
        if (!comp) {
            comp = document.createElement("div")
            comp.classList.add("tips-complemento")
            document.body.appendChild(comp)
            comp.addEventListener("click", handleCompClick)
        }

        e.addEventListener("click", handleClick)
    }

    const MouseEnter = (e) => {
        origen = e.target
        ele = document.createElement("div")
        ele.classList.add("tips")
        ele.innerHTML = origen.dataset.tips
        activar(origen, ele)
    }

    const MouseLeave = () => {
        if (ele) ele.remove()
        activo = false
    }

    const eventoHover = (e) => {
        e.addEventListener("mouseenter", MouseEnter)
        e.addEventListener("mouseleave", MouseLeave)
    }

    const inicializar = () => {
        console.log("ToolTips: inicializar")
        document.querySelectorAll(".tips-ele").forEach((e) => {
            let evento = e.dataset.evt
            console.log("ToolTips: element found", e, "event:", evento)
            if (evento === "click")
                eventoClick(e)
            else if (evento === "hover")
                eventoHover(e)
            else
                eventoHover(e)
        })

        window.addEventListener("resize", eventoResize)
    }

    const destroy = () => {
        document.querySelectorAll(".tips-ele").forEach((e) => {
            e.removeEventListener("click", handleClick)
            e.removeEventListener("mouseenter", MouseEnter)
            e.removeEventListener("mouseleave", MouseLeave)
        })
        window.removeEventListener("resize", eventoResize)
        if (comp) {
            comp.remove()
            comp = null
        }
        origen = null
        ele = null
        activo = false
    }


    const ToolTips = {
        iniciar: () => inicializar(),
        destroy: () => destroy()
    }

    window.ToolTips = ToolTips
})()

export default ToolTips
