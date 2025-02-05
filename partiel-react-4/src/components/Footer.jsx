// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css'; // Assurez-vous d'avoir ce fichier CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-categories">
                    <button>Films</button>
                    <button>Séries</button>
                    <button>Populaires</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
