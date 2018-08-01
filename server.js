//SERVER

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

const port = process.env.PORT || 8080;

server.listen(port);

let database = require('./database.js');