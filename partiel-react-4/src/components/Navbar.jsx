import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/search">Recherche</Link>
        </nav>
    );
}

export default Navbar;
