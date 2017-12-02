$(document).ready(function() {     
	$("button").click(function(){	
        var symbol = document.getElementById("stockID").value;
        var apiKey = 'Bfi36tzfQU_LiX1nLNpR';
        $.ajax({
                type: "GET",
                url: `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}/data.json?api_key=${apiKey}`,
                dataType: 'JSON',
                jsonpCallback: 'callback',
                success: function(data) {
                   console.log(data);          
                   var data2 = "Hello";
                    $.ajax({
                        type: "POST",
                        url: `http://localhost:3000`,
                        data: data2,
                        dataType: 'text',
                        success: function(data) {
                            console.log("success");
                            console.log(data);
                        }
                    })
                    
                }
            })  
        })  
})