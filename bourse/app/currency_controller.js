angular.module('currency_search').controller('CurrencyController',['$scope','Currency',function($scope,Currency){
   $scope.currency =new Currency({name:'Google',price:'1'})
}])