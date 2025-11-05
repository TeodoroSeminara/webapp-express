// Import file connessione al database
const connection = require("../data/db");

// Index
function index(req, res) {
    // Preparazione query
    const sql = `SELECT * FROM movies`;

    // Esecuzione query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        // lista movie con image
        const movie = results.map(movieImg => {
            return {
                ...movieImg,
                image: req.pathImage + movieImg.image
            }
        })
        res.json(movie);
    })
};

// Show
function show(req, res) {
    // ID da url
    const { id } = req.params

    // Prima query 
    // const movieSql = `SELECT * FROM movies WHERE id =?`;
    // Query con richiesta di recensioni 
    const movieSql = `SELECT M.*, ROUND(AVG(R.vote)) AS average_vote
    FROM movies AS M
    LEFT JOIN reviews AS R ON movie_id = M.id
    WHERE M.id = ?`

    // Seconda query 
    const reviewSql = `SELECT R.* FROM reviews AS R WHERE movie_id = ? `

    // aggiunta connessione per la richiesta
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" })

        // creazione oggetto movie
        const singleMovie = movieResult[0];
        singleMovie.image = req.pathImage + singleMovie.image;

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: "Database error" });
            singleMovie.reviews = reviewResult;

            // trasforno la stringa del db in numero
            singleMovie.average_vote = parseInt(singleMovie.average_vote);

            // ritorno il risultato 
            res.json(singleMovie);
        })
    });
}

// Store review

function postReview(req, res) {

    // id da params
    const id = req.params.id;

    // dati da prendere dal body
    const { name, vote, text } = req.body;

    const addReview = ` INSERT INTO reviews ("name", "vote", "text", movie_id) VALUES (?,?,?,?) `;

    // query con check dati
    connection.query(sql, [name, text, vote, id], (err, result) => {
        // check error
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ id: result.insertId, message: "Reviews added" });
    })
}


module.exports = { index, show, postReview }