let MongoClient = require('mongodb').MongoClient;

let url = "mongodb://heroku_1thzjmx0:8nat5tgl7m1v6edsos240nu88o@ds263791.mlab.com:63791/heroku_1thzjmx0";
url = process.env.MONGODB_URI || url;

MongoClient.connect(url, function(err, db) {

    if (err)
        throw err;

    // var dbo = db.db("mydb");
    // var query = { address: "Park Lane 38" };

    // dbo.collection("customers").find(query).toArray(function(err, result) {
    //
    //     if (err)
    //         throw err;
    //
    //     console.log(result);
    //
    //     db.close();
    // });
});
