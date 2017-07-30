var express = require('express');
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({exended: false});
var port = 8080;

var app = express();

app.route('/pokemon/:name')
    .get(function(req, res){

    });

app.listen(port, function(){
    console.log("Listening on port " + port);
})