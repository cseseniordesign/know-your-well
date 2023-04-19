const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const sql = require('mssql')
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

// field
app.post('/api/insert', (req, res) => {
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        request.input('well_id', sql.Int, req.body.well_id);
        request.input('fa_latitude', sql.Decimal, req.body.fa_latitude);
        request.input('fa_longitude', sql.Decimal, req.body.fa_longitude);
        request.input('fa_genlatitude', sql.Decimal, req.body.fa_genlatitude);
        request.input('fa_genlongitude', sql.Decimal, req.body.fa_genlongitude);
        request.input('weather', sql.NVarChar, req.body.weather);
        request.input('wellcovercondition', sql.NVarChar, req.body.wellcovercondition);
        request.input('wellcoverdescription', sql.NVarChar, req.body.wellcoverdescription);
        request.input('runOff', sql.NVarChar, req.body.surfacerunoff);
        request.input('pooling', sql.NVarChar, req.body.pooling);
        request.input('temp', sql.Decimal, req.body.groundwatertemp);
        request.input('ph', sql.Decimal, req.body.ph);
        request.input('conductivity', sql.Decimal, req.body.conductivity);
        request.input('name', sql.NVarChar, req.body.name);
        request.input('observation', sql.NVarChar, req.body.observations);
        request.input('dateentered', sql.DateTime, req.body.datecollected);

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request
            .query('INSERT INTO dbo.tblFieldActivity(well_id, fa_latitude, fa_longitude, fa_genlatitude, fa_genlongitude, fa_weather, fa_wellcovercondition, fa_wellcoverdescription, fa_surfacerunoff, fa_pooling, fa_groundwatertemp, fa_ph, fa_conductivity, fa_datacollector, fa_observation, fa_datecollected) VALUES(@well_id, @fa_latitude, @fa_longitude, @fa_genlatitude, @fa_genlongitude, @weather, @wellcovercondition, @wellcoverdescription, @runOff, @pooling, @temp, @ph, @conductivity, @name, @observation, @dateentered)', function (err, recordset) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Query does not execute.')
                    if (!rolledBack) {
                        transaction.rollback(err => {
                            // ... error checks
                        })
                    }
                } else {
                    transaction.commit(err => {
                        if (err) {
                            console.log(err)
                            res.status(500).send('500: Server Error.')
                        }
                        else
                            res.status(500).send('Values Inserted')
                    })
                }
            })
    })
});

// class lab
app.post('/createclasslab', (req, res) => {
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request.input('fa_id', sql.Int, req.body.fa_id);
        request.input('ammonia', sql.Decimal, req.body.ammonia);
        request.input('calcium', sql.Decimal, req.body.calciumhardness);
        request.input('chloride', sql.Decimal, req.body.chloride);
        request.input('bacteria', sql.NVarChar, req.body.bacteria);
        request.input('copper', sql.Decimal, req.body.copper);
        request.input('iron', sql.Decimal, req.body.iron);
        request.input('manganese', sql.Decimal, req.body.manganese);
        request.input('nitrate', sql.Decimal, req.body.nitrate);
        request.input('name', sql.NVarChar, req.body.datacollector);
        request.input('observations', sql.NVarChar, req.body.observations);
        request.input('dateentered', sql.DateTime, req.body.dateentered);

        request
            .query('INSERT INTO dbo.tblClassroomLab(fieldactivity_id, cl_ammonia, cl_calciumhardness, cl_chloride, cl_bacteria, cl_copper, cl_iron, cl_manganese, cl_nitrate, cl_observation, cl_datacollector, cl_datecollected) VALUES(@fa_id, @ammonia, @calcium, @chloride, @bacteria, @copper, @iron, @manganese, @nitrate, @observations, @name, @dateentered)', function (err, recordset) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Query does not execute.')
                    if (!rolledBack) {
                        transaction.rollback(err => {
                            // ... error checks
                        })
                    }
                } else {
                    transaction.commit(err => {
                        if (err) {
                            console.log(err)
                            res.status(500).send('500: Server Error.')
                        }
                        else
                            res.status(500).send('Values Inserted')
                    })
                }
            })
    })
});

// well info
app.post('/createwellinfo', (req, res) => {
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request.input('wellcode', sql.NVarChar, req.body.wellcode);
        request.input('welluser', sql.NVarChar, req.body.welluser);
        request.input('wellname', sql.NVarChar, req.body.wellname);
        request.input('school_id', sql.Int, req.body.school_id);
        request.input('address', sql.NVarChar, req.body.address);
        request.input('city', sql.NVarChar, req.body.city);
        request.input('state', sql.NVarChar, req.body.state);
        request.input('zipcode', sql.NVarChar, req.body.zipcode);
        request.input('county_id', sql.Int, req.body.countyid);
        request.input('nrd_id', sql.Int, req.body.nrdid);
        request.input('wellowner', sql.NVarChar, req.body.wellowner);
        request.input('installyear', sql.NVarChar, req.body.installyear);
        request.input('smelltaste', sql.NVarChar, req.body.smelltaste);
        request.input('smelltaste_description', sql.NVarChar, req.body.smelltastedescription);
        request.input('welldry', sql.NVarChar, req.body.welldry);
        request.input('welldry_description', sql.NVarChar, req.body.welldrydescription);
        request.input('maintenance5yr', sql.NVarChar, req.body.maintenance5yr);
        request.input('landuse5yr', sql.NVarChar, req.body.landuse5yr);
        request.input('numberwelluser', sql.Int, req.body.numberwelluser);
        request.input('pestmanure', sql.NVarChar, req.body.pestmanure);
        request.input('estlatitude', sql.Decimal, req.body.estlatitude);
        request.input('estlongitude', sql.Decimal, req.body.estlongitude);
        request.input('boreholediameter', sql.Decimal, req.body.boreholediameter);
        request.input('totaldepth', sql.Decimal, req.body.totaldepth);
        request.input('well_waterleveldepth', sql.Decimal, req.body.well_waterleveldepth);
        request.input('aquifertype', sql.NVarChar, req.body.aquifertype);
        request.input('aquiferclass', sql.NVarChar, req.body.aquiferclass);
        request.input('welltype', sql.NVarChar, req.body.welltype);
        request.input('wellcasematerial', sql.NVarChar, req.body.wellcasematerial);
        request.input('datacollector', sql.NVarChar, req.body.datacollector);
        request.input('observation', sql.NVarChar, req.body.observation);
        request.input('topography', sql.NVarChar, req.body.topography);
        request.input('dateentered', sql.DateTime, req.body.dateentered);

        request
            .query('INSERT INTO dbo.tblWellInfo(wi_wellcode, wi_wellname, school_id, wi_well_user, wi_address, wi_city, wi_state, wi_zipcode, county_id, nrd_id, wi_well_owner, wi_installyear, wi_smelltaste, wi_smelltaste_description, wi_welldry, wi_welldry_description, wi_maintenance5yr, wi_landuse5yr, wi_numberwelluser, wi_pestmanure, wi_estlatitude, wi_estlongitude, wi_boreholediameter, wi_totaldepth, wi_waterleveldepth, wi_aquifertype, wi_aquiferclass, wi_welltype, wi_wellcasematerial, wi_datacollector, wi_observation, wi_topography, wi_dateentered) VALUES(@wellcode, @wellname, @school_id, @welluser, @address, @city, @state, @zipcode, @county_id, @nrd_id, @wellowner, @installyear, @smelltaste, @smelltaste_description, @welldry, @welldry_description, @maintenance5yr, @landuse5yr, @numberwelluser, @pestmanure, @estlatitude, @estlongitude, @boreholediameter, @totaldepth, @well_waterleveldepth, @aquifertype, @aquiferclass, @welltype, @wellcasematerial, @datacollector, @observation, @topography, @dateentered)', function (err, recordset) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Query does not execute.')
                    if (!rolledBack) {
                        transaction.rollback(err => {
                            // ... error checks
                        })
                    }
                } else {
                    transaction.commit(err => {
                        if (err) {
                            console.log(err)
                            res.status(500).send('500: Server Error.')
                        }
                        else
                            res.status(500).send('Values Inserted')
                    })
                }
            })
    })
});

//credit to https://arctype.com/blog/rest-api-tutorial/
app.get('/Wells', async (req, res) => {
    console.log("hit")
    appPool.query('SELECT * FROM dbo.tblWellInfo;', function (err, recordset) {
        if (err) {
            console.log(err)
            res.status(500).send('SERVER ERROR')
            return
        }
        console.log(recordset)
        res.status(200).json({ Wells: recordset.recordset })
    })
})

app.get('/GetWellInfo', async (req, res) => {
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request.input('well_id', sql.Int, req.query.well_id).query('SELECT * FROM dbo.tblWellInfo WHERE well_id = @well_id;', function (err, recordset) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback(err => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit(err => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        console.log(recordset)
                        res.status(200).json({ WellInfo: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get('/FieldList', async (req, res) => {
    console.log(req.query.well_id)
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request.input('well_id', sql.Int, req.query.well_id).query('SELECT fieldactivity_id, fa_datecollected FROM dbo.tblFieldActivity WHERE well_id = @well_id;', function (err, recordset) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback(err => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit(err => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        console.log(recordset)
                        res.status(200).json({ FieldList: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get('/LabID', async (req, res) => {
    console.log(req.query.well_id)
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request.input('fieldactivity_id', sql.Int, req.query.fieldactivity_id).query('SELECT classlab_id FROM dbo.tblClassroomLab WHERE fieldactivity_id = @fieldactivity_id;', function (err, recordset) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback(err => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit(err => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        console.log(recordset)
                        res.status(200).json({ LabID: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get('/GetFieldEntry', async (req, res) => {
    const transaction = appPool.transaction();
    transaction.begin(err => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', aborted => {
            rolledBack = true
        })

        request.input('fieldactivity_id', sql.Int, req.query.fieldactivity_id).query('SELECT * FROM dbo.tblFieldActivity WHERE fieldactivity_id = @fieldactivity_id;', function (err, recordset) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback(err => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit(err => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        console.log(recordset)
                        res.status(200).json({ FieldActivity: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get("*", (req, res) => {
    console.log("hit")
    res.sendFile(path.resolve(__dirname, "wwwroot", "index.html"));
});

app.listen(process.env.PORT || 7193, () => {
    console.log("server is running");
});
