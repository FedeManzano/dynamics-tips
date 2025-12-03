
/**
 * Clase que ocupa el núcleo de posicionamiento de la 
 * biblioteca, es la base de como los elementos dinámicos 
 * ocupan el lugar correcto dentro del DOM.
 */
class Posicionamiento {

    /**
     * Permite definir el posicionamiento horizontal del elemento dinámico
     * @param {Elemento del que se origina el posicionamiento} origen 
     * @param {Elemento dinámico} ele 
     * @returns posicionamiento horizontal del elemento dinámico
     */
    static posicionamientoInicialX(origen, ele) {
        let x = origen.getBoundingClientRect().left + window.pageXOffset
        ele.style.left = x + "px"
        return x
    }

    /**
     * Permite definir el posicionamiento vertical del elemento dinámico
     * @param {Elemento al que se le añade el elemento dinámico} origen 
     * @param {Elemento dinámico} ele 
     * @returns y del elemento dinámico
     */
    static posicionamientoInicialY(origen, ele) {
        let y = origen.getBoundingClientRect().top + window.pageYOffset
        ele.style.top = y + "px"
        return y
    }

    /**
     * Método para saber si el elemento dinámico puede ser posicionado arriba
     * @param {Elemento al que se le añade el elemento dinámico} origen 
     * @param {Elemento dinámico} ele 
     * @returns {boolean} true si el elemento dinámico puede ser posicionado arriba
     */
    static puedeArriba(origen, ele) {
        const offsetTopOrigen = origen.getBoundingClientRect().top + window.pageYOffset
        const wScrollTop = window.pageYOffset
        const tipsHeight = ele.offsetHeight
        return offsetTopOrigen - wScrollTop > tipsHeight + 6
    }

    /**
     * 
     * @param {Elemento al que se le añade el elemento dinámico} origen 
     * @param {Elemento dinámico} ele 
     * @returns {boolean} true si el elemento dinámico puede ser posicionado abajo
     */
    static puedeAbajo(origen, ele) {
        const windowHeight = window.innerHeight
        const wScrollTop = window.pageYOffset
        const origenOffsetTop = origen.getBoundingClientRect().top + window.pageYOffset
        const origenHeight = origen.offsetHeight
        const tipsHeight = ele.offsetHeight
        return windowHeight + wScrollTop -
            (origenOffsetTop + origenHeight)
            > tipsHeight + 6
    }


    static puedeDerecha(origen, ele) {
        const windowWidth = document.documentElement.clientWidth
        const origenOffsetLeft = origen.getBoundingClientRect().left + window.pageXOffset
        const origenWidth = origen.offsetWidth
        const tipsWidth = ele.offsetWidth
        return windowWidth - origenOffsetLeft - origenWidth - 80 > tipsWidth + 5
    }

    static puedeIzquierda(origen, ele) {
        return (origen.getBoundingClientRect().left + window.pageXOffset) > ele.offsetWidth + 5
    }

    static reacomodamientoHorizontal(origen, ele) {
        var corr = (origen.offsetWidth) - ele.offsetWidth
        return Posicionamiento.posicionamientoInicialX(origen, ele) + Math.round(corr / 2)
    }

    static reacomodamientoVertical(origen, ele) {
        var corr = (origen.offsetHeight) - ele.offsetHeight
        return Posicionamiento.posicionamientoInicialY(origen, ele) + Math.round(corr / 2)
    }


    static topeIzquierda(ele) {
        const despIzq = ele.getBoundingClientRect().left + window.pageXOffset
        return despIzq <= 0 ? despIzq * -1 : 0
    }

    static topeArriba(ele) {
        const despArr = ele.getBoundingClientRect().top
        return despArr <= 0 ? (despArr - 6) * -1 : 0
    }

    static topeDerecha(ele) {
        const despDer = document.documentElement.clientWidth - (ele.getBoundingClientRect().left + window.pageXOffset) - ele.offsetWidth
        return despDer <= 0 ? Math.round((despDer - 6)) : 0
    }

    static posicionarArriba(origen, ele) {
        ele.style.top = (origen.getBoundingClientRect().top + window.pageYOffset - ele.offsetHeight - 5) + "px"

        var di = Posicionamiento.topeIzquierda(ele)
        var td = Posicionamiento.topeDerecha(ele)

        if (di !== 0) {
            ele.style.left = (Posicionamiento.reacomodamientoHorizontal(origen, ele) + di) + "px"
            td = 0
        }
        if (td !== 0)
            ele.style.left = (Posicionamiento.reacomodamientoHorizontal(origen, ele) + td) + "px"
        ele.style.transform = 'translateY(-10px)'
    }


    static posicionarAbajo(origen, ele) {
        ele.style.top = (origen.getBoundingClientRect().top + window.pageYOffset + origen.offsetHeight + 5) + "px"
        var di = Posicionamiento.topeIzquierda(ele)
        var td = Posicionamiento.topeDerecha(ele)
        if (di !== 0) {
            ele.style.left = (Posicionamiento.reacomodamientoHorizontal(origen, ele) + di) + "px"
            td = 0
        }
        if (td !== 0)
            ele.style.left = (Posicionamiento.reacomodamientoHorizontal(origen, ele) + td) + "px"
        ele.style.transform = 'translateY(10px)'
    }

    static posicionarIzquierda(origen, ele) {
        ele.style.left = (origen.getBoundingClientRect().left + window.pageXOffset - ele.offsetWidth - 25) + "px"
        var da = Posicionamiento.topeArriba(ele)
        if (da !== 0)
            ele.style.top = (Posicionamiento.reacomodamientoVertical(origen, ele) + da) + "px"
        ele.style.transform = 'translateX(-10px)'
    }

    static posicionarDerecha(origen, ele) {
        ele.style.left = (origen.getBoundingClientRect().left + window.pageXOffset + origen.offsetWidth + 15) + "px"
        var da = Posicionamiento.topeArriba(ele)
        if (da !== 0)
            ele.style.top = (Posicionamiento.reacomodamientoVertical(origen, ele) + da) + "px"
        ele.style.transform = 'translateX(10px)'
    }

}


export default Posicionamiento