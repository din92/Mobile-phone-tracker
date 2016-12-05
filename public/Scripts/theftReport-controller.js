app.controller('theftreportController', function(dataFactory,$window,jwtHelper,authFactory){
	var vm =this;
	vm.addReport = function(){
		if(!$window.sessionStorage.token)
		{
			vm.valid = false;
			vm.isSubmitted = true;
			vm.errored =true;
			vm.message = "Oops!! It seems you are not logged in. Please Sign Up with us or login to file report";
		}
		else{
			vm.user ={
			 	username:($window.sessionStorage.token)? jwtHelper.decodeToken($window.sessionStorage.token).username:"",
				mobileName : vm.name,
				model: vm.model.split("/")[0],
				color: vm.model.split("/")[1],
				description :vm.description,
				imeino: vm.imei,
				lastplace:vm.lastPlace,
				suspectedplace:vm.suspectedPlace
			}
			dataFactory.fileReport(vm.user).then(function(response){
							console.log(response.data);
							if(response.status===201){
							vm.isSubmitted = true;
							vm.valid= true;
							vm.errored =false;
							vm.message ="Report Registration successfull";
							}
							else{
							vm.valid = false;
							vm.isSubmitted = true;
							vm.errored =true;
							vm.message = "Report Registeration unsuccessfull!! Try again";
							}
						})
						.catch(function(error){
							vm.valid = false;
							vm.isSubmitted = true;
							vm.errored =true;
							vm.message = "Error occurred in registering the report!! Try again";
						})
					}
	}
});