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
    const [schoolid, setSchoolid] = useState("");

    useEffect(() => { // very inefficient solution, may have to come back to this and use user contexts
        Axios.get('/userinfo', {
            responseType: "json"
        }).then(function (response) {
            setSchoolid(response.data.kywmem);
        }).catch(function (error) {
            console.error("Failed to fetch school id:", error);
        });
    }, []);

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
        //Checking to see if user is offline - if so then we cache the data that would have been submitted
        if (!navigator.onLine) {
            const queuedData = JSON.parse(localStorage.getItem('queuedData')) || [];
            queuedData.push(wellInfo);
            localStorage.setItem('queuedData', JSON.stringify(queuedData));
            console.log('Data queued as the user is offline');
        } else { //Making post request if the user is online

            Axios.post('/createwellinfo', {
                wiAddress: wellInfo.address,
                wiAquiferclass: wellInfo.aquiferclass,
                wiAquifertype: wellInfo.aquifertype,
                wiBoreholediameter: Number(wellInfo.boreholediameter),
                wiCity: wellInfo.city,
                countyId: wellInfo.county, //countyId
                wiDatacollector: wellInfo.datacollector, //wiDatacollector
                wiDateentered: wellInfo.dateentered,
                wiDnrWellId: wellInfo.dnrId, //wiDnrWellId
                wiEmailWellUser: wellInfo.email, //wiEmailWellUser
                wiEstlatitude: wellInfo.estlatitude,
                wiEstlongitude: wellInfo.estlongitude,
                wiInstallyear: parseInt(wellInfo.installyear),
                wiLanduse5yr: wellInfo.landuse5yr,
                wiMaintenance5yr: wellInfo.maintenance5yr,
                nrdId: wellInfo.nrd,
                wiNumberwelluser: wellInfo.numberwelluser,
                wiObservation: wellInfo.observation,
                wiPestmanure: wellInfo.pestmanure,
                wiPhoneWellUser: wellInfo.phone, //wiPhoneWellUser
                wiRegistrationNumber: wellInfo.registNum, //wiRegistrationNumber
                school: schoolid, //school
                wiSmelltaste: wellInfo.smelltaste,
                wiSmelltasteDescription: wellInfo.smelltastedescription, //wiSmelltasteDescription
                wiState: wellInfo.state,
                wiTotaldepth: Number(wellInfo.totaldepth),
                wiWaterleveldepth: Number(wellInfo.wellwaterleveldepth), //wiWaterleveldepth
                wiWellcasematerial: wellInfo.wellcasematerial,
                wiWellcode: wellInfo.wellcode,
                wiWelldry: wellInfo.welldry,
                wiWelldryDescription: wellInfo.welldrydescription, //wiWelldryDescription
                wiWellname: wellInfo.wellname,
                wiWellOwner: wellInfo.wellowner, //wiWellOwner
                wiWelltype: wellInfo.welltype,
                wiWellUser: wellInfo.welluser, //wiWellUser
                wiZipcode: wellInfo.zipcode,

            })
                .then(() => {
                    console.log("success");
                })
        }
    };

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
                <div key={prompt.id}>{renderField(prompt, wellInfo, handleChange)}
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