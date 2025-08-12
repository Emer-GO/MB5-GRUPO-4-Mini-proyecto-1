document.getElementById("btnCalcular").addEventListener("click", function() {
    let valorFecha = document.getElementById("fechaNacimiento").value;
    let fechaNac = new Date(valorFecha);

    if (!esFechaValida(fechaNac)) {
        mostrarError("Por favor, ingresa una fecha válida.");
        return;
    }

    let edad = calcularEdad(fechaNac);
    mostrarResultado(`Tienes ${edad} años.`);
    guardarEdadAPI(edad);
});
