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

    const PersonalizadoInit = (conf) => {
        Personalizado.iniciar(conf)
    }

    const DY = {
        Toast: (conf) => Ts(conf),
        PerInit: (config) => PersonalizadoInit(config)
    }
    window.DY = DY
})()

export default DY