import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './css/forms.css'
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'react-router-dom'
import NumberEntry from './reusable/numberentry';
import DropDownEntry from './reusable/dropdownentry';
import FormFooter from './reusable/formfooter';
import ShortTextEntry from './reusable/shorttextentry';
import LongTextEntry from './reusable/longtextentry';


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


    const cachedData = pullCachedData ? JSON.parse(localStorage.getItem("labData" + fa_id)) : null;

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
    const [wslSample, setSample] = useState(pullCachedData ? cachedData.Datacollector : "");
    const [name, setName] = useState(pullCachedData ? cachedData.Datacollector : "");
    const [observations, setObservations] = useState(pullCachedData ? cachedData.Observations : "");
    const [dateentered, setDateentered] = useState(pullCachedData ? moment(cachedData.Dateentered) : moment().format('L, h:mm a'));
    


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
        setSample(sessionContinued ? cachedData.Observations : "");
        setObservations(sessionContinued ? cachedData.Observations : "");
        setName(sessionContinued ? cachedData.Datacollector : "");
        setObservations(sessionContinued ? cachedData.Observations : "");

        setDateentered(sessionContinued ? moment(cachedData.Dateentered) : moment().format('L, h:mm a'));
    }, [sessionContinued]);


    const handleChange_Bacteria = (event) => {
        setBacteria(event.target.value);
    };

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
            wslSample : wslSample,
            observations: observations,
            datacollector: name,
            dateentered: dateentered,
        })
            .then(() => {
                console.log("success");
            })
    };

    const idList = ["ammonia", "calcium", "chloride", "bacteria", "copper", "iron", "manganese", "nitrate"];
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
                SampleID: wslSample,
                Observations: observations,
                Datacollector: name,
                Dateentered: dateentered,
            };
            localStorage.setItem("labData" + fa_id, JSON.stringify(labData));
            alert("Information Saved!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&FieldRedirect=True`;
        }
    };

    function handleClearLocalStorage() {
        localStorage.clear();
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
            window.location.href = `/fieldselection?id=${well_id}&wellName=${wellName}`;
        }
    }

    function submitForm() {
        if (validForm() && window.confirm("Submitted data is final and Can only be edited by Nebraska Water Center Staff.\nWould you like to continue?")) {
            addClassLab();
            handleClearLocalStorage();
            alert("Successfully submitted Class Lab Form!");
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
        }
    }

    return (
        <form id="submissionAlert">
            <h2>{wellName}: Class Lab</h2>
            <div>Conduct the classroom lab testing within 1 week of collecting the sample.</div>
            <div>When all lab results are final, enter and submit them in the field below.</div>
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>
            <NumberEntry
                id="ammonia"
                fieldTitle="Ammonia - N"
                value={ammonia}
                min="0"
                max="10"
                label="ppm(mg/L)"
                setValue={setAmmonia}
                required={true} />
            <NumberEntry
                id="calcium"
                fieldTitle="Calcium hardness"
                value={calcium}
                min="0"
                max="1000"
                label="ppm(mg/L)"
                setValue={setCalcium}
                required={true} />
            <NumberEntry
                id="chloride"
                fieldTitle="Chloride"
                value={chloride}
                min="0"
                max="400"
                label="ppm(mg/L)"
                setValue={setChloride}
                required={true} />
            <DropDownEntry
                fieldTitle="Bacteria (Colilert)"
                id="bacteria"
                options={["Clear", "Yellow with fluorescent rim", "Yellow without fluorescent rim"]}
                value={bacteria}
                onChange={handleChange_Bacteria}
                setValue={setBacteria}
                required={true}
            />
            <NumberEntry
                fieldTitle="Copper"
                id="copper"
                value={copper}
                min="0"
                max="400"
                label="ppm(mg/L)"
                setValue={setCopper}
                required={true} />
            <NumberEntry
                fieldTitle="Iron"
                id="iron"
                value={iron}
                min="0"
                max="400"
                label="ppm(mg/L)"
                setValue={setIron}
                required={true} />
            <NumberEntry
                fieldTitle="Manganese"
                id="manganese"
                value={manganese}
                min="0"
                max="400"
                label="ppm(mg/L)"
                setValue={setManganese}
                required={true} />
            <NumberEntry
                fieldTitle="Nitrate - N"
                id="nitrate"
                value={nitrate}
                min="0"
                max="200"
                label="ppm(mg/L)"
                setValue={setNitrate}
                required={true} />
{/* <div className="css">
                <label htmlFor="wslSample">
                    WSL Sample ID:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" value={wslSample} className="textarea resize-ta" id="wslSample" name="wslSample" required
                    onChange={(event) => {
                        setSample(event.target.value);
                    }}
                />
            </div> */}
            <ShortTextEntry
                fieldTitle="Data Collector's Name:"
                value={name}
                id="name"
                setValue={setName}
                required={true}
            />
            <LongTextEntry
                fieldTitle="Observations"
                value={observations}
                id="observations"
                setValue={setObservations}
                required={false}
            />
            <div className="css">
                <label htmlFor="dateentered">
                    Date Entered:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="dateentered">
                    <DatePicker
                        value={dateentered}
                        // value={sessionContinued ? moment(cachedData.Dateentered) : "hello"}
                        // value={moment(cachedData.Dateentered)}
                        // value = "04/09/2024, 4:36 pm"
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
            <br />
            <FormFooter submitForm={submitForm} backButton={backButton} cacheForm={cacheLabForm} />
        </form>
    );
}
