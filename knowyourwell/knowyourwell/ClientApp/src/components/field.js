import './css/forms.css'
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'react-router-dom'

const conditionsInitilization = () => {
    const Cachedconditions = localStorage.getItem("Conditions");
    return Cachedconditions ? JSON.parse(Cachedconditions) : "" ;
}
const tempInitilization = () => {
    const Cachedtemp = localStorage.getItem("Temp");
    return Cachedtemp ? JSON.parse(Cachedtemp) : "";
}
const phInitilization = () => {
    const Cachedph = localStorage.getItem("Ph");
    return Cachedph ? JSON.parse(Cachedph) : "";
}
const conductivityInitilization = () => {
    const Cachedconductivity = localStorage.getItem("Conductivity");
    return Cachedconductivity ? JSON.parse(Cachedconductivity) : "";
}
const nameInitilization = () => {
    const Cachedname = localStorage.getItem("NameField");
    return Cachedname ? JSON.parse(Cachedname) : "";
}
const observationInitilization = () => {
    const Cachedobservation = localStorage.getItem("Observation");
    return Cachedobservation ? JSON.parse(Cachedobservation) : "";
}
const wellcoverInitilization = () => {
    const Cachedwellcover = localStorage.getItem("Wellcover");
    return Cachedwellcover ? JSON.parse(Cachedwellcover) : "";
}
const wellcoverdescriptionInitilization = () => {
    const Cachedwellcoverdescription = localStorage.getItem("Wellcoverdescription");
    return Cachedwellcoverdescription ? JSON.parse(Cachedwellcoverdescription) : "";
}
const dateenteredInitilization = () => {
    const Cacheddateentered = localStorage.getItem("Dateentered");
    return Cacheddateentered ? JSON.parse(Cacheddateentered) : moment(); 
}
const evidenceInitilization = () => {
    const Cachedevidence = localStorage.getItem("Evidence");
    return Cachedevidence ? JSON.parse(Cachedevidence) : "";
}
const poolingInitilization = () => {
    const Cachedpooling = localStorage.getItem("Pooling");
    return Cachedpooling ? JSON.parse(Cachedpooling) : "";
}


export default function Field() {
    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));

    const [sessionContinued, setSessionContinued] = useState(null);
    if (localStorage.getItem("fieldData"+well_id)) { // TODO: check if anything is saved, if not, no message pop-up
        if (sessionContinued === null) {
            const continue_session= window.confirm("Continue last saved session?");
            //pullCachedData = continue_session;
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

    const cachedData = pullCachedData ? JSON.parse(localStorage.getItem("fieldData"+well_id)) : null;
    const wellName = searchParams.get("wellName");
    const fa_latitude = 40.8;   //TODO: match this up with actual value.
    const fa_longitude = -97.5; //TODO: match this up with actual value.
    const fa_genlatitude = 40.8;   //TODO: match this up with actual value.
    const fa_genlongitude = -97.5; //TODO: match this up with actual value.
    
    const [conditions, setConditions] = useState(pullCachedData ? cachedData.Conditions : "");
    const [temp, setTemp] = useState(pullCachedData ? cachedData.Temp : "");
    const [ph, setPh] = useState(pullCachedData ? cachedData.Ph : "");
    const [conductivity, setConductivity] = useState(pullCachedData ? cachedData.Conductivity : "");
    const [name, setName] = useState(pullCachedData ? cachedData.NameField : "");
    const [observation, setObservation] = useState(pullCachedData ? cachedData.Observation : "");
    const [wellcover, setWellcover] = useState(pullCachedData ? cachedData.Wellcover : "");
    const [wellcoverdescription, setWellcoverDescription] = useState(pullCachedData ? cachedData.Wellcoverdescription : "");
    const [dateentered, setDateentered] = useState(pullCachedData ? cachedData.Dateentered : "");

    useEffect(() => {
        setConditions(sessionContinued ? cachedData.Conditions : "");
        setTemp(sessionContinued ? cachedData.Temp : "");
        setPh(sessionContinued ? cachedData.Ph : "");
        setConductivity(sessionContinued ? cachedData.Conductivity : "");
        setName(sessionContinued ? cachedData.NameField : "");
        setObservation(sessionContinued ? cachedData.Observation : "");
        setWellcover(sessionContinued ? cachedData.Wellcover : "");
        setWellcoverDescription(sessionContinued ? cachedData.Wellcoverdescription : "");
        setDateentered(sessionContinued ? cachedData.Dateentered : "");
    }, [sessionContinued]);

    const handleChange_wellcover = (event) => {
        setWellcover(event.target.value);
    };

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const [evidence, setEvidence] = useState(evidenceInitilization);

    const handleChange_evidence = (event) => {
        setEvidence(event.target.value);
    };

    const [pooling, setPooling] = useState(poolingInitilization);

    const handleChange_pooling = (event) => {
        setPooling(event.target.value);
    };


    function addField () {
        Axios.post('/api/insert', {
            well_id: well_id,
            fa_latitude: fa_latitude,
            fa_longitude: fa_longitude,
            fa_genlatitude: fa_genlatitude,
            fa_genlongitude: fa_genlongitude,
            weather: conditions,
            wellcovercondition: wellcover,
            wellcoverdescription: wellcoverdescription,
            surfacerunoff: evidence,
            pooling: pooling,
            groundwatertemp: temp,
            ph: ph,
            conductivity: conductivity,
            name: name,
            observations: observation,
            datecollected: dateentered,
        })
            .then(() => {
                console.log("success");
            })
    };


    // caching - local storage
   function cacheFieldForm(){
        const fieldData = {Conditions : conditions,
            Temp : temp,
            Ph : ph,
            Conductivity : conductivity,
            NameField : name,
            Observation : observation,
            Wellcover : wellcover,
            Wellcoverdescription : wellcoverdescription,
            Dateentered : dateentered,
            Evidence : evidence,
            Pooling : pooling
        };
        localStorage.setItem("fieldData"+well_id, JSON.stringify(fieldData));
    };

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        function handleOnlineStatus() {
            setIsOnline(navigator.onLine);
        }

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);

    function handleClearLocalStorage() {
        localStorage.removeItem("fieldData"+well_id);
    };

    var form = document.getElementById('submissionAlert');
    const myFunction = () => {
        if (form.checkValidity()) {
            alert("Succesfully submitted Field Form!");
            return true;
        }
        else {
            form.reportValidity();
            return false;
        }
    }
    const backButton = () => {
        if (well_id != null) {
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
        } else {
            window.location.href = `/Well`;
        }
    }

    function myFunction2() {
        if (myFunction()) {
            addField();
            handleClearLocalStorage();
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`
        }
    }

    return (
        <form>  
            <h2>{wellName}: Field</h2>
            <div className="css">
                <label htmlFor="conditions">
                    Conditions: Describe weather, temperature,<br /> or anything note-worthy about your well
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <textarea
                    type="text" value={conditions} id="conditions" name="conditions" className="textarea resize-ta" maxLength="150" required
                    onChange={(event) => {
                        setConditions(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="wellcover">
                    Condition of the well cover
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select id="wellCover"
                            value={wellcover}
                            onChange={handleChange_wellcover}
                        >
                            <option hidden defaultValue>Select one...</option>
                            <option value="Intact" id="wellcover" name="wellcover" required >Intact</option>
                            <option value="Observable_Opening" id="wellcover" name="wellcover" required>Observable Opening</option>
                            <option value="Damaged" id="wellcover" name="wellcover" required >Damaged</option>
                        </select>
                    </div>
                    {wellcover === "Observable_Opening" && (
                        <div className="css">
                            <label for="wellcoverdescription">
                                Well Cover Description:
                            </label>
                            <textarea
                                type="text" value={wellcoverdescription} className="textarea resize-ta" id="wellcoverdescription" name="wellcoverdescription"
                                onChange={(event) => {
                                    setWellcoverDescription(event.target.value);
                                }}
                            />
                        </div>
                    )}
                    {wellcover === "Damaged" && (
                        <div className="css">
                            <label for="wellcoverdescription">
                                Well Cover Description:
                            </label>
                            <textarea
                                type="text" value={wellcoverdescription} className="textarea resize-ta" id="wellcoverdescription" name="wellcoverdescription"
                                onChange={(event) => {
                                    setWellcoverDescription(event.target.value);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="css">
                <label htmlFor="evidence">
                    Is there evidence of surface<br />run-off entry to the well?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={evidence}
                            onChange={handleChange_evidence}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="evidence" name="evidence" required >Yes</option>
                            <option value="No" id="evidence" name="evidence" required >No</option>

                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label htmlFor="pooling">
                    Is there evidence of pooling or<br />puddles within 12 ft of the well?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={pooling}
                            onChange={handleChange_pooling}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="pooling" name="pooling" required >Yes</option>
                            <option value="No" id="pooling" name="pooling" required >No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label htmlFor="temp">
                    Groundwater Temperature<br /> [Degrees Celsius]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" value={temp} className="textarea resize-ta" id="temp" name="temp" pattern="[-]?[0-9]+|[0-9]+([.][0-9]*)?" required
                    onChange={(event) => {
                        setTemp(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="ph">
                    pH<br /> [0-14]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" value={ph} className="textarea resize-ta" id="ph" name="ph" pattern="[1-9]([.][0-9]{1,2})?|1[0-3]([.][0-9]{1,2})?|14" required
                    onChange={(event) => {
                        setPh(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="conductivity">
                    Conductivity <br /> [uS/cm]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" value={conductivity} className="textarea resize-ta" id="conductivity" name="conductivity" pattern="[-]?[0-9]+|[0-9]+([.][0-9]*)?" required
                    onChange={(event) => {
                        setConductivity(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="name">
                    Data Collector’s Name:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" value={name} className="textarea resize-ta" id="name" name="name" required
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="observation">
                    Observations
                </label>
                <textarea
                    type="text" value={observation } className="textarea resize-ta" maxLength="150" id="observation" name="observation"
                    onChange={(event) => {
                        setObservation(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="dateentered">
                    Date Entered:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="dateentered">
                    <DatePicker
                        value={dateentered}
                        dateFormat="DD-MM-YYYY"
                        timeFormat="hh:mm A"
                        onChange={(val) => setDateentered(val)}
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
            <button type="button" onClick={myFunction2}>Submit</button>
            <button type="submit" onClick={backButton}>Back</button>
            <button type="button" onClick={cacheFieldForm}>Save</button>
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>
        </form >
    );
}
