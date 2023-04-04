const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { response } = require("express");

const path = require('path');
//app.use(express.static(path.join(__dirname + "public")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'ClientApp', 'build', 'index.html'));
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createPool({
    user: "fnaif",
    host: "cse.unl.edu",
    password: "d5suMv1a",
    database: "fnaif",

    //user: "kywAdmin",
    //password: "KJ6vcCG2",
    //database: "kyw",
    //server: 'kyw.database.windows.net',
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
    const dateentered = req.body.dateentered;

    /**  field */
    db.query(

        "INSERT INTO field (conditions, wellcover, evidence, pooling, temp, ph, conductivity, name, observation, dateentered) VALUES(?,?,?,?,?,?,?,?,?,?)",
        [conditions, wellcover, evidence, pooling, temp, ph, conductivity, name, observation, dateentered],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});


app.post('/createclasslab', (req, res) => {
    const ammonia = req.body.ammonia;
    const calcium = req.body.calcium;
    const chloride = req.body.chloride;
    const bacteria = req.body.bacteria;
    const copper = req.body.copper;
    const iron = req.body.iron;
    const manganese = req.body.manganese;
    const nitrate = req.body.nitrate;
    const name = req.body.name;
    const dateentered = req.body.dateentered;

    db.query(
        "INSERT INTO lab (ammonia, calcium, chloride, bacteria, copper, iron, manganese, nitrate, name, dateentered) VALUES(?,?,?,?,?,?,?,?,?,?)",
        [ammonia, calcium, chloride, bacteria, copper, iron, manganese, nitrate, name, dateentered],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        }
    );
});

app.post('/createwellinfo', (req, res) => {

    const wellcode = req.body.wellcode;
    const wellname = req.body.wellname;
    const school_id = req.body.school_id;
    const welluser = req.body.welluser;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const county = req.body.county;
    const nrd = req.body.nrd;
    const wellowner = req.body.wellowner;
    const installyear = req.body.installyear;
    const smelltaste = req.body.smelltaste;
    const smelltaste_description = req.body.smelltaste_description;
    const welldry = req.body.welldry;
    const welldry_description = req.body.welldry_description;
    const maintenance5yr = req.body.maintenance5yr;
    const landuse5yr = req.body.landuse5yr;
    const numberwelluser = req.body.numberwelluser;
    const pestmanure = req.body.pestmanure;
    const estlatitude = req.body.estlatitude;
    const estlongitude = req.body.estlongitude;
    const boreholediameter = req.body.boreholediameter;
    const totaldepth = req.body.totaldepth;
    const well_waterleveldepth = req.body.well_waterleveldepth;
    const aquifertype = req.body.aquifertype;
    const aquiferclass = req.body.aquiferclass;
    const welltype = req.body.welltype;
    const wellcasematerial = req.body.wellcasematerial;
    const datacollector = req.body.datacollector;
    const observation = req.body.observation;
    const comments = req.body.comments;
    const dateentered = req.body.dateentered;

    db.query(
        "INSERT INTO wellinfo ( wellcode, wellname, school_id, welluser, address, city, state, zipcode, county, nrd, wellowner, installyear, smelltaste, smelltaste_description, welldry, welldry_description, maintenance5yr, landuse5yr, numberwelluser, pestmanure, estlatitude, estlongitude, boreholediameter, totaldepth,  well_waterleveldepth, aquifertype, aquiferclass, welltype, wellcasematerial, datacollector, observation, comments, dateentered ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            wellcode, wellname, school_id, welluser, address, city, state, zipcode, county, nrd, wellowner, installyear, smelltaste,
            smelltaste_description, welldry, welldry_description, maintenance5yr, landuse5yr, numberwelluser, pestmanure,
            estlatitude, estlongitude, boreholediameter, totaldepth, well_waterleveldepth, aquifertype, aquiferclass, welltype,
            wellcasematerial, datacollector, observation, comments, dateentered
        ],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

//credit to https://arctype.com/blog/rest-api-tutorial/
app.get('/Wells', async (req, res) => {
    db.query("SELECT id, wellname FROM wellinfo;", function (err, data, fields) {
        if (err) return (err)
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    })
})

app.listen(process.env.PORT || 7193, () => {
    console.log("server is running");
});