import React from 'react'
import './css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios'
//
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import useLocalStorage from 'react-use-localstorage';
import useSearchParams from 'use-search-params'

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
    const Cachedname = localStorage.getItem("Name");
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
const commentsInitilization = () => {
    const Cachedcomments = localStorage.getItem("Comments");
    return Cachedcomments ? JSON.parse(Cachedcomments) : "";
}
//const dateenteredInitilization = () => {
//    const Cacheddateentered = localStorage.getItem("Dateentered");
//    return Cacheddateentered ? JSON.parse(Cacheddateentered) : ""; 
//}
const evidencInitilization = () => {
    const Cachedevidence = localStorage.getItem("Evidence");
    return Cachedevidence ? JSON.parse(Cachedevidence) : "";
}
const poolingInitilization = () => {
    const Cachedpooling = localStorage.getItem("Pooling");
    return Cachedpooling ? JSON.parse(Cachedpooling) : "";
}
export default function Field() {
    const [conditions, setConditions] = useState(conditionsInitilization);
    const [temp, setTemp] = useState(tempInitilization);
    const [ph, setPh] = useState(phInitilization);
    const [conductivity, setConductivity] = useState(conductivityInitilization);
    const [name, setName] = useState(nameInitilization);
    const [observation, setObservation] = useState(observationInitilization);
    const [wellcover, setWellcover] = useState(wellcoverInitilization);
    const [wellcoverdescription, setWellcoverDescription] = useState(wellcoverdescriptionInitilization);
    const [comments, setComments] = useState(commentsInitilization);
    const [dateentered, setDateentered] = useState(moment());

    const handleChange_wellcover = (event) => {
        setWellcover(event.target.value);
    };

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const [evidence, setEvidence] = useState(evidencInitilization);

    const handleChange_evidence = (event) => {
        setEvidence(event.target.value);
    };

    const [pooling, setPooling] = useState(poolingInitilization);

    const handleChange_pooling = (event) => {
        setPooling(event.target.value);
    };


    function addField () {   /*const addField = () => */
        Axios.post('http://localhost:7193/api/insert', {
            conditions: conditions,
            wellcover: wellcover,
            wellcoverdescription: wellcoverdescription,
            evidence: evidence,
            pooling: pooling,
            temp: temp,
            ph: ph,
            conductivity: conductivity,
            name: name,
            observation: observation,
            comments: comments,
            dateentered: dateentered,
        })

            .then(() => {
                console.log("success");
            })
    };


    ///caching
    useEffect(() => {
        localStorage.setItem("Conditions", JSON.stringify(conditions));
        localStorage.setItem("Temp", JSON.stringify(temp));
        localStorage.setItem("Ph", JSON.stringify(ph));
        localStorage.setItem("Conductivity", JSON.stringify(conductivity));
        localStorage.setItem("Name", JSON.stringify(name));
        localStorage.setItem("Observation", JSON.stringify(observation));
        localStorage.setItem("Wellcover", JSON.stringify(wellcover));
        localStorage.setItem("Wellcoverdescription", JSON.stringify(wellcoverdescription));
        localStorage.setItem("Comments", JSON.stringify(comments));
        localStorage.setItem("Dateentered", JSON.stringify(dateentered));
        localStorage.setItem("Evidence", JSON.stringify(evidence));
        localStorage.setItem("Pooling", JSON.stringify(pooling));
    }, [conditions, temp, ph, conductivity, name, observation, wellcover, wellcoverdescription, comments, dateentered, evidence, pooling]);



    var form = document.getElementById('submissionAlert');
    const myFunction = () => {
        if (form.checkValidity()) {
            alert("Succesfully submitted Field Form!");
        }
    }
    const backButton = () => {
        window.location.href = "/editwell";
    }

    function myFunction2() {
        addField();
        myFunction();
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const wellName = searchParams.get("wellName")

    return (
        //<div className="form-container">
        // action="/editwell" id="submissionAlert"
        <form  >  
            <h2>Field</h2>
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
                </div>
            </div>
            <div className="css">
                <label htmlFor="wellcoverdescription">
                    Well Cover Description:
                </label>
                <textarea
                    type="text" value={wellcoverdescription} className="textarea resize-ta" id="wellcoverdescription" name="wellcoverdescription"
                    onChange={(event) => {
                        setWellcoverDescription(event.target.value);
                    }}
                />
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
            <button type="submit" onClick={myFunction2} >Submit</button>
            <button type="submit" onClick={backButton} >Back</button>
            <button type="submit">
                Save
            </button>
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>
        </form >
        //</div>
    );
}
