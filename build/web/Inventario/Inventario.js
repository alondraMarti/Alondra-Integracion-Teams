let inventario = [];

// Función para inicializar datos de inventario
function inicializarInventario() {
    inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    actualizarInventarioTabla();
}

// Función para actualizar la tabla del inventario
function actualizarInventarioTabla() {
    const tabla = document.getElementById('inventarioTabla');
    tabla.innerHTML = ''; // Limpiar tabla

    inventario.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.nombre}</td><td>${item.cantidad}</td><td>${item.unidad}</td><td>${item.fechaCaducidad}</td>`;
        tabla.appendChild(row);
    });

    // Verificar advertencias de stock y caducidad
    verificarAdvertencias();
}

// Verificar advertencias
function verificarAdvertencias() {
    const hoy = new Date();
    inventario.forEach(item => {
        if (item.cantidad < 5) {
            alert(`Advertencia: El ingrediente ${item.nombre} está por debajo del umbral mínimo.`);
        }
        if (new Date(item.fechaCaducidad) < hoy) {
            alert(`Advertencia: El ingrediente ${item.nombre} ha caducado.`);
        }
    });
}

// Búsqueda
document.getElementById('busqueda').addEventListener('input', function() {
    const busqueda = this.value.toLowerCase();
    const tabla = document.getElementById('inventarioTabla');
    const filas = tabla.getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const nombreIngrediente = filas[i].cells[0].textContent.toLowerCase();
        filas[i].style.display = nombreIngrediente.includes(busqueda) ? '' : 'none';
    }
});

// Inicializar inventario al cargar la página
window.onload = inicializarInventario;
