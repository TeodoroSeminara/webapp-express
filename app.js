// Import express
const express = require("express");
// Dichiaro l'istanza di express
const app = express();
// Dichiaro la porta
const port = 3000;
// Importo router e rotte
const movieRouter = require("./routers/movieRouter");

// Aggiunta middleware
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
// Aggiunta path image
const pathImage = require("./middlewares/pathImage");

// Import CORS 
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173/"
}));

// Middleware static per cartella public
app.use(express.static("public"));

// Middleware per path immagini
app.use(pathImage);

// Body-parser
app.use(express.json());

// Rotte per movies
app.use("/api/movies", movieRouter);

// Imposto rotta home
app.get("/api", (req, res) => {
    console.log("Rotta index");
    res.send("<h1>Ecco la home della API</h1>")
})

// Richiamo middleware per errore 404
app.use(notFound);

// Richiamo middleware per errore server
app.use(errorHandler);

// Ascolto server sulla porta
app.listen(port, () => {
    console.log(`Movie app listening port ${port}`);

})