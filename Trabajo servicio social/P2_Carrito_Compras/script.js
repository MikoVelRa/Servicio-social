const carrito = document.querySelector("#items-list"); //Tabla
const carShopping = document.querySelector("#cart-shopping"); //Contenedor de la tabla
const listaCursos = document.querySelector("#courses-list"); //Contenedor de la lista de cursos
const vaciarCarrito = document.querySelector("#empty-car"); //Botón para vaciar el carrito
const contenedorCarrito = document.querySelector("#items-list tbody"); //Cuerpo de la tabla
const total = document.querySelector("#total"); //Total del carrito.
let carritoCompras = [];
// let total = 0;

/**Despliegue del carrito */
let icono = document.querySelector("#icono"); //Botón para desplegar el ícono.
let message = document.querySelector("#empty-message");

//Cargar listeners
cargarListeners();

function cargarListeners() {
  listaCursos.addEventListener("click", agregarItem);

  vaciarCarrito.addEventListener("click", () =>{
    carritoCompras = [];
    carritoHTML();
  });

  carrito.addEventListener("click", eliminarItem);

  icono.addEventListener("mouseover", () => carShopping.style.display = "block" );
  carShopping.addEventListener("mouseleave", () => carShopping.style.display = "none");
}

function agregarItem(e) {
  if (e.target.classList.contains("btn_addCart")) {
    const cursoSeleccionado = e.target.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Leyendo contenido del elemento seleccionado
function leerDatosCurso(curso) {
  
  //Creando un objeto con el curso seleccionado
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    nombre: curso.querySelector(".info-course h4").textContent,
    precio: parseInt(
      curso
        .querySelector(".precios p")
        .nextElementSibling.textContent.substring(1),
      10
    ),
    id: curso.dataset.id,
    cantidad: 1,
  };

  let exist = carritoCompras.some((curso) => curso.id === infoCurso.id);

  if (exist) {
    const cursos = carritoCompras.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
      }
      return curso;
    });

    carritoCompras = [...cursos]; //sobrescritura del arreglo.
  } else {
    //Agrega cursos al arreglo del carrito
    carritoCompras = [...carritoCompras, infoCurso];
  }
  carritoHTML();
}

//Calculando total
let calcularTotal = (carrito) =>
  carrito
    .map((curso) => curso.precio * curso.cantidad)
    .reduce((contador, acumulador) => contador + acumulador);

//Mostrando carrito de compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  
  if (carritoCompras.length === 0) {
    carrito.style.display = "none";
    message.style.display = "block";
    document.querySelector("#total").innerHTML = "";
    vaciarCarrito.style.display = "none";
  } else {
    vaciarCarrito.style.display = "block";
    carrito.style.display = "block";
    message.style.display = "none";
    
    carritoCompras.forEach((curso) => {
      let row = document.createElement("tr");
      row.innerHTML = `
              <td><img src="${curso.imagen}" width="75"></td>
              <td>${curso.nombre}</td>
              <td>$${curso.precio}</td>
              <td>${curso.cantidad}</td>
              <td><button id="btn_delete_product" class="btn_delete_product" data-id=${curso.id}>X</button></td>
          `;
      contenedorCarrito.appendChild(row);
    });

    document.querySelector("#total").innerHTML = `Total: $ ${calcularTotal(
      carritoCompras
    )}`;
  }
}

function eliminarItem(e) {
  if (e.target.classList.contains("btn_delete_product")) {
    let cursoId = e.target.getAttribute("data-id");

    carritoCompras = carritoCompras.filter((curso) => curso.id !== cursoId);
    carritoHTML();
    // console.log(carritoCompras);
  }
}

//Limpiar el tbody del carrito
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
