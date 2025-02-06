function renderContactos() {
  const contacto = document.querySelector(".contactos-div");
  if (contacto) {
    contacto.innerHTML = "";
    const contactoForm = document.createElement("div");
    contactoForm.innerHTML = `
      <div class="container text-center mx-auto">
          <p class="fs-4">Contactos:</p>
          <a href="https://www.facebook.com" target="_blank" class="mx-2"><i class="bi bi-facebook text-danger fs-3"></i></a>
          <a href="https://www.instagram.com" target="_blank" class="mx-2"><i class="bi bi-instagram text-danger fs-3"></i></a>
          <a href="#" target="_blank" class="mx-2"><i class="bi bi-whatsapp text-danger fs-3"></i></a>
      </div>
  
      <div class="container mt-4">
          <form id="contactForm" novalidate>
              <div class="row g-3">
                  <div class="col">
                      <input type="text" class="form-control" id="nombre" placeholder="Ingrese nombre" required>
                      <div class="invalid-feedback">El nombre es obligatorio.</div>
                  </div>
                  <div class="col">
                      <input type="text" class="form-control" id="apellido" placeholder="Ingrese apellido" required>
                      <div class="invalid-feedback">El apellido es obligatorio.</div>
                  </div>
              </div>
  
              <div class="form-floating mb-3 mt-3">
                  <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
                  <label for="email">Email address</label>
                  <div class="invalid-feedback">Ingrese un correo válido.</div>
              </div>
  
              <div class="form-floating mb-3">
                  <textarea class="form-control" id="mensaje" placeholder="Leave a comment here" required></textarea>
                  <label for="mensaje">Comments</label>
                  <div class="invalid-feedback">Este campo no puede estar vacío.</div>
              </div>
  
              <button type="submit" class="btn btn-danger">Enviar</button>
          </form>
      </div>
      `;

    contacto.appendChild(contactoForm);

    // Agregar validación en tiempo real
    const form = document.getElementById("contactForm");
    const inputs = form.querySelectorAll("input, textarea");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el envío del formulario por defecto

      if (!form.checkValidity()) {
        event.stopPropagation(); // Evita propagación del evento
        form.classList.add("was-validated");
      } else {
        toastSetter("Formulario enviado !");
        form.reset();

        // Remover clases de validación para que no queden verdes/rojas
        form.classList.remove("was-validated");
        inputs.forEach((input) => {
          input.classList.remove("is-valid", "is-invalid");
        });
      }
    });

    // Validación en tiempo real

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (input.checkValidity()) {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        } else {
          input.classList.remove("is-valid");
          input.classList.add("is-invalid");
        }
      });
    });
  }
}

renderContactos();
