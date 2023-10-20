import React from 'react';
import '../css/Home.css';
import logo from './../Assets/Logo.png';
import photo from './../Assets/photo-shop.jpg';
import pokemon from './../Assets/Pokemon.png';
import yugioh from './../Assets/Yugioh.png';
import Magic from './../Assets/Magic.png';
import onepiece from './../Assets/Onepiece.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="top-section">
        <div className="left-column">
          <div className="left-content">
            <img src={logo} alt="Logo" className="home-logo" />
            <p className="montserrat-text">
              Fuzzion est une boutique qui fait partie du magasin “La Galerie sur son 31”.<br /><br />
              Nous sommes spécialisés dans la vente d'occasion ou neuf de jeux vidéos, de cartes à jouer et à collectionner
              et de mangas.
            </p>
          </div>
        </div>
        <div className="right-column">
          <img src={photo} alt="Photo" />
        </div>
      </div>
      <div className="bottom-section">
        <div className="logo-grid">
          <img src={pokemon} alt="Pokemon" />
          <img src={yugioh} alt="Yugioh" />
          <img src={Magic} alt="Magic" />
          <img src={onepiece} alt="Onepiece" />
        </div>
      </div>

    </div>
  );
};

export default Home;
