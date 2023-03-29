const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { response } = require("express");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createPool({
    //user: "fnaif",
    //host: "cse.unl.edu",
    //password: "d5suMv1a",
    //database: "fnaif",

    //  user:"kywTeam@kyw",
    //  host:"kyw.mysql.database.azure.com",
    //  password:"NYWell2022",
    //  database: "fnaif",

    user: "kywTeam@kyw",
    host: "kyw.database.windows.net",
    password: "KJ6vcCG2",
    database: "kywAdmin",
});

// field
app.post('/api/insert', (req, res) => {
    const well_id = req.body.well_id;
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

    db.query(

        "INSERT INTO dbo.tblFieldActivity(well_id, fa_weather, fa_wellcovercondition, fa_wellcoverdescription, fa_surfacerunoff, fa_pooling, fa_groundwatertemp, fa_ph, fa_conductivity, fa_datacollector, fa_observation, fa_datecollected) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        [well_id, conditions, wellcover, wellcoverdescription, evidence, pooling, temp, ph, conductivity, name, observation, dateentered],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

// class lab
app.post('/createclasslab', (req, res) => {
    const fa_id = req.body.fa_id;
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
    const dateentered = req.body.dateentered;


    db.query(
        "INSERT INTO dbo.tblClassroomLab(fieldactivity_id, cl_ammonia, cl_calciumhardness, cl_chloride, cl_bacteria, cl_copper, cl_iron, cl_manganese, cl_nitrate, cl_observation, cl_datacollector, cl_datecollected) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        [fa_id, ammonia, calcium, chloride, bacteria, copper, iron, manganese, nitrate, observations, name, dateentered],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

// well info
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
    const topography = req.body.topography;
    const dateentered = req.body.dateentered;

    db.query(
        "INSERT INTO dbo.tblWellInfo(wi_wellcode, wi_wellname, school_id, wi_well_user, wi_address, wi_city, wi_state, wi_zipcode, county_id, nrd_id, wi_well_owner, wi_installyear, wi_smelltaste, wi_smelltaste_description, wi_welldry, wi_welldry_description, wi_maintenance5yr, wi_landuse5yr, wi_numberwelluser, wi_pestmanure, wi_estlatitude, wi_estlongitude, wi_boreholediameter, wi_totaldepth, wi_waterleveldepth, wi_aquifertype, wi_aquiferclass, wi_welltype, wi_wellcasematerial, wi_datacollector, wi_observation, wi_topography, wi_dateentered) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            wellcode, wellname, school_id, welluser, address, city, state, zipcode, county, nrd, wellowner, installyear, smelltaste,
            smelltaste_description, welldry, welldry_description, maintenance5yr, landuse5yr, numberwelluser, pestmanure,
            estlatitude, estlongitude, boreholediameter, totaldepth, well_waterleveldepth, aquifertype, aquiferclass, welltype,
            wellcasematerial, datacollector, observation, topography, dateentered
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
    db.query("SELECT well_id, wi_wellname FROM dbo.tblWellInfo;", function (err, data, fields) {
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
