var img_2_ve = true;

function adelante() {
	let img1 = document.getElementById("imagen-1")
	let img2 = document.getElementById("imagen-2");
    
	//Quita clases
	img1.classList.remove("imagen-animado-adelante", "imagen-animado-entraAd","imagen-animado-atras")
	img2.classList.remove("imagen-animado-adelante", "imagen-animado-entraAd","imagen-animado-atras")

	//verifica cual imagen es la que se muestra
	if(img_2_ve){

		img2.classList.add("imagen-animado-adelante");

		//funcion asincrona para que luego de 0.5 segundos se ejecute esto
		setTimeout(function() {
		img1.classList.add("imagen-animado-entraAd")
		img2.style.display = "none";
		img1.style.display = "block";
				img_2_ve = false;
		}, 500);


	}else{
		img1.classList.add("imagen-animado-adelante");

		//funcion asincrona para que luego de 0.5 segundos se ejecute esto
		setTimeout(function() {
		img2.classList.add("imagen-animado-entraAd")
		img1.style.display = "none";
		img2.style.display = "block";
		img_2_ve = true;
		}, 500);
	}
}

function atras() {
	let img1 = document.getElementById("imagen-1")
	let img2 = document.getElementById("imagen-2");
    
	//Quita clases
	img1.classList.remove("imagen-animado-adelante", "imagen-animado-entraAd", "imagen-animado-atras")
	img2.classList.remove("imagen-animado-adelante", "imagen-animado-entraAd", "imagen-animado-atras")

	//verifica cual imagen es la que se muestra
	if(img_2_ve){

		img2.classList.add("imagen-animado-atras");

		//funcion asincrona para que luego de 0.5 segundos se ejecute esto
		setTimeout(function() {
		img1.classList.add("imagen-animado-entraAd")
		img2.style.display = "none";
		img1.style.display = "block";
		img_2_ve = false;
		}, 500);

	}else{
		img1.classList.add("imagen-animado-atras");

		//funcion asincrona para que luego de 0.5 segundos se ejecute esto
		setTimeout(function() {
		img2.classList.add("imagen-animado-entraAd")
		img1.style.display = "none";
		img2.style.display = "block";
		img_2_ve = true;
		}, 500);

	}
}

const type = new Typed('.typed',{
    strings:[
        '<i class"desarr"> Web</i>',
        '<i class"desarr">.NET</i>'
    ],

    typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
	startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
	backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
	smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
	shuffle: false, // Alterar el orden en el que escribe las palabras.
	backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
	loop: true, // Repetir el array de strings
	loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
	showCursor: true, // Mostrar cursor palpitanto
	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
})

//llevan a las secciones
function irASeccion(nombreSeccion) {
	let elementoDestino = document.getElementById(nombreSeccion);
	elementoDestino.scrollIntoView({
	  behavior: "smooth"
	});
}
