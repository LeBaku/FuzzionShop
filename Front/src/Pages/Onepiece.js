import React, { useState, useEffect } from 'react';
import logo from './../Assets/Onepiece.png';
import axios from 'axios';
import '../css/Product.css';

const Onepiece = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/produits')
            .then(response => {
                const onepieceProducts = response.data.filter(product => product.categorie === "Onepiece");
                setProducts(onepieceProducts);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="centered-container">
            <div className="title">
                <img src={logo} alt="Onepiece" className="logo-onepiece" />
            </div>
            <div className="product-container">
            {products.map(product => (
                    <div key={product.id} className="card">
                        <div className="card-content">
                            {product.image && (
                                <img src={`http://localhost:3001/${product.image}`} alt={product.titre} />
                            )}
                            <p>{truncateText(product.titre, 15)}</p>
                            <h3>{product.prix}€</h3>
                        </div>
                        <a href={product.lien} className="card-button" target="_blank" without rel="noreferrer">J'achète</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Onepiece;
