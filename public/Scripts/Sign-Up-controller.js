app.controller('registerController', function(dataFactory){
	var vm =this;
	vm.registerUser = function(){
		if(vm.password ===vm.conPassword)
		{
			 vm.user ={
				name : vm.name,
				username: vm.username,
				email:vm.email,
				password :vm.password
			}
			dataFactory.registerUser(vm.user).then(function(response){
							console.log(response.data);
							if(response.status===201){
							vm.isSubmitted = true;
							vm.valid= true;
							vm.errored =false;
							vm.message ="Registration successfull";
							}
							else{
							vm.valid = false;
							vm.isSubmitted = true;
							vm.errored =true;
							vm.message = "Registeration unsuccessfull!! Try again";
							}
						})
						.catch(function(error){
							vm.valid = false;
							vm.isSubmitted = true;
							vm.errored =true;
							vm.message = "Error occurred in registering the user!! Try again";
						})
			
		}
		else
		{
			vm.isSubmitted = true;
			vm.errored= true;
			vm.message = "Password and confirm password do not match";
		}
	}
});