angular.module('currency_search').controller('CartController', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {
    $http.get('http://localhost:8000/cart').then(function (response) {
        $scope.actions = response.data
        console.log(response)
    }, function (error) {
        console.log(error)
    })
    $scope.sell = function (action) {
        $http.post('http://localhost:8000/cartSell', JSON.stringify(action)).then(function (response) {
            window.location.reload()
            console.log(response)
        }, function (error) {
            console.log(error)
        })
    }
    $scope.getInfo()
}])