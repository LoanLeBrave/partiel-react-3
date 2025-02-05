import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
    const { id } = useParams();
    return <h1>Détails du film {id}</h1>;
}

export default MovieDetails;
