let productos = [];

// render header
function renderHeader(params) {
  const header = document.querySelector("#jsheader");
  if (header) {
    header.innerHTML = `<nav class="navbar navbar-expand-lg bg-danger">
  <div class="container-fluid">
    <a class="navbar-brand" href="./index.html">Super Shop</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
        <a class="nav-link" href="./nosotros.html">Nosotros</a>
        <a class="nav-link" href="./contactos.html">Contacto</a>
      </div>
       <form id="searchForm" class="d-flex" role="search">
          <input id="searchInput" class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
          <button class="btn btn-dark" type="submit">buscar</button>
        </form>
         <a href="./cart.html" class="btn btn-dark ms-auto cart-btn">Cart </a>
    </div>
  </div>
</nav>`;
  } else {
    console.log("el elemento con id jsheader no existe");
  }
}
//render footer
function renderFooter(params) {
  const footer = document.querySelector("#jsFooter");
  if (footer) {
    footer.innerHTML = `
    <nav class="navbar sticky-bottom mt-auto bg-danger">
      <div class="container text-center ">
        <h5 class="mx-auto">SuperShop</h5>
      </div>
      <div class="container text-center mx-auto">
        <p class="fs-4">Contactos:</p>
        <a href="https://www.facebook.com" target="_blank"><i class="bi bi-facebook text-light fs-5 "></i></a>
        <a href="https://www.instagram.com" target="_blank"><i class="bi bi-instagram text-light fs-5"></i></a>
        <a href="#" target="_blank"><i class="bi bi-whatsapp text-light fs-5"></i></a>
        <a href="#" target="_blank"><i class="bi bi-envelope-at text-light fs-5"></i></a>
      </div>
      <div class=" container text-center">
          <p class="fw-light mx-auto">&copy; 2025 Super Shop. Todos los derechos reservados.</p>
      </div
    </nav>
    `;
  }
}
//fetch de los productos
async function getData() {
  try {
    const respuesta = await fetch("./json/data.json");
    if (!respuesta.ok) {
      throw new Error(`error en el json: ${respuesta.status}`);
    }
    return await respuesta.json();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}
//funcion con await
async function iniciarProductos(params) {
  productos = await getData();
  renderProductos(productos, "jsCard");
  cartSetLocalS();
  buscador(productos, renderProductos, "jsCard");
}
// render cards de productos
function renderProductos(productos, containerid) {
  const containerCard = document.getElementById(containerid);
  if (containerCard) {
    containerCard.innerHTML = "";
    containerCard.classList.add("row", "g-3");
    productos.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4");
      card.innerHTML = `
    <div class="card  img-fluid" style="width: 18rem;">
      <img src="${item.imagen}" class="card-img-top img-fluid" alt="..."
       style="height: 200px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${item.nombre}</h5>
        <p class="card-text">${item.descripcion}</p>
        <p class="card-text">Precio: $${item.precio}</p>
        <button class="btn btn-outline-danger add-to-cart" data-id="${item.id}">
            Comprar
        </button>
      </div>
    </div>  
    `;
      containerCard.appendChild(card);
    });
  }
}
//setear local storage
function cartSetLocalS() {
  //capturo cada product card
  const containerCard = document.getElementById("jsCard");
  if (containerCard) {
    containerCard.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart")) {
        const productId = event.target.getAttribute("data-id");

        const product = productos.find((prod) => {
          return prod.id === Number(productId);
        });

        if (product) {
          let arrCart = JSON.parse(localStorage.getItem("cartValues")) || [];

          // Agregar el producto al carrito
          arrCart.push(product);

          // Guardar el carrito actualizado
          localStorage.setItem("cartValues", JSON.stringify(arrCart));
          contadorCart();
          toastSetter("Se agrego al carrito!");
        } else {
          toastSetter("Producto no encontrado");
        }
      }
    });
  }
}
//generador de toasts
function toastSetter(mensaje) {
  const toastContainer = document.getElementById("jsToastContainer");
  if (toastContainer) {
    const toast = document.createElement("div");
    toast.className = "toast text-bg-secondary border-0 show";
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    toast.innerHTML = `
    <div class="toast-body">
        ${mensaje}
      </div>
      
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
}
//actualizar contador del cart
function contadorCart(params) {
  const jsCartBtn = document.querySelector(".cart-btn");
  const cartValues = JSON.parse(localStorage.getItem("cartValues")) || [];
  const totalProd = cartValues.reduce((acc, item) => acc + item.cantidad, 0);
  if (jsCartBtn) {
    jsCartBtn.textContent = `Cart (${totalProd})`;
  }
}
//funcion para buscar productos
function buscador(productos, renderProductos, containerid) {
  const jsSearchForm = document.getElementById("searchForm");
  const jsSearchInput = document.getElementById("searchInput");
  if (jsSearchForm) {
    jsSearchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = jsSearchInput.value.trim().toLowerCase();

      const queryResult = productos.filter((prod) => {
        return prod.nombre.toLowerCase().includes(query);
      });
      if (queryResult.length > 0) {
        renderProductos(queryResult, containerid);
      } else {
        renderProductos(productos, containerid);
      }
      jsSearchInput.value = "";
    });
  }
}
iniciarProductos();
renderHeader();
renderFooter();
contadorCart();
