import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api';
import MovieCard from './MovieCard'; // Ce composant doit afficher la carte d'un film

const Tendances = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState('day'); // Par défaut, on affiche "Aujourd'hui"

    useEffect(() => {
        const fetchTrending = async () => {
            const data = await getTrendingMovies('movie', filter);
            setMovies(data);
        };
        fetchTrending();
    }, [filter]);

    return (
        <div className="tendances-container container" style={{ padding: '0 2rem' }}>
            <div className="title-filter" id="title-tendances" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ marginLeft: '1rem' }}>Tendances</h2>
                <div style={{ marginLeft: '1rem' }}>
                    <button
                        className={filter === 'day' ? 'active' : ''}
                        id="day"
                        onClick={() => setFilter('day')}
                        style={{ marginRight: '0.5rem' }}
                    >
                        Aujourd'hui
                    </button>
                    <button
                        className={filter === 'week' ? 'active' : ''}
                        id="week"
                        onClick={() => setFilter('week')}
                    >
                        Cette semaine
                    </button>
                </div>
            </div>
            <div className="grid-tendances" style={{ padding: '0 1rem' }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} type="movie" />
                ))}
            </div>
        </div>
    );
};

export default Tendances;
