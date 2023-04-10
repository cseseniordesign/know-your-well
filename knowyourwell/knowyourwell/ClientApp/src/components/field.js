﻿import React from 'react'
import './css/forms.css'
import { useState } from 'react';
import Axios from 'axios'
//
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from "react-router-dom";


export default function Field() {
    const [conditions, setConditions] = useState("");
    const [temp, setTemp] = useState(0);
    const [ph, setPh] = useState(0);
    const [conductivity, setConductivity] = useState(0);
    const [name, setName] = useState("");
    const [observation, setObservation] = useState("");
    const [wellcover, setWellcover] = useState("");
    const [wellcoverdescription, setWellcoverDescription] = useState("");
    const [comments, setComments] = useState("");
    const [dateentered, setDateentered] = useState(moment());
    const handleChange_wellcover = (event) => {
        setWellcover(event.target.value);
    };

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const [evidence, setEvidence] = useState("");
    const handleChange_evidence = (event) => {
        setEvidence(event.target.value);
    };

    const [pooling, setPooling] = useState("");
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
        // action="/editwell"
        <form action="/editwell" id="submissionAlert" >  
            <h2>{wellName}: Field</h2>
            <div className="css">
                <label htmlFor="conditions">
                    Conditions: Describe weather, temperature,<br /> or anything note-worthy about your well
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <textarea
                    type="text" id="conditions" name="conditions" className="textarea resize-ta" maxLength="150" required
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
                    type="text" className="textarea resize-ta" id="wellcoverdescription" name="wellcoverdescription"
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
                    type="text" className="textarea resize-ta" id="temp" name="temp" pattern="[-]?[0-9]+|[0-9]+([.][0-9]*)?" required
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
                    type="text" className="textarea resize-ta" id="ph" name="ph" pattern="[1-9]([.][0-9]{1,2})?|1[0-3]([.][0-9]{1,2})?|14" required
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
                    type="text" className="textarea resize-ta" id="conductivity" name="conductivity" pattern="[-]?[0-9]+|[0-9]+([.][0-9]*)?" required
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
                    type="text" className="textarea resize-ta" id="name" name="name" required
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
                    type="text" className="textarea resize-ta" maxLength="150" id="observation" name="observation"
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
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>
        </form >
        //</div>
    );
}
