//generacion de productos----
const productos = [];
class Producto {
  static ultimoId = 1;
  constructor(nombre, precio, stock, cantidad, descripcion, imagen) {
    (this.id = Producto.ultimoId++),
      (this.nombre = nombre),
      (this.precio = precio),
      (this.stock = stock),
      (this.cantidad = cantidad),
      (this.descripcion = descripcion), // Agregamos la descripción
      (this.imagen = imagen); // Agregamos la URL de la imagen
  }
}
//productos
const nuevosProductos = [
  {
    stock: 10,
    nombre: "remera",
    descripcion: "remera estampada",
    precio: 7000,
    imagen: "./imagenes/10remera.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "remera",
    descripcion: "remera gris",
    precio: 7000,
    imagen: "./imagenes/2remera-gris.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "remera",
    descripcion: "remera blanca",
    precio: 6000,
    imagen: "./imagenes/1camiseta-blanca.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "camisa",
    descripcion: "camisa blanca",
    precio: 16000,
    imagen: "./imagenes/3camisa-blanca.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "pantalon",
    descripcion: "jean claro",
    precio: 26000,
    imagen: "./imagenes/5pantalon-jean.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "pantalon",
    descripcion: "jean clasico",
    precio: 25000,
    imagen: "./imagenes/4pantalon-jean.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "pantalon",
    descripcion: "jean azul oscuro",
    precio: 23000,
    imagen: "./imagenes/9pantalonPortada.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "bermuda",
    descripcion: "bermuda beige ",
    precio: 16000,
    imagen: "./imagenes/7bermudaBeige.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "bermuda",
    descripcion: "bermuda negra",
    precio: 18000,
    imagen: "./imagenes/6bermuda.jpg",
    cantidad: 1,
  },
  {
    stock: 10,
    nombre: "camisa",
    descripcion: "camisa azul",
    precio: 16000,
    imagen: "./imagenes/8camisa.jpg",
    cantidad: 1,
  },
];
nuevosProductos.forEach((prod) => {
  productos.push(
    new Producto(
      prod.nombre,
      prod.precio,
      prod.stock,
      prod.cantidad,
      prod.descripcion,
      prod.imagen
    )
  );
});

function renderHeader(params) {
  const header = document.querySelector("#jsheader");
  if (header) {
    header.innerHTML = `<nav class="navbar navbar-expand-lg bg-info-subtle">
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
            <button class="btn btn-outline-secondary" type="submit">buscar</button>
          </form>
           <a href="./cart.html" class="btn btn-dark ms-auto cart-btn">Cart </a>
      </div>
    </div>
  </nav>`;
  } else {
    console.log("el elemento con id jsheader no existe");
  }
}
