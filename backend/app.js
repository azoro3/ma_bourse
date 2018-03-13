const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:32768/stock')
const app = express()
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
    return res.json([
        { name: 'Google',symbol:"GOO", price: '1' },
        { name: 'Facebook', price: '3' },
        { name: 'Amazon', price: '4' },
        { name: 'Apple', price: '5' },
    ])
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
app.post('/cartSell',function(req,res,next){
    var stock = new Stock(req.body)
    stock.remove({name:stock.name},function(err){
        if(!err){
            res.statusCode=200
        }
        else{
            console.log(err)
        }
    })
})
app.listen(8000, function () {
    console.log('server running and listennin on localhost:8000')
})