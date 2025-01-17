/**
 * Notas:
 * Coge las librerias (estructuras de código) de los otros js,
 * luego creo los datos en este para que pueda interpretarlo el HTML.
*/


import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

// Actualizar presupuesto a 1500€
gesPres.actualizarPresupuesto(1500);

// Mostrar presupuesto en div#presupuesto
gesPresWeb.mostrarDatoEnId('presupuesto', gesPres.mostrarPresupuesto());

// Crear gastos estáticos utilizando la función CrearGasto del archivo gestionPresupuesto
let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir los gastos a la lista de gastos utilizando la función anyadirGasto del archivo gestionPresupuesto
gesPres.anyadirGasto(gasto1);
gesPres.anyadirGasto(gasto2);
gesPres.anyadirGasto(gasto3);
gesPres.anyadirGasto(gasto4);
gesPres.anyadirGasto(gasto5);
gesPres.anyadirGasto(gasto6);

// Mostrar gastos totales en div#gastos-totales
gesPresWeb.mostrarDatoEnId('gastos-totales', `Total de gastos: ${gesPres.calcularTotalGastos()} €`);

// Mostrar balance total en div#balance-total
gesPresWeb.mostrarDatoEnId('balance-total', `Balance total: ${gesPres.calcularBalance()} €`);

// Mostrar el listado completo de gastos en el elemento HTML con id 'listado-gastos-completo'
gesPres.listarGastos().forEach(gasto => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
});

// Filtrar y mostrar el listado de gastos realizados en septiembre de 2021
let gastosSeptiembre2021 = gesPres.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});
gastosSeptiembre2021.forEach(gasto => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
});

// Filtrar y mostrar el listado de gastos de más de 50€
let gastosMas50Euros = gesPres.filtrarGastos({
    valorMinimo: 50
});
gastosMas50Euros.forEach(gasto => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
});

// Filtrar y mostrar el listado de gastos de más de 200€ con etiqueta 'seguros'
let gastosMas200EurosSeguros = gesPres.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ['seguros']
});
gastosMas200EurosSeguros.forEach(gasto => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
});

// Filtrar y mostrar el listado de gastos con etiquetas 'comida' o 'transporte' de menos de 50€
let gastosComidaTransporteMenos50Euros = gesPres.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ['comida', 'transporte']
});
gastosComidaTransporteMenos50Euros.forEach(gasto => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
});

// Mostrar el total de gastos agrupados por día en el elemento HTML con id 'agrupacion-dia'
let gastosAgrupadosDia = gesPres.agruparGastos('dia');
gesPresWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosDia, 'día');

// Mostrar el total de gastos agrupados por mes en el elemento HTML con id 'agrupacion-mes'
let gastosAgrupadosMes = gesPres.agruparGastos('mes');
gesPresWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosMes, 'mes');

// Mostrar el total de gastos agrupados por año en el elemento HTML con id 'agrupacion-anyo'
let gastosAgrupadosAnyo = gesPres.agruparGastos('anyo');
gesPresWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosAnyo, 'año');