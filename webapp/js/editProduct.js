var editProduct = angular.module('editProduct',[]);

editProduct.controller('editProductController', function($scope,$http) {

    var role = 0;

    if(localStorage.getItem("role") != undefined){
        role = localStorage.getItem("role");
    }
    $scope.product = {};
    $scope.loadDetails = function(){
        product = localStorage.getItem("product");
        if(product != undefined && role != undefined && role == 1){

            $scope.product = JSON.parse(product);


        }else{
            window.location.href = "index.html";
        }
    }


    $scope.SaveDetails = function(updateProduct){

        $http({
            method: "PUT",
            url: "/api/product/"+role+"/"+updateProduct.sku,
            data: updateProduct

        }).success(function (data, status, headers, config) {
            displaySnackBar("Information updated! ");
            setTimeout(function(){window.location.href="index.html"}, 2000) ;
        })
            .error(function (data, status, headers, config) {
                displaySnackBar("Could not update data");
            });

    }

    $scope.deleteProduct=function(product) {

        $http({
            method:"DELETE",
            url: "/api/product/"+role+"/"+product.sku

        }).success(function (data, status, headers, config) {

            if(status == 200){
                displaySnackBar("Product deleted");
                localStorage.removeItem("product");
                window.location.href = "index.html";
            }


        })
            .error(function (data, status, headers, config) {
               displaySnackBar(data.message);
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




