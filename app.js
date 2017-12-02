const express = require('express');
var bodyParser = require('body-parser')
const appServer = express();
var mysql = require('mysql');
// appServer.use(bodyParser.text({
//     type: "text/html"
// }));

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'password1',
    database    : 'stockfun'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
    
appServer.use(bodyParser.urlencoded({extended : true}));

appServer.use(express.static('public'));

appServer.post('/', (req, res) => {
    //req.body is an object
//    connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");
connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");
  //  console.log(req.body.currentStockPrice);
    res.send(req.body);
})

appServer.listen(3000, () => 
    console.log("Server started"));

module.exports = appServer;
