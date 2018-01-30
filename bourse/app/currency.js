angular.module('currency_search').service('currency',[function(){
    var Currency=function(data){
        this.name=data.name
        this.price=data.price
    }
    return Currency
}])