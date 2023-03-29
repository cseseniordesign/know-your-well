import React from 'react'
import { useState } from 'react';
import Axios from 'axios'
import './css/forms.css' 
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from "react-router-dom";


export default function ClassLab() {
    const fa_id = 1;
    const [ammonia, setAmmonia] = useState(0);
    const [calcium, setCalcium] = useState(0);
    const [chloride, setChloride] = useState(0);
    const [copper, setCopper] = useState(0);
    const [iron, setIron] = useState(0);
    const [manganese, setManganese] = useState(0);
    const [nitrate, setNitrate] = useState(0);
    const [name, setName] = useState("");
    const [observations, setObservations] = useState("");
    const [bacteria, setBacteria] = useState("");

    //const [dateentered, setDateentered] = useState(new Date().toISOString().substr(0, 10));
    const [dateentered, setDateentered] = useState(moment());


    const handleChange_Bacteria = (event) => {
        setBacteria(event.target.value);
    };


    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    function addClassLab() {   /*const addClassLab = () =>*/
        Axios.post('/create', {
            fa_id: fa_id,
            ammonia: ammonia,
            calciumhardness: calcium,
            chloride: chloride,
            bacteria: bacteria,
            copper: copper,
            iron: iron,
            manganese: manganese,
            nitrate: nitrate,
            observation: observations,
            datacollector: name,
            datecollected: dateentered,
        })
            .then(() => {
                console.log("success");
            })
    };


    var form = document.getElementById('submissionAlert');
    function myFunction() {
        if (form.checkValidity()) {
            alert("Succesfully submitted Lab form!");
        }
    }

    const backButton = () => {
        window.location.href = "/editwell";
    }

    function myFunction2() {
        addClassLab();
        myFunction();
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const wellName = searchParams.get("wellName");

    return (
        //<div className="form-container" >
        //action = "/editwell" id = "submissionAlert"
        <form action="/editwell" id="submissionAlert">
            <h2>{wellName}: Class Lab</h2>
            <div className="css">
                <label for="ammonia">
                    Ammonia - N<br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="ammonia" name="ammonia" pattern="[0-9]([.][0-9]*)?|10" required
                    onChange={(event) => {
                        setAmmonia(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="calcium">
                    Calcium hardness <br /> [50-500 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="calcium" name="calcium" pattern="[5-9][0-9]([.][0-9]*)?|[1-4][0-9]{2}([.][0-9]*)?|500" required
                    onChange={(event) => {
                        setCalcium(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="chloride">
                    Chloride <br /> [0-400 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="chloride" name="chloride" pattern="[1-3]?[0-9]{1,2}([.][0-9]*)?|400" required
                    onChange={(event) => {
                        setChloride(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="bacteria">
                    Bacteria (Colilert) <br />[Positive if more than 1 MPN/100ml]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={bacteria}
                            onChange={handleChange_Bacteria}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Clear" id="bacteria" name="bacteria" required >Clear</option>
                            <option value="Yellow_with_fluorescent" id="bacteria" name="bacteria" required>Yellow with fluorescent rim </option>
                            <option value="Yellow_without_fluorescent" id="bacteria" name="bacteria" required >Yellow without fluorescent rim</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="copper">
                    Copper <br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="copper" name="copper" pattern="[0-9]([.][0-9]*|10)?" required
                    onChange={(event) => {
                        setCopper(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="iron">
                    Iron<br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="iron" name="iron" pattern="[0-9]([.][0-9]*|10)?" required
                    onChange={(event) => {
                        setIron(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="manganese">
                    Manganese<br /> [0-50 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="manganese" name="manganese" pattern="[0-9]([.][0-9]*)?|[1-4][0-9]([.][0-9]*)?|50" required
                    onChange={(event) => {
                        setManganese(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="nitrate">
                    Nitrate - N<br /> [0-45 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" className="textarea resize-ta" id="nitrate" name="nitrate" pattern="[0-9]([.][0-9]*)?|[1-3][0-9]([.][0-9]*)?|4[0-4]([.][0-9]*)?|45" required
                    onChange={(event) => {
                        setNitrate(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="name">
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
            <div className="css" >
                <label for="dateentered">
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
                            border:'1px solid black'
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
        </form>
        //</div>
    );
}
