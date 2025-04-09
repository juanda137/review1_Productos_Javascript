const inputCodigo = document.getElementById('inputCodigo')
const inputNombre = document.getElementById('inputNombre')
const inputDescripcion = document.getElementById('inputDescripcion')
const inputPrecio = document.getElementById('inputPrecio')
const inputs = document.querySelectorAll('#resgistroProducto input[type="text"]')
const inputGuardar = document.getElementById('inputGuardar')
const inputEliminar = document.getElementById('inputEliminar')

inputGuardar.addEventListener("click", ()=>{
    console.log(`
    codigo: ${inputCodigo.value}
    nombre: ${inputNombre.value}
    descripcion: ${inputDescripcion.value}
    precio: ${inputPrecio.value}`)

    inputs.forEach(input => {
        input.value = ""
    })
})

inputEliminar.addEventListener("click", ()=>{
    inputs.forEach(input => {
        input.value = ""
    })
})