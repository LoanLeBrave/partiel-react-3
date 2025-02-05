// src/components/Populaires.jsx
import React, { useEffect, useState } from 'react';
import { getTVCategory } from '../services/api';
import MovieCard from './MovieCard';

const Populaires = () => {
    const [series, setSeries] = useState([]);
    const [category, setCategory] = useState('top_rated'); // Par défaut, "Mieux notées"

    useEffect(() => {
        const fetchSeries = async () => {
            const data = await getTVCategory(category);
            setSeries(data);
        };
        fetchSeries();
    }, [category]);

    return (
        <div className="populaires-container container">
            <div className="title-filter" id="title-category">
                <h2>Séries TV</h2>
                <div>
                    <button
                        className={category === 'top_rated' ? 'active' : ''}
                        id="top_rated"
                        onClick={() => setCategory('top_rated')}
                    >
                        Mieux notées
                    </button>
                    <button
                        className={category === 'popular' ? 'active' : ''}
                        id="popular"
                        onClick={() => setCategory('popular')}
                    >
                        Populaires
                    </button>
                </div>
            </div>
            <div className="grid-tendances">
                {series.map((serie) => (
                    <MovieCard key={serie.id} movie={serie} type="tv" />
                ))}
            </div>
        </div>
    );
};

export default Populaires;
