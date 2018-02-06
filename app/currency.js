angular.module('currency_search').service('Currency', [function () {
    var Currency = function (data) {
        this.name = data.name
        this.price = data.price
    }
    return Currency
}])