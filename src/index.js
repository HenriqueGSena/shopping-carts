const express = require("express");
const app = express();
const PORT = 8080;


app.use(express.json());


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(PORT, () => {
    console.log(`Exencutando projeto na porta ${PORT}`);
});