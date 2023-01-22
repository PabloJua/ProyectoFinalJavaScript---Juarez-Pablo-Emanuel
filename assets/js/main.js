// Mostrar los productos en el div "contenedor-producto" desde el array de productos
let productos = [];
fetch("./assets/js/productos.json")
    .then(response => response.json()) //convertir todo esto de json
    .then(data => { // trabajar con esa data
        productos = data;
        cargarProductos(productos)
    }) 
 
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria"); // Pasa a ser un array
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const notificacion = document.querySelector(".notificacion");

// Productos Elegidos representan los productos del array que queremos mostrar
function cargarProductos(productosElegidos) {

    // Para vaciar el contenedor y no duplicar los productos
    contenedorProductos.innerHTML = "";    

    productosElegidos.forEach(producto =>{ // Recorre todo el array y por cada elemento, realiza una cadena de acciones

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div> 
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton =>{
    boton.addEventListener('click', (e) =>{
        // Se remueve el active de todos los botones 
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        // Se agrega el "active" solamente al que le hicimos click
        e.currentTarget.classList.add("active");

        
        if(e.currentTarget.id != "todos") {
            // Muestra el nombre de la categoria
            const nombreCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerHTML = nombreCategoria.categoria.nombre;

            // Muestra solamente los elementos pertenecientes a la categoria
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

// Creando los botones agregar
function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); // Trae lo que hay en el localStorage

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNotificacion();
}else {
    productosEnCarrito = [];
}


function agregarAlCarrito (e) {
    
    Toastify({
        text: "Producto Agregado",
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
            y: "8rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();


    const idBoton = e.currentTarget.id; // Me devuelve el id del producto
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) // some - se fija si hay algo que coincida con eso, y devuelve un true o false 
    { 
    //Incrementa la cantidad del producto existente en el carrito
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++; 0
    } else {
        productoAgregado.cantidad = 1;// Agrega una propiedad al objeto en el array
        productosEnCarrito.push (productoAgregado);// Agregamos un producto a un array correspondiente 
    }

    actualizarNotificacion();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))// Llevar todo al localStorage para poder llamarlo desde el carrito 
}


// Actualizar la notificacion de la cantidad de elementos en el carrito 

function actualizarNotificacion () {
    let nuevaNotificacion = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0 ) // suma la cantiad de elementos que hay y la cuenta arranca en 0
    notificacion.innerText = nuevaNotificacion;
}

