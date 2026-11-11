import { productos } from "./datos.js";
import { formatearDinero } from "./helpers.js";
import { esFavorito, toggleFavorito } from "./favoritos.js";
import { agregarAlCarrito } from "./carrito.js";

let estado = { categoria: "todos", busqueda: "" };

export function inicializarProductos() {
    document.querySelectorAll(".btn-filtro").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
            e.target.classList.add("activo");
            estado.categoria = e.target.dataset.categoria;
            renderizarProductos();
            renderizarFavoritos();
        });
    });

    document.getElementById("buscador").addEventListener("input", (e) => {
        estado.busqueda = e.target.value;
        renderizarProductos();
    });
}

export function renderizarProductos() {
    const grilla = document.getElementById("grillaProductos");
    const sinRes = document.getElementById("sinResultados");
    
    const filtrados = productos.filter(p => {
        const cumpleCat = estado.categoria === "todos" || p.categoria === estado.categoria;
        const cumpleBusq = p.nombre.toLowerCase().includes(estado.busqueda.toLowerCase());
        return cumpleCat && cumpleBusq;
    });

    grilla.innerHTML = filtrados.map(p => {
        const esFav = esFavorito(p.id);
        return `
            <div class="tarjeta">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p>${formatearDinero(p.precio)}</p>
                <button class="btn-agregar" onclick="agregarAlCarrito(${p.id})">Agregar</button>
                <button class="btn-favorito" onclick="toggleFavorito(${p.id})">${esFav ? "♥" : "♡"}</button>
            </div>
        `;
    }).join("");

    sinRes.classList.toggle("oculto", filtrados.length > 0);
}

export function renderizarFavoritos() {
    const grilla = document.getElementById("grillaFavoritos");
    const sinFav = document.getElementById("sinFavoritos");
    const favs = productos.filter(p => esFavorito(p.id));

    grilla.innerHTML = favs.map(p => `
        <div class="tarjeta">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${formatearDinero(p.precio)}</p>
            <button class="btn-agregar" onclick="agregarAlCarrito(${p.id})">Agregar</button>
            <button class="btn-favorito" onclick="toggleFavorito(${p.id})">♥</button>
        </div>
    `).join("");

    sinFav.classList.toggle("oculto", favs.length > 0);
}

window.agregarAlCarrito = agregarAlCarrito;
window.toggleFavorito = (id) => { toggleFavorito(id); renderizarProductos(); renderizarFavoritos(); };