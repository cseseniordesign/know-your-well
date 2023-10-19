import React from 'react'
import './css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import NumberEntry from './numberentry';


export default function WellInfo() {
    //const [wellcode, setWellcode] = useState("");
    const wellcode = "abc123" // TODO
    const [wellname, setWellname] = useState("");
    //const [school_id, setSchool_id] = useState(0);
    const school_id = 1; // todo
    const [welluser, setWelluser] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [wellowner, setWellowner] = useState("");
    const [installyear, setInstallyear] = useState("");
    const [numberwelluser, setNumberwelluser] = useState(0);
    const [estlatitude, setEstlatitude] = useState(null);
    const [estlongitude, setEstlongitude] = useState(null);
    const [boreholediameter, setBoreholediameter] = useState(0);
    const [wellcasematerial, setWellcasematerial] = useState("");
    const [datacollector, setDatacollector] = useState("");
    const [observation, setObservation] = useState("");
    const [dateentered, setDateentered] = useState(moment().format('L, h:mm a'));
    const [error, setError] = useState(0);
    const [totaldepth, setTotaldepth] = useState("");
    const [well_waterleveldepth, setWell_waterleveldepth] = useState("");

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const [state, setState] = useState("");
    const handleChange_state = (event) => {
        setState(event.target.value);
    }

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
    function checkDepthValidation(well_waterleveldepth, totaldepth) {
        if(well_waterleveldepth <= totaldepth) {
            return true;
        } else {
            return false;
        }
    }

    function addWellInfo() {
        Axios.post('/createwellinfo', {
            wellcode: wellcode,
            wellname: wellname,
            school_id: school_id,
            welluser: welluser,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            countyid: county,
            nrdid: nrd,
            phone: phone,
            email: email,
            wellowner: wellowner,
            installyear: JSON.stringify(installyear).substring(1,5),
            smelltaste: smelltaste,
            smelltastedescription: smelltaste_description,
            welldry: welldry,
            welldrydescription: welldry_description,
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
            dateentered: dateentered,
        })
            .then(() => {
                console.log("success");
            })
    };

    const handlePhoneChange = (event) => {
        const phoneNumber = event.target.value;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    
        setIsValidPhone(phonePattern.test(phoneNumber));
        setPhone(phoneNumber);
    };

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        setIsValidEmail(emailPattern.test(emailValue));
        setEmail(emailValue);
    };

    const validForm = () => {
        var form = document.getElementById('submissionAlert');
        if (form.checkValidity()) {
            return true;
        }
        else {
            form.reportValidity();
            return false;
        }
    }

    const backButton = () => {
        if(window.confirm("Any unsaved data will be lost.\nWould you like to continue?")){
            window.location.href = `/well`;
        }
    }

    function submitForm() {
        if (validForm() && window.confirm("Submitted data is final and can only be edited by Nebraska Water Center Staff.\nWould you like to continue?")) {
            addWellInfo();
            alert("Succesfully submitted Well Info Form!");
            window.location.href = `/well`
        }
    }

    return (
        <form action="/editwell" id="submissionAlert" >
            <h2>Well Info</h2>
            <div className="requiredField">
                <br/>
                * = Required Field
            </div>
            <div className="css">
                <label for="wellname">
                    Well Name:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" className="textarea resize-ta" id="wellname" name="wellname" required
                    onChange={(event) => {
                        setWellname(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="welluser">
                    Name of the resident well user:
                </label>
                <input type="text" className="textarea resize-ta" id="welluser" name="welluser"
                    onChange={(event) => {
                        setWelluser(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="address">
                    Address:
                </label>
                <input type="text" className="textarea resize-ta" id="address" name="address"
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="city">
                    Village, Town, or City:
                </label>
                <input type="text" className="textarea resize-ta" id="city" name="city"
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="state">
                    State:
                </label>
                <div className="select-container">
                    <select value={state} onChange={handleChange_state}>
                        <option hidden selected>Select one...</option>
                        <option value="AL" id="state" name="state">Alabama</option>
                        <option value="AK" id="state" name="state">Alaska</option>
                        <option value="AZ" id="state" name="state">Arizona</option>
                        <option value="AR" id="state" name="state">Arkansas</option>
                        <option value="CA" id="state" name="state">California</option>
                        <option value="CO" id="state" name="state">Colorado</option>
                        <option value="CT" id="state" name="state">Connecticut</option>
                        <option value="DE" id="state" name="state">Delaware</option>
                        <option value="FL" id="state" name="state">Florida</option>
                        <option value="GA" id="state" name="state">Georgia</option>
                        <option value="HI" id="state" name="state">Hawaii</option>
                        <option value="ID" id="state" name="state">Idaho</option>
                        <option value="IL" id="state" name="state">Illinois</option>
                        <option value="IN" id="state" name="state">Indiana</option>
                        <option value="IA" id="state" name="state">Iowa</option>
                        <option value="KS" id="state" name="state">Kansas</option>
                        <option value="KY" id="state" name="state">Kentucky</option>
                        <option value="LA" id="state" name="state">Louisiana</option>
                        <option value="ME" id="state" name="state">Maine</option>
                        <option value="MD" id="state" name="state">Maryland</option>
                        <option value="MA" id="state" name="state">Massachusetts</option>
                        <option value="MI" id="state" name="state">Michigan</option>
                        <option value="MN" id="state" name="state">Minnesota</option>
                        <option value="MS" id="state" name="state">Mississippi</option>
                        <option value="M0" id="state" name="state">Missouri</option>
                        <option value="MT" id="state" name="state">Montana</option>
                        <option value="NE" id="state" name="state">Nebraska</option>
                        <option value="NV" id="state" name="state">Nevada</option>
                        <option value="NH" id="state" name="state">New Hampshire</option>
                        <option value="NJ" id="state" name="state">New Jersey</option>
                        <option value="NM" id="state" name="state">New Mexico</option>
                        <option value="NY" id="state" name="state">New York</option>
                        <option value="NC" id="state" name="state">North Carolina</option>
                        <option value="ND" id="state" name="state">North Dakota</option>
                        <option value="OH" id="state" name="state">Ohio</option>
                        <option value="OK" id="state" name="state">Oklahoma</option>
                        <option value="OR" id="state" name="state">Oregon</option>
                        <option value="PA" id="state" name="state">Pennsylvania</option>
                        <option value="RI" id="state" name="state">Rhode Island</option>
                        <option value="SC" id="state" name="state">South Carolina</option>
                        <option value="SD" id="state" name="state">South Dakota</option>
                        <option value="TN" id="state" name="state">Tennessee</option>
                        <option value="TX" id="state" name="state">Texas</option>
                        <option value="UT" id="state" name="state">Utah</option>
                        <option value="VT" id="state" name="state">Vermont</option>
                        <option value="VA" id="state" name="state">Virginia</option>
                        <option value="WA" id="state" name="state">Washington</option>
                        <option value="WV" id="state" name="state">West Virginia</option>
                        <option value="WI" id="state" name="state">Wisconsin</option>
                        <option value="WY" id="state" name="state">Wyoming</option>
                    </select>
                </div>
            </div>
            <div className="css">
                <label for="zipcode">
                    Zip code:
                </label>
                <input type="text" className="textarea resize-ta" id="zipcode" name="zipcode" pattern="[0-9]{5}"
                    onChange={(event) => {
                        setZipcode(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="county">
                    County:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span> 
                </label>
                <div className="select-container">
                    <select value={county} onChange={handleChange_county} required>
                        <option value="" hidden selected>Select one...</option>
                        <option value="1" id="county" name="county">Adams</option>
                        <option value="2" id="county" name="county">Antelope</option>
                        <option value="3" id="county" name="county">Arthur</option>
                        <option value="4" id="county" name="county">Banner</option>
                        <option value="5" id="county" name="county">Blaine</option>
                        <option value="6" id="county" name="county">Boone</option>
                        <option value="7" id="county" name="county">Box Butte</option>
                        <option value="8" id="county" name="county">Boyd</option>
                        <option value="9" id="county" name="county">Brown</option>
                        <option value="10" id="county" name="county">Buffalo</option>
                        <option value="11" id="county" name="county">Burt</option>
                        <option value="12" id="county" name="county">Butler</option>
                        <option value="13" id="county" name="county">Cass</option>
                        <option value="14" id="county" name="county">Cedar</option>
                        <option value="15" id="county" name="county">Chase</option>
                        <option value="16" id="county" name="county">Cherry</option>
                        <option value="17" id="county" name="county">Cheyenne</option>
                        <option value="18" id="county" name="county">Clay</option>
                        <option value="19" id="county" name="county">Colfax</option>
                        <option value="20" id="county" name="county">Cuming</option>
                        <option value="21" id="county" name="county">Custer</option>
                        <option value="22" id="county" name="county">Dakota</option>
                        <option value="23" id="county" name="county">Dawes</option>
                        <option value="24" id="county" name="county">Dawson</option>
                        <option value="25" id="county" name="county">Deuel</option>
                        <option value="26" id="county" name="county">Dixon</option>
                        <option value="27" id="county" name="county">Dodge</option>
                        <option value="28" id="county" name="county">Douglas</option>
                        <option value="29" id="county" name="county">Dundy</option>
                        <option value="30" id="county" name="county">Fillmore</option>
                        <option value="31" id="county" name="county">Franklin</option>
                        <option value="32" id="county" name="county">Frontier</option>
                        <option value="33" id="county" name="county">Furnas</option>
                        <option value="34" id="county" name="county">Gage</option>
                        <option value="35" id="county" name="county">Garden</option>
                        <option value="36" id="county" name="county">Garfield</option>
                        <option value="37" id="county" name="county">Gosper</option>
                        <option value="38" id="county" name="county">Grant</option>
                        <option value="39" id="county" name="county">Greeley</option>
                        <option value="40" id="county" name="county">Hall</option>
                        <option value="41" id="county" name="county">Hamilton</option>
                        <option value="42" id="county" name="county">Harlan</option>
                        <option value="43" id="county" name="county">Hayes</option>
                        <option value="44" id="county" name="county">Hitchcock</option>
                        <option value="45" id="county" name="county">Holt</option>
                        <option value="46" id="county" name="county">Hooker</option>
                        <option value="47" id="county" name="county">Howard</option>
                        <option value="48" id="county" name="county">Jefferson</option>
                        <option value="49" id="county" name="county">Johnson</option>
                        <option value="50" id="county" name="county">Kearney</option>
                        <option value="51" id="county" name="county">Keith</option>
                        <option value="52" id="county" name="county">Keya Paha</option>
                        <option value="53" id="county" name="county">Kimball</option>
                        <option value="54" id="county" name="county">Knox</option>
                        <option value="55" id="county" name="county">Lancaster</option>
                        <option value="56" id="county" name="county">Lincoln</option>
                        <option value="57" id="county" name="county">Logan</option>
                        <option value="58" id="county" name="county">Loup</option>
                        <option value="59" id="county" name="county">McPherson</option>
                        <option value="60" id="county" name="county">Madison</option>
                        <option value="61" id="county" name="county">Merrick</option>
                        <option value="62" id="county" name="county">Morrill</option>
                        <option value="63" id="county" name="county">Nance</option>
                        <option value="64" id="county" name="county">Nemaha</option>
                        <option value="65" id="county" name="county">Nuckolls</option>
                        <option value="66" id="county" name="county">Otoe</option>
                        <option value="67" id="county" name="county">Pawnee</option>
                        <option value="68" id="county" name="county">Perkins</option>
                        <option value="69" id="county" name="county">Phelps</option>
                        <option value="70" id="county" name="county">Pierce</option>
                        <option value="71" id="county" name="county">Platte</option>
                        <option value="72" id="county" name="county">Polk</option>
                        <option value="73" id="county" name="county">Red Willow</option>
                        <option value="74" id="county" name="county">Richardson</option>
                        <option value="75" id="county" name="county">Rock</option>
                        <option value="76" id="county" name="county">Saline</option>
                        <option value="77" id="county" name="county">Sarpy</option>
                        <option value="78" id="county" name="county">Saunders</option>
                        <option value="79" id="county" name="county">Scotts Bluff</option>
                        <option value="80" id="county" name="county">Seward</option>
                        <option value="81" id="county" name="county">Sheridan</option>
                        <option value="82" id="county" name="county">Sherman</option>
                        <option value="83" id="county" name="county">Sioux</option>
                        <option value="84" id="county" name="county">Stanton</option>
                        <option value="85" id="county" name="county">Thayer</option>
                        <option value="86" id="county" name="county">Thomas</option>
                        <option value="87" id="county" name="county">Thurston</option>
                        <option value="88" id="county" name="county">Valley</option>
                        <option value="89" id="county" name="county">Washington</option>
                        <option value="90" id="county" name="county">Wayne</option>
                        <option value="91" id="county" name="county">Webster</option>
                        <option value="92" id="county" name="county">Wheeler</option>
                        <option value="93" id="county" name="county">York</option>
                    </select>
                </div>
            </div>
            <div className="css">
                <label for="nrd">
                    NRD:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div className="select-container">
                    <select value={nrd} onChange={handleChange_nrd} required>
                        <option value="" hidden selected>Select one...</option>
                        <option value="1" id="nrd" name="nrd">Central Platte</option>
                        <option value="2" id="nrd" name="nrd">Lewis and Clark</option>
                        <option value="3" id="nrd" name="nrd">Little Blue</option>
                        <option value="4" id="nrd" name="nrd">Lower Big Blue</option>
                        <option value="5" id="nrd" name="nrd">Lower Elkhorn</option>
                        <option value="6" id="nrd" name="nrd">Lower Loup</option>
                        <option value="7" id="nrd" name="nrd">Lower Niobrara</option>
                        <option value="8" id="nrd" name="nrd">Lower Platte North</option>
                        <option value="9" id="nrd" name="nrd">Lower Platte South</option>
                        <option value="10" id="nrd" name="nrd">Lower Republican</option>
                        <option value="11" id="nrd" name="nrd">Middle Niobrara</option>
                        <option value="12" id="nrd" name="nrd">Middle Republican</option>
                        <option value="13" id="nrd" name="nrd">Nemaha</option>
                        <option value="14" id="nrd" name="nrd">North Platte</option>
                        <option value="15" id="nrd" name="nrd">Papio-Missouri River</option>
                        <option value="16" id="nrd" name="nrd">South Platte</option>
                        <option value="17" id="nrd" name="nrd">Tri-Basin</option>
                        <option value="18" id="nrd" name="nrd">Twin Platte</option>
                        <option value="19" id="nrd" name="nrd">Upper Big Blue</option>
                        <option value="20" id="nrd" name="nrd">Upper Elkhorn</option>
                        <option value="21" id="nrd" name="nrd">Upper Loup</option>
                        <option value="22" id="nrd" name="nrd">Upper Niobrara-White</option>
                        <option value="23" id="nrd" name="nrd">Upper Republican</option>
                    </select>
                </div>
            </div>
            <div className="css">
                <label for="phone">
                    Phone # (of well user):
                </label>
                <input type="text" className={`textarea resize-ta ${isValidPhone ? 'valid' : 'invalid'}`} id="phone" name="phone" pattern="^\d{3}-\d{3}-\d{4}$" 
                    onChange={handlePhoneChange}
                    title="Please enter a valid US phone number in the format XXX-XXX-XXXX."
                />
                {!isValidPhone && <p className="error-message">Invalid phone number format</p>}
            </div>
            <div className="css">
                <label for="email">
                    Email (of well user):
                </label>
                <input type="text" className={`textarea resize-ta ${isValidEmail ? 'valid' : 'invalid'}`} id="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    onChange={handleEmailChange}
                    title="Please enter a valid email address in the format example@example.com"
                />
                {!isValidEmail && <p className="error-message">Invalid email address format</p>}
            </div>
            <div className="css">
                <label for="wellowner">
                    Well owner (if different from resident):
                </label>
                <input type="text" className="textarea resize-ta" id="wellowner" name="wellowner"
                    onChange={(event) => {
                        setWellowner(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="installyear">
                    Well construction completion year:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="installyear">
                    <DatePicker
                        value={installyear}
                        dateFormat="YYYY"
                        timeFormat=""
                        onChange={(val) => setInstallyear(val)}
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
            <div className="css">
                <label for="smelltaste">
                    Any complaints about <br /> smell or taste of water?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={smelltaste} onChange={handleChange_smelltaste} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Yes" id="smelltaste" name="smelltaste">Yes</option>
                            <option value="No" id="smelltaste" name="smelltaste">No</option>
                            <option value="Unknown" id="smelltaste" name="smelltaste">Unknown</option>
                        </select>
                    </div>
                    {smelltaste ==="Yes" && (
                        <div className="css">
                            <label for="smelltaste_description">
                                Smell or taste of water desciption:
                            </label>
                            <textarea type="text" id="smelltaste_description" name="smelltaste_description" className="textarea resize-ta" maxLength="150"
                                onChange={(event) => {
                                    setSmelltaste_description(event.target.value);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="css">
                <label for="welldry">
                    Does the well ever go dry?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={welldry} onChange={handleChange_welldry} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Yes" id="welldry" name="welldry">Yes</option>
                            <option value="No" id="welldry" name="welldry">No</option>
                            <option value="Maybe" id="welldry" name="welldry">Maybe</option>
                        </select>
                    </div>
                    {welldry === "Yes" && (
                        <div className="css">
                            <label for="welldry_description">
                                If so, when?
                            </label>
                            <textarea type="text" id="welldry_description" name="welldry_description" className="textarea resize-ta" maxLength="150"
                                onChange={(event) => {
                                    setWelldry_description(event.target.value);
                                }}
                            />
                        </div>
                    )}
                    {welldry === "Maybe" && (
                        <div className="css">
                            <label for="welldry_description">
                                If so, when?
                            </label>
                            <textarea type="text" id="welldry_description" name="welldry_description" className="textarea resize-ta" maxLength="150"
                                onChange={(event) => {
                                    setWelldry_description(event.target.value);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="css">
                <label for="maintenance5yr">
                    Any maintenance done to the well<br /> itself within the last five years?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={maintenance5yr} onChange={handleChange_maintenance5yr} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Yes" id="maintenance5yr" name="maintenance5yr">Yes</option>
                            <option value="No" id="maintenance5yr" name="maintenance5yr">No</option>
                            <option value="Unknown" id="maintenance5yr" name="maintenance5yr">Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="landuse5yr">
                    Any major land use / development changes<br /> around the well within the last five years?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={landuse5yr} onChange={handleChange_landuse5yr} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Yes" id="landuse5yr" name="landuse5yr">Yes</option>
                            <option value="No" id="landuse5yr" name="landuse5yr">No</option>
                            <option value="Unknown" id="landuse5yr" name="landuse5yr">Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="numberwelluser">
                    How many people use this well?
                </label>
                <input type="text" className="textarea resize-ta" id="numberwelluser" name="numberwelluser" pattern="[0-9]+"
                    onChange={(event) => {
                        setNumberwelluser(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="pestmanure">
                    Has any manure, fertilizer, or pesticides been applied<br /> near the well within the last five years?
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={pestmanure} onChange={handleChange_pestmanure} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Yes" id="pestmanure" name="pestmanure">Yes</option>
                            <option value="No" id="pestmanure" name="pestmanure">No</option>
                            <option value="Unknown" id="pestmanure" name="pestmanure">Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="estlatitude">
                    Estimated Latitude (in decimal degrees):
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                    <br/> [40 - 43]
                </label>
                <input type="text" className="textarea resize-ta" id="estlatitude" name="estlatitude" pattern="4[0-2]+([.][0-9]{1,5})?|43" required
                    onChange={(event) => {
                        setEstlatitude(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="estlongitude">
                    Estimated Longitude (in decimal degrees):
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                    <br/> [-104 - -95.417]
                </label>
                <input type="text" className="textarea resize-ta" id="estlongitude" name="estlongitude" pattern="-(104|1[0-9][0-3]([.][0-9]{1,5})?|9[6-9]([.][0-9]{1,5})?|95([.][5-9][0-9]{0,4})?|95([.][4-9][2-9][0-9]{0,3})?|95([.][4-9][1-9][7-9][0-9]{0,2})?)" required
                    onChange={(event) => {
                        setEstlongitude(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="boreholediameter">
                    Bore hole diameter (inches):
                </label>
                <input type="text" className="textarea resize-ta" id="boreholediameter" name="boreholediameter" pattern="[0-9]+([.][0-9]{1,5})?"
                    onChange={(event) => {
                        setBoreholediameter(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="totaldepth">
                    Total depth of well (feet):
                </label>
                <input type="text" className="textarea resize-ta" id="totaldepth" name="totaldepth" pattern="[0-9]+([.][0-9]{1,5})?" value={totaldepth}
                    onChange={(event) => {
                        setTotaldepth(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="topography">
                    Topography of the well location:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={topography} onChange={handleChange_topography} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="HillTop" id="topography" name="topography">Hill Top</option>
                            <option value="HillSlope" id="topography" name="topography">Hill Slope</option>
                            <option value="LevelLand" id="topography" name="topography">Level Land</option>
                            <option value="Depression" id="topography" name="topography">Depression</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="well_waterleveldepth">
                    Water level (feet):
                </label>
                <div className="waterMoreThanTotal">
                    Water level depth cannot be greater than total well depth
                </div>
                <input type="text" className="textarea resize-ta" id="well_waterleveldepth" name="well_waterleveldepth" pattern="[0-9]+([.][0-9]{1,5})?" value={well_waterleveldepth}
                    onChange={(event) => {
                        setWell_waterleveldepth(event.target.value);
                    }}                />
            </div>
            <div className="css">
                <label for="aquifertype">
                    Aquifer Type:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={aquifertype} onChange={handleChange_aquifertype} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Confined" id="aquifertype" name="aquifertype">Confined</option>
                            <option value="Unconfined" id="aquifertype" name="aquifertype">Unconfined</option>
                            <option value="Unknown" id="aquifertype" name="aquifertype">Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="aquiferclass">
                    Aquifer Class:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={aquiferclass} onChange={handleChange_aquiferclass} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Bedrock" id="aquiferclass" name="aquiferclass">Bedrock</option>
                            <option value="SandOrGravel" id="aquiferclass" name="aquiferclass">Sand or Gravel</option>
                            <option value="Unknown" id="aquiferclass" name="aquiferclass">Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="welltype">
                    Well Type (Construction Method):
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="App">
                    <div className="select-container">
                        <select value={welltype} onChange={handleChange_welltype} required>
                            <option value="" hidden selected>Select one...</option>
                            <option value="Drilled" id="welltype" name="welltype">Drilled</option>
                            <option value="Driven" id="welltype" name="welltype">Driven</option>
                            <option value="Dug" id="welltype" name="welltype">Dug</option>
                            <option value="Unknown" id="welltype" name="welltype">Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="css">
                <label for="wellcasematerial">
                    What is the well casing material made of?
                </label>
                <input type="text" className="textarea resize-ta" id="wellcasematerial" name="wellcasematerial"
                    onChange={(event) => {
                        setWellcasematerial(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="datacollector">
                    Data Collector’s Name:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <input type="text" className="textarea resize-ta" id="datacollector" name="datacollector" required
                    onChange={(event) => {
                        setDatacollector(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="observation">
                    Observations:
                </label>
                <textarea type="text" id="observation" name="observation" className="textarea resize-ta" maxLength="150"
                    onChange={(event) => {
                        setObservation(event.target.value);
                    }}
                />
            </div>
            <div className="css">
                <label for="dateentered">
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
            <button type="button" style={{ width: "180px", height: "17%" }} className="btn btn-primary btn-lg" 
            onClick={() => {
                if(checkDepthValidation(well_waterleveldepth, totaldepth)) {
                    submitForm();
                } else {
                    setWell_waterleveldepth("");
                    window.alert("Well water depth CANNOT be greater than total well depth.");
                }
            }
            }
            >Submit</button>
            <button type="button" style={{ width: "180px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
        </form>
    );
}
