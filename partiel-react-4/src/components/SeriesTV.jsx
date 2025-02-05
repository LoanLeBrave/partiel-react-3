import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api'; // On réutilise la fonction en passant type "tv"
import MovieCard from './MovieCard';

const SeriesTV = () => {
    const [series, setSeries] = useState([]);
    const [filter, setFilter] = useState('day'); // Filtre "day" par défaut

    useEffect(() => {
        const fetchTrendingSeries = async () => {
            // On utilise la même fonction que pour les films tendances, mais on demande le type "tv"
            const data = await getTrendingMovies('tv', filter);
            setSeries(data);
        };

        fetchTrendingSeries();
    }, [filter]);

    return (
        <div
            className="series-tv-container"
            style={{
                backgroundColor: '#f0f0f0', // Fond grisé
                padding: '1rem',
                marginTop: '2rem',
                width: '100%' // S'assure que le fond va jusqu'au bout
            }}
        >
            <div className="title-filter" id="title-series-tv">
                <h2>Séries TV</h2>
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
            <div
                className="grid-series-tv"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem'
                }}
            >
                {series.map((serie) => (
                    <MovieCard key={serie.id} movie={serie} type="tv" />
                ))}
            </div>
        </div>
    );
};

export default SeriesTV;
