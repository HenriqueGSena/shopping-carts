const mysql = require('mysql');


function connection() {
    return mysql.createConnection({

        host: '172.17.0.2',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'shoppingcarts'
    });
}



module.exports = { connection };