var palabra = "";
var direcciones = ['/img/tileSetAhorcado(2).png','/img/tileSetAhorcado(3).png','/img/tileSetAhorcado(4).png','/img/tileSetAhorcado(5).png','/img/tileSetAhorcado(6).png','/img/tileSetAhorcado(7).png','/img/tileSetAhorcado(8).png']
var directGano = "/img/victimaGano.png";
var espacios = [];
var intentos = 7;
var letrasUsadas = [];

const animales = ['leon','elefante','jirafa','canguro','pinguino','cangrejo','delfin','aguila','tiburon','serpiente','cocodrilo','gorila','cebra','hipopotamo','rinoceronte'];
const paisesDeLAmerica = ['alemania','canada','mexico','brasil','argentina','colombia','peru','venezuela','chile','ecuador','guatemala','cuba','bolivia','uruguay','españa'];
const objetos = ['silla','carro','mesa','computadora','lampara','telefono','reloj','boligrafo','libro','taza','gafas','mochila','zapatos','sombrilla','llavero'];

let minimo = 1;
let maximo = 15;
let numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;

//respuestas a eventos

function elegirPaAni(clase = ""){
    let minimo = 1;
    let maximo = 15;
    let numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;

    if (clase == "animal") {
        palabra = animales[numeroAleatorio];
    } else if(clase == "paises"){
        palabra = paisesDeLAmerica[numeroAleatorio];
    }else{
        palabra = objetos[numeroAleatorio];
    }

    HacEspacios(palabra);

    let contenedor = document.getElementById("palabra");
    contenedor.classList.add("animacionsalir");   
    //funcion asincrona para que luego de 0.5 segundos se ejecute esto
		setTimeout(function() {
		contenedor.style.display = "none";
	}, 500); 
}


function clicBTN() {
    let letra = document.getElementById("letra");
    let valor = letra.value;
    let conteLetrasUsa = document.getElementById("letras-usadas");

    if (intentos != 0) {
        if (valor.trim() != "") {
            if (!letrasUsadas.includes(valor)) {
                verifica(valor);
                letrasUsadas.push(valor);
                letra.value = "";

                conteLetrasUsa.textContent = letrasUsadas.join("-");
            } else {
                alert("Letra ya usada");
                letra.value = "";
            }
        }else{
            alert("Ingrese una letra")
            letra.value = "";
        }
    } else {
        alert("Intentos agotados")
    }
    

    gano();
}


//funciones


function verifica(letra = "") {
    let existe = [];
    let img = document.getElementById("cuerda");

    console.log(letra);
    console.log(palabra);

    for (let i = 0;  i <= palabra.length; i++) {
        if (letra == palabra[i]) {
            espacios[i] = letra;
            existe.push(1);
        }
    }

    if (existe.length != 0) {
        let conteEspacios = document.getElementById("espacios");
        conteEspacios.textContent = espacios.join("");
    } else {
        intentos--;
        let intentoText = document.getElementById("intentos");
        intentoText.textContent = intentos;
        img.src = direcciones.shift();

        if (intentos == 0) {
            let conteRespuesta = document.getElementById("contador");
            conteRespuesta.textContent = "Respuesta: " + palabra;
        }
    }
}



function HacEspacios(palabra_f = "") {
    for (let i = 0; i < palabra_f.length; i++) {
        espacios.push("-");
    }

    let conteEspacios = document.getElementById("espacios");
    conteEspacios.textContent = espacios.join("");
}

function gano() {
    let conteEspacios = document.getElementById("espacios");
    strin = conteEspacios.textContent;

    if (strin == palabra) {
        let img = document.getElementById("cuerda");
        img.src = directGano;

        let btnLetra = document.getElementById("btn-p");
        btnLetra.style.display = "none";

        let btnReiniciar = document.getElementById("btn-reini");
        btnReiniciar.style.display = "block";
    }
}


function reiniciarPan(){
    location.reload();
}
