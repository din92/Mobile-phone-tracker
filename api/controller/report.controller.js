var mongoose = require("mongoose");


var reportModel = mongoose.model("report");

module.exports.fileReport =function(req,res){
console.log("Filing report here");
reportModel.create(
	{
		username:req.body.username,
		mobileName:req.body.mobileName,
		properties:{
			model:req.body.model,
			color:req.body.color
		},
		description:req.body.description,
		imeino:req.body.imeino,
		lastplace:req.body.lastplace,
		suspectedplace:req.body.suspectedplace	

	},function(err,report){
		if(err){
			console.log("error while filing report "+report);
			res.status(400).json(err);
		}
		else if(!report){
			res.status(404).json({"message":"report could not be logged"});
		}
		else{
			console.log("report entry created");
			//if(bcrypt.compareSync(req.body.password,user.password))
			res.status(201).json(report);
			}
	})
	}
