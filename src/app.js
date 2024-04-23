const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const cartsController = require('./routes/cartsRoutes');
app.use('/api/carts', cartsController);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
    console.log(`Exencutando projeto na porta ${PORT}`);
});