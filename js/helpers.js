export function formatearDinero(num) {
    return "$" + num.toLocaleString("es-AR");
}

export function leerLista(clave) {
    try {
        const lista = JSON.parse(localStorage.getItem(clave));
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

export function guardarLista(clave, lista) {
    localStorage.setItem(clave, JSON.stringify(lista));
}