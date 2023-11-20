import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let el = document.getElementById(idElemento);
    // Establecer el contenido del elemento con el valor proporcionado
    el.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtener el elemento HTML mediante su ID
    let elemento = document.getElementById(idElemento);

    /**
     * Crear un nuevo elemento div para representar el gasto
     * Se crea un nuevo elemento div que servirá como contenedor principal para la representación del gasto.
    */
    let nuevoGastoDiv = document.createElement('div');
    nuevoGastoDiv.classList.add('gasto');

    /**
     * Crear elementos div para cada propiedad del gasto y agregarlos al nuevoGastoDiv
     * Se crean elementos div para la descripción, fecha, valor y etiquetas del gasto.
     */
    let descripcionDiv = document.createElement('div');
    descripcionDiv.classList.add('gasto-descripcion');

    descripcionDiv.innerText = `Descripción del gasto: ${gasto.descripcion}`;
    nuevoGastoDiv.appendChild(descripcionDiv);

    let fechaDiv = document.createElement('div');
    fechaDiv.classList.add('gasto-fecha');
    fechaDiv.innerText = `Fecha del gasto: ${new Date(gasto.fecha).toLocaleDateString()}`;
    nuevoGastoDiv.appendChild(fechaDiv);

    let valorDiv = document.createElement('div');
    valorDiv.classList.add('gasto-valor');
    valorDiv.innerText = `Valor del gasto: ${gasto.valor} €`;
    nuevoGastoDiv.appendChild(valorDiv);

    let etiquetasDiv = document.createElement('div');
    etiquetasDiv.classList.add('gasto-etiquetas');

    // Iterar sobre las etiquetas del gasto y agregarlas al elemento
    // Se utiliza un bucle para recorrer todas las etiquetas del gasto y crear un span para cada una.
    gasto.etiquetas.forEach(etiqueta => {
        let etiquetaSpan = document.createElement('span');
        etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
        etiquetaSpan.innerText = etiqueta;
        etiquetasDiv.appendChild(etiquetaSpan);

        nuevoGastoDiv.appendChild(etiquetasDiv);
    });

    // Agregar el nuevoGastoDiv al elemento contenedor
    elemento.appendChild(nuevoGastoDiv);
}

// Función para mostrar gastos agrupados en un elemento HTML
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtener el elemento HTML mediante su ID
    let elemento = document.getElementById(idElemento);

    // Crear un nuevo elemento div para representar la agrupación
    let nuevaAgrupacionDiv = document.createElement('div');
    nuevaAgrupacionDiv.classList.add('agrupacion');

    // Crear un elemento h1 para el título de la agrupación
    let h1 = document.createElement('h1');
    h1.innerText = `Gastos agrupados por ${periodo}`;
    nuevaAgrupacionDiv.appendChild(h1);

    // Iterar sobre las propiedades y valores de la agrupación y agregarlas como divs
    for (let [clave, valor] of Object.entries(agrup)) {
        let datoDiv = document.createElement('div');
        datoDiv.classList.add('agrupacion-dato');

        // Agregar la clave (nombre de la propiedad de la agrupación)
        let claveSpan = document.createElement('span');
        claveSpan.classList.add('agrupacion-dato-clave');
        claveSpan.innerText = clave;
        datoDiv.appendChild(claveSpan);

        // Agregar el valor correspondiente
        let valorSpan = document.createElement('span');
        valorSpan.classList.add('agrupacion-dato-valor');
        valorSpan.innerText = valor;
        datoDiv.appendChild(valorSpan);

        // Agregar el datoDiv al nuevo elemento de agrupación
        nuevaAgrupacionDiv.appendChild(datoDiv);
    }

    // Agregar el nuevo elemento de agrupación al elemento contenedor
    elemento.appendChild(nuevaAgrupacionDiv);
}
function repintar() {
    // Mostrar el presupuesto en div#presupuesto
    let presupuestoHtml = gesPres.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuestoHtml);

    // Mostrar los gastos totales en div#gastos-totales
    let totalGastosHtml = `Total de gastos: ${gesPres.calcularTotalGastos()} €`;
    mostrarDatoEnId('gastos-totales', totalGastosHtml);

    // Mostrar el balance total en div#balance-total
    let balanceHtml = `Balance actual: ${gesPres.calcularBalance()} €`;
    mostrarDatoEnId('balance-total', balanceHtml);

    // Obtener el elemento HTML donde mostrar los gastos
    let listadoGastosCompleto = document.getElementById('listado-gastos-completo');

    // Borrar el contenido existente para evitar duplicados
    listadoGastosCompleto.innerHTML = '';

    // Obtener la lista de gastos del objeto gestionPresupuesto (o como lo hayas llamado)
    let listaGastos = gesPres.listarGastos();

    // Iterar sobre la lista de gastos y mostrar cada uno usando la función mostrarGastoWeb
    listaGastos.forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
    

}


function actualizarPresupuestoWeb() {
    // Pedir al usuario que introduzca un presupuesto mediante un prompt
    let nuevoPresupuesto = prompt('Introduce el nuevo presupuesto:');
    // Convertir el valor a número
    let nuevoPresupuestoNumero = parseFloat(nuevoPresupuesto);
    // Actualizar el presupuesto
    let resultadoActualizacion = gesPres.actualizarPresupuesto(nuevoPresupuestoNumero);
    // Verificar si la actualización fue exitosa
    if (resultadoActualizacion >= 0) {
        // Si fue exitosa, repintar la página con la información actualizada
        repintar();
    }
}

// Obtener el botón de actualizar presupuesto
let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');

// Asignar la función manejadora de eventos a la acción de hacer clic en el botón
btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

/**
 * Exporta las funciones creadas aqui.
 */
export {
    mostrarGastoWeb,
    mostrarDatoEnId,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}
