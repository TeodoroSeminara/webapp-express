// Import pacchetto mysql2
const mysql = require("mysql2")

// Colleghiamo il db
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// log per verifica connessione db
connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL!");
    
});

module.exports = connection;