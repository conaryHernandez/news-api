const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());

// enabled CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allowing specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // allowing specific origins to use our methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // allowing specific origins to set headers
});

app.use('/feed', feedRoutes);

app.listen(8080);