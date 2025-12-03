
import Posicionamiento from "./Posicionamiento";


class Desplazar {
    static ejecutar(origen, ele, metodoPreguntar, metodoPosicionar, mueca = false, clase) {
        if (metodoPreguntar(origen, ele)) {
            ele.style.left = Posicionamiento.reacomodamientoHorizontal(origen, ele) + "px"
            ele.style.top = Posicionamiento.reacomodamientoVertical(origen, ele) + "px"
            if (mueca) {
                let m = document.createElement("span")
                m.classList.add(clase)
                ele.appendChild(m)
            }
            metodoPosicionar(origen, ele)
            return true
        }

        return false
    }
}

export default Desplazar