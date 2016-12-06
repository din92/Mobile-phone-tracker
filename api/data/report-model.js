var mongoose = require("mongoose");


var reportSchema = new mongoose.Schema({
	username:{
		type:String,
		required: true
	},
	mobileName:{
		type:String,
		required: true
	},
	properties:{
		model:{
			type:String,
			required:true
		},
		color:{
			type:String
		}
	},
	description:{
		type:String
	},
	imeino:{
		type:Number,
		required: true
	},
	lastplace:{
		type:String,
		required: true
	},
	suspectedplace:{
		type:String,
		required: true
	}
	
});
mongoose.model("report",reportSchema);