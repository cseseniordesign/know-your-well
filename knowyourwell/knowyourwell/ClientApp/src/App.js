import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './components/css/custom.css';
import './components/css/style.css';
import Axios from 'axios'
import Login from "./components/login";
import NavMenu from './components/navmenu';
import Well from './components/well';
import EditWell from './components/editwell';
import WellInfo from './components/wellinfo';
import Field from './components/field';
import ClassLab from './components/classlab';
import PreviousEntries from './components/previousentries';
import AboutProject from './components/aboutproject';
import ViewField from './components/viewfield';
import ViewClassLab from './components/viewclasslab';
import ViewWell from './components/viewwell';
import FieldSelection from './components/fieldselection';
import FormSubmission from './components/formsubmission';
import WellFieldLabContext from './components/reusable/WellFieldLabContext'
import { useState, useEffect } from 'react';


export default function App() {
    const [wellInfoQueue, setWellInfoQueue] = useState(() => {
        const storedQueue = localStorage.getItem('wellInfoQueue');
        return storedQueue && storedQueue !== "undefined" ? JSON.parse(storedQueue) : [];
    });
    const [fieldQueue, setFieldQueue] = useState(() => {
        const storedQueue = localStorage.getItem('fieldQueue');
        return storedQueue && storedQueue !== "undefined" ? JSON.parse(storedQueue) : [];
    });
    const handleOnline = () => {
        console.log('Online');
        wellInfoQueue?.forEach(wellInfo => {
            Axios.post('/createwellinfo', {
                address: wellInfo.address,
                aquiferclass: wellInfo.aquiferclass,
                aquifertype: wellInfo.aquifertype,
                boreholediameter: Number(wellInfo.boreholediameter),
                city: wellInfo.city,
                countyid: wellInfo.county,
                datacollector: wellInfo.datacollector,
                dateentered: wellInfo.dateentered,
                dnrId: wellInfo.dnrId,
                email: wellInfo.email,
                estlatitude: wellInfo.estlatitude,
                estlongitude: wellInfo.estlongitude,
                installyear: parseInt(wellInfo.installyear),
                landuse5yr: wellInfo.landuse5yr,
                maintenance5yr: wellInfo.maintenance5yr,
                nrdid: wellInfo.nrd,
                numberwelluser: wellInfo.numberwelluser,
                observation: wellInfo.observation,
                pestmanure: wellInfo.pestmanure,
                phone: wellInfo.phone,
                registNum: wellInfo.registNum,
                school_id: wellInfo.schoolid,
                smelltaste: wellInfo.smelltaste,
                smelltastedescription: wellInfo.smelltastedescription,
                state: wellInfo.state,
                totaldepth: Number(wellInfo.totaldepth),
                wellwaterleveldepth: Number(wellInfo.wellwaterleveldepth),
                wellcasematerial: wellInfo.wellcasematerial,
                wellcode: wellInfo.wellcode,
                welldry: wellInfo.welldry,
                welldrydescription: wellInfo.welldrydescription,
                wellname: wellInfo.wellname,
                wellowner: wellInfo.wellowner,
                welltype: wellInfo.welltype,
                welluser: wellInfo.welluser,
                zipcode: wellInfo.zipcode,
            })
                .then(() => {
                    console.log("success");
                })
        });
        setWellInfoQueue([]);
        
        fieldQueue?.forEach(field => {
            Axios.post('/api/insert', {
                well_id: field.well_id,
                fa_latitude: field.fa_latitude,
                fa_longitude: field.fa_longitude,
                fa_genlatitude: field.fa_genlatitude,
                fa_genlongitude: field.fa_genlongitude,
                weather: field.conditions,
                wellcovercondition: field.wellcover,
                wellcoverdescription: field.wellcoverdescription,
                topography: field.topography,
                surfacerunoff: field.evidence,
                pooling: field.pooling,
                groundwatertemp: field.temp,
                ph: field.ph,
                conductivity: field.conductivity,
                name: field.name,
                observations: field.observations,
                datecollected: field.dateentered,
            })
                .then(() => {
                    console.log("success");
                })
            setFieldQueue([]);
        });
    };
    window.addEventListener('online', handleOnline);
    useEffect(() => {
        localStorage.setItem('wellInfoQueue', JSON.stringify(wellInfoQueue));
        localStorage.setItem('fieldQueue', JSON.stringify(fieldQueue))
    }, [wellInfoQueue]);
    return (
        <>
            <NavMenu />
            <WellFieldLabContext.Provider value={{ wellInfoQueue, setWellInfoQueue, fieldQueue, setFieldQueue }}>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/well" element={<Well />} />
                    <Route exact path="/editwell" element={<EditWell />} />
                    <Route exact path="/wellinfo" element={<WellInfo />} />
                    <Route exact path="/field" element={<Field />} />
                    <Route exact path="/classlab" element={<ClassLab />} />
                    <Route exact path="/previousentries" element={<PreviousEntries />} />
                    <Route exact path="/aboutproject" element={<AboutProject />} />
                    <Route exact path="/viewfield" element={<ViewField />} />
                    <Route exact path="/viewclasslab" element={<ViewClassLab />} />
                    <Route exact path="/viewwell" element={<ViewWell />} />
                    <Route exact path="/fieldselection" element={<FieldSelection />} />
                    <Route exact path="/formsubmission" element={<FormSubmission />} />
                </Routes>
            </WellFieldLabContext.Provider>
        </>
    );
}
