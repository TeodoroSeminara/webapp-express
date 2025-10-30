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

    // aggiunta connessione per la richiesta
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" })

        // creazione oggetto movie
        const singleMovie = movieResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: "Database error" });
            singleMovie.reviews = reviewResult;

            // ritorno il risultato 
            res.json(singleMovie);
        })
    })
}


module.exports = { index, show }