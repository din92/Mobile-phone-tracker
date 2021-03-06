var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var routes = require("./api/route/index");

//Defining the port for the application to run
app.set("port",5000);

//logging each request along with the method
app.use(function(req,res,next){
	console.log(req.method+" "+req.url);
	next();
})
//Defining static folders for the site
app.use(express.static(path.join(__dirname,"public")));

//Declaring body-parser for the posted forms
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//Defining routes for the api
app.use("/api",routes);



var server=app.listen(app.get("port"),function(){
	var port = server.address().port;
	console.log("Application is listening on port: "+ port);
})