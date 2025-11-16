
import ToolTips from "./modulos/ToolTips";
import ComentarioDinamico from "./modulos/ComentariosDinamicos"
import Dropdown from "./modulos/DropDown"
import Toast from "./modulos/Toast"
import Personalizado from "./modulos/Personalizado"

(function() {
    ToolTips.iniciar()
    ComentarioDinamico.iniciar()
    Dropdown.iniciar()

    const Ts = (conf) => {
        Toast.toast(conf)
    }

    const PersonalizadoInit = (conf) => {
        Personalizado.iniciar(conf)
    }

    const DY = {
        toast: (conf) => Ts(conf),
        PerInit: (config) => PersonalizadoInit(config)
    }
    window.DY = DY
})()

export default DY