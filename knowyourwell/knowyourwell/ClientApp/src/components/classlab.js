import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './css/forms.css' 
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'react-router-dom'
  

export default function ClassLab() {

    const [searchParams, setSearchParams] = useSearchParams();
    const fa_id = parseInt(searchParams.get("field_id"));

    // Checking for saved sessions
    const [sessionContinued, setSessionContinued] = useState(searchParams.get("sessionContinued"));
    if (localStorage.getItem("labData" + fa_id)) {
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

    /////////////////////////////
   
    const cachedData = pullCachedData ? JSON.parse(localStorage.getItem("labData" + fa_id)) : null;

   // const fa_id = parseInt(searchParams.get("field_id"));
    const well_id = searchParams.get("well_id");
    const wellName = searchParams.get("wellName");


    const [ammonia, setAmmonia] = useState(pullCachedData ? cachedData.Ammonia : "");
    const [calcium, setCalcium] = useState(pullCachedData ? cachedData.Calciumhardness : "");
    const [chloride, setChloride] = useState(pullCachedData ? cachedData.Chloride : "");
    const [copper, setCopper] = useState(pullCachedData ? cachedData.Copper : "");
    const [iron, setIron] = useState(pullCachedData ? cachedData.Iron : "");
    const [manganese, setManganese] = useState(pullCachedData ? cachedData.Manganese : "");
    const [nitrate, setNitrate] = useState(pullCachedData ? cachedData.Nitrate : "");
    const [bacteria, setBacteria] = useState(pullCachedData ? cachedData.Bacteria : "");
    const [observations, setObservations] = useState(pullCachedData ? cachedData.Observations : "");
    const [name, setName] = useState(pullCachedData ? cachedData.Datacollector : "");
    const [dateentered, setDateentered] = useState(pullCachedData ? cachedData.Dateentered : moment().format('L, h:mm a'));


    // Updating if user decides to load session
    useEffect(() => {
        setAmmonia(sessionContinued ? cachedData.Ammonia : "");
        setCalcium(sessionContinued ? cachedData.Calciumhardness : "");
        setChloride(sessionContinued ? cachedData.Chloride : "");
        setCopper(sessionContinued ? cachedData.Copper : "");
        setIron(sessionContinued ? cachedData.Iron : "");
        setManganese(sessionContinued ? cachedData.Manganese : "");
        setNitrate(sessionContinued ? cachedData.Nitrate : "");
        setBacteria(sessionContinued ? cachedData.Bacteria : "");
        setObservations(sessionContinued ? cachedData.Observations : "");
        setName(sessionContinued ? cachedData.Datacollector : "");
        setDateentered(sessionContinued ? cachedData.Dateentered : moment());
    }, [sessionContinued]);
 

    const handleChange_Bacteria = (event) => {
        setBacteria(event.target.value);
    };

    //const continue_session = window.confirm("Continue last session?");

    function addClassLab() {
        Axios.post('/createclasslab', {
            fa_id: fa_id,
            ammonia: ammonia,
            calciumhardness: calcium,
            chloride: chloride,
            copper: copper,
            bacteria: bacteria,
            iron: iron,
            manganese: manganese,
            nitrate: nitrate,
            observations: observations,
            datacollector: name,
            dateentered: dateentered,
        } )
            .then(() => {
                console.log("success");
            })
    };

    const idList = ["ammonia", "calcium", "chloride", "copper", "iron", "manganese", "nitrate"];
    // caching - local storage
    function cacheLabForm() {
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
            const labData = {
                Ammonia: ammonia,
                Calciumhardness: calcium,
                Chloride: chloride,
                Copper: copper,
                Bacteria: bacteria,
                Iron: iron,
                Manganese: manganese,
                Nitrate: nitrate,
                Observations: observations,
                Datacollector: name,
                Dateentered: dateentered,
            };
            localStorage.setItem("labData" + fa_id, JSON.stringify(labData));
            alert("Information Saved!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&FieldRedirect=True`;
        }
    };


    //check mark
    function handleClearLocalStorage() {
        localStorage.clear();
    };

    const validForm = () => {
        var form = document.getElementById("submissionAlert");
        if (form.checkValidity() ) {
            return true;
        }
        else {
            form.reportValidity();
            return false;
        }
    }


    const backButton = () => {
        if(window.confirm("Any unsaved data will be lost.\nWould you like to continue?")){
            window.location.href = `/fieldselection?id=${well_id}&wellName=${wellName}`;
        }
    }

    function submitForm() {
        if (validForm() && window.confirm("Submitted Data is Final and Can only be edited by Nebraska Water Center Staff.\n Do you want to continue?")) {
            addClassLab();
            handleClearLocalStorage();
            alert("Succesfully submitted Class Lab form!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
        }
    }

    //end of check mark
    return (
        <form id="submissionAlert">
            <div className="styling_offline_bar">
                {/*isOnline ? (
                    <p className="status_online" >Online mode</p>
                ) : (
                        <p className="status_offfline">Offline mode</p>
                )*/}
            </div>
             
            <h2>{wellName}: Class Lab</h2>
            <div className="css">
                <label htmlFor="ammonia">
                    Ammonia - N<br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={ammonia} className="textarea resize-ta" id="ammonia" name="ammonia" pattern="[0-9]([.][0-9]*)?|10" required
                    onChange={(event) => {
                        setAmmonia(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="calcium">
                    Calcium hardness <br /> [50-500 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={calcium} className="textarea resize-ta" id="calcium" name="calcium" pattern="[5-9][0-9]([.][0-9]*)?|[1-4][0-9]{2}([.][0-9]*)?|500" required
                    onChange={(event) => {
                        setCalcium(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="chloride">
                    Chloride <br /> [0-400 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={chloride} className="textarea resize-ta" id="chloride" name="chloride" pattern="[1-3]?[0-9]{1,2}([.][0-9]*)?|400" required
                    onChange={(event) => {
                        setChloride(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="bacteria">
                    Bacteria (Colilert) <br />[Positive if more than 1 MPN/100ml]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={bacteria} onChange={handleChange_Bacteria} required>
                            <option value="" hidden defaultValue>Select one...</option>
                            <option value="Clear" id="bacteria" name="bacteria">Clear</option>
                            <option value="Yellow_with_fluorescent" id="bacteria" name="bacteria">Yellow with fluorescent rim </option>
                            <option value="Yellow_without_fluorescent" id="bacteria" name="bacteria">Yellow without fluorescent rim</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label htmlFor="copper">
                    Copper <br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={copper} className="textarea resize-ta" id="copper" name="copper" pattern="[0-9]([.][0-9]*|10)?" required
                    onChange={(event) => {
                        setCopper(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="iron">
                    Iron<br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={iron} className="textarea resize-ta" id="iron" name="iron" pattern="[0-9]([.][0-9]*|10)?" required
                    onChange={(event) => {
                        setIron(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="manganese">
                    Manganese<br /> [0-50 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={manganese } className="textarea resize-ta" id="manganese" name="manganese" pattern="[0-9]([.][0-9]*)?|[1-4][0-9]([.][0-9]*)?|50" required
                    onChange={(event) => {
                        setManganese(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="nitrate">
                    Nitrate - N<br /> [0-45 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={nitrate } className="textarea resize-ta" id="nitrate" name="nitrate" pattern="[0-9]([.][0-9]*)?|[1-3][0-9]([.][0-9]*)?|4[0-4]([.][0-9]*)?|45" required
                    onChange={(event) => {
                        setNitrate(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label htmlFor="name">
                    Data Collector’s Name:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={name} className="textarea resize-ta" id="name" name="name" required
                    onChange={(event) => {
                        setName(event.target.value);
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
                        dateFormat="MM-DD-YYYY"
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
            <br/>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={submitForm}>Submit</button>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={cacheLabForm}>Save</button>
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>
        </form>
    );
}
