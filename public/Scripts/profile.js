app.controller("profileController",function(dataFactory,$window,jwtHelper){
    var vm = this;
    vm.message= "This is a profile page";
    vm.loggedUser = ($window.sessionStorage.token)?jwtHelper.decodeToken($window.sessionStorage.token).username:" ";

    dataFactory.findUser(vm.loggedUser).then(function(response){
        if(response.status===200){
            vm.user=response.data;
        }
        else{
            vm.errMsg ="Some error occurred in displaying user data";
        }

    }).catch(function(err){
        console.log(err);
        vm.errMsg="Some error occured";
    })

    vm.edit = function(){
        vm.editable = true;

    }

    vm.save = function(){
        if(vm.name && vm.email){
            var details={
                name:vm.name,
                email:vm.email
            }
        dataFactory.updateUser(vm.loggedUser,details).then(function(response){
        if(response.status===204){
            vm.successMsg ="User data updated !! Please re-login to see the updated changes";
            vm.success=true;
            vm.submitted = true;
        }
        else{
            vm.successMsg ="Some error occurred in updating user data";
            vm.success=false;
            vm.submitted = true;
        }

    }).catch(function(err){
        console.log(err);
        vm.successMsg="Some error occured";
        vm.success=false;
        vm.submitted = true;
    })

        }
    }
})