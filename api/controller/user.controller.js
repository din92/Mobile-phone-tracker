var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

var user = mongoose.model("user");
module.exports.login =function(req,res){
console.log(req.body.username +" "+ req.body.password);
user
	.findOne({username:req.body.username})
	.exec(function(err,userFound){
		if(err){
			res.status(403).json(err);
		}
		else if(!userFound){
			res.status(404).json({"message":"user not found"});
		}
		else{
			console.log("user found");
			//if(req.body.password===userFound.password)
			if(bcrypt.compareSync(req.body.password,userFound.password))
			{
				var token = jwt.sign({username:userFound.username},"dasf",{expiresIn:3600});
				res.status(200).json(token);
			}
			else{
				console.log("Unauthorized");
			res.status(401).json({"message":"Unauthorized log in"});
			}
			

		}
	})

}

module.exports.findUser =function(req,res){
user
	.findOne({username:req.params.username})
	.exec(function(err,userFound){
		if(err){
			res.status(403).json(err);
		}
		else if(!userFound){
			res.status(404).json({"message":"user not found"});
		}
		else{
			console.log("user found");
			res.status(200).json(userFound);
			

		}
	})

}
module.exports.updateUser =function(req,res){
user
	.findOne({username:req.params.username})
	.exec(function(err,userFound){
		if(err){
			res.status(403).json(err);
		}
		else{
			userFound.name=req.body.name;
			userFound.email=req.body.email;
			userFound.save(function(err,updatedUser){
				if(err){
					console.log("Error occured in updating user");
					res.status(400).json(err);
				}
				else{
					console.log("User Data updated");
					res.status(204).json(updatedUser);
				}
			})
			

		}
	})

}

module.exports.registerUser =function(req,res)
{
console.log("Registering the user"+" "+req.body.username +" "+ req.body.password);
user.create({
		username:req.body.username,
		name : req.body.name,
		email:req.body.email,
		password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
	},function(err,userFound){
		if(err){
			console.log("error while registering user "+userFound);
			res.status(400).json(err);
		}
		else if(!userFound){
			res.status(404).json({"message":"error in registering user to the database"});
		}
		else{
			console.log("user entry created");
			//if(bcrypt.compareSync(req.body.password,user.password))
			res.status(201).json(userFound);
			}
		});

}

module.exports.authenticate =function(req,res,next){
console.log(req.headers.authoriztion);
if(req.headers.authorization)
{
	var token = req.headers.authorization.split(" ")[1];
	jwt.verify(token,"dasf",function(err,decoded){
		if(err){
				console.log(err+" Unauthorized user "+"Token: "+token);
			res.status(401).json({"message":"Unauthorized log in"});
			}
			else{
				req.user = decoded.username;
				next();
			}
	});
}
else{
	console.log("No token provided");
	res.status(403).json({"message":"No token provided "});
}
}