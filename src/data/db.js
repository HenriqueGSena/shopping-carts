const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) throw error;
    console.log(`Banco de Dados: ${process.env.DB_NAME} conectado com sucesso na porta ${process.env.DB_PORT}`)
});

module.exports = connection;