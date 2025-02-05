import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { getTrendingMovies } from '../services/api';

const API_KEY = '7c51ce5f51b2a0e2bb3bf45b2afaa9ae';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchBar = () => {
    // États pour la recherche
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    // État pour la bannière de fond (film tendance)
    const [backgroundMovie, setBackgroundMovie] = useState(null);

    // Récupérer le film tendance pour définir le fond
    useEffect(() => {
        const fetchBackgroundMovie = async () => {
            const trendingMovies = await getTrendingMovies('movie', 'day');
            if (trendingMovies && trendingMovies.length > 0) {
                setBackgroundMovie(trendingMovies[0]);
            }
        };
        fetchBackgroundMovie();
    }, []);

    // Calcul de l'image de fond
    const backgroundImage = backgroundMovie && backgroundMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backgroundMovie.backdrop_path}`
        : 'chemin/vers/image-de-remplacement.jpg';

    // Fonction de recherche
    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === '') return;
        try {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: query,
                    language: 'fr-FR',
                    page: 1
                }
            });
            setResults(response.data.results);
            setError(null);
        } catch (err) {
            console.error('Erreur lors de la recherche:', err);
            setError("Erreur lors de la recherche, veuillez réessayer.");
            setResults([]);
        }
    };

    return (
        <div
            className="search-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '2rem',
                position: 'relative',
                color: '#fff'
            }}
        >
            {/* Overlay pour améliorer la lisibilité */}
            <div
                className="overlay"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}
            />

            {/* Contenu de la recherche (au-dessus de l'overlay) */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <input
                        type="text"
                        placeholder="Rechercher un film"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            width: '300px',
                            border: 'none',
                            borderRadius: '4px 0 0 4px'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0 4px 4px 0',
                            backgroundColor: '#e50914',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </form>

                <div className="search-results">
                    {error && <p>{error}</p>}
                    {results.length > 0 ? (
                        <div
                            className="grid-search-results"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Ajuste des colonnes
                                gap: '1.5rem',
                                padding: '1rem'
                            }}
                        >
                            {results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} type="movie" />
                            ))}
                        </div>
                    ) : (
                        query && <p>Aucun résultat trouvé pour "{query}".</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
