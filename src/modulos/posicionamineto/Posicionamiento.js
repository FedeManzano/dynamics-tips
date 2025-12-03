import $ from "jquery"

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
        const windowWidth = $(window).width()
        const origenOffsetLeft = $(origen).offset().left
        const origenWidth = $(origen).width()
        const tipsWidth = $(ele).width()
        return windowWidth - origenOffsetLeft - origenWidth - 80 > tipsWidth + 5
    }

    static puedeIzquierda(origen, ele) {
        return $(origen).offset().left > $(ele).width() + 5
    }

    static reacomodamientoHorizontal(origen, ele) {
        var corr = ($(origen).outerWidth()) - $(ele).outerWidth()
        return Posicionamiento.posicionamientoInicialX(origen, ele) + Math.round(corr / 2)
    }

    static reacomodamientoVertical(origen, ele) {
        var corr = ($(origen).outerHeight()) - $(ele).outerHeight()
        return Posicionamiento.posicionamientoInicialY(origen, ele) + Math.round(corr / 2)
    }


    static topeIzquierda(ele) {
        const despIzq = $(ele).offset().left
        return despIzq <= 0 ? despIzq * -1 : 0
    }

    static topeArriba(ele) {
        const despArr = $(ele).offset().top - $(window).scrollTop()
        return despArr <= 0 ? (despArr - 6) * -1 : 0
    }

    static topeDerecha(ele) {
        const despDer = $(window).width() - $(ele).offset().left - $(ele).outerWidth()
        return despDer <= 0 ? Math.round((despDer - 6)) : 0
    }

    static posicionarArriba(origen, ele) {
        $(ele).css("top", $(origen).offset().top - $(ele).outerHeight() - 5)

        var di = Posicionamiento.topeIzquierda(ele)
        var td = Posicionamiento.topeDerecha(ele)

        if (di !== 0) {
            $(ele).css("left", Posicionamiento.reacomodamientoHorizontal(origen, ele) + di)
            td = 0
        }
        if (td !== 0)
            $(ele).css("left", Posicionamiento.reacomodamientoHorizontal(origen, ele) + td)
        $(ele).css({ transform: 'translateY(-10px)' })
    }


    static posicionarAbajo(origen, ele) {
        $(ele).css("top", $(origen).offset().top + $(origen).outerHeight() + 5)
        var di = Posicionamiento.topeIzquierda(ele)
        var td = Posicionamiento.topeDerecha(ele)
        if (di !== 0) {
            $(ele).css("left", Posicionamiento.reacomodamientoHorizontal(origen, ele) + di)
            td = 0
        }
        if (td !== 0)
            $(ele).css("left", Posicionamiento.reacomodamientoHorizontal(origen, ele) + td)
        $(ele).css({ transform: 'translateY(10px)' })
    }

    static posicionarIzquierda(origen, ele) {
        $(ele).css("left", $(origen).offset().left - $(ele).width() - 25)
        var da = Posicionamiento.topeArriba(ele)
        if (da !== 0)
            $(ele).css("top", Posicionamiento.reacomodamientoVertical(origen, ele) + da)
        $(ele).css({ transform: 'translateX(-10px)' })
    }

    static posicionarDerecha(origen, ele) {
        $(ele).css("left", $(origen).offset().left + $(origen).outerWidth() + 6)
        let da = Posicionamiento.topeArriba(ele)
        if (da !== 0)
            $(ele).css("top", Posicionamiento.reacomodamientoVertical(origen, ele) + da)
        $(ele).css({ transform: 'translateX(10px)' })
    }

}


export default Posicionamiento