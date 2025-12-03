/*!
 * Dynamics-Tips 3.0.0
 * Repositorio: https://github.com/FedeManzano/dynamics-tips
 * @author: Federico Manzano
 * Licencia MIT
 */
import ToolTips from "./modulos/ToolTips";
import ComentarioDinamico from "./modulos/ComentariosDinamicos"
import Dropdown from "./modulos/DropDown"
import Toast from "./modulos/Toast"
import Personalizado from "./modulos/Personalizado"

(function () {

    /** INICIALIZACIÓN AUTOMÁTICA ***************************************/
    ToolTips.iniciar() // Inicializa los tooltips de manera automática
    ComentarioDinamico.iniciar() // Inicializa los comentarios de manera automática
    Dropdown.iniciar() // Inicializa los dropdown de manera automática

    /**
     * Muestra el toast en pantalla con el efecto
     * correspondiente.
     * El objeto JSON conf se compone por
     * html: [html] código html a mostrar
     * clases[]: [string] clases CSS que se le asignan al toast
     * tiempo: [int] tiempo en ms de duración en pantalla
     * cierre: [bool] posibilidad de cerrar el toast manualmente
     * @param {Configuración del Toast} conf 
     */
    const Ts = (conf) => {
        Toast.toast(conf)
    }

    /**
     * Permite inicializar el dropdown
     * manualmente.
     */
    const DropdownInit = () => {
        Dropdown.destroy()
        Dropdown.iniciar()
    }

    /**
     * Permite destruir los dropdown
     */
    const DropdownDestroy = () => {
        Dropdown.destroy()
    }

    /**
     * Permite inicializar los comentarios
     */
    const CommentsInit = () => {
        ComentarioDinamico.destroy()
        ComentarioDinamico.iniciar()
    }

    /**
     * Permite destruir los comentarios
     */
    const CommentsDestroy = () => {
        ComentarioDinamico.destroy()
    }

    /**
     * Permite inicializar los tooltips
     */
    const ToolTipsInit = () => {
        ToolTips.destroy()
        ToolTips.iniciar()
    }

    /**
     * Permite destruir los tooltips
     */
    const ToolTipsDestroy = () => {
        ToolTips.destroy()
    }

    /**
     * Permite inicializar los tips personalizados
     * @param {ori: clase del disprador, ele: clase del obj dinámico} conf 
     */
    const PersonalizadoInit = (conf) => {
        Personalizado.iniciar(conf)
    }

    /**
     * Permite destruir los tips Personalizados
     */
    const PersonalizadoDestroy = () => {
        Personalizado.destroy()
    }


    /**
     * DY es el objeto JSON que brina acceso a 
     * todas las funcionalidades de esta biblioteca.
     */
    const DY = {
        Toast: (conf) => Ts(conf),
        PerInit: (config) => PersonalizadoInit(config),
        PerDestroy: () => PersonalizadoDestroy(),
        ToolTipsInit: () => ToolTipsInit(),
        ToolTipsDestroy: () => ToolTipsDestroy(),
        CommentsInit: () => CommentsInit(),
        CommentsDestroy: () => CommentsDestroy(),
        DropdownInit: () => DropdownInit(),
        DropdownDestroy: () => DropdownDestroy()
    }
    window.DY = DY
})()

export default DY