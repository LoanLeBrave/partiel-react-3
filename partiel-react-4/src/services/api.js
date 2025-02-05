// src/services/api.js
import axios from 'axios';

const API_KEYS = [
    '7c51ce5f51b2a0e2bb3bf45b2afaa9ae',
    '82a4b8a952e82748e2bb3eb4c3c1da59',
    'c8bf288bee8edc7e6ac610fda396d4d4',
    '6e06e059d8a60974c60ae9b252832ea9',
    '853d6c433b59d29ab1768a053e895bee'
];
const API_KEY = API_KEYS[0]; // Vous pouvez alterner entre les clés selon la logique désirée
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getTrendingMovies(type = 'movie', filter = 'day') {
    try {
        const response = await axios.get(`${BASE_URL}/trending/${type}/${filter}?api_key=${API_KEY}`);
        // On prend ici les 4 premiers résultats pour respecter l'exemple
        return response.data.results.slice(0, 4);
    } catch (error) {
        console.error('Erreur lors du chargement des films tendances:', error);
        return [];
    }
}

export async function getTVCategory(category = 'top_rated') {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${category}?api_key=${API_KEY}&language=fr-FR&page=1`);
        return response.data.results.slice(0, 4);
    } catch (error) {
        console.error('Erreur lors du chargement des séries TV:', error);
        return [];
    }
}
