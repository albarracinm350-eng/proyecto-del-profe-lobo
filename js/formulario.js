import { mostrarToast } from "./ui.js";
import { carritoVacio, vaciarCarrito } from "./carrito.js";

export function inicializarFormulario() {
    document.getElementById("formulario").addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const tel = document.getElementById("telefono").value;
        const dir = document.getElementById("direccion").value;

        let valido = true;
        
        document.getElementById("errorNombre").textContent = nombre.length < 3 ? "Nombre muy corto" : "";
        if (nombre.length < 3) valido = false;
        
        document.getElementById("errorEmail").textContent = !email.includes("@") ? "Email inválido" : "";
        if (!email.includes("@")) valido = false;
        
        document.getElementById("errorTelefono").textContent = tel.length < 8 ? "Teléfono inválido" : "";
        if (tel.length < 8) valido = false;
        
        document.getElementById("errorDireccion").textContent = dir.length < 5 ? "Dirección muy corta" : "";
        if (dir.length < 5) valido = false;

        if (!valido) return;

        if (carritoVacio()) return mostrarToast("El carrito está vacío");

        document.getElementById("msjExito").classList.remove("oculto");
        document.getElementById("formulario").reset();
        vaciarCarrito();
        mostrarToast("¡Pedido enviado!");
    });
}