// Clave de la API de TMDB (v3 auth)
// ⚠️ Al ser un sitio estático, esta clave queda visible en el navegador.
// Para TMDB esto es aceptable (servicio gratuito pensado para uso client-side),
// pero si en algún momento querés ocultarla del todo, hay que pasar las
// peticiones por una función serverless (ej: Netlify Functions).
export const API_KEY = '0a52460e04ee1472172a6bf77a9480fd';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';