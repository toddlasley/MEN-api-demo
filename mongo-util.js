var client = require('mongodb').MongoClient;
var url = 'mongodb://user:password@localhost:27017/test';

module.exports = {
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
    close(db) {
        db.close();
        console.log('Closed connection to MongoDB instance.');
    },
    getPokemon(db) {
        return db.collection('pokemon');
    }
}