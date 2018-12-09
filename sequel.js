var Sequelize = require("sequelize");

var connection = new Sequelize('test','root','root', /**constructor creates object  */ 
{
dialect : 'mysql' ,/**mysql2 npm is necessary */
operatorsAliases : false    /**why i did this?? */ /**cause string based were deprecaated */
});  

var Users = connection.define('users',{
    username: Sequelize.TEXT,
    password: Sequelize.TEXT  /**cause text is unlimited check in sequelize's documentation */
});

var insertuser = function(uname,pass,callback)
{
    console.log("in sequel");
    connection.sync().then(function()
    {
        console.log("in sync");
        Users.create({
        username: uname,
        password: pass
         }).then(function(result)
         {
             console.log(result.id);
             callback(result);
         });
    }); /** 1.connect to database ,2. generates sequel */
}    

module.exports.insertuser = insertuser;