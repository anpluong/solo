$(document).ready(function() {     
	$("button").click(function(){	
        //Get your stock symbol
        var     symbol              = document.getElementById("stockID").value,
                apiKey              = '6H8OCBWU5LYNFJOH',               //alphavantage

                 //quandl.com API Key: Bfi36tzfQU_LiX1nLNpR
                apiKeyQuandl        = 'Bfi36tzfQU_LiX1nLNpR',        
                stockSymbol,
                stringTime,
                shortTime, 
                openStockPrice,
                currentStockPrice,
                flag = 0;


        $.ajax({
                type: "GET",
            //    url: `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}/data.json?api_key=${apiKeyQuandl}`, //option

                url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`,
                dataType: 'JSON',
                jsonpCallback: 'callback',
                success: function(data) {
                    //vantage alpha
                    stringTime              =       data["Meta Data"]["3. Last Refreshed"];

                    stockSymbol             =       data["Meta Data"]["2. Symbol"];
                    currentStockPrice       =       data["Time Series (1min)"][stringTime]["4. close"]
                    
                    openStockPrice          =       data["Time Series (1min)"][stringTime]["1. open"]
                    shortTimeDate           =       stringTime.split(' '); //the Date

                    openStockPrice = Number(openStockPrice).toFixed(2);
                    currentStockPrice = Number(currentStockPrice).toFixed(2);

                    

                    // stockSymbol = symbol;
                    // openStockPrice = 176.00;
                    // currentStockPrice = 185;
                    // stockDate = '12-01-2017';

                    $.ajax({
                        type: "POST",
                        url: `http://localhost:3000/`,
                        data: {"stockSymbol": stockSymbol, 
                               "openStockPrice": openStockPrice,
                                "currentStockPrice": currentStockPrice,
                                "stockDate": shortTimeDate[0]},
                                //"stockDate": stockDate},
                        dataType: 'json',
                        success: function(data) {
                            let row = document.createElement("div");                            
                            row.classList.add("container");
                            let arr = ["stock symbol", "open", "close", "date", "Delete"]
                            if (isEmpty(data)) 
                                console.log("h");
                            else {
                                // if (flag == 0)  {
                                //     let column1;
                                //     for (let i = 0; i < 5; i++) {
                                        
                                //         column1 = document.createElement("div");
                                //         column1.innerHTML = arr[i];
                                //         row.appendChild(column1);
                                //     }
                                // }          
                            flag = 1;
                            Object.keys(data).forEach((item) => {
                                let column;
                                column = document.createElement("div");
                                column.classList.add("box")
                                column.innerHTML = data[item];
                                row.appendChild(column);
                                console.log(data[item]);
                            });


                            let col
                            col = document.createElement("div");
                            col.classList.add("btn");
                            let sButton;

                            sButton = document.createElement("button");   
                            
                            sButton.classList.add("fa-trash-o");          
                            
                            sButton.addEventListener("click", function() {
                                $.ajax({
                                    type: "DELETE",
                                    url: `http://localhost:3000/`,
                                    data: data,
                                    dataType: 'json',
                                    //this data refers to the data you delete
                                    success: function(data) {
                                        console.log("Stock deleted.");
                                    }
                                })

                                document.body.removeChild(row);
                            })
                            col.appendChild(sButton);
                            row.appendChild(col);
                            document.body.appendChild(row);
                          }
                        }
                    })                    
                }
            })  
        })  
})

function isEmpty(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
}