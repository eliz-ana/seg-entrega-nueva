// renderizacion del cart
function renderCart(params) {
  const productosCart = JSON.parse(localStorage.getItem("cartValues")) || [];

  const containerCart = document.querySelector("#jsCartContainer");
  if (containerCart) {
    containerCart.innerHTML = "";

    productosCart.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      const carrito = document.createElement("div");
      carrito.classList.add("cart-div");
      carrito.innerHTML = `
       <div class="card mb-3" >
          <div class="row g-0">
            <div class="col-sm-4">
              <img src="${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}"
              style="height: 200px; object-fit: cover;">
            </div>
            <div class="col-sm-8">
              <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">${item.descripcion}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="card-text"><strong>Precio:</strong> $${item.precio}</p>
                  <div class="cart-btns">
                    <button class="btn btn-secondary btn-sm btn-restar" data-index="${index}">-</button>
                    <span class="quantity">${item.cantidad}</span>
                    <button class="btn btn-secondary btn-sm btn-sumar" data-index="${index}">+</button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button>
                  </div>
                  <p class="card-text"><strong>Subtotal:</strong> $<span class="subtotal">${subtotal}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      `;
      containerCart.appendChild(carrito);
    });
    setBotones();
  }
}
//logica de los botones del cart
function setBotones(params) {
  const btnSumar = document.querySelectorAll(".btn-sumar");
  const btnRestar = document.querySelectorAll(".btn-restar");
  const btnEliminar = document.querySelectorAll(".btn-eliminar");
  // funcion de suma
  btnSumar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const productoCart = JSON.parse(localStorage.getItem("cartValues")) || [];
      productoCart[index].cantidad++;

      localStorage.setItem("cartValues", JSON.stringify(productoCart));
      Swal.fire({
        title: "agregaste otro producto!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      renderCart();
      finazarCompra();
      contadorCart();
    });
  });
  // funcion restar
  btnRestar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const productoCart = JSON.parse(localStorage.getItem("cartValues") || []);
      if (productoCart[index].cantidad > 1) {
        productoCart[index].cantidad--;
        localStorage.setItem("cartValues", JSON.stringify(productoCart));
        renderCart();
        finazarCompra();
        contadorCart();
      }
    });
  });
  //funcion eliminar
  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const productoCart = JSON.parse(localStorage.getItem("cartValues") || []);
      productoCart.splice(index, 1);
      localStorage.setItem("cartValues", JSON.stringify(productoCart));
      renderCart();
      finazarCompra();
      contadorCart();
    });
  });
}
//funcion para confirmar o cancelar compra
function finazarCompra(params) {
  const productosCart = JSON.parse(localStorage.getItem("cartValues")) || [];
  const cartConfirm = document.querySelector("#jsFinCompra");
  if (cartConfirm) {
    cartConfirm.innerHTML = "";
    if (productosCart.length === 0) {
      const vacio = document.createElement("div");

      vacio.textContent = "El carrito está vacío.";
      cartConfirm.appendChild(vacio);
    } else {
      const totalProd = productosCart.reduce(
        (acc, item) => acc + item.cantidad,
        0
      );
      const totalCompra = productosCart.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      );

      const compra = document.createElement("div");
      compra.classList.add("div-compra");
      compra.innerHTML = `
        <div class="card w-100 mb-3">
          <div class="card-body">
            <h5 class="card-title">Resumen de compra</h5>
            <p class="card-text"><strong>Productos:</strong> ${totalProd}</p>
            <p class="card-text"><strong>Total compra:</strong> $${totalCompra}</p>
            <button class="btn btn-success btn-sm btn-confirmar ">Confirmar</button>
            <button class="btn btn-danger btn-sm btn-cancelar ">Cancelar</button>
          </div>
        </div>
        `;
      cartConfirm.appendChild(compra);
      const btnConfirmar = compra.querySelector(".btn-confirmar");
      const btnCancelar = compra.querySelector(".btn-cancelar");

      btnConfirmar.addEventListener("click", () => {
        Swal.fire({
          title: "Compra confirmada!",
          text: "Le llegara un mail con el detalle de la compra",
          icon: "success",
          confirmButtonText: "Confirmar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("cartValues");
            renderCart();
            contadorCart();
            cartConfirm.innerHTML = "Compra exitosa !";
          }
        });
      });

      btnCancelar.addEventListener("click", () => {
        Swal.fire({
          title: "Esta cancelando su compra!",
          text: "¿Quiere continuar?",
          icon: "warning",
          confirmButtonText: "Confirmar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("cartValues"); // Limpia el carrito
            cartConfirm.innerHTML = "Carrito vacio"; // Limpia el resumen
            renderCart();
            contadorCart();
            Swal.fire({
              title: "Carrito vacio",
              icon: "success",
            });
          }
        });
      });
    }
  }
}
renderCart();
finazarCompra();
