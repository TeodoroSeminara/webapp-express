// Importo framework express
const express = require("express");
// Importiamo il controller
const movieController = require("../controllers/movieController")
// Setting router
const router = express.Router();

// Index
router.get("/", movieController.index)
// Show
router.get(":id", movieController.show)

module.exports = router;