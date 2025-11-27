const API_URL = "https://<tu-url>.mockapi.io/productos";

const listaProductos = document.getElementById("listaProductos");
const carritoCantidad = document.getElementById("carritoCantidad");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    carritoCantidad.textContent = carrito.length;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function agregarCarrito(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const prod = await res.json();

        carrito.push(prod);
        actualizarCarrito();
    } catch (e) {
        console.log("Error al agregar al carrito:", e);
    }
}

async function cargarProductos() {
    try {
        const res = await fetch(API_URL);
        const productos = await res.json();

        listaProductos.innerHTML = "";

        productos.forEach(prod => {
            listaProductos.innerHTML += `
                <div class="card">
                    <img src="${prod.imagen}" alt="">
                    <h3>${prod.nombre}</h3>
                    <p>$${prod.precio}</p>

                    <button class="btn" onclick="agregarCarrito(${prod.id})">Agregar al carrito</button>

                    <div class="admin-btns">
                        <button onclick="eliminarProducto(${prod.id})" class="btn-delete">Eliminar</button>
                        <a href="editar.html?id=${prod.id}" class="btn-edit">Editar</a>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.log("Error al cargar productos:", error);
    }
}

async function crearProducto(event) {
    event.preventDefault();

    const nuevoProducto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        imagen: document.getElementById("imagen").value
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });

        alert("Producto creado con éxito");
        window.location.href = "index.html";
    } catch (e) {
        console.log("Error al crear producto:", e);
    }
}


async function eliminarProducto(id) {
    if (!confirm("¿Eliminar este producto?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarProductos();
    } catch (e) {
        console.log("Error al eliminar:", e);
    }
}


async function cargarProductoEditar() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    try {
        const res = await fetch(`${API_URL}/${id}`);
        const producto = await res.json();

        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("imagen").value = producto.imagen;

    } catch (e) {
        console.log("Error cargando producto:",e);
        }
    }

 async function guardarEdicion(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const actualizado = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        imagen: document.getElementById("imagen").value
    };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actualizado)
        });

        alert("Producto actualizado");
        window.location.href = "index.html";
    } catch (e) {
        console.log("Error editando:", e);
    }
}

if (listaProductos) cargarProductos();
actualizarCarrito();   