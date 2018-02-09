angular.module('currency_search').service('Currency', [function () {
    var Currency = function (data) {
        this.name = data.name
        this.price = data.price
    }
    return Currency
    var buy=function(){
      $http.post('http://localhost:3000/cart',{currency:this.name,price:this.price}).then(function(response){
          console.log(response)
      },function(error){
          console.log(error)
      })  
    }
}])