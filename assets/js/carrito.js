let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciarCarrito = document.querySelector(".carrito-acciones-vaciar")
const botonTotalCarrito = document.querySelector(".carrito-acciones-total");
const botonComprarCarrito = document.querySelector(".carrito-acciones-comprar");


// C A R G A R     P R O D U C T O S     E N     C A R R I T O
function cargarProductoCarrito () {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Nombre</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `
            carritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
    
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    
    }
}

cargarProductoCarrito();


function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}


// E L I M I N A R     P R O D U C T O S     D E L     C A R R I T O
function eliminarDelCarrito (e) {

    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #701687, #AB29CA)",
          borderRadius: "1rem",
          fontSize: ".90rem"
        },
        offset: {
            x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "6rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();


    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductoCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


// V A C I A R    C A R R I T O

botonVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito () {
    
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc , producto) => acc + producto.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }) .then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductoCarrito();
        }
      })
    }
    


// A C T U A L I Z A R      T O T A L 

function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc , producto) => acc + (producto.cantidad * producto.precio), 0);
    total.innerText = `$ ${totalCalculado}`;
}


// C O M P R A R      P R O D U C T O

botonComprarCarrito.addEventListener("click", comprarCarrito);
function comprarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}