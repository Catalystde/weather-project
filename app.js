const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true})); 

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");
})
app.post("/" , function(req,res){
    const query = req.body.cityname;
const apikey = "13efafcd70cfbd627a1ff27e1f65e4bd";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apikey +"&units="+unit;

https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const weatherDescripton = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    
     const icon = weatherData.weather[0].icon;
     const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
     res.write("<p>The weather is currently " + weatherDescripton + "</p>");
    res.write("<h1>The temperature in "+ query+" is " + temp + " degree Celcius.</h1>");
    res.write("<img src=" + imgurl + ">");
    res.send();
     })

})

})



app.listen(3000, function(){
    console.log("server is on bitch!");
});
