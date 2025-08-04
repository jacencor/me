// script.js
// Configura la fecha de la boda
const fechaBoda = new Date('2026-01-17'); // Reemplaza con la fecha de tu boda

function actualizarContador() {
    const ahora = new Date();
    const diferencia = fechaBoda - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
        <strong>${dias}</strong> días, 
        <strong>${horas}</strong> horas, 
        <strong>${minutos}</strong> minutos, 
        <strong>${segundos}</strong> segundos
    `;

    //if (diferencia < 0) {
    //    document.getElementById("countdown").innerHTML = "¡Ya es el gran día!";
    //}
}

// Actualiza el contador cada segundo
setInterval(actualizarContador, 1000);
