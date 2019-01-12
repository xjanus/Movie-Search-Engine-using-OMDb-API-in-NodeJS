var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

//======= S E A R C H  R O U T E ========= //

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    
    //access data from the query string
    var searchedMovie = req.query.searchValue;
    
    //create a variable for the query string
    var queryString = "http://omdbapi.com/?s=" + searchedMovie + "&apikey=INSERT_YOUR_API_KEY_HERE";
    
    
    request(queryString, function(error, response, body){
    if(!error && response.statusCode == 200){
        var parseData = JSON.parse(body);
        //console.log(parseData["Search"][0]["Title"]);
        res.render("results", {data: parseData});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("MOVIE APP SERVER HAS STARTED!!");
});
