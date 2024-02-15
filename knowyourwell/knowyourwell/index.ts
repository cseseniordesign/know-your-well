﻿import { DataSource } from 'typeorm'
import { AppDataSource } from './ClientApp/src/data-source';
import { TblWellInfo } from './ClientApp/src/entities/TblWellInfo';

const assignEntity = require('./middleware/saml.js');

const { Constants } = require('samlify');

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const sql = require('mssql')
const cors = require('cors');
const { response } = require("express");
const path = require("path");

//require('dotenv').config()

let kywmemValue = "1";
let displayName = "displayname";


app.use(cors({    origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static("wwwroot"));

app.use(assignEntity);

app.options('*', cors())

AppDataSource.initialize()

let config;

try {
    const fs = require('fs');
    const rawData = fs.readFileSync('config.json', 'utf8');
    config = JSON.parse(rawData);
} catch (e) {
    config = {
        user: "kywAdmin",
        password: process.env.APPSETTING_MSSQL_PASSWORD,
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
}

const appPool = new sql.ConnectionPool(config)
try {
    appPool.connect()
}
catch (error) {
    console.error(error)
}

app.post('/api/insert', (req: any, res: any) => {
    const transaction = appPool.transaction();
    transaction.begin((err: any) => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        request.input('well_id', sql.Int, req.body.well_id);
        request.input('fa_latitude', sql.Decimal(10, 5), req.body.fa_latitude);
        request.input('fa_longitude', sql.Decimal(10, 5), req.body.fa_longitude);
        request.input('fa_genlatitude', sql.Decimal(8, 3), req.body.fa_genlatitude);
        request.input('fa_genlongitude', sql.Decimal(8, 3), req.body.fa_genlongitude);
        request.input('weather', sql.NVarChar, req.body.weather);
        request.input('wellcovercondition', sql.NVarChar, req.body.wellcovercondition);
        request.input('wellcoverdescription', sql.NVarChar, req.body.wellcoverdescription);
        request.input('topography', sql.NVarChar, req.body.topography);
        request.input('runOff', sql.NVarChar, req.body.surfacerunoff);
        request.input('pooling', sql.NVarChar, req.body.pooling);
        request.input('temp', sql.Decimal(8, 2), req.body.groundwatertemp);
        request.input('ph', sql.Decimal(8, 2), req.body.ph);
        request.input('conductivity', sql.Decimal(8, 2), parseFloat(req.body.conductivity));
        request.input('name', sql.NVarChar, req.body.name);
        request.input('observation', sql.NVarChar, req.body.observations);
        request.input('dateentered', sql.DateTime, req.body.datecollected);

        transaction.on('rollback', () => {
            rolledBack = true
        })

        request
            .query('INSERT INTO dbo.tblFieldActivity(well_id, fa_latitude, fa_longitude, fa_genlatitude, fa_genlongitude, fa_weather, fa_wellcovercondition, fa_wellcoverdescription, fa_topography, fa_surfacerunoff, fa_pooling, fa_groundwatertemp, fa_ph, fa_conductivity, fa_datacollector, fa_observation, fa_datecollected) VALUES(@well_id, @fa_latitude, @fa_longitude, @fa_genlatitude, @fa_genlongitude, @weather, @wellcovercondition, @wellcoverdescription, @topography, @runOff, @pooling, @temp, @ph, @conductivity, @name, @observation, @dateentered)', function (err: any, recordset: any) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Query does not execute.')
                    if (!rolledBack) {
                        transaction.rollback((err: any) => {
                            // ... error checks
                        })
                    }
                } else {
                    transaction.commit((err: any) => {
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
app.post('/createclasslab', (req: { body: { fa_id: any; ammonia: any; calciumhardness: any; chloride: any; bacteria: any; copper: any; iron: any; manganese: any; nitrate: any; wslSample: any; datacollector: any; observations: any; dateentered: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    const transaction = appPool.transaction();
    transaction.begin((err: any) => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', (aborted: any) => {
            rolledBack = true
        })

        request.input('fa_id', sql.Int, req.body.fa_id);
        request.input('ammonia', sql.Decimal(8, 2), req.body.ammonia);
        request.input('calcium', sql.Decimal(8, 2), req.body.calciumhardness);
        request.input('chloride', sql.Decimal(8, 2), req.body.chloride);
        request.input('bacteria', sql.NVarChar, req.body.bacteria);
        request.input('copper', sql.Decimal(8, 2), req.body.copper);
        request.input('iron', sql.Decimal(8, 2), req.body.iron);
        request.input('manganese', sql.Decimal(8, 2), req.body.manganese);
        request.input('nitrate', sql.Decimal(8, 2), req.body.nitrate);
        request.input('wslSample', sql.NVarChar, req.body.wslSample);
        request.input('name', sql.NVarChar, req.body.datacollector);
        request.input('observations', sql.NVarChar, req.body.observations);
        request.input('dateentered', sql.DateTime, req.body.dateentered);

        request
            .query('INSERT INTO dbo.tblClassroomLab(fieldactivity_id, cl_ammonia, cl_calciumhardness, cl_chloride, cl_bacteria, cl_copper, cl_iron, cl_manganese, cl_nitrate, cl_observation, cl_wsl_sample_id, cl_datacollector, cl_datecollected) VALUES(@fa_id, @ammonia, @calcium, @chloride, @bacteria, @copper, @iron, @manganese, @nitrate, @observations, @wslSample, @name, @dateentered)', function (err: any, recordset: any) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Query does not execute.')
                    if (!rolledBack) {
                        transaction.rollback((err: any) => {
                            // ... error checks
                        })
                    }
                } else {
                    transaction.commit((err: any) => {
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

app.post('/createwellinfo', async function (req: any, res: any) {
    const wellInfo = AppDataSource.dataSource.getRepository(TblWellInfo).create(req.body);
    const results = await AppDataSource.dataSource.getRepository(TblWellInfo).save(wellInfo);
    return res.send(results);
});

app.get('/Wells', async (req: { query: { filterBy: string; sortBy: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: { Wells: any; }): void; new(): any; }; }; }) => {
    let query = 'SELECT * FROM dbo.tblWellInfo';


    if (kywmemValue && kywmemValue != "") {
        query = query +  ` WHERE school_id = ${kywmemValue}`
        if (req.query.filterBy && req.query.filterBy != "undefined") {
            query = query + ` AND ${req.query.filterBy}`
        }
    } else if (req.query.filterBy && req.query.filterBy != "undefined") {
        query = query + ` Where ${req.query.filterBy}`
    }

    // if (req.query.filterBy && req.query.filterBy != "undefined") {
    //     query = query + ` AND ${req.query.filterBy}`
    // }

    if (req.query.sortBy && req.query.sortBy != "undefined") {
        query = query + ` ORDER BY ${req.query.sortBy}`
    }

    appPool.query(query, function (err: any, recordset: { recordset: any; }) {
        if (err) {
            console.log(err)
            res.status(500).send('SERVER ERROR')
            return;
        }
        res.status(200).json({ Wells: recordset.recordset });
    });
});


app.get('/GetWellInfo', async (req: { query: { well_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: { WellInfo: any; }): void; new(): any; }; }; }) => {
    const transaction = appPool.transaction();
    transaction.begin((err: any) => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', (aborted: any) => {
            rolledBack = true
        })

        request.input('well_id', sql.Int, req.query.well_id).query('SELECT * FROM dbo.tblWellInfo WHERE well_id = @well_id;', function (err: any, recordset: { recordset: any; }) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback((err: any) => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit((err: any) => {
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

app.get('/idp/metadata', (req: { idp: { getMetadata: () => any; }; }, res: { header: (arg0: string, arg1: string) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
    res.header('Content-Type', 'text/xml').send(req.idp.getMetadata());
})

app.get('/FieldList', async (req: { query: { well_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: { FieldList: any; }): void; new(): any; }; }; }) => {
    const transaction = appPool.transaction();
    transaction.begin((err: any) => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', (aborted: any) => {
            rolledBack = true
        })

        //const secondFilter = req.query.newLab === "True" ? " AND classlab_id IS NULL" : "";

        request.input('well_id', sql.Int, req.query.well_id).query('SELECT fa.fieldactivity_id, fa.fa_datecollected, cl.classlab_id, cl.cl_datecollected FROM dbo.tblFieldActivity AS fa LEFT JOIN dbo.tblClassroomLab AS cl ON fa.fieldactivity_id = cl.fieldactivity_id WHERE fa.well_id = @well_id;', function (err: any, recordset: { recordset: any; }) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback((err: any) => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit((err: any) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        // console.log(recordset)
                        res.status(200).json({ FieldList: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get('/GetFieldEntry', async (req: { query: { fieldactivity_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: { FieldActivity: any; }): void; new(): any; }; }; }) => {
    const transaction = appPool.transaction();
    transaction.begin((err: any) => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', (aborted: any) => {
            rolledBack = true
        })

        request.input('fieldactivity_id', sql.Int, req.query.fieldactivity_id).query('SELECT * FROM dbo.tblFieldActivity WHERE fieldactivity_id = @fieldactivity_id;', function (err: any, recordset: { recordset: any; }) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback((err: any) => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit((err: any) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        // console.log(recordset)
                        res.status(200).json({ FieldActivity: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get('/GetLabEntry', async (req: { query: { classlab_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: { ClassLabEntry: any; }): void; new(): any; }; }; }) => {
    const transaction = appPool.transaction();
    transaction.begin((err: any) => {
        if (err)
            console.error("Transaction Failed")
        const request = appPool.request(transaction)
        let rolledBack = false

        transaction.on('rollback', (aborted: any) => {
            rolledBack = true
        })


        request.input('classlab_id', sql.Int, req.query.classlab_id).query('SELECT * FROM dbo.tblClassRoomLab WHERE classlab_id = @classlab_id;', function (err: any, recordset: { recordset: any; }) {
            if (err) {
                console.log(err)
                res.status(500).send('Query does not execute.')
                if (!rolledBack) {
                    transaction.rollback((err: any) => {
                        // ... error checks
                    })
                }
            } else {
                transaction.commit((err: any) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('500: Server Error.')
                    }
                    else {
                        // console.log(recordset)
                        res.status(200).json({ ClassLabEntry: recordset.recordset })
                    }
                })
            }
        })
    })
})

app.get('/sso/redirect', async (req: { sp: { createLoginRequest: (arg0: any, arg1: string) => PromiseLike<{ id: any; context: any; }> | { id: any; context: any; }; }; idp: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): any; new(): any; }; }; }) => {

    const { id, context: redirectUrl } = await req.sp.createLoginRequest(req.idp, 'redirect');
    console.log("id: " + id)
    console.log("Context returned: " + redirectUrl + "\n");

    return res.status(200).send(redirectUrl)
    
});

app.get('/userinfo', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { kywmem: string; displayn: string; }): void; new(): any; }; }; }) => {
    res.status(200).json({ kywmem: kywmemValue, displayn : displayName})
})

// receive the idp response
app.post("/saml/acs", async (req: { sp: { parseLoginResponse: (arg0: any, arg1: string, arg2: any) => Promise<any>; }; idp: any; }, res: { redirect: (arg0: string) => void; }) => {
    console.log("HEere")
    await req.sp.parseLoginResponse(req.idp, 'post', req)
    .then((parseResult: { extract: { attributes: { kywmem: string; displayName: string; }; }; }) => {
        // Use the parseResult can do customized action

        kywmemValue = parseResult.extract.attributes.kywmem
        displayName = parseResult.extract.attributes.displayName

        console.log('kywmem Value:', kywmemValue);
        console.log(' displayName Value:', displayName);
        });
    res.redirect("/Well")

});

app.get("*", (req: any, res: { sendFile: (arg0: any) => void; }) => {
    res.sendFile(path.resolve(__dirname, "wwwroot", "index.html"));
});

app.listen(process.env.PORT || 7193, () => {
    console.log("server is running");
});

app.get("*", (req: any, res: { sendFile: (arg0: any) => void; }) => {
    console.log("hit")
    res.sendFile(path.resolve(__dirname, "wwwroot", "index.html"));
});

app.get("/health", (req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    console.log("hit")
    res.status(200).send("Healthy")
});
