var mysql = require('mysql');

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'password1'
});

db = connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!"); 
    connection.query("CREATE DATABASE IF NOT EXISTS stockfun");   
    //connection.query("CREATE TABLE stockcollection()")
});


//create table mystock
//CREATE TABLE mystock (id INT AUTO_INCREMENT PRIMARY KEY, stocksymbol VARCHAR(20), openprice float, currentprice float, stockdate VARCHAR(20));
//connection.query("INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','2017-12-2')");
//inser value 
//"INSERT INTO mystock(stocksymbol, openprice , currentprice , stockdate) VALUES ('"+req.body.stockSymbol+"','"+req.body.openStockPrice+"','"+req.body.currentStockPrice+"','"+req.body.stockDate+"')");
// delete from mystock where stocksymbol = "FB";
module.exports = db;