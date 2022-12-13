﻿import React from 'react'
import './css/forms.css'
import { useState } from 'react';
import Axios from 'axios'

export default function WellInfo() {

    const [wellcode, setWellcode] = useState("");
    const [wellname, setWellname] = useState("");
    const [school_id, setSchool_id] = useState(0);
    const [welluser, setWelluser] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [wellowner, setWellowner] = useState("");
    const [installyear, setInstallyear] = useState(0);
    const [numberwelluser, setNumberwelluser] = useState(0);
    const [estlatitude, setEstlatitude] = useState(0);
    const [estlongitude, setEstlongitude] = useState(0);
    const [boreholediameter, setBoreholediameter] = useState(0);
    const [totaldepth, setTotaldepth] = useState(0);
    const [well_waterleveldepth, setWell_waterleveldepth] = useState(0);

    const [wellcasematerial, setWellcasematerial] = useState("");
    const [datacollector, setDatacollector] = useState("");
    const [observation, setObservation] = useState("");
    const [comments, setComments] = useState("");
    const [dateentered, setDateentered] = useState("");

    const [smelltaste, setSmelltaste] = useState("");
    const handleChange_smelltaste = (event) => {
        setSmelltaste(event.target.value);
    };
    const [smelltaste_description, setSmelltaste_description] = useState("");

    const [welldry, setWelldry] = useState("");

    const handleChange_welldry = (event) => {
        setWelldry(event.target.value);
    };

    const [welldry_description, setWelldry_description] = useState("");

    const [maintenance5yr, setMaintenance5yr] = useState("");
    const handleChange_maintenance5yr = (event) => {
        setMaintenance5yr(event.target.value);
    };

    const [landuse5yr, setLanduse5yr] = useState("");
    const handleChange_landuse5yr = (event) => {
        setLanduse5yr(event.target.value);
    };

    const [pestmanure, setPestmanure] = useState("");
    const handleChange_pestmanure = (event) => {
        setPestmanure(event.target.value);
    };

    const [topography, setTopography] = useState("");
    const handleChange_topography = (event) => {
        setTopography(event.target.value);
    };

    const [aquifertype, setAquifertype] = useState("");
    const handleChange_aquifertype = (event) => {
        setAquifertype(event.target.value);
    };

    const [aquiferclass, setAquiferclass] = useState("");
    const handleChange_aquiferclass = (event) => {
        setAquiferclass(event.target.value);
    };

    const [welltype, setWelltype] = useState("");
    const handleChange_welltype = (event) => {
        setWelltype(event.target.value);
    };

    function addWellInfo() {  /*const addWellInfo = () =>*/
        Axios.post('http://localhost:7193/createwellinfo', {
            wellcode: wellcode,
            wellname: wellname,
            school_id: school_id,
            welluser: welluser,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            wellowner: wellowner,
            installyear: installyear,
            smelltaste: smelltaste,
            smelltaste_description: smelltaste_description,
            welldry: welldry,
            welldry_description: welldry_description,
            maintenance5yr: maintenance5yr,
            landuse5yr: landuse5yr,
            numberwelluser: numberwelluser,
            pestmanure: pestmanure,
            estlatitude: estlatitude,
            estlongitude: estlongitude,
            boreholediameter: boreholediameter,
            totaldepth: totaldepth,
            topography: topography,
            well_waterleveldepth: well_waterleveldepth,
            aquifertype: aquifertype,
            aquiferclass: aquiferclass,
            welltype: welltype,
            wellcasematerial: wellcasematerial,
            datacollector: datacollector,
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
            alert("Succesfully submitted Well Info Form!");
        }
    }

    const myFunction3 = () => {
        window.location.href = "/editwell";
    }

    function myFunction2() {
        addWellInfo();
        myFunction();
    }

    return (
        //<div className="form-container">
        <form action="/editwell" id="submissionAlert">
            <h2>Well Info</h2>
            <div className="css">
                <label for="wellcode">
                    Well ID:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="wellcode" name="wellcode" required autofocus
                    onChange={(event) => {
                        setWellcode(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="wellname">
                    Well Name:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="wellname" name="wellname" required
                    onChange={(event) => {
                        setWellname(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="school_id">
                    School Name (School-ID):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="school_id" name="school_id" required
                    onChange={(event) => {
                        setSchool_id(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="welluser">
                    Name of the resident well user:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="welluser" name="welluser"
                    onChange={(event) => {
                        setWelluser(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="address">
                    Address:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="address" name="address"
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="city">
                    Village, Town, or City:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="city" name="city"
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="state">
                    State:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="state" name="state"
                    onChange={(event) => {
                        setState(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="zipcode">
                    Zip code:
                </label>
                <input
                    type="number" className="textarea resize-ta" id="zipcode" name="zipcode" min="00001" max="99950" minlength="5" maxlength="5"
                    onChange={(event) => {
                        setZipcode(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="wellowner">
                    Well owner (if different from resident):
                </label>
                <input
                    type="text" className="textarea resize-ta" id="wellowner" name="wellowner"
                    onChange={(event) => {
                        setWellowner(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="installyear">
                    Well construction completion year:
                </label>
                <input
                    type="number" className="textarea resize-ta" id="installyear" name="installyear" min="1000" max="3000" required
                    onChange={(event) => {
                        setInstallyear(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="smelltaste">
                    Any complaints about <br /> smell or taste of water?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={smelltaste}
                            onChange={handleChange_smelltaste}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="smelltaste" name="smelltaste" required >Yes</option>
                            <option value="No" id="smelltaste" name="smelltaste" required >No</option>
                            <option value="Unknown" id="smelltaste" name="smelltaste" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="smelltaste_description">
                    Smell or taste of water desciption:
                </label>
                <textarea
                    type="text" id="smelltaste_description" name="smelltaste_description" className="textarea resize-ta" maxLength="150"
                    onChange={(event) => { // if 'yes'
                        setSmelltaste_description(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="welldry">
                    Does the well ever go dry?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={welldry}
                            onChange={handleChange_welldry}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="welldry" name="welldry" required >Yes</option>
                            <option value="No" id="welldry" name="welldry" required >No</option>
                            <option value="Maybe" id="welldry" name="welldry" required >Maybe</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="welldry_description">
                    If so, when?
                </label>
                <textarea
                    type="text" id="welldry_description" name="welldry_description" className="textarea resize-ta" maxLength="150"
                    onChange={(event) => {
                        setWelldry_description(event.target.value);
                    }}
                />

            </div>
            <div className="css">
                <label for="maintenance5yr">
                    Any maintenance done to the well<br /> itself
                    within the last five years?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={maintenance5yr}
                            onChange={handleChange_maintenance5yr}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="maintenance5yr" name="maintenance5yr" required >Yes</option>
                            <option value="No" id="maintenance5yr" name="maintenance5yr" required >No</option>
                            <option value="Unknown" id="maintenance5yr" name="maintenance5yr" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="landuse5yr">
                    Any major land use / development
                    changes<br /> around the well within the
                    last five years?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={landuse5yr}
                            onChange={handleChange_landuse5yr}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="landuse5yr" name="landuse5yr" required >Yes</option>
                            <option value="No" id="landuse5yr" name="landuse5yr" required >No</option>
                            <option value="Unknown" id="landuse5yr" name="landuse5yr" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="numberwelluser">
                    How many people use this well?
                </label>
                <input
                    type="number" className="textarea resize-ta" id="numberwelluser" name="numberwelluser"
                    onChange={(event) => {
                        setNumberwelluser(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="pestmanure">
                    Has any manure or pesticides been
                    applied<br /> near the well within the last
                    five years?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={pestmanure}
                            onChange={handleChange_pestmanure}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Yes" id="pestmanure" name="pestmanure" required >Yes</option>
                            <option value="No" id="pestmanure" name="pestmanure" required >No</option>
                            <option value="Unknown" id="pestmanure" name="pestmanure" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="estlatitude">
                    Estimated Latitude (in decimal degrees):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="estlatitude" name="estlatitude" min="40" max="43" step=".00001" required
                    onChange={(event) => {
                        setEstlatitude(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="estlongitude">
                    Estimated Latitude (in decimal degrees):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="estlongitude" name="estlongitude" min="-104" max="-95.417" step=".00001" required
                    onChange={(event) => {
                        setEstlongitude(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="boreholediameter">
                    Bore hole diameter (inches):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="boreholediameter" name="boreholediameter" min="0"
                    onChange={(event) => {
                        setBoreholediameter(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="totaldepth">
                    Total depth of well (feet):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="totaldepth" name="totaldepth" min="0"
                    onChange={(event) => {
                        setTotaldepth(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="topography">
                    Topography of the well location:
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={topography}
                            onChange={handleChange_topography}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="HillTop" id="topography" name="topography" required >Hill Top</option>
                            <option value="HillSlope" id="topography" name="topography" required >Hill Slope</option>
                            <option value="LevelLand" id="topography" name="topography" required >Level Land</option>
                            <option value="Depression" id="topography" name="topography" required >Depression</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="well_waterleveldepth">
                    Water level (feet):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="well_waterleveldepth" name="well_waterleveldepth" min="0"
                    onChange={(event) => {
                        setWell_waterleveldepth(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="aquifertype">
                    Aquifer Type:
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={aquifertype}
                            onChange={handleChange_aquifertype}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Confined" id="aquifertype" name="aquifertype" required >Confined</option>
                            <option value="Unconfined" id="aquifertype" name="aquifertype" required >Unconfined</option>
                            <option value="Unknown" id="aquifertype" name="aquifertype" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="aquiferclass">
                    Aquifer Class:
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={aquiferclass}
                            onChange={handleChange_aquiferclass}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Bedrock" id="aquiferclass" name="aquiferclass" required >Bedrock</option>
                            <option value="SandOrGravel" id="aquiferclass" name="aquiferclass" required >Sand or Gravel</option>
                            <option value="Unknown" id="aquiferclass" name="aquiferclass" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="welltype">
                    Well Type (Construction Method):
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={welltype}
                            onChange={handleChange_welltype}
                        >
                            <option hidden selected>Select one...</option>
                            <option value="Drilled" id="welltype" name="welltype" required >Drilled</option>
                            <option value="Driven" id="welltype" name="welltype" required >Driven</option>
                            <option value="Dug" id="welltype" name="welltype" required >Dug</option>
                            <option value="Unknown" id="welltype" name="welltype" required >Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="wellcasematerial">
                    What is the well casing material made of?
                </label>
                <input
                    type="text" className="textarea resize-ta" id="wellcasematerial" name="wellcasematerial"
                    onChange={(event) => {
                        setWellcasematerial(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="datacollector">
                    Data Collector’s Name:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="datacollector" name="datacollector" required
                    onChange={(event) => {
                        setDatacollector(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="observation">
                    Observations:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="observation" name="observation"
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
                    type="text" className="textarea resize-ta" id="comments" name="comments"
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
                    type="date" className="textarea resize-ta" id="dateentered" name="dateentered" required
                    onChange={(event) => {
                        setDateentered(event.target.value);
                    }}
                />
            </div>
            <button type="submit" onClick={myFunction2} >Save</button>
            <button type="submit" onClick={myFunction3}  >Back</button>
        </form>
        //</div>
    );
}

