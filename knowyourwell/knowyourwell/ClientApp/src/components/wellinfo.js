import React from 'react'
import './css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import stateOptions from './states';
import countyOptions from './counties';
import nrdOptions from './nrds';
import NumberEntry from './numberentry';
import ShortTextEntry from './shorttextentry';
import DropDownEntry from './dropdownentry';
import LongTextEntry from './longtextentry';
import FormFooter from './formfooter';


export default function WellInfo() {
    const initialWellInfo = {
        address: "",
        aquiferclass: "",
        aquifertype: "",
        boreholediameter: "",
        city: "",
        datacollector: "",
        dateentered: moment().format('L, h:mm a'),
        estlatitude: "",
        estlongitude: "",
        installyear: "",
        landuse5yr: "",
        maintenance5yr: "",
        numberwelluser: "",
        observation: "",
        pestmanure: "",
        school_id: "",
        smelltaste: "",
        smelltastedescription: "",
        state: "",
        topography: "",
        totaldepth: "",
        wellwaterleveldepth: "",
        wellcasematerial: "",
        wellcode: "",
        welldry: "",
        welldrydescription: "",
        wellname: "",
        wellowner: "",
        welltype: "",
        welluser: "",
        zipcode: ""
    }

    const [wellInfo, setWellInfo] = useState(initialWellInfo);
    /**
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
    const [totaldepth, setTotaldepth] = useState(0);
    const [well_waterleveldepth, setWell_waterleveldepth] = useState(0);
*/

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    function updateWellInfo(fieldName, value) {
        setWellInfo((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    }

    const handleDropdownChange = (fieldName, event) => {
        updateWellInfo(fieldName, event.target.value);
    }

    function addWellInfo() {
        Axios.post('/createwellinfo', {
            address: wellInfo.address,
            aquiferclass: wellInfo.aquiferclass,
            aquifertype: wellInfo.aquifertype,
            boreholediameter: wellInfo.boreholediameter,
            city: wellInfo.city,
            countyid: wellInfo.countyid,
            datacollector: wellInfo.datacollector,
            dateentered: wellInfo.dateentered,
            estlatitude: wellInfo.estlatitude,
            estlongitude: wellInfo.estlongitude,
            installyear: JSON.stringify(wellInfo.installyear).substring(1, 5),
            landuse5yr: wellInfo.landuse5yr,
            maintenance5yr: wellInfo.maintenance5yr,
            nrdid: wellInfo.nrdid,
            numberwelluser: wellInfo.numberwelluser,
            observation: wellInfo.observation,
            pestmanure: wellInfo.pestmanure,
            school_id: wellInfo.school_id,
            smelltaste: wellInfo.smelltaste,
            smelltastedescription: wellInfo.smelltastedescription,
            state: wellInfo.state,
            topography: wellInfo.topography,
            totaldepth: wellInfo.totaldepth,
            well_waterleveldepth: wellInfo.wellwaterleveldepth,
            wellcasematerial: wellInfo.wellcasematerial,
            wellcode: wellInfo.wellcode,
            welldry: wellInfo.welldry,
            welldrydescription: wellInfo.welldrydescription,
            wellname: wellInfo.wellname,
            wellowner: wellInfo.wellowner,
            welltype: wellInfo.welltype,
            welluser: wellInfo.welluser,
            zipcode: wellInfo.zipcode,
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
        if (window.confirm("Any unsaved data will be lost.\nWould you like to continue?")) {
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
            <ShortTextEntry
                fieldTitle="Well Name:"
                value={wellInfo.wellname}
                id="wellname"
                setValue={(value) => updateWellInfo('wellname', value)}
                required={true}
            />
            <ShortTextEntry
                fieldTitle="Name of the resident well user:"
                value={wellInfo.welluser}
                id="welluser"
                setValue={(value) => updateWellInfo('welluser', value)}
                required={false}
            />
            <ShortTextEntry
                fieldTitle="Address:"
                value={wellInfo.address}
                id="address"
                setValue={(value) => updateWellInfo('address', value)}
                required={false}
            />
            <ShortTextEntry
                fieldTitle="Village, Town, or City:"
                value={wellInfo.city}
                id="city"
                setValue={(value) => updateWellInfo('city', value)}
                required={false}
            />
            <DropDownEntry
                fieldTitle="State:"
                id="state"
                options={stateOptions}
                value={wellInfo.state}
                onChange={(event) => handleDropdownChange('state', event)}
                required={false}
            />
            <ShortTextEntry
                fieldTitle="Zipcode:"
                value={wellInfo.zipcode}
                id="zipcode"
                setValue={(value) => updateWellInfo('zipcode', value)}
                required={false}
            />
            <DropDownEntry
                fieldTitle="County:"
                id="county"
                options={countyOptions}
                value={wellInfo.county}
                onChange={(event) => handleDropdownChange('county', event)}
                required={true}
            />
            <DropDownEntry
                fieldTitle="NRD:"
                id="nrd"
                options={nrdOptions}
                value={wellInfo.nrd}
                onChange={(event) => handleDropdownChange('nrd', event)}
                required={true}
            />
            <ShortTextEntry
                fieldTitle="Well owner (if different from resident):"
                value={wellInfo.wellowner}
                id="wellowner"
                setValue={(value) => updateWellInfo('wellowner', value)}
                required={false}
            />
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
                <label for="installyear">
                    Well construction completion year:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="installyear">
                    <DatePicker
                        value={wellInfo.installyear}
                        dateFormat="YYYY"
                        timeFormat=""
                        onChange={(value) => updateWellInfo('installyear', value)}
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
            <DropDownEntry
                fieldTitle="Any complaints about smell or taste of water?"
                id="smelltaste"
                options={["Yes", "No", "Unknown"]}
                value={wellInfo.smelltaste}
                onChange={(event) => handleDropdownChange('smelltaste', event)}
                required={true}
            />
            {wellInfo.smelltaste === "Yes" && (
                <LongTextEntry
                    fieldTitle="Description of smell or taste of water:"
                    value={wellInfo.smelltastedescription}
                    id="smelltastedescription"
                    setValue={(value) => updateWellInfo('smelltastedescription', value)}
                    required={false}
                />)}
            <DropDownEntry
                fieldTitle="Does the well ever go dry?"
                id="welldry"
                options={["Yes", "No", "Unknown"]}
                value={wellInfo.welldry}
                onChange={(event) => handleDropdownChange('welldry', event)}
                required={true}
            />
            {wellInfo.welldry === "Yes" && (
                <LongTextEntry
                    fieldTitle="How often/when does it go dry?"
                    value={wellInfo.welldrydescription}
                    id="welldrydescription"
                    setValue={(value) => updateWellInfo('welldrydescription', value)}
                    required={false}
                />)}
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
            <DropDownEntry
                fieldTitle="Any maintenance done to the well itself within the last five years?"
                id="maintenance5yr"
                options={["Yes", "No", "Unknown"]}
                value={wellInfo.maintenance5yr}
                onChange={(event) => handleDropdownChange('maintenance5yr', event)}
                required={true}
            />
            <DropDownEntry
                fieldTitle="Any major land use/development changes around the well within the last five years?"
                id="landuse5yr"
                options={["Yes", "No", "Unknown"]}
                value={wellInfo.landuse5yr}
                onChange={(event) => handleDropdownChange('landuse5yr', event)}
                required={true}
            />
            <NumberEntry
                fieldTitle="How many people use this well?"
                metric={wellInfo.numberwelluser}
                id="numberwelluser"
                setValue={(value) => updateWellInfo('numberwelluser', value)}
                required={true}
            />
            <DropDownEntry
                fieldTitle="Has any manure, fertilizer, or pesticides been applied near the well within the last five years?"
                id="pestmanure"
                options={["Yes", "No", "Unknown"]}
                value={wellInfo.pestmanure}
                onChange={(event) => handleDropdownChange('pestmanure', event)}
                required={true}
            />
            <NumberEntry
                fieldTitle="Estimated Latitude (in decimal degrees):"
                metric={wellInfo.estlatitude}
                min="40"
                max="43"
                id="estlatitude"
                setValue={(value) => updateWellInfo('estlatitude', value)}
                required={true}
            />
            <NumberEntry
                fieldTitle="Estimated Longitude (in decimal degrees):"
                metric={wellInfo.estlongitude}
                min="-104"
                max="-95.417"
                id="estlongitude"
                setValue={(value) => updateWellInfo('estlongitude', value)}
                required={true}
            />
            <NumberEntry
                fieldTitle="Bore hole diameter (inches):"
                metric={wellInfo.boreholediameter}
                id="boreholediameter"
                setValue={(value) => updateWellInfo('boreholediameter', value)}
                required={false}
            />
            <NumberEntry
                fieldTitle="Total depth of well (feet):"
                metric={wellInfo.totaldepth}
                id="totaldepth"
                setValue={(value) => updateWellInfo('totaldepth', value)}
                required={false}
            />
            <DropDownEntry
                fieldTitle="Topography of the well location:"
                id="topography"
                options={["HillTop", "HillSlope", "LevelLand", "Depression"]}
                value={wellInfo.topography}
                onChange={(event) => handleDropdownChange('topography', event)}
                required={true}
            />
            <NumberEntry
                fieldTitle="Water level (feet):"
                metric={wellInfo.wellwaterleveldepth}
                id="wellwaterleveldepth"
                setValue={(value) => updateWellInfo('wellwaterleveldepth', value)}
                required={false}
            />
            <DropDownEntry
                fieldTitle="Aquifer Type:"
                id="aquifertype"
                options={["Confined", "Unconfined", "Unknown"]}
                value={wellInfo.aquifertype}
                onChange={(event) => handleDropdownChange('aquifertype', event)}
                required={true}
            />
            <DropDownEntry
                fieldTitle="Aquifer Class:"
                id="aquiferclass"
                options={["Bedrock", "Sand or Gravel", "Unknown"]}
                value={wellInfo.aquiferclass}
                onChange={(event) => handleDropdownChange('aquiferclass', event)}
                required={true}
            />
            <DropDownEntry
                fieldTitle="Well Type (Construction Method):"
                id="welltype"
                options={["Drilled", "Driven", "Dug", "Unknown"]}
                value={wellInfo.welltype}
                onChange={(event) => handleDropdownChange('welltype', event)}
                required={true}
            />
            <ShortTextEntry
                fieldTitle="What is the well casing material made of?"
                value={wellInfo.wellcasematerial}
                id="wellcasematerial"
                setValue={(value) => updateWellInfo('wellcasematerial', value)}
                required={false}
            />
            <ShortTextEntry
                fieldTitle="Data Collector’s Name:"
                value={wellInfo.datacollector}
                id="datacollector"
                setValue={(value) => updateWellInfo('datacollector', value)}
                required={true}
            />
            <LongTextEntry
                fieldTitle="Observations:"
                value={wellInfo.observation}
                id="observation"
                setValue={(value) => updateWellInfo('observation', value)}
                required={true}
            />
            <div className="css">
                <label for="dateentered">
                    Date Entered:
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                </label>
                <div id="dateentered">
                    <DatePicker
                        value={wellInfo.dateentered}
                        dateFormat="MM-DD-YYYY"
                        timeFormat="hh:mm A"
                        onChange={(value) => updateWellInfo('dateentered', value)}
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
