// ---------- Inicializar Variables ----------

var hostDom = $("#hostDominio");
var secciones = $("#secciones");
var formulario = $("#formulario");
var galeria = $("#galeria");
var contenido = $("#contenido");
var form = $("#form");

var dolar;
var marcaDolar;

var precios = {
    hosting: 0,
    dominio: 0,
    secciones: 0,
    formulario: 0,
    galeria: 0,
    contenido: 0,
};

// ---------- Función Obtener Precios JSON ----------

$(document).ready(function () {

    $.ajax({
        url: "../precios.json",
        type: "GET",
        dataType: "json"
    }).done( function( resultadoJson ) {

        precios.hosting = resultadoJson.hosting;
        precios.dominio = resultadoJson.dominio;
        precios.secciones = resultadoJson.secciones;
        precios.formulario = resultadoJson.formulario;
        precios.galeria = resultadoJson.galeria;
        precios.contenido = resultadoJson.contenido;

        return precios;

    }).fail( function(xhr, status, error){
        console.log(xhr);
        console.log(status);
        console.log(error);
    })

});

// ---------- Función Principal Cotizar ----------

$("#cotizar").click( function(e) {

    e.preventDefault();

    total = 0;

    // obtenerPrecios();

    consultarPrecioDolar();

    datoHosting( (hostDom[0].value) );
   
    datoSeccion( (secciones[0].value) );

    datoFormulario( ((formulario[0].value).toLowerCase()), 1 );
    
    datoGaleria( ((galeria[0].value).toLowerCase()), 1);
  
    datoContenido( (contenido[0].value) );

    marcaDolar = true;

    imprimirCostos(total);

})

// ---------- Función Cargar Nombre Header ----------

$("#nombre").change( function() {

    var nombreUser = $("#nombre")[0].value;
    $('#bienvenido')[0].innerHTML = "Hola, " + nombreUser + ". Bienvenido!";

})

// ---------- Función Limpiar Información Cargada ----------

$("#reset").click( function() {

    location.reload();

})

$("#hostDominio").change( function() {

    $('#leyendaHost')[0].innerHTML = "";

})
$("#secciones").change( function() {

    $('#leyendaSecciones')[0].innerHTML = "";

})
$("#formulario").change( function() {

    $('#leyendaFormulario')[0].innerHTML = "";

})
$("#galeria").change( function() {

    $('#leyendaGaleria')[0].innerHTML = "";

})
$("#contenido").change( function() {

    $('#leyendaContenido')[0].innerHTML = "";

})

// ---------- Funciones Obtener Datos Ingresados ----------

function datoHosting(valor) {

    switch (valor) {
        case "no":
            total += (precios.hosting + precios.dominio);
            break;
        case "hosting":
            total += precios.dominio;
            break;
        case "dominio":
            total += precios.hosting;
            break;
        case "ambos":
            break;
        default:
            $('#leyendaHost')[0].innerHTML = "Elija una opción por favor.";
            sessionStorage.setItem('Imprimir', 1);
            break;
    }

    return total;

}

function datoSeccion(valor) {

    if( isNaN(valor) || (valor == "") || (valor == 0)){
        $("#leyendaSecciones")[0].innerHTML = "Números entre 1 y 10 por favor.";
        sessionStorage.setItem('Imprimir', 1);

    } else {
        if(valor <= 3) {
            total += (precios.secciones * 2);
        } else if ((valor > 3) && (valor <= 5)){
            total += (precios.secciones * 4);
        } else if (valor <= 10){
            total += (precios.secciones * 6);
        } else {
            $("#leyendaSecciones")[0].innerHTML = "Números entre 1 y 10 por favor.";
            sessionStorage.setItem('Imprimir', 1);
        }
    }

    return total;
}

function datoFormulario(valor, referencia) {

    if ( (valor == "si") || (valor == "no") ) {

        if ((valor == "si") && (referencia == 1)) {
            total += precios.formulario;
        }
    
        return (total);
        
    } else {

        $("#leyendaFormulario")[0].innerHTML = "Ingrese Si o No por favor.";
        sessionStorage.setItem('Imprimir', 1);
    }
    
    if ((valor == "") && (referencia == 1)) {
        $("#leyendaFormulario")[0].innerHTML = "Ingrese Si so No por favor.";
        sessionStorage.setItem('Imprimir', 1);
    }

}

function datoGaleria(valor, referencia) {
    
    if ( (valor == "si") || (valor == "no") ) {

        if ((valor == "si") && (referencia == 1)) {
            total += precios.galeria;
        }

        return (total);

    } else {

        $("#leyendaGaleria")[0].innerHTML = "Ingrese Si o No por favor.";
        sessionStorage.setItem('Imprimir', 1);
    }

    if ((valor == "") && (referencia == 1)) {
        $("#leyendaGaleria")[0].innerHTML = "Ingrese Si o No por favor.";
        sessionStorage.setItem('Imprimir', 1);
    }
}

function datoContenido(valor) {

    switch (valor) {
        case "no":
            total += ( precios.contenido * (secciones[0].value) );
            break;
        case "50":
            total += ( ( precios.contenido * (secciones[0].value) ) / 2);
            break;
        case "75":
            total += ( ( precios.contenido * (secciones[0].value) ) / 4);
            break;
        case "si":
            break;
        default:
            $("#leyendaContenido")[0].innerHTML = "Elija una opción por favor.";
            sessionStorage.setItem('Imprimir', 1);
            break;
    }

    return total;

}

// ---------- Función Imprimir Resultados ----------

function imprimirCostos(valor) {

    if (sessionStorage.getItem('Imprimir') != 1) {

        $("#costoTotal")[0].innerHTML = "Costo Total: $ " + ( Math.round(valor));

        $("#disenio")[0].innerHTML = "$ " + ( Math.round(valor * 0.35) ) ;
        $("#seo")[0].innerHTML = "$ " + ( Math.round(valor * 0.15) );
        $("#dev")[0].innerHTML = "$ " + ( Math.round(valor * 0.5) );

        $("#tresCuotas")[0].innerHTML = "3 cuotas de: $ " + (Math.round( valor + (valor * 0.15)) );
        $("#seisCuotas")[0].innerHTML = "6 cuotas de: $ " + (Math.round( valor + (valor * 0.3)) );

        sessionStorage.clear();

    } else {

        sessionStorage.clear();

    }
}

// ---------- Función Cambiar Moneda ----------

$("#costoDolares").click( function() {

    if(marcaDolar) {
        totalDolares = ( total / dolar );
    }

    imprimirCostos(totalDolares);
    marcaDolar = false;
    $("#costoDolares").addClass("active");
    $("#costoPesos").removeClass("active");

})

$("#costoPesos").click( function() {

    imprimirCostos(total);
    $("#costoPesos").addClass("active");
    $("#costoDolares").removeClass("active");
       
})

// ---------- Función Conectar API y Obtener Precio  Dólar ----------

function consultarPrecioDolar() {

    $.ajax({
        url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
        type: "GET",
        dataType: "json"
    }).done( function( resultadoDolar ) {

       dolar = parseInt( resultadoDolar[0].casa.compra );

       console.log (dolar);

    }).fail( function(xhr, status, error){
        console.log(xhr);
        console.log(status);
        console.log(error);
    })

}

// ---------- Función Ver Ayuda ----------

$("#ayuda").click( function() { 

    if( $("#infoAyuda").is(":hidden") ) {
        $("#infoAyuda").fadeIn(2000);
        $("#ayuda")[0].innerHTML = "Ocultar Ayuda";
    }else {
        $("#infoAyuda").fadeOut();
        $("#ayuda")[0].innerHTML = "Ver Ayuda";
    }

});

// ---------- Función Ver Formas Pagos ----------

$("#cuotas").click( function() { 

    if( $("#infoCuotas").is(":hidden") ) {
        $("#infoCuotas").fadeIn(2000);
        $("#cuotas")[0].innerHTML = "Ocultar Cuotas";
    }else {
        $("#infoCuotas").fadeOut(); 
        $("#cuotas")[0].innerHTML = "Ver Cuotas";
    }

});