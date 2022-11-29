﻿const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json()); 

const db = mysql.createPool({
    user: "fnaif",
    host: "cse.unl.edu",
    password: "d5suMv1a",
    database: "fnaif",

    // user:"fnaif2",
    // host:"wslims.database.windows.net",
    // password:"NYWell2022",
    // database: "kyw",
});

app.post('/createlab', (req, res) => {
    const Ammonia = req.body.Ammonia;
    const Calcium = req.body.Calcium;
    const Chloride = req.body.Chloride;
    const Bacteria = req.body.Bacteria;
    const Copper = req.body.Copper;
    const Iron = req.body.Iron;
    const Manganese = req.body.Manganese;
    const Nitrate = req.body.Nitrate;
    const Name = req.body.Name;
    const observations = req.body.observations;


    db.query(
        "INSERT INTO lab (Ammonia, Calcium, Chloride, Bacteria, Copper, Iron, Manganese, Nitrate, Name, observations) VALUES(?,?,?,?,?,?,?,?,?,?)",
        [Ammonia, Calcium, Chloride, Bacteria, Copper, Iron, Manganese, Nitrate, Name, observations],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.listen(7193, () => {
    console.log("server is running");
});

