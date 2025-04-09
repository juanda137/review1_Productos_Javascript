const inputCodigo = document.getElementById('inputCodigo')
const inputNombre = document.getElementById('inputNombre')
const inputDescripcion = document.getElementById('inputDescripcion')
const inputPrecio = document.getElementById('inputPrecio')
const inputs = document.querySelectorAll('#registroProducto input[type="text"]')
const inputGuardar = document.getElementById('inputGuardar')
const inputEliminar = document.getElementById('inputEliminar')
const mostrarRegistroBtn = document.getElementById('mostrarRegistro')
const listaProductosBtn = document.getElementById('listaProductos')
const registroProductoDiv = document.getElementById('registroProducto')
const mostrarProductoSection = document.getElementById('mostrarProducto')
const ultimoProductoCreadoDiv = document.getElementById('ultimoProductoCreado') 

let codigoProductoEditar = null
registroProductoDiv.style.display = 'none'
ultimoProductoCreadoDiv.style.display = 'none' 

mostrarRegistroBtn.addEventListener('click', () => {
    registroProductoDiv.style.display = 'block'
    mostrarProductoSection.style.display = 'none' 
    ultimoProductoCreadoDiv.style.display = 'none' 
    codigoProductoEditar = null 
    inputGuardar.value = 'Guardar' 
    inputs.forEach(input => {
        input.value = '' 
    })
})

listaProductosBtn.addEventListener('click', () => {
    registroProductoDiv.style.display = 'none'
    ultimoProductoCreadoDiv.style.display = 'none'
    mostrarProductoSection.style.display = 'block'
    cargarTabla()
})

inputGuardar.addEventListener('click', () => {
    if (!inputCodigo.value || !inputNombre.value || !inputDescripcion.value || !inputPrecio.value) {
        alert('Por favor, rellena todos los campos del formulario.');
        return;
    }
    const codigo = inputCodigo.value
    const nombre = inputNombre.value
    const descripcion = inputDescripcion.value
    const precio = inputPrecio.value

    const producto = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    }

    let productos = localStorage.getItem('productos')
    if (productos) {
        productos = JSON.parse(productos)
        if (codigoProductoEditar) {
            productos = productos.map(prod => prod.codigo === codigoProductoEditar ? producto : prod)
            codigoProductoEditar = null
            inputGuardar.value = 'Guardar'
        } else {
            productos.push(producto)
            ultimoProductoCreadoDiv.innerHTML = `Producto creado correctamente<br>Código: ${codigo}<br>Nombre: ${nombre}<br>Descripción: ${descripcion}<br>Precio: ${precio}`
            ultimoProductoCreadoDiv.style.display = 'block'
        }
    } else {
        productos = [producto]
        ultimoProductoCreadoDiv.innerHTML = `Producto creado correctamente<br>Código: ${codigo}<br>Nombre: ${nombre}<br>Descripción: ${descripcion}<br>Precio: ${precio}`
        ultimoProductoCreadoDiv.style.display = 'block'
    }
    localStorage.setItem('productos', JSON.stringify(productos))

    inputs.forEach(input => {
        input.value = ''
    })
    cargarTabla()
})

inputEliminar.addEventListener('click', () => {
    inputs.forEach(input => {
        input.value = ''
    })
})

window.addEventListener('load', () => {
    cargarTabla()
})

function cargarTabla() {
    mostrarProductoSection.innerHTML = ''
    const productosGuardados = localStorage.getItem('productos')

    if (productosGuardados) {
        const productos = JSON.parse(productosGuardados)
        if (productos.length > 0) {
            const table = document.createElement('table')
            const thead = document.createElement('thead')
            const tr = document.createElement('tr')

            const headers = ['Código', 'Nombre', 'Descripción', 'Precio', 'Opciones']
            headers.forEach(headerText => {
                const th = document.createElement('th')
                th.textContent = headerText
                tr.appendChild(th)
            })
            thead.appendChild(tr)
            table.appendChild(thead)

            const tbody = document.createElement('tbody')
            productos.forEach(producto => {
                const tr = document.createElement('tr')
                const codigoTd = document.createElement('td')
                codigoTd.textContent = producto.codigo
                tr.appendChild(codigoTd)

                const nombreTd = document.createElement('td')
                nombreTd.textContent = producto.nombre
                tr.appendChild(nombreTd)

                const descripcionTd = document.createElement('td')
                descripcionTd.textContent = producto.descripcion
                tr.appendChild(descripcionTd)

                const precioTd = document.createElement('td')
                precioTd.textContent = producto.precio
                tr.appendChild(precioTd)

                const opcionesTd = document.createElement('td')
                const eliminarBtn = document.createElement('button')
                eliminarBtn.textContent = 'Eliminar'
                eliminarBtn.classList.add('eliminar-btn')
                eliminarBtn.addEventListener('click', (event) => {
                    const codigoProducto = producto.codigo
                    let productos = localStorage.getItem('productos')
                    if (productos) {
                        productos = JSON.parse(productos)
                        const nuevosProductos = productos.filter(prod => prod.codigo !== codigoProducto)
                        localStorage.setItem('productos', JSON.stringify(nuevosProductos))
                        cargarTabla()
                    }
                })
                opcionesTd.appendChild(eliminarBtn)

                const editarBtn = document.createElement('button')
                editarBtn.textContent = 'Editar'
                editarBtn.addEventListener('click', () => {
                    registroProductoDiv.style.display = 'block'
                    mostrarProductoSection.style.display = 'none'
                    codigoProductoEditar = producto.codigo
                    inputCodigo.value = producto.codigo
                    inputNombre.value = producto.nombre
                    inputDescripcion.value = producto.descripcion
                    inputPrecio.value = producto.precio
                    inputGuardar.value = 'Actualizar' 
                })
                opcionesTd.appendChild(editarBtn)

                tr.appendChild(opcionesTd)
                tbody.appendChild(tr)
            })
            table.appendChild(tbody)
            mostrarProductoSection.appendChild(table)
        } else {
            mostrarProductoSection.textContent = 'No hay productos registrados.'
        }
    } else {
        mostrarProductoSection.textContent = 'No hay productos registrados.'
    }
}