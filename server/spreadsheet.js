let globalState = {};

module.exports = function (state) {
    globalState = state;
    return {};
};

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('18T5uiUE1cri_ZVuD2fGxJE8gVQs6LKUjcI9q44DuFA0');
var sheet;

// https://docs.google.com/spreadsheets/d//edit?usp=sharing

doc.getInfo(function(err, info) {

    console.log('Err: ' + err);
    console.log('Doc author: ');
    console.log(info.author.email);
    console.log();

    sheet = info.worksheets[0];

    // console.log(sheet);

    // globalState.items = [100];

    sheet.getCells({
        'min-row': 1,
        'max-row': 100,
        'return-empty': true
    }, function(err, cells) {

        let item = {};

        for (let i = 0; i < cells.length; i++) {

            let cell = cells[i];

            if (cell.col > 5) {
                continue;
            }

            if (cell.col === 1) {
                item = {};
                item.name = cell.value;

                if (item.name === "")
                    return;

                globalState.items.push(item)
            }

            if (cell.col === 2) {

                item.description = cell.value;
            }

            if (cell.col === 3) {
                item.images = cell.value;
            }

            if (cell.col === 4) {
                item.price = cell.value;
            }

            if (cell.col === 5) {
                item.count = cell.value;
            }

            console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);
        }
    });
});