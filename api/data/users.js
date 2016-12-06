var mongoose = require("mongoose");

/*var user = {
	name:{
		type:String,
		required: true
	},
	username:{
		type:String,
		required: true,
		unique:true
	},
	email:{
		type:String,
		required: true
	},
	password:{
		type:String,
		required: true
	}
}*/
var userSchema = new mongoose.Schema({
	name:{
		type:String,
		required: true
	},
	username:{
		type:String,
		required: true,
		unique:true
	},
	email:{
		type:String,
		required: true
	},
	password:{
		type:String,
		required: true
	}
});
mongoose.model("user",userSchema);