angular.module('currency_search').controller('CurrencyController', ['$scope', 'Currency', function ($scope, Currency) {
    $scope.currencies = [
        {name :'Google',price:'1'},
        {name :'Facebook',price:'3'},
        {name :'Amazon',price:'4'},
        {name :'Apple',price:'5'},
    ]
}])