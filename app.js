const express = require('express');
var bodyParser = require('body-parser')
const appServer = express();

// appServer.use(bodyParser.text({
//     type: "text/html"
// }));

appServer.use(bodyParser.urlencoded({extended : true}));

appServer.use(express.static('public'));

appServer.post('/', (req, res) => {
    console.log("hello");
    res.send(req.body);
})

appServer.listen(3000, () => 
    console.log("Server started"));

module.exports = appServer;