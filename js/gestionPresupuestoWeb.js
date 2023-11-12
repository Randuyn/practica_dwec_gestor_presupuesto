function mostrarDatoEnId(idElemento, valor) {
    let el = document.getElementById(idElemento);
    // Establecer el contenido del elemento con el valor proporcionado
    el.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtener el elemento HTML mediante su ID
    let elemento = document.getElementById(idElemento);

    // Crear un nuevo elemento div para representar el gasto
    let nuevoGastoDiv = document.createElement('div');
    nuevoGastoDiv.classList.add('gasto');

    // Crear elementos div para cada propiedad del gasto y agregarlos al nuevoGastoDiv
    let descripcionDiv = document.createElement('div');
    descripcionDiv.classList.add('gasto-descripcion');
    descripcionDiv.textContent = `Descripción del gasto: ${gasto.descripcion}`;
    nuevoGastoDiv.appendChild(descripcionDiv);

    let fechaDiv = document.createElement('div');
    fechaDiv.classList.add('gasto-fecha');
    fechaDiv.textContent = `Fecha del gasto: ${new Date(gasto.fecha).toLocaleDateString()}`;
    nuevoGastoDiv.appendChild(fechaDiv);

    let valorDiv = document.createElement('div');
    valorDiv.classList.add('gasto-valor');
    valorDiv.textContent = `Valor del gasto: ${gasto.valor} €`;
    nuevoGastoDiv.appendChild(valorDiv);

    let etiquetasDiv = document.createElement('div');
    etiquetasDiv.classList.add('gasto-etiquetas');

    // Iterar sobre las etiquetas del gasto y agregarlas al elemento
    gasto.etiquetas.forEach(etiqueta => {
        let etiquetaSpan = document.createElement('span');
        etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
        etiquetaSpan.textContent = etiqueta;
        etiquetasDiv.appendChild(etiquetaSpan);
    });

    nuevoGastoDiv.appendChild(etiquetasDiv);

    // Agregar el nuevoGastoDiv al elemento contenedor
    elemento.appendChild(nuevoGastoDiv);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb
}
