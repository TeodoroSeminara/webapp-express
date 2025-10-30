// Import file connessione al database
const connection = require("../data/db");

// Index
function index(req, res) {
    // Preparazione query
    const sql = `SELECT * FROM movies`;

    // Esecuzione query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    })
};

// Show
function show(req, res) {
    // ID da url
    const { id } = req.params

    // Prima query 
    const movieSql = `SELECT * FROM movies WHERE id =?`;

    // Seconda query 
    const reviewSql = `SELECT R.* FROM reviews AS R WHERE movie_id = ? `
}


module exports = { index, show }