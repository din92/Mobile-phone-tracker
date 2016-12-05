var router = require("express").Router();

var ctrlUsers = require("../controller/user.controller.js");
var ctrlReport = require("../controller/report.controller.js");

router
	.route("/users/login")
	.post(ctrlUsers.login);

router
	.route("/users/register")
	.post(ctrlUsers.registerUser);

router
	.route("/users/report")
	.post(ctrlUsers.authenticate,ctrlReport.fileReport);

module.exports = router;
