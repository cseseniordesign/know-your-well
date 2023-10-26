import './css/forms.css'
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'react-router-dom';
import NumberEntry from './numberentry';
import DropDownEntry from './dropdownentry';
import ShortTextEntry from './shorttextentry';
import FormFooter from './formfooter';
import LongTextEntry from './longtextentry';

export default function Field() {
    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));

    const initialFieldData = {
        fa_latitude: "",
        fa_longitude: "",
        conditions: "",
        temp: "",
        ph: "",
        conductivity: "",
        name: "",
        observation: "",
        wellcover: "",
        wellcoverdescription: "",
        dateentered: moment().format('L, h:mm a'),
        evidence: "",
        pooling: "",
    };

    // Checking for saved sessions
    const [sessionContinued, setSessionContinued] = useState(searchParams.get("sessionContinued"));
    if (localStorage.getItem("fieldData" + well_id)) {
        if (sessionContinued === null) {
            const continue_session = window.confirm("Continue last saved session?");
            if (continue_session) {
                setSessionContinued(true);
            } else {
                handleClearLocalStorage();
                setSessionContinued(false); // ends forever pop-up loop
                /* will need to be changed if sessionContinued is ever used elsewhere,
                potenitally add another var to set to true / false if question has already been asked? */
            }
        }
    }
    let pullCachedData = sessionContinued;

    const cachedData = pullCachedData ? JSON.parse(localStorage.getItem("fieldData" + well_id)) : null;
    const wellName = searchParams.get("wellName");
    const [fieldData, setFieldData] = useState(sessionContinued ? cachedData : initialFieldData);
    const fa_genlatitude = Math.round(fieldData.fa_latitude * 100) / 100; // rounds to third decimal place
    const fa_genlongitude = Math.round(fieldData.fa_longitude * 100) / 100; // rounds to third decimal place


    // Updating if user decides to load session
    useEffect(() => {
        setFieldData(sessionContinued ? cachedData : initialFieldData)
    }, [sessionContinued]);

    function updateFieldData(fieldName, value) {
        setFieldData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    }

    const handleDropdownChange = (fieldName, event) => {
        updateFieldData(fieldName, event.target.value);
    }

    // geolocation  
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (!sessionContinued) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation(position.coords);
                        updateFieldData('fa_latitude', position.coords.latitude);
                        updateFieldData('fa_longitude', position.coords.longitude);

                    });
            } else {
                console.log('Geolocation is not supported by this browser.');
                alert("Geolocation is not working right now, please fill it in manually.");
            }
        }
    }, []);

    function addField() {
        Axios.post('/api/insert', {
            well_id: fieldData.well_id,
            fa_latitude: fieldData.fa_latitude,
            fa_longitude: fieldData.fa_longitude,
            fa_genlatitude: fa_genlatitude,
            fa_genlongitude: fa_genlongitude,
            weather: fieldData.conditions,
            wellcovercondition: fieldData.wellcover,
            wellcoverdescription: fieldData.wellcoverdescription,
            surfacerunoff: fieldData.evidence,
            pooling: fieldData.pooling,
            groundwatertemp: fieldData.temp,
            ph: fieldData.ph,
            conductivity: fieldData.conductivity,
            name: fieldData.name,
            observations: fieldData.observation,
            datecollected: fieldData.dateentered,
        })
            .then(() => {
                console.log("success");
            })
    };

    const idList = ["fa_latitude", "fa_longitude", "conditions", "wellcover", "temp", "ph", "conductivity", "name", "observation"];
    // caching - local storage
    function cacheFieldForm() {
        let elementsValid = true;
        // Checking if entered elements are valid.
        for (let i = 0; i < idList.length && elementsValid; i++) {
            const id = idList[i];
            const element = document.getElementById(id);
            elementsValid = element.value === "" || element.checkValidity();
            if (!elementsValid) {
                element.reportValidity();
            }
        }

        if (elementsValid && window.confirm("Any previously saved data will be overwritten.\nWould you like to continue?")) {
            localStorage.setItem("fieldData" + well_id, JSON.stringify(fieldData));
            alert("Information Saved!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&FieldRedirect=True`;
        }
    };

    function handleClearLocalStorage() {
        localStorage.removeItem("fieldData" + well_id);
    };

    const validForm = () => {
        var form = document.getElementById("submissionAlert");
        if (form.checkValidity()) {
            return true;
        }
        else {
            form.reportValidity();
            return false;
        }
    }
    const backButton = () => {
        if (window.confirm("Any unsaved data will be lost.\nWould you like to continue?")) {
            if (well_id != null) {
                window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
            } else {
                window.location.href = `/Well`;
            }
        }
    }

    function submitForm() {
        if (validForm() && window.confirm("Submitted data is final and can only be edited by Nebraska Water Center Staff.\nWould you like to continue?")) {
            addField();
            handleClearLocalStorage();
            alert("Succesfully submitted Field Form!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`
        }
    }

    return (
        <form id="submissionAlert">
            <h2>{wellName}: Field</h2>
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>

            <div>
                {location || sessionContinued ? (
                    <div>
                        <NumberEntry
                            fieldTitle="Latitude (use 4-12 decimals):"
                            metric={fieldData.fa_latitude}
                            min="40"
                            max="43"
                            id="fa_latitude"
                            label="Degrees"
                            setValue={(value) => updateFieldData('fa_latitude', value)}
                            required={true}
                        />
                        <NumberEntry
                            fieldTitle="Longitude (use 4-12 decimals):"
                            metric={fieldData.fa_longitude}
                            min="-104"
                            max="-95.417"
                            id="fa_longitude"
                            label="Degrees"
                            setValue={(value) => updateFieldData('fa_longitude', value)}
                            required={true}
                        />

                    </div>
                ) : (
                    <div>
                        <p>Please allow this site to access your location</p>
                        <button onClick={() => window.location.reload()}>Reload</button>
                    </div>
                )}
            </div>
            <LongTextEntry
                fieldTitle="Conditions: Describe weather, temperature, or anything note-worthy about your well"
                value={fieldData.conditions}
                id="conditions"
                setValue={(value) => updateFieldData('conditions', value)}
            />
            <DropDownEntry
                fieldTitle="Condition of the well cover"
                id="wellcover"
                options={["Intact", "Observable Opening", "Damaged"]}
                value={fieldData.wellcover}
                onChange={(event) => handleDropdownChange('wellcover', event)}
                required={true}
            />
            {(fieldData.wellcover === "Observable Opening" || fieldData.wellcover === "Damaged") && (
                <LongTextEntry
                    fieldTitle="Well Cover Description:"
                    value={fieldData.wellcoverdescription}
                    id="wellcoverdescription"
                    setValue={(value) => updateFieldData('wellcoverdescription', value)}
                    required={false}
                />)}
            <DropDownEntry
                fieldTitle="Is there evidence of surface run-off at the entry to the well?"
                id="evidence"
                options={["Yes", "No"]}
                value={fieldData.evidence}
                onChange={(event) => handleDropdownChange('evidence', event)}
                required={true}
            />
            <DropDownEntry
                fieldTitle="Is there evidence of pooling or puddles within 12 ft of the well?"
                id="pooling"
                options={["Yes", "No"]}
                value={fieldData.pooling}
                onChange={(event) => handleDropdownChange('pooling', event)}
                required={true}
            />
            <NumberEntry
                fieldTitle="Groundwater Temperature"
                metric={fieldData.temp}
                min="0"
                max="100"
                id="temp"
                label="Degrees Celsius"
                setValue={(value) => updateFieldData('temp', value)}
                required={true}
            />
            <NumberEntry
                fieldTitle="ph"
                metric={fieldData.ph}
                min="0"
                max="14"
                id="ph"
                label=""
                setValue={(value) => updateFieldData('ph', value)}
                required={true}
            />
            <NumberEntry
                fieldTitle="Conductivity"
                metric={fieldData.conductivity}
                id="conductivity"
                min="100"
                max="2000"
                label="uS/cm"
                setValue={(value) => updateFieldData('conductivity', value)}
                required={true}
            />
            <ShortTextEntry
                fieldTitle="Data Collector’s Name:"
                value={fieldData.name}
                id="name"
                setValue={(value) => updateFieldData('name', value)}
                required={true}
            />
            <ShortTextEntry
                fieldTitle="Observations"
                value={fieldData.Observation}
                id="observation"
                maxLength="150"
                setValue={(value) => updateFieldData('Observation', value)}
                required={true}
            />
            <div className="css">
                <label htmlFor="dateentered">
                    Date Entered:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="dateentered">
                    <DatePicker
                        required
                        value={fieldData.dateentered}
                        dateFormat="MM-DD-YYYY"
                        timeFormat="hh:mm A"
                        onChange={(value) => updateFieldData('dateentered', value)}
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
            <FormFooter submitForm={submitForm} backButton={backButton} cacheForm={cacheFieldForm} />
            <br/>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={submitForm}>Submit</button>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={cacheFieldForm}>Save</button>
        
        </form >
    );
}
