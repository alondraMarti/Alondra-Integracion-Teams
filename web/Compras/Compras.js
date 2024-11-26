let inventario = [];

// Función para inicializar datos de inventario (puedes reemplazar esto con tu lógica de backend)
function inicializarInventario() {
    inventario = JSON.parse(localStorage.getItem('inventario')) || [];
}

// Registrar compra
document.getElementById('comprasForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreIngrediente = document.getElementById('nombreIngredienteCompra').value;
    const cantidadCompra = parseFloat(document.getElementById('cantidadCompra').value);
    const fechaCaducidad = document.getElementById('fechaCaducidad').value;

    // Verifica si el ingrediente ya existe en el inventario
    const ingredienteExistente = inventario.find(item => item.nombre === nombreIngrediente);

    if (ingredienteExistente) {
        // Si existe, incrementa la cantidad y actualiza la fecha de caducidad si es necesario
        ingredienteExistente.cantidad += cantidadCompra;
        if (new Date(ingredienteExistente.fechaCaducidad) < new Date(fechaCaducidad)) {
            ingredienteExistente.fechaCaducidad = fechaCaducidad; // Actualiza solo si la nueva fecha es posterior
        }
    } else {
        // Si no existe, crea un nuevo ingrediente
        inventario.push({
            nombre: nombreIngrediente,
            cantidad: cantidadCompra,
            unidad: 'kg', // Puedes cambiar esto si tienes diferentes unidades
            fechaCaducidad: fechaCaducidad
        });
    }

    // Guardar el inventario en localStorage
    localStorage.setItem('inventario', JSON.stringify(inventario));

    alert(`Compra registrada: ${cantidadCompra} kg de ${nombreIngrediente}`);
    // Limpiar el formulario
    document.getElementById('comprasForm').reset();
});
