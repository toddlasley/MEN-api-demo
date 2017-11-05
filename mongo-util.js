var mongodb = require('mongodb');
var client = mongodb.MongoClient;
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
    //method for getting pokemon
    getPokemon(db, queryParameters, callback) {
        var queryObject;

        if(Object.keys(queryParameters).length) {
            queryObject = queryParameters.name !== undefined
                ? { "name": queryParameters.name }
                : { "type": queryParameters.type };
        }
        else {
            queryObject = {};
        }
        db.collection('pokemon').find(queryObject, {})
            .sort({"name": 1 })
            .toArray(function(err, docs){
                callback(err, docs);                
            });
    },
    //method for getting pokemon
    addPokemon(db, doc, callback) {
        db.collection('pokemon')
            .insertOne(doc, function(err, result){
                callback(result.insertedCount === 1);
            });
    },
    //method for removing pokemon
    removePokemon(db, id, callback) {
        var filterObject = {_id: new mongodb.ObjectID(id)};
        db.collection('pokemon')
            .deleteOne(filterObject, function(err, result){
                callback(result.result);
            });
    }
}