angular.module('currency_search').controller('CartController', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {
    $http.get('http://localhost:8000/cart').then(function (response) {
        $scope.actions = response.data
    }, function (error) {
        console.log(error)
    })
    $scope.value = null
    $http.get('http://localhost:8000/money').then(function (response) {
        console.log(response.data)
        $scope.value = response.data
    })
    //TODO
    $scope.prouts = null
    //Ici tu utilise socre donc je pense que tu ne peux pas l'utiliser dans cette partie la en lui donnant un attribut sauf peut etre en passant par thid
    $scope.getInfo = function (action) {
        $scope.test = null
        $http.post('http://localhost:8000/infos', JSON.stringify(action)).then(function (response) {
            console.log(response.data)
            $scope.prouts = response.data
            alert(response.data)
            console.log("test", $scope.test)
        }, function (error) {
            console.log(error)
        }).then(function () {
            console.log('prouts', $scope.prouts)
        })
    }
    $scope.sell = function (action) {
        $http.post('http://localhost:8000/sell', JSON.stringify(action)).then(function (response) {
            console.log(response)
        }, function (error) {
            console.log(error)
        })
        window.location.reload()
    }

}])