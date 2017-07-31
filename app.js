var mongo = require('./mongo-util');
var express = require('express');
var bodyParser = require('body-parser');
var port = 8080;

var app = express();

app.route('/pokemon')
    .get(function(req, res){        
        mongo.connect(function(db){
            mongo.getPokemon(db, req.query, function(err, docs){
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

app.route('/pokemon/add')
    .put(bodyParser.json(), function(req, res){
        mongo.connect(function(db){
            mongo.addPokemon(db, req.body, function(pokemonAdded){
                if(pokemonAdded){
                    res.status(201)
                        .send(req.body.name + ' added successfully!')
                        .end();
                }
                else {
                    res.status(500)
                        .send('Failed to add pokemon.')
                        .end();
                }
                mongo.close(db);
            });                    
        });
    });

app.listen(port, function(){
    console.log("Listening on port " + port);
})