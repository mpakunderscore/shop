//SERVER

let express = require('express');
let path = require('path');

let app = express();

let state = {};
state.items = [];

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

// app.use('/shop', express.static(path.join(__dirname, 'web/index.html')));
app.use('/contacts', express.static(path.join(__dirname, 'web')));
app.use('/questions', express.static(path.join(__dirname, 'web')));
app.use('/delivery', express.static(path.join(__dirname, 'web')));
app.use('/stat', express.static(path.join(__dirname, 'web')));
app.use('/store', express.static(path.join(__dirname, 'web')));
app.use('/orders', express.static(path.join(__dirname, 'web')));

app.use('/cart', express.static(path.join(__dirname, 'web')));



let server = require('http').Server(app);

const port = process.env.PORT || 8080;

server.listen(port);

app.get('/items', function (request, response) {

    let itemsModel = {};
    for (let i = 0; i < state.items.length; i++) {

        let categories = state.items[i].category.split('/');

        for (let j in categories) {
            categories[j] = categories[j].trim();
        }

        if (itemsModel[categories[0]] === undefined)
            itemsModel[categories[0]] = {};

        if (itemsModel[categories[0]][categories[1]] === undefined)
            itemsModel[categories[0]][categories[1]] = [];

        itemsModel[categories[0]][categories[1]].push(state.items[i]);
    }

    response.json(itemsModel);
});

// let database = require('./server/database.js');

let spreadsheet = require('./server/spreadsheet.js')(state);
spreadsheet.getInfo();

app.get('/update', function (request, response) {
    spreadsheet.getInfo();
    response.json('ok')
});