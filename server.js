const express = require('express');
const path = require('path');
const nomeApp = 'sans-burger-front-end';
const app = express();

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/${nomeApp}/index.html`);
});

app.listen(process.env.PORT || 8080);