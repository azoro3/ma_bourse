angular.module('currency_search').controller('CurrencyController', ['$scope', '$http', 'Currency', function ($scope, $http, Currency) {
    $scope.currencies = [
        { name: 'Google', price: '1' },
        { name: 'Facebook', price: '3' },
        { name: 'Amazon', price: '4' },
        { name: 'Apple', price: '5' },
    ]
    /*$http.get('http://localhost:3000/currencies').then(function(response){
        $scope.currencies=[]
        response.data.currencies.forEach(function(data) {
            var newCurrency = new Currency(data)
            $scope.currencies.push(newCurrency)
        });
    },function(error){
        console.log(error)
    })*/
}])