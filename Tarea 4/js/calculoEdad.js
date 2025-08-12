function calcularEdad(fechaNacimiento) {
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();
    let dia = hoy.getDate() - fechaNacimiento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }
    return edad;
}
