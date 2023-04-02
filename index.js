const { log } = require("console");
const express=require("express");
const mysql=require("mysql");
const app=express();
const connection=mysql.createConnection({
    host:"bwmpbeeawsmn3wustguu-mysql.services.clever-cloud.com",
    user:"uma8vjdlxdxqrbkn",
    password:"IWsPfQzY4aVlFXROtYZd",
    database:"bwmpbeeawsmn3wustguu"
    
})
connection.connect((err,data)=>{
    console.log("err",err);
    console.log("data",data);
})
app.get("/actors",(req,res)=>{
    connection.query("select * from actors",(err,data)=>{
        if(err){
            res.status(502).send({message:err.sqlMessage})
        }
        res.status(200).send(data)
    })
})

app.listen(8080,()=>console.log("hello"))