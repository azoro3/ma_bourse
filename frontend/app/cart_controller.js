angular.module('currency_search').controller('CartController', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {
    $http.get('http://localhost:8000/cart').then(function (response) {
        $scope.actions = response.data
        console.log($scope.actions)
    }, function (error) {
        console.log(error)
    })
   $scope.getInfo = function (action) {
        console.log(action)
        $http.post('http://localhost:8000/infos', JSON.stringify(action)).then(function (response) {
            $scope.infos = response.data
        },function(error){
            console.log(error)
        })
    }
}])