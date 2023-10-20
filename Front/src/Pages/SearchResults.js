import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import '../css/Product.css'

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/produits')
          .then(response => {
            const allProducts = response.data;
            const lowercaseQuery = query.toLowerCase();

            const filteredProducts = allProducts.filter(product => product.titre.toLowerCase().includes(lowercaseQuery));
      
            setProducts(filteredProducts);
          })
          .catch(error => {
            console.error(error);
          });
      }, [query]);

      const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

  return (
    <div className="centered-container">
      <h2>Résultats de la recherche pour "{query}" :</h2>
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

export default SearchResults;