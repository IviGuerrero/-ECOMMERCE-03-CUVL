document.getElementById("form-alta").addEventListener("submit", async (e) => {
    e.preventDefault();

    const archivo = document.getElementById("foto").files[0];
    let imagenBase64 = "";

    if (archivo) {
        imagenBase64 = await convertirBase64(archivo);
    }

    const nuevoProducto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
        marca: document.getElementById("marca").value,
        categoria: document.getElementById("categoria").value,
        descCorta: document.getElementById("descCorta").value,
        envio: document.getElementById("envio").checked,
        imagen: imagenBase64
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });

        alert("Producto agregado con éxito");
        cargarTablaProductos(); 
        e.target.reset();

    } catch (err) {
        console.log("Error al agregar producto:", err);
    }
});


function convertirBase64(file) {
    return new Promise((resolve) => {
        const lector = new FileReader();
        lector.readAsDataURL(file);
        lector.onload = () => resolve(lector.result);
    });
}

async function cargarTablaProductos() {
    try {
        const res = await fetch(API_URL);
        const productos = await res.json();

        const tbody = document.querySelector("#tabla-productos tbody");
        tbody.innerHTML = "";

        productos.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>$${p.precio}</td>
                    <td>${p.stock}</td>
                    <td>${p.marca}</td>
                    <td>${p.categoria}</td>
                    <td>${p.descCorta}</td>
                    <td>${p.envio ? "Sí" : "No"}</td>
                    <td><img src="${p.imagen}" height="40"></td>
                </tr>
            `;
        });

    } catch (e) {
        console.log("Error cargando tabla:", e);
    }
}

cargarTablaProductos();