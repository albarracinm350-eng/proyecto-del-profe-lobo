import { productos } from "./datos.js";
import { formatearDinero, leerLista, guardarLista } from "./helpers.js";
import { mostrarToast } from "./ui.js";

let carrito = leerLista("cafe-carrito");

export function agregarAlCarrito(id) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ id: id, cantidad: 1 });
    }
    guardarLista("cafe-carrito", carrito);
    renderizarCarrito();
    mostrarToast("Agregado al carrito");
}

export function cambiarCantidad(id, cambio) {
    const item = carrito.find(i => i.id === id);
    item.cantidad += cambio;
    if (item.cantidad <= 0) return eliminarDelCarrito(id);
    guardarLista("cafe-carrito", carrito);
    renderizarCarrito();
}

export function eliminarDelCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    guardarLista("cafe-carrito", carrito);
    renderizarCarrito();
}

export function vaciarCarrito() {
    carrito = [];
    guardarLista("cafe-carrito", carrito);
    renderizarCarrito();
    mostrarToast("Carrito vaciado");
}

export function carritoVacio() {
    return carrito.length === 0;
}

export function inicializarCarrito() {
    document.getElementById("btnVaciar").addEventListener("click", vaciarCarrito);
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const vacio = document.getElementById("carritoVacio");

    if (carrito.length === 0) {
        lista.innerHTML = "";
        vacio.classList.remove("oculto");
    } else {
        vacio.classList.add("oculto");
        lista.innerHTML = carrito.map(item => {
            const prod = productos.find(p => p.id === item.id);
            return `
                <div class="carrito-item">
                    <img src="${prod.imagen}">
                    <div class="carrito-item-info">
                        <h4>${prod.nombre}</h4>
                        <p>${formatearDinero(prod.precio)} x ${item.cantidad}</p>
                    </div>
                    <div>
                        <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        <button onclick="eliminarDelCarrito(${item.id})">X</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    const subtotal = carrito.reduce((acc, item) => {
        const prod = productos.find(p => p.id === item.id);
        return acc + (prod.precio * item.cantidad);
    }, 0);
    const iva = subtotal * 0.21;

    document.getElementById("subtotal").textContent = formatearDinero(subtotal);
    document.getElementById("iva").textContent = formatearDinero(iva);
    document.getElementById("total").textContent = formatearDinero(subtotal + iva);
    document.getElementById("contadorCarrito").textContent = carrito.reduce((a, i) => a + i.cantidad, 0);
}

window.cambiarCantidad = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;