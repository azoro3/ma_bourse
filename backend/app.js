
const express = require('express')
const app = express()
var cart = []

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/cart', function (req, res, next) {
    res.send('Hello World!')
})
app.get('/currencies', function (req, res, next) {
    res.send([
        { name: 'Google', price: '1' },
        { name: 'Facebook', price: '3' },
        { name: 'Amazon', price: '4' },
        { name: 'Apple', price: '5' },
    ])
})

app.listen(3000, function () {
    console.log('server running and listennin on localhost:3000')
})