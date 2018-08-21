let globalState = {};

let async = require('async');

module.exports = function (state) {

    globalState = state;

    let module = {};

    module.getInfo = function () {

        let GoogleSpreadsheet = require('google-spreadsheet');
        // var async = require('async');

        // spreadsheet key is the long id in the sheets URL
        let doc = new GoogleSpreadsheet('18T5uiUE1cri_ZVuD2fGxJE8gVQs6LKUjcI9q44DuFA0');
        let sheet;

        async.series([
            function getSheet(step) {
                doc.getInfo(function(err, info) {
                    sheet = info.worksheets[1];
                    step();
                });
            },
            function getCells(step) {
                sheet.getCells({
                    'min-row': 1,
                    'max-row': 100,
                    'return-empty': true
                }, function(err, cells) {

                    let item = {};

                    globalState.items = [];

                    for (let i = 0; i < cells.length; i++) {

                        let cell = cells[i];

                        if (cell.col > 7) {
                            continue;
                        }
                        if (cell.col === 1) {
                            item = {};
                            item.name = cell.value;

                            if (item.name === "")
                                break;

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
                        if (cell.col === 6) {
                            item.category = cell.value;
                        }
                    }

                    buildItemsModel();
                    console.log('Done');
                    step();
                });
            }

        ], function(err){
            if( err ) {
                console.log('Error: ' + err);
            }
        });

        return true;
    };

    return module;
};

function buildItemsModel() {

    let itemsModel = {};
    for (let i = 0; i < globalState.items.length; i++) {

        let categories = globalState.items[i].category.split('/');

        for (let j in categories) {
            categories[j] = categories[j].trim().replace(/\s\s+/g, ' ');
            categories[j] = categories[j].charAt(0).toUpperCase() + categories[j].slice(1);
        }

        if (itemsModel[categories[0]] === undefined)
            itemsModel[categories[0]] = {};

        if (itemsModel[categories[0]][categories[1]] === undefined)
            itemsModel[categories[0]][categories[1]] = [];

        itemsModel[categories[0]][categories[1]].push(globalState.items[i]);
    }

    globalState.itemsModel = itemsModel;
}



// https://docs.google.com/spreadsheets/d//edit?usp=sharing

