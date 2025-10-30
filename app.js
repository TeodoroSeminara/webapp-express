// Import express
const express = require("express");
// Dichiaro l'istanza di express
const app = express();
// Dichiaro la porta
const port = 3000;
// Importo router e rotte
const movieRouter = require("./routers/movieRouter");

// Aggiunta middleware

// Aggiunta path image

// Middleware static per cartella public
app.use(express.static("public"));

// Body-parser
app.use(express.json());

// Rotte per movies
app.use("/api/movies", movieRouter);

// Imposto rotta home
app.get("/api", (req, res) => {
    console.log("Rotta index");
    res.send("<h1>Ecco la home della API</h1>")
})


// Richiamo middleware per errore server

// Richiamo middleware per errore 404


// Ascolto server sulla porta
app.listen(port, () => {
    console.log(`Movie app listening port ${port}`);

})