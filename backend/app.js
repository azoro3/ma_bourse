
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cart = [{ name: 'Google', price: '15' }]


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.get('/currencies', function (req, res, next) {
    res.statusCode = 200
    return res.json([
        { name: 'Google', price: '1' },
        { name: 'Facebook', price: '3' },
        { name: 'Amazon', price: '4' },
        { name: 'Apple', price: '5' },
    ])
})
app.get('/cart', function (req, res, next) {
    res.statusCode = 200
    return res.json(cart)
})
app.post('/cart', function (req, res, next) {
    const name = req.body.name
    const price= req.body.price
    res.set('Content-Type', 'application/json')
    console.log("{"+name+":"+price+"}")
    res.send("OK")
})

app.listen(3000, function () {
    console.log('server running and listennin on localhost:3000')
})