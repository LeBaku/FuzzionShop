import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, Snackbar } from '@mui/material';
import axios from 'axios';
import '../css/Admin.css'
import DeleteIcon from '@mui/icons-material/Delete';

const Admin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [productData, setProductData] = useState({
        titre: '',
        prix: '',
        lien: '',
        image: null,
        categorie: '',
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [addedProductTitle, setAddedProductTitle] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProductChange = (event) => {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleProductImageChange = (event) => {
        const imageFile = event.target.files[0];
        setProductData({
            ...productData,
            image: imageFile,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);
            console.log(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
        }
    };

    const handleSubmitProduct = async (event) => {
        event.preventDefault();

        const productFormData = new FormData();
        productFormData.append('titre', productData.titre);
        productFormData.append('prix', productData.prix);
        productFormData.append('lien', productData.lien);
        productFormData.append('image', productData.image);
        productFormData.append('categorie', productData.categorie);

        try {
            await axios.post('http://localhost:3001/api/produits', productFormData);
            setProductData({
                titre: '',
                prix: '',
                lien: '',
                image: null,
                categorie: '',
            });
            setAddedProductTitle(productData.titre);
            setIsSnackbarOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const [existingProducts, setExistingProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/produits')
            .then(response => {
                setExistingProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/api/produits/${productId}`);
            // Mettez à jour la liste des produits existants après la suppression.
            const updatedProducts = existingProducts.filter(product => product.id !== productId);
            setExistingProducts(updatedProducts);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {!isAuthenticated && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nom d'utilisateur"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Se connecter
                    </Button>
                </form>
            )}

            {isAuthenticated && (
                <div>
                    <form onSubmit={handleSubmitProduct}>
                        <TextField
                            label="Titre du produit"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="titre"
                            value={productData.titre}
                            onChange={handleProductChange}
                        />
                        <TextField
                            label="Prix du produit"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="prix"
                            value={productData.prix}
                            onChange={handleProductChange}
                        />
                        <TextField
                            label="Lien du produit"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="lien"
                            value={productData.lien}
                            onChange={handleProductChange}
                        />
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel id="categorie-label">Catégorie du produit</InputLabel>
                            <Select
                                labelId="categorie-label"
                                name="categorie"
                                value={productData.categorie}
                                onChange={handleProductChange}
                                label="Catégorie du produit"
                            >
                                <MenuItem value={"Pokemon"}>Pokemon</MenuItem>
                                <MenuItem value={"Yugioh"}>Yugioh</MenuItem>
                                <MenuItem value={"Magic"}>Magic</MenuItem>
                                <MenuItem value={"Onepiece"}>Onepiece</MenuItem>
                            </Select>
                        </FormControl>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProductImageChange}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Ajouter un produit
                        </Button>
                    </form>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isSnackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setIsSnackbarOpen(false)}
                        message={`"${addedProductTitle}" ajouté avec succès!`}
                    />
                    <Typography variant="h5" color="success">
                        Produits Existants :
                    </Typography>
                    <ul className="product-list">
                        {existingProducts.map(product => (
                            <li key={product.id}>
                                <p>{product.titre}</p>
                                <p>Prix: {product.prix} €</p>
                                <p>Catégorie: {product.categorie}</p>
                                <p>Lien: {product.lien}</p>
                                {product.image && (
                                    <img src={`http://localhost:3001/${product.image}`} alt={product.titre} style={{ maxWidth: '100px' }} />
                                )}
                                <IconButton sx={{ color: 'red' }} onClick={() => handleDeleteProduct(product.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Admin;
