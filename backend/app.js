const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:32768/stock')
const app = express()
const YahooFinanceAPI = require('yahoo-finance-data');
var currencies = []
var infos = []
var money = 0
const api = new YahooFinanceAPI({
    key: 'dj0yJmk9SVZLdFJHeEF0MU55JmQ9WVdrOVRUSmhlWHB0TjJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMA--',
    secret: 'a917dc088aed919c3e9613bc83b341d34f0898ed'
})
app.use(bodyParser.json())
var Schema = mongoose.Schema
var stockSchema = new Schema({
    name: String,
    symbol: String,
    price: Number
})
var Stock = mongoose.model('Stock', stockSchema)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.get('/currencies', function (req, res, next) {
    res.statusCode = 200
    api.getRealtimeQuotes('CGGDS.PA,ATA.PA,ACALS.PA,ORA.PA,JXR.PA,FP.PA,CA.PA,SAN.PA,YHOO,MSFT,AAPL').then(
        function (data) {
            currencies = []
            var tmp = data.query.results.quote
            tmp.forEach(element => {
                var one = new Stock();
                one.name = element.Name
                one.symbol = element.Symbol
                one.price = element.LastTradePriceOnly
                currencies.push(one)
            })

        }
    )
    res.json(currencies)
})
app.get('/cart', function (req, res, next) {
    res.statusCode = 200
    Stock.find({}, function (err, stocks) {
        if (err) {
            return next(err)
        }
        else {
            res.json(stocks)
        }
    })
})
app.post('/cart', function (req, res, next) {
    money = money - req.body.price
    console.log(money)
    var stock = new Stock(req.body)
    stock.save(function (err) {
        if (err) {
            return next(err)
        }
        else {
            res.statusCode = 200
            res.json(stock)
        }
    })
})
app.post('/sell', function (req, res, next) {
    var stock = new Stock(req.body)
    api.getRealtimeQuotes(stock.symbol).then(function (data) {
        money = money + Number(data.query.results.quote.LastTradePriceOnly)
        console.log(money)
    }).then(function () {
        stock.remove({ name: stock.name }, function (err) {
            if (!err) {
                res.statusCode = 200
            }
            else {
                console.log(err)
            }
        })
    })
})
app.post('/infos', function (req, res, next) {
    infos = []
    var name = req.body.name
    var priceA = req.body.price
    var priceN = null
    var theOne = new Object()
    api.getRealtimeQuotes(req.body.symbol).then(function (data, next) {
        var tmp = data.query.results.quote
        priceN = tmp.LastTradePriceOnly
        theOne.name = name
        infos.push(theOne.name)
        theOne.priceA = priceA
        infos.push(theOne.priceA)
        theOne.priceN = Number(priceN)
        infos.push(theOne.priceN)
        theOne.percent = ((priceN - priceA) / priceA) * 100
        infos.push(theOne.percent)
    }).then(function () {
        console.log(theOne)
        res.json(infos)
    })

})
app.get('/money', function (req, res, next) {
    console.log(money)
    res.json(money)
})
app.listen(8000, function () {
    console.log('server running and listennin on localhost:8000')
})