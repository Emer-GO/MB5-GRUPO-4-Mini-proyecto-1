function esFechaValida(fecha) {
    return fecha instanceof Date && !isNaN(fecha);
}
