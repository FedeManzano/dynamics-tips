/*!
 * Dynamics-Tips 2.5.0
 * Repositorio: https://github.com/FedeManzano/dynamics-tips
 * @author: Federico Manzano
 */
import ToolTips from "./modulos/ToolTips";
import ComentarioDinamico from "./modulos/ComentariosDinamicos"
import Dropdown from "./modulos/DropDown"
import Toast from "./modulos/Toast"
import Personalizado from "./modulos/Personalizado"

(function() {

    /** INICIALIZACIÓN AUTOMÁTICA ***************************************/
    ToolTips.iniciar() // Inicializa los tooltips de manera automática
    ComentarioDinamico.iniciar() // Inicializa los comentarios de manera automática
    Dropdown.iniciar() // Inicializa los dropdown de manera automática

    const Ts = (conf) => {
        Toast.toast(conf)
    }

    const DropdownInit = () => {
        Dropdown.destroy()
        Dropdown.iniciar()
    }

    const DropdownDestroy = () => {
        Dropdown.destroy()
    }

    const CommentsInit = () => {
        ComentarioDinamico.destroy()
        ComentarioDinamico.iniciar()
    }

    const CommentsDestroy = () => {
        ComentarioDinamico.destroy()
    }

    const ToolTipsInit = () => {
        ToolTips.destroy()
        ToolTips.iniciar()
    }

    const ToolTipsDestroy = () => {
        ToolTips.destroy()
    }

    const PersonalizadoInit = (conf) => {
        Personalizado.iniciar(conf)
    }

    const PersonalizadoDestroy = () => {
        Personalizado.destroy()
    }

    const DY = {
        Toast: (conf) => Ts(conf),
        PerInit: (config) => PersonalizadoInit(config),
        PerDestroy: () => PersonalizadoDestroy(),
        ToolTipsInit: () => ToolTipsInit(),
        ToolTipsDestroy: () => ToolTipsDestroy(),
        CommentsInit: () => CommentsInit(),
        CommentsDestroy: () => CommentsDestroy(),
        DropdownInit: () =>  DropdownInit(),
        DropdownDestroy: () => DropdownDestroy()
    }
    window.DY = DY
})()

export default DY