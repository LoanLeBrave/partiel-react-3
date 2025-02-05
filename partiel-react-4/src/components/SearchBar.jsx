// src/components/SearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const API_KEY = '7c51ce5f51b2a0e2bb3bf45b2afaa9ae'; // Vous pouvez adapter la clé ici ou gérer une rotation
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

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
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Rechercher un film"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>

            <div className="search-results">
                {error && <p>{error}</p>}
                {results.length > 0 ? (
                    <div className="grid-search-results">
                        {results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} type="movie" />
                        ))}
                    </div>
                ) : (
                    query && <p>Aucun résultat trouvé pour "{query}".</p>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
