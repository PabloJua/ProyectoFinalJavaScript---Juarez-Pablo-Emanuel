const botonSwitch = document.querySelector('#switch');

botonSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark'); // Accedo a la lista de clases del body, toggle significa que si no tiene un clase se la va poner, y si ya la tiene se la va quitar
    botonSwitch.classList.toggle('active');


    // GUARDAR LA CONFIGURACION EN ALGUN LADO PARA QUE SI REFRESCA LA PAGINA O SE ACCEDE A OTRA SUBPAGINA, MANTENGA EL MODO 
    // Guardamos el modo actual en el Local Storage (setItem)
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
});

// Obtenemos el modo actual del Local Storage (getItem)
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    botonSwitch.classList.add('active');
} else {
    document.body.classList.remove('dark');
    botonSwitch.classList.remove('active');
}

