import './css/forms.css'
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'react-router-dom';
import NumberEntry from './reusable/numberentry';
import { useContext } from 'react';
import FormFooter from './reusable/formfooter';
import devFieldData from './resources/devfielddata';
import prodFieldData from './resources/prodfielddata';
import fieldPrompts from './resources/fieldprompts';
import renderField from './reusable/renderfield';
import WellFieldLabContext from './reusable/WellFieldLabContext';

export default function Field() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const { fieldQueue, setFieldQueue } = useContext(WellFieldLabContext);
    const well_id = parseInt(searchParams.get("id"));

    let initialFieldData;

    if (process.env.NODE_ENV === "development") {
        initialFieldData = devFieldData;
    } else {
        initialFieldData = prodFieldData;
    }

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
    useEffect(() => {
        const savedFieldData = localStorage.getItem('fieldData');
        if (savedFieldData) {
            const confirmContinue = window.confirm('Continue with saved data?');
            if (confirmContinue) {
                fieldData(JSON.parse(savedFieldData));
            } else {
                localStorage.removeItem('fieldData');
            }
        }
    }, []);

    function cacheWellInfo() {
        localStorage.setItem('fieldData', JSON.stringify(fieldData));
        alert('Field Data has been saved!');
    }

    function clearLocalStorage() {
        localStorage.removeItem('fieldData');
    }

    const handleChange = (fieldName, value) => {
        if (fieldName === 'wellcover' && value === 'Intact') {
            updateFieldData('wellcoverdescription', "");
        }
        updateFieldData(fieldName, value);
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

    function addFieldData() {
        const updatedQueue = [...fieldQueue, { ...fieldData, well_id: fieldData.well_id, fa_genlatitude: fa_genlatitude, fa_genlongitude: fa_genlongitude }];
        if (navigator.onLine) {
            fieldData.well_id = well_id;
            Axios.post('/api/insert', {
                well_id: fieldData.well_id,
                fa_latitude: fieldData.fa_latitude,
                fa_longitude: fieldData.fa_longitude,
                fa_genlatitude: fa_genlatitude,
                fa_genlongitude: fa_genlongitude,
                weather: fieldData.conditions,
                wellcovercondition: fieldData.wellcover,
                wellcoverdescription: fieldData.wellcoverdescription,
                topography: fieldData.topography,
                surfacerunoff: fieldData.evidence,
                pooling: fieldData.pooling,
                groundwatertemp: fieldData.temp,
                ph: fieldData.ph,
                conductivity: fieldData.conductivity,
                name: fieldData.name,
                observations: fieldData.observations,
                datecollected: fieldData.dateentered,
            })
                .then(() => {
                    console.log("success");
                })
            alert("Successfully submitted Well Info Form!");
        } else {
            setFieldQueue(updatedQueue);

            alert("You are offline, Well Info Form will automatically be submitted when you regain an internet connection")
        }
    };


    const idList = ["fa_latitude", "fa_longitude", "conditions", "wellcover", "temp", "ph", "conductivity", "name", "observations"];
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
            addFieldData()
            clearLocalStorage();
            handleClearLocalStorage();
            alert("Succesfully submitted Field Form!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

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
                            value={fieldData.fa_latitude}
                            min="40"
                            max="43"
                            id="fa_latitude"
                            label="Degrees"
                            setValue={(value) => updateFieldData('fa_latitude', value)}
                            required={true}
                        />
                        <NumberEntry
                            fieldTitle="Longitude (use 4-12 decimals):"
                            value={fieldData.fa_longitude}
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
            {fieldPrompts.map((prompt) => (
                <div key={prompt.id}>{renderField(
                    prompt, fieldData, handleChange)}</div>
            ))}
            <div>
                <h4>Upload a Photo</h4>
                <input type="file" capture="camera" onChange={handleFileChange} />

                {selectedFile && (
                    <div>
                        <h4>Preview:</h4>
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: '100%', maxWidth: '300px', height: 'auto' }} />
                    </div>
                )}
            </div>
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
            <FormFooter submitForm={submitForm} onClick={cacheWellInfo} backButton={backButton} cacheForm={cacheFieldForm} />
            <br />
        </form >
    );
}
