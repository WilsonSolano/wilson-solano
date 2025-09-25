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

//  para cargar los proyectos desde JSON
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosDesdeArchivo();
    setupFiltros();
});

//  para cargar proyectos en el contenedor
function cargarProyectos(proyectos) {
    const contenedor = document.getElementById('proyectos-container');
    contenedor.innerHTML = '';
    
    proyectos.forEach((proyecto, index) => {
        const card = crearProyectoCard(proyecto, index);
        contenedor.appendChild(card);
    });
}

// para crear una tarjeta de proyecto
function crearProyectoCard(proyecto, index) {
    const card = document.createElement('div');
    card.className = 'proyecto-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.tecnologias = JSON.stringify(proyecto.tecnologias);
    
    // Formatear fecha
    const fecha = new Date(proyecto.fechaFinalizacion);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long' 
    });
    
    card.innerHTML = `
        <div class="proyecto-img-container">
            <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="proyecto-img">
            ${proyecto.destacado ? '<span class="proyecto-destacado">Destacado</span>' : ''}
        </div>
        <div class="proyecto-info">
            <h3 class="proyecto-titulo">${proyecto.nombre}</h3>
            <div class="proyecto-fecha">${fechaFormateada}</div>
            <p class="proyecto-descripcion">${proyecto.descripcion}</p>
            <div class="proyecto-tech">
                ${proyecto.tecnologias.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="proyecto-links">
                ${proyecto.enlace ? `
                    <a href="${proyecto.enlace}" target="_blank" class="proyecto-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        Ver Repositorio
                    </a>` : ''}
                <a href="#" class="proyecto-link ver-detalles" data-id="${proyecto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    Ver Detalles
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// filtros
function setupFiltros() {
    const radioButtons = document.querySelectorAll('input[name="filtro"]');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const filtroSeleccionado = this.value;
            filtrarProyectos(filtroSeleccionado);
        });
    });
}

// proyectos por tecnología
function filtrarProyectos(filtro) {
    const contenedor = document.getElementById('proyectos-container');
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    const animationDuration = 700; // 0.7s para la animación de giro

    // 1. Aplicar animación de salida al contenedor completo
    contenedor.classList.add('filtering-out');
    
    // 2. Después de la animación, procesar el filtrado
    setTimeout(() => {
        // Remover animación de salida
        contenedor.classList.remove('filtering-out');
        
        // Ocultar todas las cards primero
        proyectoCards.forEach(card => {
            card.style.display = 'none';
        });

        // Mostrar solo las que coinciden con el filtro
        proyectoCards.forEach(card => {
            const tecnologias = JSON.parse(card.dataset.tecnologias);
            if (filtro === 'todos' || tecnologias.includes(filtro)) {
                card.style.display = '';
                card.style.opacity = '0'; // Preparar para animación de entrada
                void card.offsetWidth; // Forzar reflow
                card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            }
        });
    }, animationDuration);
}

// para cargar datos desde un archivo JSON externo (opcional)
function cargarDatosDesdeArchivo() {
    fetch('proyectos.json')
        .then(response => response.json())
        .then(data => {
            cargarProyectos(data.proyectos);
        })
        .catch(error => {
            console.error('Error cargando proyectos:', error);
            // cargar datos de ejemplo si hay error
            cargarProyectos(proyectosData.proyectos);
        });
}

// para implementar la visualización de detalles (se puede expandir)
document.addEventListener('click', function(e) {
    if (e.target.closest('.ver-detalles')) {
        e.preventDefault();
        const proyectoId = e.target.closest('.ver-detalles').dataset.id;
        console.log('Ver detalles del proyecto ID:', proyectoId);
        // Aquí puedes implementar un modal o navegación a página detalle
    }
});

function cargarDatosDesdeArchivo() {
    fetch('proyectos.json')
        .then(response => response.json())
        .then(data => {
            cargarProyectos(data.proyectos);
        })
        .catch(error => {
            console.error('Error cargando proyectos:', error);
            // Si hay un error cargando el JSON, mostrar mensaje de error en el contenedor
            const contenedor = document.getElementById('proyectos-container');
            contenedor.innerHTML = `
                <div class="error-mensaje">
                    <p>No se pudieron cargar los proyectos. Por favor, verifica que el archivo proyectos.json existe y es válido.</p>
                </div>
            `;
        });
}

function descargarCV() {
    const link = document.createElement('a');
    link.href = 'docs/CV-Josue.pdf';
    link.download = 'CV-Josue-Desarrollador.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}