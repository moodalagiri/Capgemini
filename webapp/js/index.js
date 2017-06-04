var index = angular.module('index',[]);

var role = 0;

index.controller('productListController', function($scope, $http)
{
    $scope.isVisible = false;
    $scope.data = {};

    $scope.logOut = function(){

        localStorage.removeItem("role");
        window.location.reload();

    }

    $scope.loadData = function(){
        if(localStorage.getItem("role") != undefined){
            role=localStorage.getItem("role");
        }
        $http({
            method: "GET",
            url: "/api/product/"+role


        }).success(function (data, status, headers, config) {
            console.log(data);
            if(role == 1){
                $scope.isVisible = true;
            }
            $scope.data = data;

        })
            .error(function (data, status, headers, config) {
                displaySnackBar(data.message);
            });

    }

    $scope.showDetails = function(product){
        localStorage.setItem("product", JSON.stringify(product));
        window.location.href="productDetail.html";
    }


    $scope.editDetails = function(product){
        localStorage.setItem("product", JSON.stringify(product));
        window.location.href="editProduct.html";
    }

});

function validateInput(params) {
    if(params.sku == undefined || params.sku == "" ){
        return false;
    }else if(params.name == undefined || params.name == "" ){
        return false;
    }else if(params.description == undefined || params.description == ""){
        return false;
    }else if(params.price == undefined || params.price == ""){
        return false;

    }else if(params.quantity == undefined || params.quantity == ""){
        return false;
    }else{
        return true;
    }

}
index.controller("AddProductController", function($scope, $http) {


    $scope.addProduct = function (product) {

        var params = product;

        if(validateInput(params)){
            $http({
                method: "POST",
                url: '/api/product',
                data: params
            }).success(function (data, status, headers, config) {
                console.log(data);
                if(status == 200 || status == 201){
                    displaySnackBar("Product added successfully");
                    setTimeout(function () {
                        location.reload();
                    }, 1500);
                }
                else {
                   displaySnackBar("Product addition failed!");
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }

            })
                .error(function (data, status, headers, config) {

                    displaySnackBar("Internal Server error!");
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                });
        }else{
            displaySnackBar("All fields are mandatory!");
        }


    }



});


function validatePerson(person) {

    if(person.username == undefined || person.username == ""){

        return false;
    }else if(person.password == undefined || person.password == "") {

        return false;
    }else{
        return true;
    }
}
index.controller("CreatePersonController", function($scope, $http){


    $scope.person = {};

    $scope.addPerson = function(person){
        if(validatePerson(person)){
            $http({
                method : "POST",
                url : '/api/add' ,

                data: person
            }).success(function (data, status, headers, config) {
                console.log(data);

                if(status == 201){

                    displaySnackBar("New Administrator added!");
                    setTimeout(function(){location.reload();}, 1000);


                }else{
                    displaySnackBar("Addition failed!");
                    location.reload();
                }

            })
                .error(function (data, status, headers, config) {
                    displaySnackBar("Internal Server error!"+data);
                    setTimeout(function(){location.reload();}, 500);
                });
        }else{
            displaySnackBar("All fields are mandatory");
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