const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('fuzzion.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS produits (id INTEGER PRIMARY KEY, titre TEXT, prix REAL, lien TEXT, image BLOB, categorie TEXT)');
});

module.exports = db;