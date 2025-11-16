import $ from "jquery"


class Toast {


    static toast ({html="Hola Soy un Toast!!!", clases = [], tiempo = 3000, cerrar = false} = {}) {
        $(".toast").remove()
        let ts = $("<div class='toast'></div>")
        $(ts).append(html)

        for(let i = 0; i < clases.length; i ++) 
            $(ts).addClass(clases[i])
        if(cerrar) 
            $(ts).append("<span class='cerrar'></span>")
        
        $("body").append(ts)
        $(ts).css("top", 75)
        setInterval(() => {
            $(ts).remove()
        }, tiempo)


        $(".toast .cerrar").click((e) => {
            $(e.target).parent().hide(100)
        })
    }
}

export default Toast