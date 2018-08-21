let GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
let doc = new GoogleSpreadsheet('18T5uiUE1cri_ZVuD2fGxJE8gVQs6LKUjcI9q44DuFA0');
let sheet;

startFill();

function startFill() {

    async.series([
        function setAuth(step) {
            let creds = require('./edtag-7fd180ed1ce6.json');
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
                    'max-row': 100,
                    'return-empty': true
                }, function(err, cells) {

                    console.log(cells.length)

                    let category2 = "";

                    for (let i = 0; i < cells.length; i++) {

                        let cell = cells[i];

                        if (cell.col > 7) {
                            continue;
                        }

                        if (cell.col === 6) {

                            category2 = "";

                            if (cell.value.split('/').length > 1) {
                                category2 = cell.value.split('/')[1].trim();
                                cell.value = cell.value.split('/')[0].trim();
                                cell.save();
                            }

                            console.log(category2)
                        }

                        if (cell.col === 7) {

                            console.log(category2);
                            cell.value = category2;
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