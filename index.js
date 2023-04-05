const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json())
const connection = mysql.createConnection({
    host: "bwmpbeeawsmn3wustguu-mysql.services.clever-cloud.com",
    user: "uma8vjdlxdxqrbkn",
    password: "IWsPfQzY4aVlFXROtYZd",
    database: "bwmpbeeawsmn3wustguu"


})
connection.connect((err, data) => {
    console.log("err", err);
    console.log("data", data);
})
app.get("/actors", (req, res) => {

    connection.query("select * from actors", (err, data) => {
        if (err) {
            res.status(502).send({ message: err.sqlMessage })
        }
        res.status(200).send(data)
    })
})
app.get("/actors/:id", (req, res) => {

    connection.query(`select * from actors where unicueID=${req.params.id}`, (err, data) => {
        if (err) {
            res.status(502).send({ message: err.sqlMessage })
        }
        res.status(200).send(data)
    })
})
app.post("/actors/add", (req, res) => {
    
    const { name, surename, email, password } = req.body
    const query = `insert into actors
                (name,surename,email,password)
                values
                ("${name}","${surename}","${email}","${password}")`
    connection.query(query, (err) => {
        if (err) {
            res.send({ message: err.sqlMessage })
        }
        res.status(200).send("ok")
    })
})
app.put("/actors/put/:id", (req, res) => {
    console.log(req.params);
    const id=+req.params.id
    const { name, surename, email, password } = req.body
    const query = `update actors
               set name="${name}",surename="${surename}",email="${email}",password="${password}"
               where unicueID=${id}`
    connection.query(query, (err) => {
        if (err) {
            res.send({ message: err.sqlMessage })
        }
        res.status(200).send("ok")
    })
})
app.delete("/actors/:id", (req, res) => {
    const id = +req.params.id
    const query = `delete from actors where unicueID=${id}`
    connection.query(query, (err) => {
        if (err) {
            res.send({ message: err.sqlMessage })
        }
        res.status(200).send("ok")
    })
})

app.listen(8080, () => console.log("hello"))