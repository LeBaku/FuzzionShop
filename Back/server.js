const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.post('/api/users', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    try {
        // Hachez le mot de passe avec bcrypt avant de l'enregistrer dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10); // Utilisez un coût de hachage approprié

        // Enregistrez l'utilisateur avec le mot de passe hashé
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
            }
            res.status(201).json({ message: 'Utilisateur ajouté avec succès ' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
    }
});

app.get('/api/users', (req, res) => {
    db.all('SELECT id, username FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
        res.json(rows);
    });
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Recherchez l'utilisateur dans la base de données par nom d'utilisateur
    db.get('SELECT id, username, password FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Vérifiez le mot de passe avec bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Authentification réussie
        res.status(200).json({ message: 'Authentification réussie' });
    });
});

// app.post('/api/deleteAllUsers', async (req, res) => {
//     // Exécutez une instruction SQL DELETE sans condition pour supprimer toutes les lignes
//     db.run('DELETE FROM users', (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Erreur lors de la suppression des utilisateurs' });
//         }
//         res.status(200).json({ message: 'Toutes les données d\'utilisateur ont été supprimées avec succès' });
//     });
// });

app.post('/api/produits', upload.single('image'), async (req, res) => {
    const { titre, prix, lien, categorie } = req.body;

    if (!titre || !prix || !lien || !categorie) {
        return res.status(400).json({ error: 'Tous les champs sont requis pour ajouter un produit' });
    }

    const image = req.file; // Le fichier image

    try {
        // Insérez le produit dans la table "produits"
        db.run('INSERT INTO produits (titre, prix, lien, categorie, image) VALUES (?, ?, ?, ?, ?)', [titre, prix, lien, categorie, image.path], function (err) {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
            }
            console.log('Produit inséré avec succès');
            res.status(201).json({ message: 'Produit ajouté avec succès' });
        });
    } catch (error) {
        console.error('Erreur lors du traitement de la demande :', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
    }
});


// Endpoint pour récupérer la liste des produits
app.get('/api/produits', (req, res) => {
    db.all('SELECT id, titre, prix, lien, image, categorie FROM produits', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        }
        res.json(rows);
    });
});

app.delete('/api/produits/:id', (req, res) => {
    const productId = req.params.id;

    // Supprimez le produit de la base de données en utilisant l'ID
    db.run('DELETE FROM produits WHERE id = ?', [productId], function (err) {
        if (err) {
            console.error('Erreur lors de la suppression du produit :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
        }
        console.log('Produit supprimé avec succès');
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});