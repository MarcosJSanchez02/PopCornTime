import { API_KEY, BASE_URL } from './config.js';

// Función auxiliar para no repetir la lógica de fetch + manejo de errores
async function pedirALaApi(endpoint, parametrosExtra = {}) {
    const parametros = new URLSearchParams({
        api_key: API_KEY.trim(),
        language: 'es-ES',
        ...parametrosExtra
    });

    const urlFinal = `${BASE_URL}${endpoint}?${parametros.toString()}`;
    console.log("Intentando conectar a:", urlFinal);

    const respuesta = await fetch(urlFinal);

    if (!respuesta.ok) {
        throw new Error(`Error en el servidor. Código de estado: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos.results;
}

// Con el "export" permitimos que app.js pueda usar esta función
export async function pedirPeliculasPopulares() {
    try {
        return await pedirALaApi('/movie/popular', { page: '1' });
    } catch (error) {
        console.error("Hubo un problema pidiendo populares:", error);
        return []; // Si falla, devuelve una lista vacía para que no se rompa la app
    }
}

// Busca películas por texto usando el endpoint de búsqueda de TMDB
export async function buscarPeliculas(texto) {
    try {
        return await pedirALaApi('/search/movie', { query: texto, page: '1' });
    } catch (error) {
        console.error("Hubo un problema buscando películas:", error);
        return [];
    }
}