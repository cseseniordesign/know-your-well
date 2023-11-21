import React from 'react'
import './css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import countyOptions from './resources/counties';
import nrdOptions from './resources/nrds';
import devWellInfo from './resources/devwellinfo';
import prodWellInfo from './resources/prodwellinfo';
import wellInfoPrompts from './resources/wellinfoprompts';
import renderField from './reusable/renderfield';

export default function WellInfo() {
    let initialWellInfo;

    if (process.env.NODE_ENV === "development") {
        initialWellInfo = devWellInfo;
    } else {
        initialWellInfo = prodWellInfo;
    }

    const [wellInfo, setWellInfo] = useState(initialWellInfo);

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);

    function updateWellInfo(fieldName, value) {
        setWellInfo((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    }

    const handleChange = (fieldName, value) => {
        const emailPattern = /\S+@\S+\.\S+/;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (fieldName === 'smelltaste' && (value === 'No' || value === 'Unknown')) {
            updateWellInfo('smelltastedescription', "");
        } else if (fieldName === 'welldry' && (value === 'No' || value === 'Unknown')) {
            updateWellInfo('welldrydescription', "");
        } else if (fieldName === 'phone') {
            updateWellInfo('isValidPhone', phonePattern.test(value));
        } else if (fieldName === 'email') {
            updateWellInfo('isValidEmail', emailPattern.test(value));
        }
        updateWellInfo(fieldName, value);
    }

    useEffect(() => {
        const savedWellInfo = localStorage.getItem('wellInfo');
        if (savedWellInfo) {
            const confirmContinue = window.confirm('Continue with saved data?');
            if (confirmContinue) {
                setWellInfo(JSON.parse(savedWellInfo));
            } else {
                localStorage.removeItem('wellInfo');
            }
        }
    }, []);
    useEffect(() => {
        const handleOnline = () => {
            console.log('Online');
            const queuedData = JSON.parse(localStorage.getItem('queuedData')) || [];
            queuedData.forEach(data => {
                Axios.post('/createwellinfo', data)
                    .then(() => {
                        console.log("Queued data sent successfully");
                        // Remove the data from the queue after successful submission
                    })
                    .catch(error => console.log(error));
            });
            localStorage.removeItem('queuedData');
        };
        const handleOffline = () => {
            console.log('Offline');
           
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    
    function cacheWellInfo() {
        localStorage.setItem('wellInfo', JSON.stringify(wellInfo));
        alert('Well information has been saved!');
    }

    function clearLocalStorage() {
        localStorage.removeItem('wellInfo');
    }

    function addWellInfo() {
        wellInfo.county = countyOptions.indexOf(wellInfo.county) + 1
        wellInfo.nrd = nrdOptions.indexOf(wellInfo.nrd) + 1
        //Checking to see if user is offline - if so then we cache the data that would have been submitted
        if (!navigator.onLine) {
            const queuedData = JSON.parse(localStorage.getItem('queuedData')) || [];
            queuedData.push(wellInfo);
            localStorage.setItem('queuedData', JSON.stringify(queuedData));
            console.log('Data queued as the user is offline');
        } else { //Making post request if the user is online
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
            installyear: JSON.stringify(wellInfo.installyear).substring(1, 5),
            landuse5yr: wellInfo.landuse5yr,
            maintenance5yr: wellInfo.maintenance5yr,
            nrdid: wellInfo.nrd,
            numberwelluser: wellInfo.numberwelluser,
            observation: wellInfo.observation,
            pestmanure: wellInfo.pestmanure,
            phone: wellInfo.phone,
            registNum: wellInfo.registNum,
            school_id: wellInfo.school_id,
            smelltaste: wellInfo.smelltaste,
            smelltastedescription: wellInfo.smelltastedescription,
            state: wellInfo.state,
            topography: wellInfo.topography,
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
        }};

    const validForm = () => {
        var form = document.getElementById('submissionAlert');
        if (form.checkValidity()) {
            return true;
        } else {
            form.reportValidity();
            return process.env.NODE_ENV === 'development';
        }
    }

    const backButton = () => {
        if (window.confirm("Any unsaved data will be lost.\nWould you like to continue?")) {
            window.location.href = `/well`;
        }
    }

    function submitForm() {
        if (validForm() && window.confirm("Submitted data is final and can only be edited by Nebraska Water Center Staff.\nWould you like to continue?")) {
            addWellInfo();
            //clearing cached data after making the post request
            clearLocalStorage();
            alert("Successfully submitted Well Info Form!");
            window.location.href = `/well`;
        
        }
    }           
    function checkDepthValidation(totaldepth, wellwaterleveldepth) {
        if (totaldepth === "" && wellwaterleveldepth >= 0) {
            return true;
        } else {
            if (Number(totaldepth) >= Number(wellwaterleveldepth)) {
                return true;
            } else return false;
        }
    }

    return (
        <form action="/editwell" id="submissionAlert" >
            <h2>Well Info</h2>
            <p>*=Required Field</p>
            {wellInfoPrompts.map((prompt) => (
                <div key={prompt.id}>{prompt.id === 'phone' ? 
                renderField(prompt, wellInfo, handleChange, wellInfo.isValidPhone) : 
                prompt.id === 'email' ?
                renderField(prompt, wellInfo, handleChange, wellInfo.isValidEmail) : 
                renderField(prompt, wellInfo, handleChange)}
                </div>
            ))}
            <div className="css">
                <label htmlFor="dateentered">
                    Date Entered:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="dateentered">
                    <DatePicker
                        value={wellInfo.dateentered}
                        dateFormat="MM-DD-YYYY"
                        timeFormat="hh:mm A"
                        onChange={(value) => updateWellInfo('dateentered', value)}
                        inputProps={{
                            style: {
                                width: 300,
                                textAlign: 'center',
                                border: '1px solid black'
                            }
                        }}
                    /> {"  "}
                </div>
            </div>
            <br />
            <button type="button" style={{ width: "180px", height: "17%" }} className="btn btn-primary btn-lg"
                onClick={() => {
                    if (checkDepthValidation(wellInfo.totaldepth, wellInfo.wellwaterleveldepth)) {
                        submitForm();
                    } else {
                        updateWellInfo('waterleveldepth', "");
                        window.alert("Well water depth CANNOT be greater than total well depth.");
                    }
                }}
            >Submit</button>
            <button
                type="button"
                style={{ width: "180px", height: "17%" }}
                className="btn btn-secondary btn-lg"
                onClick={cacheWellInfo}
            >Save</button>
            <button
                type="button" style={{ width: "180px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
        </form>
    );
}