var loginDetails = angular.module('loginDetails',[]);
loginDetails.controller('loginController', function($scope,$http) {


    $scope.data = {};

    $scope.loadloginDetails = function(data){

        if($scope.data.username == "admin" && $scope.data.password == "admin"){
            localStorage.setItem("role", 1);
            window.location.href = "index.html";
        }else{

            $http({
                        method: "POST",
                        url: "/api/authenticate",
                        data: $scope.data


                    }).success(function (data, status, headers, config) {
                        if(status == 201){
                            localStorage.setItem("role", 1);
                            window.location.href = "index.html";
                        }else{
                            displaySnackBar("Invalid User ID / Password.");
                            $scope.data = {};
                        }

                    })
                        .error(function (data, status, headers, config) {
                            displaySnackBar("Invalid User ID / Password.");
                             $scope.data = {};
                        });

        }

    }


});
function displaySnackBar(message){

    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    $("#snackText").text(message);
    // Add the "show" class to DIV
    x.className = "show";


    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);

}