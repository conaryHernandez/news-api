const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://conaryh:k9X9MpdWnfHYcqMC@cluster0-shard-00-00-nvbxl.mongodb.net:27017,cluster0-shard-00-01-nvbxl.mongodb.net:27017,cluster0-shard-00-02-nvbxl.mongodb.net:27017/messages?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&w=majority';

const app = express();

const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());

// CORS enabled
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allowing specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // allowing specific origins to use our methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // allowing specific origins to set headers
    next();
});

app.use('/feed', feedRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });