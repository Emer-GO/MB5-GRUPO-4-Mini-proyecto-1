function guardarEdadAPI(edad) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({ edad: edad }),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => console.log("Guardado en API simulada:", data))
    .catch(err => console.error("Error en API:", err));
}
