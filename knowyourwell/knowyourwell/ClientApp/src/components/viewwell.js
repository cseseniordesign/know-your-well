import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import './css/forms.css'
import Axios from 'axios'
import moment from 'moment'
import { useSearchParams } from "react-router-dom";

let formElements = []
let columnList = []
const labelList = [
    "Well Code:", "Well Name:", "Name of Resident User:", "Adress:", "Village, Town, or City:", "State:", "Zip code:",
    "County:", "NRD District:", "Well owner (if different from resident):", "Well construction completion year:", "Complaints about smell or taste of water?:", "Smell or taste of water desciption:",
    "Does the well ever go dry?:", "When well goes dry:", "Maintenance done to the well itself within the last five years:", "major land use / development changes around the well within the last five years?:", "Number of Well Users:",
    "manure, fertilizer, or pesticides been applied the well within the last five years:", "Estimated Latitude:", "Estimated Longitude:", "Bore hole diameter (inches):", "Total depth of well (feet):", "Topography of the well location:",
    "Water level (feet):", "Aquifer Type:", "Aquifer Class:", "Well Type (Construction Method):", "Well Casing Material:", "Observations:",
    "Date Entered:"
]

const keyList = [
    "wi_wellcode", "wi_wellname", "wi_well_user", "wi_adress", "wi_city", "wi_state",
    "wi_zipcode", "county_id", "nrd_id", "wi_well_owner", "wi_installyear", "wi_smelltaste",
    "wi_smelltaste_description", "wi_welldry", "wi_welldry_description", "wi_maintenance5yr", "wi_landuse5yr", "wi_numberwelluser",
    "wi_pestmanure", "wi_estlatitude", "wi_estlongitude", "wi_boreholediameter", "wi_totaldepth", "wi_topography", "wi_waterleveldepth",
    "wi_aquifertype", "wi_aquiferclass", "wi_welltype", "wi_wellcasematerial", "wi_observation", "wi_dateentered"
];

export default function ViewWell() {
    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));
    const wellName = searchParams.get("wellName")

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        Axios
            .get("/GetWellInfo", {
                responseType: "json",
                params: {
                    well_id: well_id
                }
            })
            .then(function (response) {
                //console.log(response)
                formElements = response.data.WellInfo[0]
                //console.log(formElements.wi_wellcode)
                setLoading(false);
            });
    }, []);

    if (formElements === null) {
        const wellCookie = localStorage.getItem("wellData" + well_id);        if (wellCookie) {
            try {
                formElements = JSON.parse(wellCookie)
            }
            catch (e) {
                console.log("wellData is Invalid JSON")
            }
            //console.log(formElements)
        }
    }

    //console.log(formElements)
    if (formElements.length!=0) {
        for (let i = 0; i < labelList.length; i += 2) {
            const firstColumnName = labelList[i]
            let firstColumnValue = formElements[keyList[i]];
            if (firstColumnName == "Date Entered:")
                firstColumnValue = moment(firstColumnValue).format("MMMM DD, YYYY")
            let secondColumnValue = ""
            let secondColumnName = ""
            if (i < labelList.length + 2) {
                secondColumnName = labelList[i + 1]
                secondColumnValue = formElements[keyList[i+1]]
            }
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
                <h2>Well Info</h2>
                <br />
                <div class="container" style={{textAlign: "center"}}>
                    {columnList}
                </div>
            </div>
        );
    }
    else {
        return <h1>Loading</h1>
    }
    
    
    /*
    console.log(formElements)
    const [wellcode, setWellcode] = useState(formElements.wi_wellcode);
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
    const [gps_coordinates, setGps_coordinates] = useState(0);
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

    const backButton = () => {
        window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
    }

    const addWellInfo = () => {
        Axios.post('/createwellinfo', {
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
            gps_coordinates: gps_coordinates,
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

    return (
        //<div className="form-container">
        <form >
            <h2>Well Info</h2>
            <div className="css">
                <label for="wellcode">
                    Well ID:
                </label>
                <input
                    type="text" className="textarea resize-ta" id="wellcode" name="wellcode" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="wellname" name="wellname" disabled="disabled"
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
                    type="number" className="textarea resize-ta" id="school_id" name="school_id" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="welluser" name="welluser" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="address" name="address" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="city" name="city" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="state" name="state" disabled="disabled"
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
                    type="number" className="textarea resize-ta" id="zipcode" name="zipcode" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="wellowner" name="wellowner" disabled="disabled"
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
                    type="number" className="textarea resize-ta" id="installyear" name="installyear" disabled="disabled"
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
                            disabled="disabled"
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
                    type="text" id="smelltaste_description" name="smelltaste_description" className="textarea resize-ta" disabled="disabled"
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
                            disabled="disabled"
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
                    type="text" id="welldry_description" name="welldry_description" className="textarea resize-ta" disabled="disabled"
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
                            disabled="disabled"
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
                    Any major land use / development changes<br /> around the well within the last five years?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={landuse5yr}
                            onChange={handleChange_landuse5yr}
                            disabled="disabled"
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
                    type="number" className="textarea resize-ta" id="numberwelluser" name="numberwelluser" disabled="disabled"
                    onChange={(event) => {
                        setNumberwelluser(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="pestmanure">
                    Has any manure or pesticides been applied<br /> near the well within the last five years?
                </label>
                <div id="App">
                    <div className="select-container">
                        <select
                            value={pestmanure}
                            onChange={handleChange_pestmanure}
                            disabled="disabled"
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
                <label for="gps_coordinates">
                    Well GPS Coordinates (if registered):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="gps_coordinates" name="gps_coordinates" disabled="disabled"
                    onChange={(event) => {
                        setGps_coordinates(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="boreholediameter">
                    Bore hole diameter (inches):
                </label>
                <input
                    type="number" className="textarea resize-ta" id="boreholediameter" name="boreholediameter" disabled="disabled"
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
                    type="number" className="textarea resize-ta" id="totaldepth" name="totaldepth" disabled="disabled"
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
                            disabled="disabled"
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
                    type="number" className="textarea resize-ta" id="well_waterleveldepth" name="well_waterleveldepth" disabled="disabled"
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
                            disabled="disabled"
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
                            disabled="disabled"
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
                            disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="wellcasematerial" name="wellcasematerial" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="datacollector" name="datacollector" disabled="disabled"
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
                    type="text" className="textarea resize-ta" id="observation" name="observation" disabled="disabled"
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
        </form>
        //</div>
    );
    */
}
