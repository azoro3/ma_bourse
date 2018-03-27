
angular.module('currency_search').controller('CartController', ['$scope', '$http', 'Cart', function ($scope, $http, Cart) {
    var ctx = document.getElementById("graphique")
    $http.get('http://localhost:8000/cart').then(function (response) {
        $scope.actions = response.data
    }, function (error) {
        console.log(error)
    })
    $scope.value = null
    $http.get('http://localhost:8000/money').then(function (response) {
        $scope.value = response.data
        var labels = JSON.parse(localStorage.getItem("labels"))
        var storedData = JSON.parse(localStorage.getItem("values"))
        storedData.push(response.data)
        var date = new Date()
        labels.push("js")
        localStorage.setItem('values', JSON.stringify(storedData))
        localStorage.setItem('labels', JSON.stringify(labels))
        console.log('datat_chart', storedData)
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: storedData
                }]
            }
        })
    })
    //TODO
    $scope.getInfo = function (action) {
        $scope.infos={info:null}
        var yesy;
        $http.post('http://localhost:8000/infos', JSON.stringify(action)).then(function (response) {
            //$scope.infos = response.data
            yesy = response.data
            alert(response.data)
        }, function (error) {
            console.log(error)
        }).then(function () {
            $scope.infos.info = yesy
            console.log('infos', $scope.infos)
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