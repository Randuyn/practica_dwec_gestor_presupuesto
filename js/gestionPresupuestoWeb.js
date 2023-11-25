import * as gesPres from "./gestionPresupuesto.js";

/*********************************************Crear Funciones Mostrar Gastos HTML***************************************************/
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
    valorDiv.innerText = `${gasto.valor}`;
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
        // Crear objeto manejador para borrar etiquetas y asignarlo al span
        let borrarEtiquetasHandle = new BorrarEtiquetasHandle(gasto, etiqueta);
        etiquetaSpan.addEventListener('click', borrarEtiquetasHandle);
    });

    // Agregar el nuevoGastoDiv al elemento contenedor
    elemento.appendChild(nuevoGastoDiv);

    // Crear botón Editar y asignar manejador
    let botonEditar = document.createElement('button');
    botonEditar.innerText = 'Editar';
    nuevoGastoDiv.appendChild(botonEditar);

    botonEditar.addEventListener('click', () => {
        // Crear el objeto manejador de eventos para editar el gasto
        let editarHandle = new EditarHandle(gasto);
        // Llamar al método handleEvent para editar con la información del gasto
        editarHandle.handleEvent();
    });

    // Crear botón Borrar y asignar manejador
    let botonBorrar = document.createElement('button');
    botonBorrar.classList.add('gasto-borrar');
    botonBorrar.innerText = 'Borrar';
    nuevoGastoDiv.appendChild(botonBorrar);

    let borrarHandle = new BorrarHandle(gasto);
    botonBorrar.addEventListener('click', () => borrarHandle.handleEvent());


    // Crear botón Editar y asignar manejador para abrir el formulario
    let botonEditarFormulario = document.createElement('button');
    botonEditarFormulario.classList.add('gasto-editar-formulario');
    botonEditarFormulario.innerText = 'Editar-Formulario';
    botonEditarFormulario.gasto = gasto;
    nuevoGastoDiv.appendChild(botonEditarFormulario);

    // Crear el objeto manejador de eventos para editar el gasto
    let editarHandleFormulario = new EditarHandleFormulario();
    editarHandleFormulario.gasto = nuevoGastoDiv.gasto;
    botonEditarFormulario.addEventListener("click", editarHandleFormulario);

};

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

/*********************************************Crear Función Repintar los Gastos***************************************************/
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
    listadoGastosCompleto.innerHTML = ' ';

    // Obtener la lista de gastos del objeto gestionPresupuesto (o como lo hayas llamado)
    let listaGastos = gesPres.listarGastos();

    // Iterar sobre la lista de gastos y mostrar cada uno usando la función mostrarGastoWeb
    listaGastos.forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
}

/*********************************************Crear Funciones de los Botones del HTML***************************************************/
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

// Función para manejar el evento de añadir un nuevo gasto
function nuevoGastoWeb() {
    // Pedir al usuario la información necesaria
    let descripcion = prompt("Introduce la descripción del gasto:");
    let valorStr = prompt("Introduce el valor del gasto:");
    let fechaStr = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd:");
    let etiquetasStr = prompt("Introduce las etiquetas del gasto separadas por comas:");

    // Convertir el valor a número
    let valor = parseFloat(valorStr);

    // Convertir la cadena de texto de etiquetas a un array
    let etiquetas = etiquetasStr.split(',');

    // Crear un nuevo gasto
    let nuevoGasto = {
        descripcion: descripcion,
        valor: valor,
        fecha: fechaStr,
        etiquetas: etiquetas
    };

    // Añadir el gasto a la lista
    gesPres.anyadirGasto(nuevoGasto);

    // Llamar a la función repintar para actualizar la lista de gastos
    repintar();
}

/*********************************************Crear Botones del HTML***************************************************/
// Obtener el botón de actualizar presupuesto
let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
// Asignar la función manejadora de eventos a la acción de hacer clic en el botón
btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

// Obtener el botón anyadirgasto y añadir el manejador de eventos
let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', nuevoGastoWeb);

// Obtener el botón anyadirgasto-formulario y añadir el manejador de eventos
let botonAnyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

/*********************************************Crear Edición de los Gastos***************************************************/
// Definición de la función constructora EditarHandle
function EditarHandle(gasto) {
    // Asignar el gasto al objeto creado
    this.gasto = gasto;
}
// Definición del método handleEvent de la función constructora EditarHandle
EditarHandle.prototype.handleEvent = function () {
    // Pedir al usuario la información necesaria para editar el gasto
    let nuevaDescripcion = prompt('Introduce la nueva descripción:', this.gasto.descripcion);
    let nuevoValor = parseFloat(prompt('Introduce el nuevo valor:', this.gasto.valor));
    let nuevaFecha = prompt('Introduce la nueva fecha (yyyy-mm-dd):', this.gasto.fecha);
    let nuevasEtiquetas = prompt('Introduce las nuevas etiquetas separadas por comas:', this.gasto.etiquetas.join(','));

    // Convertir la cadena de texto de etiquetas a un array
    let arrayNuevasEtiquetas = nuevasEtiquetas.split(',');

    // Borrar todas las etiquetas existentes
    this.gasto.borrarEtiquetas(...this.gasto.etiquetas);

    // Actualizar las propiedades del gasto
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(...arrayNuevasEtiquetas);

    // Llamar a la función repintar para mostrar la lista de gastos con los datos actualizados
    repintar();
};

/*********************************************Crear Borrar de los Gastos***************************************************/
// Definición de la función constructora BorrarHandle
function BorrarHandle(gasto) {
    // Asignar el gasto al objeto creado
    this.gasto = gasto;
}
// Definición del método handleEvent de la función constructora BorrarHandle
BorrarHandle.prototype.handleEvent = function () {
    // Borrar el gasto asociado utilizando la función borrarGasto
    gesPres.borrarGasto(this.gasto.id);

    // Llamar a la función repintar para mostrar la lista actualizada de gastos
    repintar();
};

/*********************************************Crear Borrar Etiquetas de los Gastos***************************************************/
// Definición de la función constructora BorrarEtiquetasHandle
function BorrarEtiquetasHandle(gasto, etiqueta) {
    // Asignar el gasto y la etiqueta al objeto creado
    this.gasto = gasto;
    this.etiqueta = etiqueta;
}
// Definición del método handleEvent de la función constructora BorrarEtiquetasHandle
BorrarEtiquetasHandle.prototype.handleEvent = function () {
    // Borrar la etiqueta seleccionada del gasto asociado utilizando la función borrarEtiquetas
    this.gasto.borrarEtiquetas(this.etiqueta);

    // Llamar a la función repintar para mostrar la lista actualizada de gastos
    repintar();
};

/*********************************************Crear Formulario Edición de los Gastos***************************************************/
// Definición de la función constructora EditarHandleFormulario
function EditarHandleFormulario() {
    // Definición del método handleEvent de la función constructora EditarHandleFormulario
    this.handleEvent = function (event) {
        // Desactivar el botón editar
        event.target.disabled = true;

        // Obtener el gasto asociado al botón
        let gasto = event.target.gasto;

        // Crear una copia del formulario web definido en la plantilla HTML
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        // Acceder al elemento <form> dentro de ese fragmento de documento
        let formulario = plantillaFormulario.querySelector("form");

        // Rellenar los campos del formulario con la información del gasto
        formulario.elements.descripcion.value = gasto.descripcion;
        formulario.elements.valor.value = gasto.valor;
        formulario.elements.fecha.value = gasto.fecha;
        formulario.elements.etiquetas.value = gasto.etiquetas.join(',');

        // Crear manejador de evento para el boton enviar
        let submitActualizarHandle = new EnviarHandle(gasto);
        formulario.addEventListener('submit', submitActualizarHandle);

        // Crear manejador de evento para el evento click del botón Cancelar
        let botonCancelar = formulario.querySelector(".cancelar");
        let cancelarHandle = new CancelarEditarHandle();
        cancelarHandle.botonEditarFormulario = event.target;
        botonCancelar.addEventListener('click', cancelarHandle);

        // Añadir el fragmento de documento al final
        event.target.parentElement.append(plantillaFormulario);
    };
}

// Función manejadora de eventos del evento EnviarHandle
function EnviarHandle(gasto) {
    // Asignar el gasto al objeto creado
    this.gasto = gasto;
    this.handleEvent = function (event) {
        // Prevenir el envío del formulario
        event.preventDefault();

        // Obtener los valores del formulario
        let nuevaDescripcion = event.currentTarget.descripcion.value;
        let nuevoValor = parseFloat(event.currentTarget.valor.value);
        let nuevaFecha = event.currentTarget.fecha.value;
        let nuevasEtiquetas = event.currentTarget.etiquetas.value;

        // Convertir la cadena de texto de etiquetas a un array
        let arrayNuevasEtiquetas = nuevasEtiquetas.split(',');

        // Borrar todas las etiquetas existentes
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);

        // Actualizar las propiedades del gasto
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...arrayNuevasEtiquetas);

        // Llamar a la función repintar para que se muestre la lista de gastos con los datos actualizados de la edición
        repintar();
    }
}

// Función constructora para manejar el evento de Cancelar en el formulario
function CancelarEditarHandle() {
    // Método para manejar el evento click en el botón Cancelar
    this.handleEvent = function (event) {
        // Eliminar el formulario
        event.target.form.remove();
        // Volver a activar el botón anyadirgasto-formulario
        this.botonEditarFormulario.disabled = false;
    };
}

/*********************************************Crear Nuevo Formulario de los Gastos***************************************************/
// Función nuevoGastoWebFormulario (manejadora de eventos del botón anyadirgasto-formulario)
function nuevoGastoWebFormulario() {
    // Crear una copia del formulario web definido en la plantilla HTML
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    // Acceder al elemento <form> dentro de ese fragmento de documento
    let formulario = plantillaFormulario.querySelector("form");

    // Desactivar el botón anyadirgasto-formulario
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', 'true');

    // Crear manejador de evento para el evento submit del formulario
    formulario.addEventListener('submit', submitFormulario);

    // Crear manejador de evento para el evento click del botón Cancelar
    let botonCancelar = formulario.querySelector("button.cancelar");
    let cancelarHandle = new CancelarHandle(formulario, document.getElementById('anyadirgasto-formulario'));
    botonCancelar.addEventListener('click', cancelarHandle);

    // Añadir el fragmento de documento al final del <div id="controlesprincipales">
    document.getElementById('controlesprincipales').appendChild(plantillaFormulario);
}

// Función manejadora de eventos del evento submit del formulario
function submitFormulario(event) {
    // Prevenir el envío del formulario
    event.preventDefault();

    // Obtener los valores del formulario
    let nuevaDescripcion = event.currentTarget.descripcion.value;
    let nuevoValor = parseFloat(event.currentTarget.valor.value);
    let nuevaFecha = event.currentTarget.fecha.value;
    let nuevasEtiquetas = event.currentTarget.etiquetas.value.split(',');

    // Crear un nuevo gasto
    let nuevoGasto = {
        descripcion: nuevaDescripcion,
        valor: nuevoValor,
        fecha: nuevaFecha,
        etiquetas: nuevasEtiquetas
    };

    // Añadir el gasto a la lista de gastos
    gesPres.anyadirGasto(nuevoGasto);

    // Llamar a la función repintar para que se muestre la lista de gastos con los datos actualizados de la edición
    repintar();

    // Activar el botón anyadirgasto-formulario
    document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
}

// Función constructora para manejar el evento de Cancelar en el formulario
function CancelarHandle(formulario, botonAnyadirGasto) {
    // Propiedades adicionales del objeto manejador de eventos
    this.formulario = formulario;
    this.botonAnyadirGasto = botonAnyadirGasto;

    // Método para manejar el evento click en el botón Cancelar
    this.handleEvent = function () {
        // Eliminar el formulario
        this.formulario.remove();
        // Volver a activar el botón anyadirgasto-formulario
        this.botonAnyadirGasto.removeAttribute('disabled');
    };
}

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
