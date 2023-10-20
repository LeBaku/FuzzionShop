const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('fuzzion.db');

// Supprimez la table "produits"
db.run('DROP TABLE IF EXISTS produits', (err) => {
    if (err) {
        console.error('Erreur lors de la suppression de la table produits :', err);
    } else {
        console.log('Table produits supprimée avec succès');
    }
});

db.close();