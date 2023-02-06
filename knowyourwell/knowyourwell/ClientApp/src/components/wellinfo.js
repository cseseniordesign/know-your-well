import React from 'react'
import './css/forms.css'
import { useState } from 'react';
import Axios from 'axios'

export default function WellInfo() {

    //const [wellcode, setWellcode] = useState("");
    const wellcode = 13
    const [wellname, setWellname] = useState("");
    //const [school_id, setSchool_id] = useState(0);
    const school_id = 17;
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
    //const [datacollector, setDatacollector] = useState("");
    const datacollector = "John Smith"
    const [observation, setObservation] = useState("");
    const [comments, setComments] = useState("");
    const [dateentered, setDateentered] = useState("");

    const [county, setCounty] = useState("");
    const handleChange_county = (event) => {
        setCounty(event.target.value);
    }

    const [nrd, setNrd] = useState("");
    const handleChange_nrd = (event) => {
        setNrd(event.target.value);
    }

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
            county: county,
            nrd: nrd,
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
        /*action = "/editwell" id = "submissionAlert"*/
        <form action="/editwell" id="submissionAlert" >
            <h2>Well Info</h2>
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
                <label for="county">
                    County:
                </label>
                <div className="select-container">
                    <select
                        value={county}
                        onChange={handleChange_county}
                    >
                        <option hidden selected>Select one...</option>
                        <option value="Adams" id="county" name="county" required >Adams</option>
                        <option value="Antelope" id="county" name="county" required >Antelope</option>
                        <option value="Arthur" id="county" name="county" required >Arthur</option>
                        <option value="Banner" id="county" name="county" required >Banner</option>
                        <option value="Blaine" id="county" name="county" required >Blaine</option>
                        <option value="Boone" id="county" name="county" required >Boone</option>
                        <option value="Box Butte" id="county" name="county" required >Box Butte</option>
                        <option value="Boyd" id="county" name="county" required >Boyd</option>
                        <option value="Brown" id="county" name="county" required >Brown</option>
                        <option value="Buffalo" id="county" name="county" required >Buffalo</option>
                        <option value="Burt" id="county" name="county" required >Burt</option>
                        <option value="Butler" id="county" name="county" required >Butler</option>
                        <option value="Cass" id="county" name="county" required >Cass</option>
                        <option value="Cedar" id="county" name="county" required >Cedar</option>
                        <option value="Chase" id="county" name="county" required >Chase</option>
                        <option value="Cherry" id="county" name="county" required >Cherry</option>
                        <option value="Cheyenne" id="county" name="county" required >Cheyenne</option>
                        <option value="Clay" id="county" name="county" required >Clay</option>
                        <option value="Colfax" id="county" name="county" required >Colfax</option>
                        <option value="Cuming" id="county" name="county" required >Cuming</option>
                        <option value="Custer" id="county" name="county" required >Custer</option>
                        <option value="Dakota" id="county" name="county" required >Dakota</option>
                        <option value="Dawes" id="county" name="county" required >Dawes</option>
                        <option value="Dawson" id="county" name="county" required >Dawson</option>
                        <option value="Dixon" id="county" name="county" required >Dixon</option>
                        <option value="Dodge" id="county" name="county" required >Dodge</option>
                        <option value="Douglas" id="county" name="county" required >Douglas</option>
                        <option value="Deuel" id="county" name="county" required >Deuel</option>
                        <option value="Dundy" id="county" name="county" required >Dundy</option>
                        <option value="Fillmore" id="county" name="county" required >Fillmore</option>
                        <option value="Franklin" id="county" name="county" required >Franklin</option>
                        <option value="Frontier" id="county" name="county" required >Frontier</option>
                        <option value="Furnas" id="county" name="county" required >Furnas</option>
                        <option value="Gage" id="county" name="county" required >Gage</option>
                        <option value="Garden" id="county" name="county" required >Garden</option>
                        <option value="Garfield" id="county" name="county" required >Garfield</option>
                        <option value="Gosper" id="county" name="county" required >Gosper</option>
                        <option value="Grant" id="county" name="county" required >Grant</option>
                        <option value="Greeley" id="county" name="county" required >Greeley</option>
                        <option value="Hall" id="county" name="county" required >Hall</option>
                        <option value="Hamilton" id="county" name="county" required >Hamilton</option>
                        <option value="Harlan" id="county" name="county" required >Harlan</option>
                        <option value="Hayes" id="county" name="county" required >Hayes</option>
                        <option value="Hitchcock" id="county" name="county" required >Hitchcock</option>
                        <option value="Holt" id="county" name="county" required >Holt</option>
                        <option value="Hooker" id="county" name="county" required >Hooker</option>
                        <option value="Howard" id="county" name="county" required >Howard</option>
                        <option value="Jefferson" id="county" name="county" required >Jefferson</option>
                        <option value="Johnson" id="county" name="county" required >Johnson</option>
                        <option value="Kearney" id="county" name="county" required >Kearney</option>
                        <option value="Keith" id="county" name="county" required >Keith</option>
                        <option value="Keya Paha" id="county" name="county" required >Keya Paha</option>
                        <option value="Kimball" id="county" name="county" required >Kimball</option>
                        <option value="Knox" id="county" name="county" required >Knox</option>
                        <option value="Lancaster" id="county" name="county" required >Lancaster</option>
                        <option value="Lincoln" id="county" name="county" required >Lincoln</option>
                        <option value="Logan" id="county" name="county" required >Logan</option>
                        <option value="Loup" id="county" name="county" required >Loup</option>
                        <option value="Madison" id="county" name="county" required >Madison</option>
                        <option value="McPherson" id="county" name="county" required >McPherson</option>
                        <option value="Merrick" id="county" name="county" required >Merrick</option>
                        <option value="Morrill" id="county" name="county" required >Morrill</option>
                        <option value="Nance" id="county" name="county" required >Nance</option>
                        <option value="Nemaha" id="county" name="county" required >Nemaha</option>
                        <option value="Nuckolls" id="county" name="county" required >Nuckolls</option>
                        <option value="Otoe" id="county" name="county" required >Otoe</option>
                        <option value="Pawnee" id="county" name="county" required >Pawnee</option>
                        <option value="Perkins" id="county" name="county" required >Perkins</option>
                        <option value="Phelps" id="county" name="county" required >Phelps</option>
                        <option value="Pierce" id="county" name="county" required >Pierce</option>
                        <option value="Platte" id="county" name="county" required >Platte</option>
                        <option value="Polk" id="county" name="county" required >Polk</option>
                        <option value="Red Willow" id="county" name="county" required >Red Willow</option>
                        <option value="Richardson" id="county" name="county" required >Richardson</option>
                        <option value="Rock" id="county" name="county" required >Rock</option>
                        <option value="Saline" id="county" name="county" required >Saline</option>
                        <option value="Sarpy" id="county" name="county" required >Sarpy</option>                        
                        <option value="Saunders" id="county" name="county" required >Saunders</option>
                        <option value="Scotts Bluff" id="county" name="county" required >Scotts Bluff</option>
                        <option value="Seward" id="county" name="county" required >Seward</option>
                        <option value="Sheridan" id="county" name="county" required >Sheridan</option>
                        <option value="Sherman" id="county" name="county" required >Sherman</option>
                        <option value="Sioux" id="county" name="county" required >Sioux</option>
                        <option value="Stanton" id="county" name="county" required >Stanton</option>
                        <option value="Thayer" id="county" name="county" required >Thayer</option>
                        <option value="Thomas" id="county" name="county" required >Thomas</option>
                        <option value="Thurston" id="county" name="county" required >Thurston</option>
                        <option value="Valley" id="county" name="county" required >Valley</option>
                        <option value="Washington" id="county" name="county" required >Washington</option>
                        <option value="Wayne" id="county" name="county" required >Wayne</option>
                        <option value="Webster" id="county" name="county" required >Webster</option>
                        <option value="Wheeler" id="county" name="county" required >Wheeler</option>
                        <option value="York" id="county" name="county" required >York</option>
                    </select>
                </div>
            </div>
            <div className="css">
                <label for="nrd">
                    NRD:
                </label>
                <div className="select-container">
                    <select
                        value={nrd}
                        onChange={handleChange_nrd}
                    >
                        <option hidden selected>Select one...</option>
                        <option value="Central Platte" id="nrd" name="nrd" required >Central Platte</option>
                        <option value="Lewis and Clark" id="nrd" name="nrd" required >Lewis and Clark</option>
                        <option value="Little Blue" id="nrd" name="nrd" required >Little Blue</option>
                        <option value="Lower Big Blue" id="nrd" name="nrd" required >Lower Big Blue</option>
                        <option value="Lower Elkhorn" id="nrd" name="nrd" required >Lower Elkhorn</option>
                        <option value="Lower Loup" id="nrd" name="nrd" required >Lower Loup</option>
                        <option value="Lower Niobrara" id="nrd" name="nrd" required >Lower Niobrara</option>
                        <option value="Lower Platte North" id="nrd" name="nrd" required >Lower Platte North</option>
                        <option value="Lower Platte South" id="nrd" name="nrd" required >Lower Platte South</option>
                        <option value="Lower Republican" id="nrd" name="nrd" required >Lower Republican</option>
                        <option value="Middle Niobrara" id="nrd" name="nrd" required >Middle Niobrara</option>
                        <option value="Middle Republican" id="nrd" name="nrd" required >Middle Republican</option>
                        <option value="Nemaha" id="nrd" name="nrd" required >Nemaha</option>
                        <option value="North Platte" id="nrd" name="nrd" required >North Platte</option>
                        <option value="Papio-Missouri River" id="nrd" name="nrd" required >Papio-Missouri River</option>
                        <option value="South Platte" id="nrd" name="nrd" required >South Platte</option>
                        <option value="Tri-Basin" id="nrd" name="nrd" required >Tri-Basin</option>
                        <option value="Twin Platte" id="nrd" name="nrd" required >Twin Platte</option>
                        <option value="Upper Big Blue" id="nrd" name="nrd" required >Upper Big Blue</option>
                        <option value="Upper Elkhorn" id="nrd" name="nrd" required >Upper Elkhorn</option>
                        <option value="Upper Loup" id="nrd" name="nrd" required >Upper Loup</option>
                        <option value="Upper Niobrara-White" id="nrd" name="nrd" required >Upper Niobrara-White</option>
                        <option value="Upper Republican" id="nrd" name="nrd" required >Upper Republican</option>
                    </select>
                </div>
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
                    Estimated Longitude (in decimal degrees):
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
                    type="number" className="textarea resize-ta" id="boreholediameter" name="boreholediameter" min="0" step=".00001"
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
                    type="number" className="textarea resize-ta" id="totaldepth" name="totaldepth" min="0" step=".00001"
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
                    type="number" className="textarea resize-ta" id="well_waterleveldepth" name="well_waterleveldepth" min="0" step=".00001"
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
            {/* }
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
            { */}
            <div className="css">
                <label for="observation">
                    Observations:
                </label>
                <textarea
                    type="text" id="observation" name="observation" className="textarea resize-ta" maxLength="150"
                    onChange={(event) => {
                        setObservation(event.target.value);
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

