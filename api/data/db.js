var mongoose = require("mongoose");
var dbUrl = "mongodb://localhost:27017/mobileTrackerDb"

 mongoose.connect(dbUrl);
 require("./users.js");
require("./report-model.js");

mongoose.connection.on("connected",function(){
	console.log("connected to Mongo Db");
});

mongoose.connection.on("disconnected",function(){
	console.log("mongo db is disconnected");
});

mongoose.connection.on("error",function(){
	console.log("error in connecting to Mongo Db");
});
process.on("SIGINT",function(){
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});
process.on("SIGTERM",function(){
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});
process.on("SIGUSR2",function(){
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination");
         process.kill(process.id,"SIGUSR2");
    });
});


//require("./Usermodel.js");

