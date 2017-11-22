var mongo = require('./mongo-util');
var express = require('express');
var bodyParser = require('body-parser');
var port = 8080;

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

app.route('/pokemon/remove')
    .delete(bodyParser.json(), function(req, res){
        if(req.body.id === undefined) {
            res.status(406)
                .send('Please provide a valid JSON object with an "id" field.')
                .end();
        }
        else {
            mongo.connect(function(db){
                mongo.removePokemon(db, req.body.id, function(result){
                    if(result.n === 1 && result.ok === 1){
                        res.status(200)
                            .send(req.body.id + ' removed successfully!')
                            .end();
                    }
                    else if(result.n === 0 && result.ok === 1){
                        res.status(500)
                            .send('Could not find Pokemon under id ' + req.body.id)
                            .end();
                    }
                    else {
                        res.status(500)
                            .send('Failed to remove pokemon.')
                            .end();
                    }
                    mongo.close(db);
                });                    
            });
        }
    });

app.listen(port, function(){
    console.log("Listening on port " + port);
});