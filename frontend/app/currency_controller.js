angular.module('currency_search').controller('CurrencyController', ['$scope', '$http', 'Currency', function ($scope, $http, Currency) {
    $http.get('http://localhost:3000/currencies').then(function(response){
        $scope.currencies=response.data
        console.log(response)
    },function(error){
        console.log(error)
    })
}])