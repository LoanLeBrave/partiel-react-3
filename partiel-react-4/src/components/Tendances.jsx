// src/components/Tendances.jsx
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
        <div className="tendances-container container">
            <div className="title-filter" id="title-tendances">
                <h2>Tendances</h2>
                <div>
                    <button
                        className={filter === 'day' ? 'active' : ''}
                        id="day"
                        onClick={() => setFilter('day')}
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
            <div className="grid-tendances">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} type="movie" />
                ))}
            </div>
        </div>
    );
};

export default Tendances;
