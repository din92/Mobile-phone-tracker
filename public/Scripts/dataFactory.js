app.factory('dataFactory', function($http){
	return{
	login:login,
	registerUser:registerUser,
	fileReport:fileReport
	}
	function login(user){
		return $http.post("/api/users/login/", user).then(complete).catch(error);
	}

	function registerUser(user){
		return $http.post("/api/users/register/", user).then(complete).catch(error);
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