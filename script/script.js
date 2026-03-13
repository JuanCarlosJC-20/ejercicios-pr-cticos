
//mostrar mensaje
function mostrarMensaje(){
var boton = document.getElementById("mensaje").innerHTML="hola chamo!";
}



//suma de dos numeros
function sumar1(){
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);

    var suma =  num1 + num2;
    

 document.getElementById("resultado").innerHTML = suma;
}

//cambio de color
document.getElementById("rojo").addEventListener("click",function(){
    var fondo = document.getElementById("fondo");
    fondo.style.backgroundColor = "red";
});
document.getElementById("verde").addEventListener("click",function(){
    var fondo = document.getElementById("fondo");
    fondo.style.backgroundColor = "green";
});
document.getElementById("azul").addEventListener("click",function(){
    var fondo = document.getElementById("fondo");
    fondo.style.backgroundColor = "blue";
});
document.getElementById("blanco").addEventListener("click",function(){
    var fondo = document.getElementById("fondo");
    fondo.style.backgroundColor = "white";
});


//contador 
function contador(){
    var contador = document.getElementById("contador");
    var resultado = parseInt(contador.innerHTML);
   
    

    contador.innerHTML = resultado+1;
}


//lista dinamica1
function agregar(){

    var tarea = document.getElementById("tarea").value;
    
    var elemnto = document.createElement("li");
    elemnto.textContent = tarea;

    document.getElementById("lista").appendChild(elemnto);


}

//lista dinamica 2
function agregar2(){

    var tarea = document.getElementById("tarea1").value;
    
    var elemnto = document.createElement("li");
    elemnto.textContent = tarea;
     
    var eliminar = document.createElement("button");
    eliminar.textContent = "eliminar";

    eliminar.style.backgroundColor = "red";
    

    eliminar.onclick = function(){
        elemnto.remove();
    }


    elemnto.appendChild(eliminar);

    document.getElementById("lista1").appendChild(elemnto);


}
 //validar formulario
function validar(){
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var numero = document.getElementById("numero").value;
    var formulario = document.getElementById("formulario");

    if(nombre == "" || email == ""  || numero == ""){
    
        document.getElementById("datos").innerHTML = "<strong style='color:red'>no puedes dejar los campos en blanco</strong>";
    }
    else{
        document.getElementById("datos").innerHTML = "bienvenido "+nombre +
        " Estos son tus datos "+ email +" tu numero es "+numero;
        
    }

    formulario.reset();
    
}

 //suma, resta, multiplicacion y division de dos numeros
function sumar(){
 var dato1 = parseInt(document.getElementById("dato1").value);
 var dato2 = parseInt(document.getElementById("dato2").value);
 
 var solucion = dato1 + dato2;
console.log(resultado);
 document.getElementById("result").innerHTML = solucion;
    
}
function restar(){
 var dato1 = parseInt(document.getElementById("dato1").value);
 var dato2 = parseInt(document.getElementById("dato2").value);
 
 var solucion = dato1 - dato2;
 document.getElementById("result").innerHTML = solucion;
}

function multiplicar(){
 var dato1 = parseInt(document.getElementById("dato1").value);
 var dato2 = parseInt(document.getElementById("dato2").value);
 
 var  solucion = dato1 * dato2;
 document.getElementById("result").innerHTML = solucion;
}
function dividir(){
 var dato1 = parseInt(document.getElementById("dato1").value);
 var dato2 = parseInt(document.getElementById("dato2").value);
 
  var solucion = dato1 / dato2;
 document.getElementById("result").innerHTML = solucion;
}

//temporalizador
   
let segundos = 0;
let intervalo = null;
const pantalla = document.getElementById('pantalla');

function iniciar() {
  
  if (intervalo) return; 

  intervalo = setInterval(() => {
    segundos++;
    pantalla.innerText = segundos;
  }, 1000);
}

function detener() {
  clearInterval(intervalo);
  intervalo = null; // Limpiamos la referencia
}

function reiniciar() {
  detener();
  segundos = 0;
  pantalla.innerText = segundos;
}

