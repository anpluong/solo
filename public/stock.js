$(document).ready(function() {     
	$("button").click(function(){	
        //Get your stock symbol
        var     symbol              = document.getElementById("stockID").value,
                apiKey              = '6H8OCBWU5LYNFJOH',

        //
                stockSymbol,
                stringTime,
                shortTime, 
                openStockPrice,
                currentStockPrice;


        $.ajax({
                type: "GET",
        //      url: `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}/data.json?api_key=${apiKey}`,
                url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
                dataType: 'JSON',
                jsonpCallback: 'callback',
                success: function(data) {
                    stringTime              =       data["Meta Data"]["3. Last Refreshed"];

                    stockSymbol             =       data["Meta Data"]["2. Symbol"];
                    currentStockPrice       =       data["Time Series (1min)"][stringTime]["4. close"]
                    
                    openStockPrice          =       data["Time Series (1min)"][stringTime]["1. open"]
                    shortTimeDate           =       stringTime.split(' '); //the Date

                    openStockPrice = Number(openStockPrice).toFixed(2);
                    currentStockPrice = Number(currentStockPrice).toFixed(2);

              
                    $.ajax({
                        type: "POST",
                        url: `http://localhost:3000/`,
                        data: {"stockSymbol": stockSymbol, 
                               "openStockPrice": openStockPrice,
                                "currentStockPrice": currentStockPrice,
                                "stockDate": shortTimeDate[0]},
                        dataType: 'json',
                        success: function(data) {
                            console.log(data)
                        }
                    })



                //    var data2 = "Hello";
                //     $.ajax({
                //         type: "POST",
                //         url: `http://localhost:3000`,
                //         data: data2,
                //         dataType: 'text',
                //         success: function(data) {
                //             console.log("success");
                //             console.log(data);
                //         }
                //     })
                    
                }
            })  
        })  
})

function check(){
    return "my world";
}



  
// var newDiv = document.createElement("div");
// newDiv.className = "container"
// var tbl = document.createElement("table");
// var tblBody = document.createElement("tbody");

// var row = document.createElement("tr");

// for (var j = 0; j < 3; j++) {
//     // Create a <td> element and a text node, make the text
//     // node the contents of the <td>, and put the <td> at
//     // the end of the table row
//     var cell = document.createElement("td");
//     var cellText = document.createTextNode("value  " + j);
//     cell.appendChild(cellText);
//     row.appendChild(cell);
//   }

//   tblBody.appendChild(row);
//   tbl.appendChild(tblBody);
//   var mainDiv = document.getElementById("check");
//   mainDiv.appendChild(tbl);