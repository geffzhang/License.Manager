﻿function ProductListCtrl($scope, $location, Product) {

    $scope.notificationAlert = { show: false, message: '', type: 'info' };

    $scope.products = Product.query(
        function(success, getResponseHeaders) {
            $scope.notificationAlert.show = false;
        },
        function(error, getResponseHeaders) {
            $scope.notificationAlert.show = true;
            $scope.notificationAlert.type = 'error';
            $scope.notificationAlert.message = error.data.responseStatus.message;
        });

    $scope.deleteProduct = function(product) {
        Product.delete({ id: customer.id },
            function(success, getResponseHeaders) {
                $scope.products.splice($scope.products.indexOf(product), 1);
                $scope.notificationAlert.show = false;
            },
            function(error, getResponseHeaders) {
                $scope.notificationAlert.show = true;
                $scope.notificationAlert.type = 'error';
                $scope.notificationAlert.message = error.data.responseStatus.message;
            });
    };
}

//ProductListCtrl.$inject = ['$scope', '$location', 'Product'];

function ProductDetailsCtrl($scope, $routeParams, Product) {

    $scope.notificationAlert = { show: false, message: '', type: 'info' };

    $scope.id = $routeParams.id;
    $scope.customer = Product.get({ id: $scope.id },
        function(success, getResponseHeaders) {
        },
        function(error, getResponseHeaders) {
            $scope.notificationAlert.show = true;
            $scope.notificationAlert.type = 'error';
            $scope.notificationAlert.message = error.data.responseStatus.message;
        });

    $scope.updateProduct = function(product) {
        $scope.product = Product.update(product,
            function(success, getResponseHeaders) {
                $scope.notificationAlert.show = true;
                $scope.notificationAlert.type = 'success';
                $scope.notificationAlert.message = 'Successfuly updated!';
            },
            function(error, getResponseHeaders) {
                $scope.notificationAlert.show = true;
                $scope.notificationAlert.type = 'error';
                $scope.notificationAlert.message = error.data.responseStatus.message;
            });
    };

    $scope.deleteProduct = function(product) {
        product.$delete({},
            function(success, getResponseHeaders) {
            },
            function(error, getResponseHeaders) {
                $scope.notificationAlert.show = true;
                $scope.notificationAlert.type = 'error';
                $scope.notificationAlert.message = error.data.responseStatus.message;
            });
    };
}

//ProductDetailsCtrl.$inject = ['$scope', '$routeParams', 'Product'];

function ProductAddCtrl($scope, $location, Product) {

    $scope.notificationAlert = { show: false, message: '', type: 'info' };
    $scope.emptyModel = {};

    $scope.addProduct = function(newProduct) {
        var prod = new Product(newProduct);

        prod.$save({},
            function(success, getResponseHeaders) {
                $scope.notificationAlert.show = true;
                $scope.notificationAlert.type = 'success';
                $scope.notificationAlert.message = 'Successfuly created!';

                $location.path('/products');
            },
            function(error, getResponseHeaders) {
                $scope.notificationAlert.show = true;
                $scope.notificationAlert.type = 'error';
                $scope.notificationAlert.message = error.data.responseStatus.message;
            });
    };

    $scope.cancel = function() {
        $scope.product = angular.copy($scope.emptyModel);
    };
}

//ProductAddCtrl.$inject = ['$scope', '$location', 'Product'];