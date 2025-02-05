import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api'; // On réutilise la fonction en passant type "tv"
import MovieCard from './MovieCard';

const SeriesTV = () => {
    const [series, setSeries] = useState([]);
    const [filter, setFilter] = useState('day'); // Filtre "day" par défaut

    useEffect(() => {
        const fetchTrendingSeries = async () => {
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
                padding: '2rem', // Ajout de padding pour éviter que le contenu colle aux bords
                marginTop: '2rem',
                width: '100%'
            }}
        >
            <div className="title-filter" id="title-series-tv" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ marginLeft: '1rem' }}>Séries TV</h2>
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
            <div
                className="grid-series-tv"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    padding: '0 1rem' // Ajout d'un padding latéral pour éviter que les films touchent les bords
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
