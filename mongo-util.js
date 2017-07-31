var client = require('mongodb').MongoClient;
var url = 'mongodb://user:password@localhost:27017/test';

module.exports = {
    //database connect method
    //callback will be whatever action is to be taken (read/create data)
    connect(callback) {
        client.connect(url, function(err, db){
            if(err) {
                console.log('Error connectiong to database: ' + err);
                process.exit(1);
            }
            else {                
                console.log('Connected to MongoDB instance.');
                callback(db);
            }
        });
    },
    //database closing method
    close(db) {
        db.close();
        console.log('Closed connection to MongoDB instance.');
    },
    getPokemon(db, queryParameters, callback) {
        var queryObject;
        var filterObject;
        if(Object.keys(queryParameters).length) {
            queryObject = queryParameters.name !== undefined
                ? { "name": queryParameters.name }
                : { "type": queryParameters.type };
            filterObject = {};        
        }
        else {
            queryObject = {};
            filterObject = {"name": true};
        }
        db.collection('pokemon').find(queryObject, filterObject)
            .sort({"name": 1 })
            .toArray(function(err, docs){
                callback(err, docs);                
            });
    },
    addPokemon(db, doc, callback) {
        db.collection('pokemon')
            .insertOne(doc, function(err, result){
                callback(result.insertedCount === 1);
            });
    }
}