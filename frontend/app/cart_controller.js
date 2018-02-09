angular.module('currency_search').controller('CartController', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {
    $http.get('http://localhost:3000/cart').then(function(response){
        $scope.actions=response.data
        console.log(response)
    },function(error){
        console.log(error)
    })
}])