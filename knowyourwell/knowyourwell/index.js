const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const sql = require('mssql')
const mysql = require('mysql');
const cors = require('cors');
const { response } = require("express");
const path = require("path")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static("wwwroot"));

const config = {
    user: "kywAdmin",
    password: "KJ6vcCG2",
    database: "kyw",
    server: 'kyw.database.windows.net',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

const appPool = new sql.ConnectionPool(config)
try {
    appPool.connect()
}
catch (error) {
    console.error(error)
}

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
        "INSERT INTO dbo.tblClassroomLab(classlab_id, fieldactivity_id, cl_ammonia, cl_calciumhardness, cl_chloride, cl_bacteria, cl_copper, cl_iron, cl_manganese, cl_nitrate, cl_observation, cl_datacollector, cl_datecollected) VALUES(?,?,?,?,?,?,?,?,?,?,?,CONVERT(VARCHAR, '?', 103))",
        [0, fa_id, ammonia, calcium, chloride, bacteria, copper, iron, manganese, nitrate, observations, name, dateentered],
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
    const request = appPool.request()
    request.input('wellcode', sql.VarChar, req.body.wellcode);
    request.input('welluser', sql.VarChar, req.body.welluser);
    request.input('wellname', sql.VarChar, req.body.wellname);
    request.input('school_id', sql.Int, req.body.school_id);
    request.input('address', sql.VarChar, req.body.address);
    request.input('city', sql.VarChar, req.body.city);
    request.input('state', sql.VarChar, req.body.state);
    request.input('zipcode', sql.VarChar, req.body.zipcode);
    request.input('county_id', sql.Int, req.body.countyid);
    request.input('nrd_id', sql.Int, req.body.nrdid);
    request.input('wellowner', sql.VarChar, req.body.wellowner);
    request.input('installyear', sql.VarChar, req.body.installyear);
    request.input('smelltaste', sql.VarChar, req.body.smelltaste);
    request.input('smelltaste_description', sql.VarChar, req.body.smelltaste_description);
    request.input('welldry', sql.VarChar, req.body.welldry);
    request.input('welldry_description', sql.VarChar, req.body.welldry_description);
    request.input('maintenance5yr', sql.VarChar, req.body.maintenance5yr);
    request.input('landuse5yr', sql.VarChar, req.body.landuse5yr);
    request.input('numberwelluser', sql.VarChar, req.body.numberwelluser);
    request.input('pestmanure', sql.VarChar, req.body.pestmanure);
    request.input('estlatitude', sql.VarChar, req.body.estlatitude);
    request.input('estlongitude', sql.VarChar, req.body.estlongitude);
    //TODO: update DB based on what Mark did as of 3/21.
    request.input('latitude', sql.Decimal, req.body.estlatitude);
    request.input('longitude', sql.Decimal, req.body.estlongitude);
    request.input('genlatitude', sql.Decimal, req.body.estlatitude);
    request.input('genlongitude', sql.Decimal, req.body.estlongitude);

    request.input('boreholediameter', sql.VarChar, req.body.boreholediameter);
    request.input('totaldepth', sql.Decimal, req.body.totaldepth);
    request.input('well_waterleveldepth', sql.Decimal, req.body.well_waterleveldepth);
    request.input('aquifertype', sql.VarChar, req.body.aquifertype);
    request.input('aquiferclass', sql.VarChar, req.body.aquiferclass);
    request.input('welltype', sql.VarChar, req.body.welltype);
    request.input('wellcasematerial', sql.VarChar, req.body.wellcasematerial);
    request.input('datacollector', sql.VarChar, req.body.datacollector);
    request.input('observation', sql.VarChar, req.body.observation);
    request.input('topography', sql.VarChar, req.body.topography);
    request.input('dateentered', sql.VarChar, req.body.dateentered);

    request.query.('INSERT INTO dbo.tblWellInfo(wi_wellcode, wi_wellname, school_id, wi_well_user, wi_address, wi_city, wi_state, wi_zipcode, county_id, nrd_id, wi_well_owner, wi_installyear, wi_smelltaste, wi_smelltaste_description, wi_welldry, wi_welldry_description, wi_maintenance5yr, wi_landuse5yr, wi_numberwelluser, wi_pestmanure, wi_estlatitude, wi_estlongitude, wi_latitude, wi_longitude, wi_genlatitude, wi_genlongitude, wi_boreholediameter, wi_totaldepth, wi_waterleveldepth, wi_aquifertype, wi_aquiferclass, wi_welltype, wi_wellcasematerial, wi_datacollector, wi_observation, wi_topography, wi_dateentered) VALUES(@wellcode, @wellname, @school_id, @welluser, @address, @city, @state, @zipcode, @county_id, @nrd_id, @wellowner, @installyear, @smelltaste, @smelltaste_description, @welldry, @welldry_description, @maintenance5yr, @landuse5yr, @numberwelluser, @pestmanure, @estlatitude, @estlongitude, @latitude, @longitude, @genlatitude, @genlongitude, @boreholediameter, @totaldepth, @well_waterleveldepth, @aquifertype, @aquiferclass, @welltype, @wellcasematerial, @datacollector, @observation, @topography, @dateentered)', function (err, recordset) {
        if (err) {
            console.log(err)
            res.status(500).send('SERVER ERROR')
            return
        }
        console.log(request.rowsAffected)
        res.status(200).send('Values Succesfully Inserted.')
    })
    /*
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
    */
});

//credit to https://arctype.com/blog/rest-api-tutorial/
app.get('/Wells', async (req, res) => {
    console.log("hit")
    appPool.query('SELECT well_id, wi_wellname FROM dbo.tblWellInfo;', function (err, recordset) {
        if (err) {
            console.log(err)
            res.status(500).send('SERVER ERROR')
            return
        }
        console.log(recordset)
        res.status(200).json({ Wells: recordset.recordset })
    })
})


app.listen(process.env.PORT || 7193, () => {
    console.log("server is running");
});
