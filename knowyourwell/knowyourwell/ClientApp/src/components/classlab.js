
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './css/forms.css' 
//
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
//
import { Offline, Online } from "react-detect-offline";

import { useSearchParams } from 'react-router-dom'
 

const ammoniaInitilization = () => {
    const Cachedammonia = localStorage.getItem("Ammonia");
    return Cachedammonia ? JSON.parse(Cachedammonia) : ""; 
}
const calciumInitilization = () => {
    const Cachedcalcium = localStorage.getItem("Calcium");
    return Cachedcalcium ? JSON.parse(Cachedcalcium) : "";
}
const chlorideInitilization = () => {
    const Cachedchloride = localStorage.getItem("Chloride");
    return Cachedchloride ? JSON.parse(Cachedchloride) : "";
}
const copperInitilization = () => {
    const Cachedcopper = localStorage.getItem("Copper");
    return Cachedcopper ? JSON.parse(Cachedcopper) : "";
}
const ironInitilization = () => {
    const Cachediron = localStorage.getItem("Iron");
    return Cachediron ? JSON.parse(Cachediron) : "";
}
const manganeseInitilization = () => {
    const Cachedmanganese = localStorage.getItem("Manganese");
    return Cachedmanganese ? JSON.parse(Cachedmanganese) : "";
}
const nitrateInitilization = () => {
    const Cachednitrate = localStorage.getItem("Nitrate");
    return Cachednitrate ? JSON.parse(Cachednitrate) : "";
}
const bacteriaInitilization = () => {
    const Cachedbacteria = localStorage.getItem("Bacteria");
    return Cachedbacteria ? JSON.parse(Cachedbacteria) : "";
}
const observationsInitilization = () => {
    const Cachedname = localStorage.getItem("Observations");
    return Cachedname ? JSON.parse(Cachedname) : "";
}
const nameInitilization = () => {
    const Cachedname = localStorage.getItem("Name");
    return Cachedname ? JSON.parse(Cachedname) : "";
}
//const dateenteredInitilization = () => {
//    const Cacheddateentered = localStorage.getItem("Dateentered");
//    return Cacheddateentered ? JSON.parse(Cacheddateentered) : moment();
//}
 

export default function ClassLab() {
    const [searchParams, setSearchParams] = useSearchParams();
    const fa_id = parseInt(searchParams.get("field_id"));
    const well_id = searchParams.get("well_id");
    const [ammonia, setAmmonia] = useState(ammoniaInitilization);
    const [calcium, setCalcium] = useState(calciumInitilization);
    const [chloride, setChloride] = useState(chlorideInitilization);
    const [copper, setCopper] = useState(copperInitilization);
    const [iron, setIron] = useState(ironInitilization);
    const [manganese, setManganese] = useState(manganeseInitilization);
    const [nitrate, setNitrate] = useState(nitrateInitilization);
    const [bacteria, setBacteria] = useState(bacteriaInitilization);
    const [observations, setObservations] = useState(observationsInitilization);
    const [name, setName] = useState(nameInitilization);
    const [dateentered, setDateentered] = useState(moment().format('L, h:mm a'));

    const handleChange_Bacteria = (event) => {
        setBacteria(event.target.value);
    };

    //const continue_session = window.confirm("Continue last session?");

    function addClassLab() {   /*const addClassLab = () =>*/
        Axios.post('/createclasslab', {
            fa_id: fa_id,
            ammonia: ammonia,
            calciumhardness: calcium,
            chloride: chloride,
            bacteria: bacteria,
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


    ///caching
    useEffect(() => {
            localStorage.setItem("Ammonia", JSON.stringify(ammonia));
            localStorage.setItem("Calcium", JSON.stringify(calcium));
            localStorage.setItem("Chloride", JSON.stringify(chloride));
            localStorage.setItem("Copper", JSON.stringify(copper));
            localStorage.setItem("Iron", JSON.stringify(iron));
            localStorage.setItem("Manganese", JSON.stringify(manganese));
            localStorage.setItem("Nitrate", JSON.stringify(nitrate));
            localStorage.setItem("Name", JSON.stringify(name));
            localStorage.setItem("Bacteria", JSON.stringify(bacteria));
            localStorage.setItem("Dateentered", JSON.stringify(dateentered));
       
    }, [ammonia, calcium, chloride, copper, iron, manganese, nitrate, name, bacteria, dateentered]);


    const [isOnline, setIsOnline] =  useState(navigator.onLine);

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
        localStorage.clear();
    };

    //////////////////////////////////////////////////
    var form = document.getElementById('submissionAlert');
    function myFunction() {
        if (form.checkValidity()) {
            alert("Succesfully submitted Lab form!");
        }
    }

    const backButton = () => {
        window.location.href = `/fieldselection?id=${well_id}&wellName=${wellName}`;
    }

    function myFunction2() {
        addClassLab();
        handleClearLocalStorage();
        /*handleSubmit();*/
       // myFunction();
    }

    const wellName = searchParams.get("wellName");

    return (
        //<div className="form-container" >
        //action = "/editwell" id = "submissionAlert"
        <form action="/editwell" id="submissionAlert">
            <div className="styling_offline_bar">
                {isOnline ? (
                    <p className="status_online" >Online mode!</p>
                ) : (
                        <p className="status_offfline">Offline mode</p>
                )}
            </div>
             
            <h2>Class Lab</h2>
            <div className="css">
                <label htmlFor="ammonia">
                    Ammonia - N<br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" value={ammonia} className="textarea resize-ta" id="ammonia" name="ammonia" pattern="[0-9]([.][0-9]*)?|10" required
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
                <input
                    type="text" value={calcium} className="textarea resize-ta" id="calcium" name="calcium" pattern="[5-9][0-9]([.][0-9]*)?|[1-4][0-9]{2}([.][0-9]*)?|500" required
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
                <input
                    type="text" value={chloride} className="textarea resize-ta" id="chloride" name="chloride" pattern="[1-3]?[0-9]{1,2}([.][0-9]*)?|400" required
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
                        <select
                            value={bacteria}
                            onChange={handleChange_Bacteria}
                        >
                            <option hidden defaultValue>Select one...</option>
                            <option value="Clear" id="bacteria" name="bacteria" required >Clear</option>
                            <option value="Yellow_with_fluorescent" id="bacteria" name="bacteria" required>Yellow with fluorescent rim </option>
                            <option value="Yellow_without_fluorescent" id="bacteria" name="bacteria" required >Yellow without fluorescent rim</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label htmlFor="copper">
                    Copper <br /> [0-10 ppm(mg/L)]
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input
                    type="text" value={copper} className="textarea resize-ta" id="copper" name="copper" pattern="[0-9]([.][0-9]*|10)?" required
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
                <input
                    type="text" value={iron} className="textarea resize-ta" id="iron" name="iron" pattern="[0-9]([.][0-9]*|10)?" required
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
                <input
                    type="text" value={manganese } className="textarea resize-ta" id="manganese" name="manganese" pattern="[0-9]([.][0-9]*)?|[1-4][0-9]([.][0-9]*)?|50" required
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
                <input
                    type="text" value={nitrate } className="textarea resize-ta" id="nitrate" name="nitrate" pattern="[0-9]([.][0-9]*)?|[1-3][0-9]([.][0-9]*)?|4[0-4]([.][0-9]*)?|45" required
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
                <input
                    type="text" value={name} className="textarea resize-ta" id="name" name="name" required
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </div>
            <div className="css" >
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
                            border:'1px solid black'
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
        </form>
        //</div>
    );
}

 /*const addClassLab = () =>*/
