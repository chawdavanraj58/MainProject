var express = require("express");
var Connect = require("./Connect");
const crypto = require('crypto');
var sequel = require("./sequel");

var exp = express();

exp.set("view engine","ejs");
var bodyParser = require('body-parser');
exp.use(bodyParser.json()); 
exp.use(bodyParser.urlencoded({ extended: true })); 

var mysql = require("mysql");

Connect.tryConnect();

exp.get("/",function(req,res)
{
    res.sendFile(__dirname + "/loginpage.html");
})


/** for signup form */
exp.get("/signup",function(req,res)
{
    console.log("in signup");
    res.sendFile(__dirname + "/forms.html");
});

/** for signup from */


/** for login */
exp.post("/login",function(req,res)
{
     var uname = req.body.username;
    var pass = req.body.password;

    var done = true;
    var totalrows;

    var promise = new Promise(function(resolve,reject)
    {

        console.log("in promise")
        Connect.validate(uname,pass,function(data)
        {
         totalrows = data.length;
         console.log(data);
         resolve(totalrows);
        });
    });


    promise.then(
    function(totalrows)
    {
        console.log(totalrows); 
        console.log("in promise responder");
        if(totalrows != 1)                              //results.length - to find no of rows 
        {
        console.log("Invalid User");
        
        res.render("login",{message: "Invalid User"});
        }
        else
        {
            res.send("welcome  " + uname);
        }
    }   
    );

});
/**for login */

/**for signup Post */

exp.post("/signup",function(req,res)
{
    var uname = req.body.username;
    var pass1 = req.body.password;
    var Status1;
    console.log("in signup")
    const pass = crypto.createHmac('sha256', pass1)
                   .update('I love cupcakes')
                   .digest('hex');
    console.log(pass);               

    var promiseins = new Promise(function(resolve,reject)
    {

        sequel.insertuser(uname,pass,function(data)
        {
            Status1 = data.id;
            console.log(Status1);
            resolve(Status1) ;
        })
    });  

    promiseins.then(
        function(Status1)
        {
            if(Status1 > 0)
            {
                res.send ("registration done  " + uname);
                console.log("registration complete");

            }
        }
    );
});

/**for signUp Post */





exp.listen(5858);
console.log("listening");