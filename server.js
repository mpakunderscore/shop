//SERVER

let express = require('express');
let path = require('path');

let app = express();

let state = {};
state.items = [];

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

const port = process.env.PORT || 8080;

server.listen(port);

app.get('/items', function (request, response) {
    response.json(state.items);
});

// let database = require('./server/database.js');

let spreadsheet = require('./server/spreadsheet.js')(state);