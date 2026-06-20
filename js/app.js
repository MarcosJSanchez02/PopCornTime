import { buscarPeliculas, pedirPeliculasPopulares } from './api.js';
import { IMAGE_URL } from './config.js';

// Capturamos los elementos del HTML
const contenedorPeliculas = document.getElementById('contenedorPeliculas');
const inputBuscador = document.getElementById('inputBuscador');

let temporizadorBusqueda = null;

// Función que crea las tarjetas e inyecta el HTML de forma limpia
function mostrarPeliculas(listaPeliculas) {
    contenedorPeliculas.innerHTML = ''; // Vaciamos el contenedor por seguridad

    const peliculasConPoster = listaPeliculas.filter(p => p.poster_path);

    if (peliculasConPoster.length === 0) {
        mostrarMensaje('No se encontraron películas.');
        return;
    }

    peliculasConPoster.forEach(pelicula => {
        const { title, poster_path, vote_average } = pelicula;

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('pelicula-card');

        tarjeta.innerHTML = `
            <img src="${IMAGE_URL}${poster_path}" alt="${title}" loading="lazy">
            <div class="pelicula-info">
                <h3>${title}</h3>
                <span class="rating">⭐ ${vote_average.toFixed(1)}</span>
            </div>
        `;

        contenedorPeliculas.appendChild(tarjeta);
    });
}

function mostrarMensaje(texto) {
    contenedorPeliculas.innerHTML = `<p class="mensaje-estado">${texto}</p>`;
}

// Carga la cartelera de populares (estado inicial)
async function iniciarApp() {
    console.log("Cargando cartelera de películas...");
    mostrarMensaje('Cargando películas...');
    const peliculas = await pedirPeliculasPopulares();

    if (peliculas.length > 0) {
        mostrarPeliculas(peliculas);
    } else {
        mostrarMensaje('No se pudieron cargar las películas. Revisá la consola.');
    }
}

// Maneja lo que escribe el usuario en el buscador, con debounce
// para no disparar una petición a la API en cada tecla
inputBuscador.addEventListener('input', () => {
    const texto = inputBuscador.value.trim();

    clearTimeout(temporizadorBusqueda);

    temporizadorBusqueda = setTimeout(async () => {
        if (texto.length === 0) {
            iniciarApp(); // Si borró todo, volvemos a mostrar populares
            return;
        }

        if (texto.length < 2) return; // Esperamos al menos 2 caracteres

        mostrarMensaje('Buscando...');
        const resultados = await buscarPeliculas(texto);

        if (resultados.length > 0) {
            mostrarPeliculas(resultados);
        } else {
            mostrarMensaje(`No se encontraron resultados para "${texto}".`);
        }
    }, 400); // Espera 400ms después de la última tecla antes de buscar
});

// Ejecutamos la aplicación
iniciarApp();