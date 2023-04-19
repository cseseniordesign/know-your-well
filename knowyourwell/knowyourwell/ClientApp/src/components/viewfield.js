import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import './css/forms.css'
import Axios from 'axios'
import moment from 'moment'
import { useSearchParams } from "react-router-dom";

let formElements = []
let columnList = []
const labelList = [
    "Conditions: Weather, temperature, or anything note-worthy the well:", "Condition of the well cover:", "Well Cover Description:",
    "Evidence of surface run-off entry to the well:", "Evidence of pooling or puddles within 12 ft of the well:", "Groundwater Temperature [Degrees Celsius]:",
    "pH [0-14]:", "Conductivity [uS/cm]:", "Data Collector’s Name:",
    "Observations:", "Comments:", "Date Entered:"
]

const keyList = [
    "fa_weather", "fa_wellcovercondition", "fa_wellcoverdescription", "fa_surfacerunoff",
    "fa_pooling", "fa_groundwatertemp", "fa_ph", "fa_conductivity",
    "fa_datacollector", "fa_observation", "fa_comments", "fa_datecollected"
]

export default function ViewField() {
    const [searchParams, setSearchParams] = useSearchParams();
    const fieldactivity_id = parseInt(searchParams.get("fieldactivity_id"));
    const wellName = searchParams.get("wellName")
    const well_id = searchParams.get("well_id")

    const backButton = () => {
        window.location.href = `/PreviousEntries?id=${well_id}&wellName=${wellName}`;
    }

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        Axios
            .get("/GetFieldEntry", {
                responseType: "json",
                params: {
                    fieldactivity_id: fieldactivity_id
                }
            })
            .then(function (response) {
                //console.log(response)
                formElements = response.data.FieldActivity[0]
                //console.log(formElements.wi_wellcode)
                setLoading(false);
            });
    }, []);

    if (formElements === null) {
        /*
        const wellCookie = localStorage.getItem("wellData" + well_id); if (wellCookie) {
            try {
                formElements = JSON.parse(wellCookie)
            }
            catch (e) {
                console.log("wellData is Invalid JSON")
            }
            //console.log(formElements)
        }
        */
    }

    //console.log(formElements)
    if (formElements.length != 0) {
        //console.log(formElements)
        for (let i = 0; i < labelList.length; i += 2) {
            const firstColumnName = labelList[i]
            let firstColumnValue = formElements[keyList[i]];
            if (firstColumnName == "Date Entered:")
                firstColumnValue = moment(firstColumnValue).format("MMMM DD, YYYY")
            let secondColumnValue = ""
            let secondColumnName = ""
            if (i < labelList.length + 1) {
                secondColumnName = labelList[i + 1]
                secondColumnValue = formElements[keyList[i + 1]]
            }
            if (secondColumnName == "Date Entered:")
                secondColumnValue = moment(secondColumnValue).format("MMMM DD, YYYY")

            columnList.push(
                <div class="row">
                    <div class="col">
                        <p style={{ textAlign: "center" }}><b>{firstColumnName}</b> {firstColumnValue}</p>
                    </div>
                    <div class="col">
                        <p style={{ textAlign: "center" }}><b>{secondColumnName}</b> {secondColumnValue}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="css">
                <h2>Field Activity</h2>
                <br />
                <div class="container" style={{ textAlign: "center" }}>
                    {columnList}
                    <button type="button" onClick={backButton} >Back</button>
                </div>
            </div>
        );
    }
    else {
        return <h1>Loading</h1>
    }

    /*
    const [searchParams, setSearchParams] = useSearchParams();
    const wellName = searchParams.get("wellName")
    const well_id = searchParams.get("well_id")
    const [conditions, setConditions] = useState("");
    const [temp, setTemp] = useState(0);
    const [ph, setPh] = useState(0);
    const [conductivity, setConductivity] = useState(0);
    const [name, setName] = useState("");
    const [observation, setObservation] = useState("");
    const [wellcover, setWellcover] = useState("");
    const [wellcoverdescription, setWellcoverDescription] = useState("");
    const [comments, setComments] = useState("");
    const [dateentered, setDateentered] = useState("");

    const handleChange_wellcover = (event) => {
        setWellcover(event.target.value);
    };

    const [evidence, setEvidence] = useState("");
    const handleChange_evidence = (event) => {
        setEvidence(event.target.value);
    };

    const [pooling, setPooling] = useState("");
    const handleChange_pooling = (event) => {
        setPooling(event.target.value);
    };

    const addField = () => {
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

    const backButton = () => {
        window.location.href =`/PreviousEntries?id=${well_id}&wellName=${wellName}`;
    }

    return (
        //<div className="form-container"> 
        <form action="/editwell"  > {id="submissionAlert"}
            <h2>Field</h2>
            <div className="css">
                <label for="conditions">
                    Conditions: Describe weather, temperature,{} or anything note-worthy about your well
                </label>
                <textarea
                    type="text" id="conditions" name="conditions" className="textarea resize-ta" maxLength="150" disabled="disabled"
                    onChange={(event) => {
                        setConditions(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="wellcover">
                    Condition of the well cover
                </label>
                <div id="App">
                    <div className="select-container">
                        <select id="wellCover"
                            value={wellcover}
                            onChange={handleChange_wellcover}
                            disabled="disabled"
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Intact" id="wellcover" name="wellcover" required >Intact</option>
                            <option value="Observable_Opening" id="wellcover" name="wellcover" required>Observable Opening</option>
                            <option value="Damaged" id="wellcover" name="wellcover" required >Damaged</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="wellcoverdescription">
                    Well Cover Description:
                </label>
                <textarea
                    type="text" className="textarea resize-ta" id="wellcoverdescription" name="wellcoverdescription" disabled="disabled"
                    onChange={(event) => {
                        setWellcoverDescription(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="evidence">
                    Is there evidence of surface<br /> run-off entry to the well?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={evidence}
                            onChange={handleChange_evidence}
                            disabled="disabled"
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="evidence" name="evidence" required >Yes</option>
                            <option value="No" id="evidence" name="evidence" required >No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="pooling">
                    Is there evidence of pooling or<br /> puddles within 12 ft of the well?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={pooling}
                            onChange={handleChange_pooling}
                            disabled="disabled"
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="pooling" name="pooling" required >Yes</option>
                            <option value="No" id="pooling" name="pooling" required >No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="temp">
                    Groundwater Temperature<br /> [Degrees Celsius]
                </label>
                <input
                    type="number" className="textarea resize-ta" id="temp" name="temp" disabled="disabled"
                    onChange={(event) => {
                        setTemp(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="ph">
                    pH<br /> [0-14]
                </label>
                <input
                    type="number" className="textarea resize-ta" min="0" max="14" id="ph" name="ph" disabled="disabled"
                    onChange={(event) => {
                        setPh(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="conductivity">
                    Conductivity <br /> [uS/cm]
                </label>
                <input
                    type="number" className="textarea resize-ta" id="conductivity" name="conductivity" disabled="disabled"
                    onChange={(event) => {
                        setConductivity(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="name">
                    Data Collector’s Name:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="name" name="name" disabled="disabled"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="observation">
                    Observations
                </label>
                <textarea
                    type="text" className="textarea resize-ta" maxLength="150" id="observation" name="observation" disabled="disabled"
                    onChange={(event) => {
                        setObservation(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="comments">
                    Comments:
                </label>
                <textarea
                    type="text" className="textarea resize-ta" id="comments" name="comments" disabled="disabled"
                    onChange={(event) => {
                        setComments(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="dateentered">
                    Date Entered:
                </label>
                <input
                    type="date" className="textarea resize-ta" id="dateentered" name="dateentered" disabled="disabled"
                    onChange={(event) => {
                        setDateentered(event.target.value);
                    }}
                />
            </div>
            <button type="button" onClick={backButton} >Back</button>
            <div className="css">
            <a href="mailto:knowyourwell@unl.edu">
                    If any data is incorrect email us at knowyourwell@unl.edu</a>
            </div>
        </form >
        //</div>
    );
  */
}
