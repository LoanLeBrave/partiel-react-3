// src/components/MovieCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type }) => {
    const imgURL = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'chemin/vers/image-de-remplacement.jpg';

    const vote = movie.vote_count === 0
        ? 'N/A'
        : `${parseInt(movie.vote_average * 10)}%`;

    return (
        <div className="movie">
            <Link to={`/movie/${movie.id}?type=${type}`}>
                <img src={imgURL} alt={movie.original_title || movie.name} />
                <div className="score">
                    <p>{vote}</p>
                </div>
                <h5>{movie.original_title || movie.name}</h5>
                <p>{new Date(movie.release_date || movie.first_air_date).toLocaleDateString('fr')}</p>
            </Link>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieCard;
