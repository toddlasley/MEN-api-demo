var mongo = require('./mongo-util');
var express = require('express');
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});
var port = 8080;

var app = express();

app.route('/pokemon')
    .get(function(req, res){        
        var queryObject;
        var filterObject;
        if(Object.keys(req.query).length) {
            queryObject = typeof(req.query.name) == undefined
                ? { "name": req.query.name }
                : { "type": req.query.type };
            filterObject = {};        
        }
        else {
            queryObject = {};
            filterObject = {"name": true};
        }
        
        mongo.connect(function(db){
                mongo.getPokemon(db).find(queryObject, filterObject)
                    .sort({"name": 1 })
                    .toArray(function(err, docs){
                        if(err){
                            res.status(500)
                                .send('Failed to get Pokemon. Try again later')
                                .end();
                        }
                        else {
                            res.status(200)
                                .json(docs)
                                .end();
                        }
                        mongo.close(db);
                    }); 
            });
    });

app.listen(port, function(){
    console.log("Listening on port " + port);
})