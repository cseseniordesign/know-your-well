const express = require("express");
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

app.post('/api/insert', (req, res) => {
    /**  field */
    const conditions = req.body.conditions;
    const wellcover = req.body.wellcover;
    const evidence = req.body.evidence;
    const pooling = req.body.pooling;
    const temp = req.body.temp;
    const ph = req.body.ph;
    const conductivity = req.body.conductivity;
    const name = req.body.name;
    const observation = req.body.observation;

    /**  field */
    db.query(   
        
        "INSERT INTO field (conditions, wellcover, evidence, pooling, temp, ph, conductivity, name, observation) VALUES(?,?,?,?,?,?,?,?,?)",
        [conditions, wellcover, evidence, pooling, temp, ph, conductivity, name, observation],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});
 
app.post('/createlab', (req, res) => {
    const ammonia = req.body.ammonia;
    const calcium = req.body.calcium;
    const chloride = req.body.chloride;
    const bacteria = req.body.bacteria;
    const copper = req.body.copper;
    const iron = req.body.iron;
    const manganese = req.body.manganese;
    const nitrate = req.body.nitrate;
    const name = req.body.name;
    const observations = req.body.observations;

    db.query(
        "INSERT INTO lab (ammonia, calcium, chloride, bacteria, copper, iron, manganese, nitrate, name, observations) VALUES(?,?,?,?,?,?,?,?,?,?)",
        [ammonia, calcium, chloride, bacteria, copper, iron, manganese, nitrate, name, observations],
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