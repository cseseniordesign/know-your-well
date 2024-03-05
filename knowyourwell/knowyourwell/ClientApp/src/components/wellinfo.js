import React from 'react'
import './css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import devWellInfo from './resources/devwellinfo.ts';
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
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [schoolid, setSchoolid] = useState("");
    const [wellcode, setWellCode] = useState("");

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
                // response should be well code
                console.log(response.data.wellcode)
                setWellCode(response.data.wellcode)
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
        if (fieldName === 'wiSmelltaste' && (value === 'No' || value === 'Unknown')) {
            updateWellInfo('wiSmelltasteDescription', "");
        } else if (fieldName === 'wiWelldry' && (value === 'No' || value === 'Unknown')) {
            updateWellInfo('wiWelldryDescription', "");
        } else if (fieldName === 'wiPhoneWellUser') {
            setIsValidPhone(phonePattern.test(value));
        } else if (fieldName === 'wiEmailWellUser') {
            setIsValidEmail(emailPattern.test(value));
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
            Axios.post('/createwellinfo', {wellInfo})
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
                <label htmlFor="wiDateentered">
                    Date Entered:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="wiDateentered">
                    <DatePicker
                        value={wellInfo.wiDateentered}
                        dateFormat="MM-DD-YYYY"
                        timeFormat="hh:mm A"
                        onChange={(value) => updateWellInfo('wiDateentered', value)}
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
                    if (checkDepthValidation(wellInfo.wiTotaldepth, wellInfo.wiWaterleveldepth)) {
                        submitForm();
                    } else {
                        updateWellInfo('wiWaterleveldepth', "");
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