var express = require("express");
var webpack = require("webpack");
var fs = require("fs");


var app = express();
//静态化
app.use(express.static("www"));
//中间件
app.get("/api",function(req,res){
    //结构
    var dajson = {};

    fs.readdir("./www/images/Corolla/" , function(err,data){
        data.forEach((color)=>{
            dajson[color] = {};

            var data2 = fs.readdirSync("./www/images/Corolla/" + color ); 

            data2.forEach((album)=>{
                var data3 = fs.readdirSync("./www/images/Corolla/" + color + "/" + album);
                dajson[color][album] = data3;
            });
        });

        //输出大json
        res.json({ "results": dajson });
    });   
});

app.listen(3000);
console.log("3000端口已经监听");

//引入webpack的配置文件
var webpackconfigjs = require("./webpack.config.js");
//运行webpack
webpack(webpackconfigjs, (err, stats) => {
    if (err) console.log(err);
    console.log("webpack已经运行");
});