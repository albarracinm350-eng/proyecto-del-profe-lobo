export function mostrarToast(mensaje) {
    const cont = document.getElementById("toasts");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = mensaje;
    cont.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

export function inicializarTema() {
    const btn = document.getElementById("btnTema");
    btn.addEventListener("click", () => {
        document.body.classList.toggle("oscuro");
    });
}