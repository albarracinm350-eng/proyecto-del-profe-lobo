import { inicializarCarrito } from "./js/carrito.js";
import { inicializarProductos, renderizarProductos, renderizarFavoritos } from "./js/productos.js";
import { inicializarFormulario } from "./js/formulario.js";
import { inicializarTema } from "./js/ui.js";

inicializarTema();
inicializarProductos();
renderizarProductos();
renderizarFavoritos();
inicializarCarrito();
inicializarFormulario();