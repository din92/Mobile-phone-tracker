var app = angular.module("TrackMobileApp", ["ngRoute","angular-jwt"]).run(run)
				 .config(function($routeProvider,$httpProvider) {
				 	$httpProvider.interceptors.push('authInterceptor');
				 	$routeProvider
				 	.when("/Home",{
				 		templateUrl:"Templates/Home.html",
				 		controller:"homeController",
				 		controllerAs:"vm",
				 		access:{
				 			restricted:false
				 		}
				 	})
				 	.when("/ImeiSearch",{
				 		templateUrl:"Templates/ImeiSearch.html",
				 		controller:"imeiController",
				 		controllerAs:"vm"
				 	})
				 	 .when("/theftReport",{
				 	 	templateUrl:"Templates/theftReport.html",
				 		controller:"theftreportController",
				 		controllerAs:"vm"
				 	 })
				 	 .when("/signUp",{
				 	 	templateUrl:"Templates/Register.html",
				 		controller:"registerController",
				 		controllerAs:"vm"
				 	 })
				 	 .when("/ringMyDevice",{
				 	 	templateUrl:"Templates/ringMyDevice.html",
				 		controller:"ringDeviceController",
				 		controllerAs:"vm"
				 	 })
				 	 .when("/lockMyDevice",{
				 	 	templateUrl:"Templates/lockMyDevice.html",
				 		controller:"lockController",
				 		controllerAs:"vm"
				 	 })
				 	 .when("/callLogs",{
				 	 	templateUrl:"Templates/callLogs.html",
				 		controller:"callLogsController",
				 		controllerAs:"vm"
				 	 })
				 	 .when("/wipeDeviceData",{
				 	 	templateUrl:"Templates/wipeDeviceData.html",
				 		controller:"wipeDeviceDataController",
				 		controllerAs:"vm"
				 	 })
				 	  .when("/simChangeAlert",{
				 	 	templateUrl:"Templates/simChangeAlert.html",
				 		controller:"simChangeAlertController",
				 		controllerAs:"vm"
				 	 })
				 	   .when("/emergencyMode",{
				 	 	templateUrl:"Templates/emergencyMode.html",
				 		controller:"emergencyModeController",
				 		controllerAs:"vm"
				 	 })
				 	 .otherwise({
				 	 	redirectTo:"/Home"
				 	 })
					
				})
				.controller("loginController",function(dataFactory,$location,authFactory,$route,$window){
					var vm =this;
					vm.login = function(){
						var user={
							username : vm.username,
							password:vm.password
						};
						dataFactory.login(user).then(function(response){
							console.log(response.data);
							if(response.status===200){

							authFactory.isloggedIn = true;
							vm.loggedIn = authFactory.isloggedIn;
							$window.sessionStorage.token = response.data;
							$location.path("/Home");
							$route.reload();
							}
							else{
								authFactory.isloggedIn = false;
							vm.authorized = false;
							vm.submitted = true;
							}
						})
						.catch(function(error){
							vm.authorized = false;
							vm.submitted = true;
							console.log(error.status);
						})
					}
					vm.logout = function(){
						vm.authorized = false;
							vm.submitted = false;
						delete $window.sessionStorage.token;
						authFactory.isloggedIn = false;
						$location.path("/Home");
						vm.loggedIn = authFactory.isloggedIn;
						$route.reload();
					}
					vm.isLoggedIn = function(){
						if(authFactory.isloggedIn)
							return true;
						else
							return false;
					}
					
				})

	   function run($rootScope, $location, $window, authFactory) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !authFactory.isloggedIn) {
            event.preventDefault();
            $location.path('/Home');
        }
          }); 
    }
				 