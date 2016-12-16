app.factory('dataFactory', function($http){
	return{
	login:login,
	registerUser:registerUser,
	fileReport:fileReport,
	findUser:findUser,
	updateUser:updateUser
	}
	function login(user){
		return $http.post("/api/users/login/", user).then(complete).catch(error);
	}

	function registerUser(user){
		return $http.post("/api/users/register/", user).then(complete).catch(error);
	}
	function updateUser(username,details){
		return $http.put("/api/users/"+username, details).then(complete).catch(error);
	}
	function findUser(username){
		return $http.post("/api/users/"+ username).then(complete).catch(error);
	}
	function fileReport(report){
		return $http.post("/api/users/report/", report).then(complete).catch(error);
	}
	function complete(response){
		return response;
	}
	function error(error){
		return error;
	}
});