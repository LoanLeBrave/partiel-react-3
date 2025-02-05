// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css'; // Assurez-vous d'avoir ce fichier CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-categories">
                    <span>Films</span>
                    <span>Séries</span>
                    <span>Populaires</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
