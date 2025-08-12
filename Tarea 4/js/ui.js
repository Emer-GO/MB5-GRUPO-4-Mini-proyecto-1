function mostrarResultado(mensaje) {
    document.getElementById("resultado").textContent = mensaje;
}

function mostrarError(mensaje) {
    document.getElementById("resultado").textContent = mensaje;
    document.getElementById("resultado").style.color = "red";
}
