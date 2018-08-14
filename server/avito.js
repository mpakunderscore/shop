let GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
let doc = new GoogleSpreadsheet('18T5uiUE1cri_ZVuD2fGxJE8gVQs6LKUjcI9q44DuFA0');
let sheet;


var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('text')
});

let items = [];
lineReader.on('line', function (line) {

    // console.log(line)

    try {
        let item = {};
        item.title = line.split('/(1)/')[1].split('/(2)/')[0];
        item.image = line.split('/(2)/')[1].split('/(3)/')[0];
        item.price = line.split('/(3)/')[1].trim();
        items.push(item);
    } catch (e) {

    }

});

lineReader.on('close', function () {
    console.log(items.length);
    startFill()
});



// startFill()

function startFill() {

    async.series([
        function setAuth(step) {
            var creds = require('./edtag-7fd180ed1ce6.json');
            doc.useServiceAccountAuth(creds, step);

        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {

                console.log('Err: ' + err);
                // console.log('Author: ');
                // console.log(info.author.email);
                // console.log();

                sheet = info.worksheets[0];

                // console.log(sheet);

                // globalState.items = [100];

                sheet.getCells({
                    'min-row': 1,
                    'max-row': items.length,
                    'return-empty': true
                }, function(err, cells) {

                    for (let i = 0; i < cells.length; i++) {

                        let cell = cells[i];

                        if (cell.col > 7) {
                            continue;
                        }

                        if (cell.col === 1) {

                            let title = items[cell.row - 1].title;

                            try {
                                if (title !== undefined)
                                    cell.value = title;
                            } catch (e) {

                            }

                            cell.save();
                        }

                        if (cell.col === 3) {

                            let image = items[cell.row - 1].image;

                            try {
                                if (image !== undefined)
                                    cell.value = image;
                            } catch (e) {

                            }

                            cell.save();
                        }

                        if (cell.col === 4) {

                            let price = items[cell.row - 1].price.replace('₽', '').trim().replace(' ', '');

                            try {
                                if (price !== undefined)
                                    cell.value = price;
                            } catch (e) {

                            }

                            cell.save();
                        }
                    }

                    sheet.bulkUpdateCells(cells);
                });
            });
        }

    ], function(err){
        if( err ) {
            console.log('Error: '+err);
        }
    });
}