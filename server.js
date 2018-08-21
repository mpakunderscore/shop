//SERVER

let express = require('express');
let path = require('path');

let app = express();

let state = {};
state.items = [];

let spreadsheet = require('./server/spreadsheet.js')(state);

//Static WEB
app.use(express.static(path.join(__dirname, 'web')));

//TODO
// app.use('/shop', express.static(path.join(__dirname, 'web')));
app.use('/shop/:category', express.static(path.join(__dirname, 'web')));
app.use('/contacts', express.static(path.join(__dirname, 'web')));
app.use('/questions', express.static(path.join(__dirname, 'web')));
app.use('/delivery', express.static(path.join(__dirname, 'web')));
// app.use('/texts', express.static(path.join(__dirname, 'web')));
// app.use('/login', express.static(path.join(__dirname, 'web')));
app.use('/search', express.static(path.join(__dirname, 'web')));

app.use('/cart', express.static(path.join(__dirname, 'web')));

// app.use('/stat', express.static(path.join(__dirname, 'web')));
// app.use('/store', express.static(path.join(__dirname, 'web')));
// app.use('/orders', express.static(path.join(__dirname, 'web')));

// app.use('/batteries', express.static(path.join(__dirname, 'web')));
// app.use('/cell', express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);
const port = process.env.PORT || 8080;
server.listen(port);


//Dynamic WEB

spreadsheet.getInfo();

app.get('/items/array', function (request, response) {
    response.json(state.items);
});

app.get('/items/model', function (request, response) {
    response.json(state.itemsModel);
});

app.get('/update', function (request, response) {
    response.json(spreadsheet.getInfo());
});