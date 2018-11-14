var express = require("express");
var exp = express();
var bodyParser = require('body-parser');
exp.use(bodyParser.json()); 
exp.use(bodyParser.urlencoded({ extended: true })); 
var mysql = require("mysql");
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "users"
});
conn.connect();


exp.get("/",function(req,res)
{
    res.sendFile(__dirname + "/loginpage.html");
})

exp.post("/login",function(req,res)
{
    var uname = req.body.username;
    var pass = req.body.password;
    conn.query("select * from validate where username = ? ",uname,function(err,res)
    {
        if(err)
        {
            console.log("Error aa gayi");
        }
        else
        {
        console.log("welcome "+ res);
        }
    })
    
});

exp.listen(5858);
