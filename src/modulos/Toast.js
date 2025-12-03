
class Toast {

    static toast({ html = "Hola Soy un Toast!!!", clases = [], tiempo = 3000, cerrar = false } = {}) {
        // Remover toasts existentes
        document.querySelectorAll(".toast").forEach((toast) => {
            toast.remove()
        })

        // Crear nuevo toast
        let ts = document.createElement("div")
        ts.classList.add("toast")
        ts.innerHTML = html

        // Añadir clases personalizadas
        clases.forEach((clase) => {
            ts.classList.add(clase)
        })

        // Añadir botón de cerrar si es necesario
        if (cerrar) {
            let cerrarBtn = document.createElement("span")
            cerrarBtn.classList.add("cerrar")
            ts.appendChild(cerrarBtn)

            // Event listener para cerrar
            cerrarBtn.addEventListener("click", (e) => {
                ts.style.transition = "opacity 0.1s"
                ts.style.opacity = "0"
                setTimeout(() => {
                    ts.remove()
                }, 100)
            })
        }

        // Añadir al DOM
        document.body.appendChild(ts)
        ts.style.top = "75px"

        // Auto-remover después del tiempo especificado
        setTimeout(() => {
            ts.remove()
        }, tiempo)
    }
}

export default Toast