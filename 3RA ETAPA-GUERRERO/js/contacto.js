document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const comentarios = form.comentarios.value.trim();

    if (nombre.length < 2) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    if (!email.includes("@")) {
      alert("El email no es válido.");
      return;
    }
    if (comentarios.length < 10) {
      alert("El comentario debe tener al menos 10 caracteres.");
      return;
    }

    alert("¡Gracias por contactarnos!");
    form.reset();
  });
});
