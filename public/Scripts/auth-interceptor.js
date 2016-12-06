app.factory('authInterceptor',  function(authFactory,$window,$q,$location){
	return {
		request:request,
		response:response,
		errorRejection: errorRejection
	}

	function request(request){
	      request.headers = request.headers||{};
		if($window.sessionStorage.token)
		{
			request.headers.authorization = "Bearer "+$window.sessionStorage.token;
		}
		console.log(request);
		return request;
	}
	function response(response){
	     if(response.status ===200 && !authFactory.isloggedIn && $window.sessionStorage.token)
	     {
	     	authFactory.isloggedIn = true;
	     }
	     if(response.status===401){
	     	authFactory.isloggedIn = false;
	     }
	     	return response || $q.when(response);
	}
	function errorRejection(rejection){
		if(rejection.status===401 || rejection.status ===403){
			delete $window.sessionStorage.token;
			authFactory.isloggedIn = false;
			$location.path("/Home");
		}
		return $q.reject(rejection);
	}
})
