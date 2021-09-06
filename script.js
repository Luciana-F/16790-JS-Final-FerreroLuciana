let carrito = [];
let total = 0;

//Animacion formulario
$("#contenedorTurnos").hide();
$('#btnMostrar').on('click', () => {
    $("#contenedorTurnos").toggle("fast");});

//Evento boton enviar
$('#btnEnviar').on('click', () => {crearUsuario()})

//Funcion al presionar boton enviar
function crearUsuario(){
    for (var i = 0; i<=5; i++){
        carrito.pop()
    }
    localStorage.clear();
    for (var i = 0; i<=5; i++) {
        if (servicios[i].selec === "yes"){
            carrito.push(servicios[i]);
        }
    }
    //constructor de objeto usuario
    class usuario{
        constructor(nombre,apellido,telefono,email,fecha,serviciosSeleccionados){
            this.nombre=nombre;
            this.apellido=apellido;
            this.telefono=telefono;
            this.email=email;
            this.fecha=fecha;
            this.serviciosSeleccionados=carrito;
        }
    }
    //carga de valores del formulario a las variables
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let fecha = document.getElementById("fecha").value;
    // creacion del nuevo usuario
    let usuario1=new usuario(nombre,apellido,telefono,email,fecha,carrito);
    //guardado en local storage
    let aJson=JSON.stringify(usuario1);
    localStorage.setItem("usuario",aJson);
    //ejecuta funcion traer
    traer();
} 

//Boton borrar con jquery
$('#btnBorrar').on('click', () => {borrar()})

function borrar(){
    localStorage.clear();
    document.getElementById("formulario").reset();
    location.reload();
}

//Funcion que trae y envia los datos
function traer(){
    //trae el elemento del local storage
    let usuarionuevo = JSON.parse(localStorage.getItem("usuario"));
    //URL de la API
    const APIURL = 'https://jsonplaceholder.typicode.com/posts' ; 
    //Información a enviar
    const datosPost =  usuarionuevo;
    $.ajax({
        method: "POST",
        url:  APIURL,
        data: datosPost,
        success: function(respuesta){
            alert(usuarionuevo.nombre + " su turno ha sido reservado.");
        }
    });
}



//CARRITO DE SERVICIOS
const servicios =[
    {
        id:1,
        nombre:"clasica",
        precio:100,
        selec:"no"
    },
    {
        id:2,
        nombre:"spa de manos",
        precio:200,
        selec:"no"
    },
    {
        id:3,
        nombre:"gel break",
        precio:300,
        selec:"no"
    },
    {
        id:4,
        nombre:"gel color",
        precio:400,
        selec:"no"
    },
    {
        id:5,
        nombre:"nail art",
        precio:500,
        selec:"no"
    },
    {
        id:6,
        nombre:"esculpidas",
        precio:600,
        selec:"no"
    }

];

$("#clasica").on('click', () => {seleccion(0)});
$("#spamanos").on('click', () => {seleccion(1)});
$("#gelbreak").on('click', () => {seleccion(2)});
$("#gelcolor").on('click', () => {seleccion(3)});
$("#nailart").on('click', () => {seleccion(4)});
$("#esculpidas").on('click', () => {seleccion(5)});

function seleccion(numero){
    
    switch (numero) {
        case 0:
            var serv = "clasica";
            break;
        case 1:
            var serv = "spamanos";
            break;
        case 2:
            var serv = "gelbreak";
            break;
        case 3:
            var serv = "gelcolor";
            break;
        case 4:
            var serv = "nailart";
            break;
        case 5:
            var serv = "esculpidas";
            break;
        default:
            break;
    }

    var seleccionado=document.getElementById(serv);
    if (servicios[numero].selec == "no"){
        seleccionado.classList.add ("seleccionado");
        servicios[numero].selec="yes";
        total = total + servicios[numero].precio;
        sessionStorage.setItem("total", total)
    }else{
        seleccionado.classList.remove ("seleccionado");
        servicios[numero].selec="no";
        // carrito.forEach(function(car, index, object) {
        //     if(carrito.id === servicios[numero].id){
        //       object.splice(index, 1);
        //     }
        // });
        total = total - servicios[numero].precio;
        sessionStorage.setItem("total", total)
    }
    $(".p2").text("$"+sessionStorage.total);
}