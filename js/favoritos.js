import { leerLista, guardarLista } from "./helpers.js";
import { mostrarToast } from "./ui.js";

let favoritos = leerLista("cafe-favoritos");

export function esFavorito(id) {
    return favoritos.includes(id);
}

export function toggleFavorito(id) {
    if (esFavorito(id)) {
        favoritos = favoritos.filter(f => f !== id);
        mostrarToast("Eliminado de favoritos");
    } else {
        favoritos.push(id);
        mostrarToast("Agregado a favoritos");
    }
    guardarLista("cafe-favoritos", favoritos);
}