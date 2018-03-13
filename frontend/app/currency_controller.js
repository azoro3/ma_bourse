angular.module('currency_search').controller('CurrencyController', ['$scope', '$http', 'Currency', function ($scope, $http, Currency) {
    $http.get('http://localhost:8000/currencies').then(function (response) {
        $scope.currencies = response.data
        console.log(response)
    }, function (error) {
        console.log(error)
    })
    $scope.buy = function (currency) {
        $http.post('http://localhost:8000/cart', JSON.stringify(currency)).then(function (response) {
            window.location.reload()
            console.log(response)
        }, function (error) {
            console.log(error)
        })
    }
}])