import React from 'react'
import './css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useContext } from 'react';
import devWellInfo from './resources/devwellinfo';
import prodWellInfo from './resources/prodwellinfo';
import wellInfoPrompts from './resources/wellinfoprompts';
import renderField from './reusable/renderfield';
import WellFieldLabContext from './reusable/WellFieldLabContext';

export default function WellInfo() {
    let initialWellInfo;

    if (process.env.NODE_ENV === "development") {
        initialWellInfo = devWellInfo;
    } else {
        initialWellInfo = prodWellInfo;
    }

    const [wellInfo, setWellInfo] = useState(initialWellInfo);
    const [schoolid, setSchoolid] = useState("");
    const [wellcode, setWellCode] = useState("");
    const { wellInfoQueue, setLocalWellInfoQueue } = useContext(WellFieldLabContext);

    useEffect(() => { // very inefficient solution, may have to come back to this and use user contexts
        Axios.get('/userinfo', {
            responseType: "json"
        }).then(function (response) {
            setSchoolid(response.data.kywmem);
        }).catch(function (error) {
            console.error("Failed to fetch school id:", error);
        });

        Axios.get('/wellcode', {
        }).then(function (response) {
            if(response.data.kywmem == "" && response.data.displayn == "" && process.env.NODE_ENV == "development"){
                // setSchoolid("1");
                setWellCode("abc123")
            }else {
                // response should be well code
                // console.log(response.data.wellcode)
                setWellCode(response.data.wellcode)
            }
        }).catch(function (error) {
            console.error("Failed to generate well code:", error);
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
        const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
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

    function cacheWellInfo() {
        localStorage.setItem('wellInfo', JSON.stringify(wellInfo));
        alert('Well information has been saved!');
    }

    function clearLocalStorage() {
        localStorage.removeItem('wellInfo');
    }

    function addWellInfo() {
        const updatedQueue = [...wellInfoQueue, { ...wellInfo, schoolid: schoolid, wellcode: wellcode }];

        //Checking to see if user is offline - if so then we cache the data that would have been submitted
        if (navigator.onLine) {
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
                school_id: schoolid,
                smelltaste: wellInfo.smelltaste,
                smelltastedescription: wellInfo.smelltastedescription,
                state: wellInfo.state,
                totaldepth: Number(wellInfo.totaldepth),
                wellwaterleveldepth: Number(wellInfo.wellwaterleveldepth),
                wellcasematerial: wellInfo.wellcasematerial,
                wellcode: wellcode,
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
            alert("Successfully submitted Well Info Form!");
        } else {
            console.log(updatedQueue)
            setLocalWellInfoQueue(updatedQueue);

            alert("You are offline, Well Info Form will automatically be submitted when you regain an internet connection")
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
            <p>* = Required Field</p>
            <p>No punctuation or special characters, such as ,.[]();’/\!@#) in text fields.</p>
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
            <button type="button" style={{ width: "180px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
            <button
                type="button"
                style={{ width: "180px", height: "17%" }}
                className="btn btn-secondary btn-lg"
                onClick={cacheWellInfo}
            >Save</button>
        </form>
    );
}