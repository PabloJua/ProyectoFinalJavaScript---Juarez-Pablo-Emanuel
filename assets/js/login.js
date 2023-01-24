var cajaAtras = document.querySelector (".caja-atras");
var cajaAtrasLogin = document.querySelector (".caja-atras-login");
var cajaAtrasRegistro = document.querySelector (".caja-atras-registro");
var contenedorLoginRegistro = document.querySelector(".container-login-registro");
var formularioLogin = document.querySelector (".formulario-login");
var formularioRegistro = document.querySelector (".formulario-registro");
var piePagina = document.querySelector ("#footer");




document.getElementById("btn-iniciar-sesion").addEventListener("click", inicioSesion)

function inicioSesion () {
    formularioRegistro.style.display = "none";
    contenedorLoginRegistro.style.left = "10px";
    formularioLogin.style.display = "block";
    cajaAtrasRegistro.style.opacity = "1";
    cajaAtrasLogin.style.opacity = "0";
}


document.getElementById("btn-registrarse").addEventListener("click",registro)

function registro (){
    formularioRegistro.style.display = "block";
    contenedorLoginRegistro.style.left = "410px";
    formularioLogin.style.display = "none";
    cajaAtrasRegistro.style.opacity = "0";
    cajaAtrasLogin.style.padding = "0";
}


/* V A L I D A C I O N    L O G I N */


const formLogin = document.querySelector("#login");
const formRegistro = document.querySelector("#registro");
const inputUser = document.querySelector("#input-user");
const inputPass = document.querySelector("#input-pass");
const contenedorLogin = document.querySelector(".container");
const logout = document.querySelector ("#btn-logout");
const login = document.querySelector("#btn-login");
const botonIngresar = document.querySelector("#btn-ingresar");
const contenedor = document.getElementById('main');


const datosUsuario = {
    user: "Carola",
    password: "carola123"
}

// {
//     user: "Pablo",
//     password: "pablo123"
// };


const subirAlLocalStorage = (clave, valor) => { /* storageDates */
    localStorage.setItem(clave, JSON.stringify(valor));
} 

const obtenerDelLocalStorage = (clave, valor) => {
    return JSON.parse(localStorage. getItem(clave));
}


formLogin.onsubmit = (event) => {
    event.preventDefault(); /*Evitar el envio de ese formulario*/
    if (inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password) {
        subirAlLocalStorage(datosUsuario.user, datosUsuario.password);
        swal({
            title: `Bienvenid@ ${datosUsuario.user}`,
            text: 'Desde esta pantalla puedes cerrar sesión',
        });
        contenedorLogin.style.display = 'none';
        login.style.display = "none";
        logout.style.display = "block";
    } else if (inputUser.value !== datosUsuario.user && inputUser.value !== datosUsuario.password){
        swal('Usuario o Password Incorrecto', 'Intente Nuevamente', 'error')
        inputUser.style.border = "2px solid red";
        inputPass.style.border = "2px solid red";
    }
}

// formRegistro.onsubmit = (event) => {
//     event.preventDefault(); /*Evitar el envio de ese formulario*/
//     subirAlLocalStorage(datosRegistro.nombreCompleto, datosRegistro.correElectronico , datosRegistro.user, datosRegistro.pass);
//     swal({
//         title: `Bienvenid@ ${datosRegistro.nombreCompleto}`,
//         text: 'Los datos fueron ingresados correctamente',
//         });
// }


function validarLogin(clave) {
    if (clave !== "carola123") {
        contenedorLogin.style.display = "block";
    } else {
        contenedorLogin.style.display = "none";
        login.style.display = "none";
        logout.style.display = "block";
        contenedor.style.height = "100%";        
    }
}

validarLogin (obtenerDelLocalStorage("Carola"))

document.getElementById("btn-logout").addEventListener("click",cerrarSesion)


function cerrarSesion () {
    localStorage.removeItem('Carola')
    validarLogin (obtenerDelLocalStorage("Carola"))
    contenedorLogin.reset ()
    formLogin.style.display = "block"
}



/* V A L I D A C I O N    R E G I S T R O */

const nombre = document.getElementById('nombre');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password = document.getElementById('password');
const formControl = document.querySelector('.form-control');

formRegistro.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs(); // Metodo que valide los inputs
})

function checkInputs() {
    const nombreValue = nombre.value.trim();
    const usuarioValue = usuario.value.trim(); // trim - elimina cualquier caracter vacio, al prinicipio o al final
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let name = false;
    let user = false;
    let correo = false;
    let pass = false;
    

 /* V A L I D A C I O N      N O M B R E */    
    if(nombreValue === '') {
        setErrorFor(nombre, 'No puede dejar el campo nombre en blanco.')
        nombre.style.border = '2px solid red';
    } else if (!isNombre (nombreValue)) {
        setErrorFor(nombre, 'El nombre debe tener entre 3 a 16 dígitos y solo puede contener letras.')
        nombre.style.border = '2px solid red'
    } else {
        setSuccessFor(nombre, 'Nombre ingresado correctamente');
        nombre.style.border = '2px solid green';
        name = true;
    }

/* V A L I D A C I O N      U S U A R I O */ 
    if (usuarioValue === '') {
        setErrorFor(usuario, 'No puede dejar el campo usuario en blanco.')
        usuario.style.border = '2px solid red';
    } else if (!isUser (usuarioValue)){
        setErrorFor(usuario, 'El usuario debe tener entre 4 a 12 dígitos y solo puede contener letras, números y guiones.')
        usuario.style.border = '2px solid red';
    }
    else {
        setSuccessFor(usuario, 'Usuario ingresado correctamente');
        usuario.style.border = '2px solid green';
        user = true;
    }


/* V A L I D A C I O N      E M A I L */ 
    if (emailValue === '') {
        setErrorFor(email, 'No puede dejar el campo email en blanco.')
        email.style.border = '2px solid red';
    } else if (!isEmail (emailValue)) {
        setErrorFor(email, 'No ingreso un email valido.')
        email.style.border = '2px solid red';
    } else {
        setSuccessFor(email, 'Email ingresado correctamente');
        email.style.border = '2px solid green';
        correo = true;
    }


/* V A L I D A C I O N      C O N T R A S E Ñ A */ 
    if(passwordValue === '') {
		setErrorFor(password, 'No puede dejar el campo contraseña en blanco.');
        password.style.border = '2px solid red';
    } else if (!isPassword (passwordValue)){
        setErrorFor(password, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.')
        password.style.border = '2px solid red';
    } else {
		setSuccessFor(password, 'Contraseña ingresada correctamente');
        password.style.border = '2px solid green';
        pass = true;
	}

    if (name && user && correo && pass) {
            localStorage.setItem(usuarioValue, passwordValue)
            swal({
                title: `Bienvenid@ ${nombreValue}`,
                text: 'Los datos fueron registrados correctamente',
            });
            formRegistro.reset();
        } else {}
}


function isNombre (nombre) {
    return /^[a-zA-ZÀ-ÿ\s]{3,16}$/.test(nombre); // Letras y espacios, pueden llevar acentos.
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    // Otra opción 
    // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    // telefono: /^\d{7,14}$/ // 7 a 14 numeros.
} 

function isUser(usuario) {
    return /^[a-zA-Z0-9\_\-]{4,12}$/.test(usuario); 
}

function isPassword(password) {
    return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(password);
}



/*M E N S A J E S    E R R O R - S U C C E S S*/

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small'); //Traigo el elemento con la etiqueta small 
    formControl.className = 'form-control error'; // Le asigno una clase a dicho elemento
    small.innerText = message;

}


function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}







