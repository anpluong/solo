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

var flag = 0;
 appServer.post('/', setDatabase, (req, res) => {
//    appServer.post('/', (req, res) => {
 // connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");

  if (flag === 1) {
    res.send({});
  }
  else {
    res.send(req.body);
  }
  flag = 0;
})

appServer.delete('/', (req, res) => {
    connection.query("DELETE from mystock where stocksymbol = '"+req.body.stockSymbol+"'");
    res.send(req.body);
})

function setDatabase(req, res, next) {
    connection.query("SELECT * from mystock where stocksymbol = '"+req.body.stockSymbol+"'", function(err, result) {        
            if (err) throw err;
            if (result.length == 0 ) {
                connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')", ()=> {
                    next();
                });                
            } else {
                flag = 1;
                next();
            }
    })
}

appServer.listen(3000, () => 
    console.log("Server started"));

module.exports = appServer;


    //req.body is an object
//    connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");


// connection.query("SELECT * from mystock where stocksymbol = '"+req.body.stockSymbol+"'", function(err, result) {
    
//         if (err) throw err;
//         if (result.length == 0 ) {
//             connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");
//             flag = 1;
//             res.send(req.body);
//         } else {
//             res.send({});
//         }

//        //     console.log(result[0]);
//             // if(result[0].stocksymbol == null)
//             //     console.log(result[0]);
//             // else 
//             //     console.log("not in the db yet")
        
//     }
// );
//console.log(req.body);

//connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");
  //  console.log(req.body.currentStockPrice);
