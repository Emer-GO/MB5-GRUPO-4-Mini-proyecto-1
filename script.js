const form = document.getElementById('registroForm');
const nombreInput = document.getElementById('nombre');
const edadInput = document.getElementById('edad');
const carreraInput = document.getElementById('carrera');
const errorMsg = document.getElementById('errorMsg');
const tablaBody = document.querySelector('#tablaEstudiantes tbody');
const filtroCarrera = document.getElementById('filtroCarrera');

let estudiantes = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const edad = parseInt(edadInput.value);
    const carrera = carreraInput.value;

    if (edad <= 16) {
        errorMsg.textContent = 'La edad debe ser mayor a 16 años.';
        return;
    } else {
        errorMsg.textContent = '';
    }

    estudiantes.push({ nombre, edad, carrera });

    estudiantes.sort((a, b) => a.nombre.localeCompare(b.nombre));

    form.reset();

    mostrarTabla();
});

filtroCarrera.addEventListener('change', mostrarTabla);

function mostrarTabla() {
    const filtro = filtroCarrera.value;
    tablaBody.innerHTML = '';

    estudiantes
        .filter(e => !filtro || e.carrera === filtro)
        .forEach(est => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${est.nombre}</td>
                <td>${est.edad}</td>
                <td>${est.carrera}</td>
            `;
            tablaBody.appendChild(fila);
        });
}
