var prodDetails = angular.module('prodDetails',[]);
prodDetails.controller('DetailsController', function($scope,$http) {

    $scope.data = {};
    $scope.isVisible = false;
    $scope.loadDetails = function(){

        product = localStorage.getItem("product");
        role = localStorage.getItem("role");
        if(role != undefined && role == 1){
            $scope.isVisible = true;
        }
        if(product != undefined){

            $scope.data = JSON.parse(product);

        }else{
            window.location.href = "index.html";
        }
    }

    $scope.sendEdit = function(){

        window.location.href="editProduct.html";
    }

    $scope.checkOut = function(data){
        var params = {};
        params.sku = data.sku;
        params.quantity = data.cquantity;
        $http({
            method: "POST",
            url: '/api/checkOut',
            data: params
        }).success(function (data, status, headers, config) {
            console.log(data);
            if(status == 202){
                displaySnackBar("Product checked out successfully");
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1000);
            }else{
                displaySnackBar(data);
            }

        })
            .error(function (data, status, headers, config) {
                console.log(data);
                displaySnackBar("Internal Server error!");
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 500);
            });
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