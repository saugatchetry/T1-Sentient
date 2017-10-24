var express = require('express');
var mysql = require('mysql');
var app = express();

var dbConnection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shantanu1'
});

// dbConnection.connect(function(error){
//     if(!!error){
//         console.log("Failed to connect to the database");
//     }
//     else{
//         console.log("Connected to the database");
//     }
// });


app.get("/getAllItems",function(req,res){
    
    dbConnection.getConnection(function(error,tempConnection){

        if(!!error){
            tempConnection.release();
            console.log("Failed to get a connection");
        }else{
            tempConnection.query("SELECT * from items",function(error,rows,fields){
                tempConnection.release();
                if(!!error){
                    console.log("Failed to get the records");
                }
                else{
                    res.json(rows);
                }
                
            });
        }

    });
});

app.listen(1337);