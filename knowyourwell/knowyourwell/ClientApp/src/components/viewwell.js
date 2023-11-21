import React, { useEffect, useState } from 'react';
import './css/forms.css'
import Axios from 'axios'
import moment from 'moment'
import { useSearchParams } from "react-router-dom";

let formElements = []
let columnList = []
const labelList = [
    "Well Code:", "Well Name:", "Data Collector:", "Well Registration Number:", "DNR Well ID:", "Name of Resident User:", "Address:", "Village, Town, or City:", "State:", "Zip code:",
    "County:", "NRD District:", "Phone # (of well user):", "Email (of well user):", "Well owner (if different from resident):", "Well construction completion year:", "Complaints about smell or taste of water?:", "Smell or taste of water desciption:",
    "Does the well ever go dry?:", "When well goes dry:", "Maintenance done to the well itself within the last five years:", "major land use / development changes around the well within the last five years?:", "Number of Well Users:",
    "manure, fertilizer, or pesticides been applied the well within the last five years:", "Estimated Latitude:", "Estimated Longitude:", "Bore hole diameter (inches):", "Total depth of well (feet):", "Topography of the well location:",
    "Water level (feet):", "Aquifer Type:", "Aquifer Class:", "Well Type (Construction Method):", "Well Casing Material:", "Observations:",
    "Date Entered:"
]

const keyList = [
    "wi_wellcode", "wi_wellname", "wi_datacollector", "wi_registration_number", "wi_dnr_well_id", "wi_well_user", "wi_address", "wi_city", "wi_state",
    "wi_zipcode", "county_id", "nrd_id", "wi_phone_well_user", "wi_email_well_user", "wi_well_owner", "wi_installyear", "wi_smelltaste",
    "wi_smelltaste_description", "wi_welldry", "wi_welldry_description", "wi_maintenance5yr", "wi_landuse5yr", "wi_numberwelluser",
    "wi_pestmanure", "wi_estlatitude", "wi_estlongitude", "wi_boreholediameter", "wi_totaldepth", "wi_topography", "wi_waterleveldepth",
    "wi_aquifertype", "wi_aquiferclass", "wi_welltype", "wi_wellcasematerial", "wi_observation", "wi_dateentered"
];

const countyNames = ["Adams", "Antelope", "Arthur", "Banner", "Blaine", "Boone", "BoxButte", "Boyd", "Brown", "Buffalo", "Burt", "Butler", "Cass", "Cedar", "Chase", "Cherry", "Cheyenne", "Clay", "Colfax", "Cuming", "Custer", "Dakota", "Dawes", "Dawson", "Deuel", "Dixon", "Dodge", "Douglas", "Dundy", "Fillmore", "Franklin", "Frontier", "Furnas", "Gage", "Garden", "Garfield", "Gosper", "Grant", "Greeley", "Hall", "Hamilton", "Harlan", "Hayes", "Hitchcock", "Holt", "Hooker", "Howard", "Jefferson", "Johnson", "Kearney", "Keith", "KeyaPaha", "Kimball", "Knox", "Lancaster", "Lincoln", "Logan", "Loup", "McPherson", "Madison", "Merrick", "Morrill", "Nance", "Nemaha", "Nuckolls", "Otoe", "Pawnee", "Perkins", "Phelps", "Pierce", "Platte", "Polk", "RedWillow", "Richardson", "Rock", "Saline", "Sarpy", "Saunders", "ScottsBluff", "Seward", "Sheridan", "Sherman", "Sioux", "Stanton", "Thayer", "Thomas", "Thurston", "Valley", "Washington", "Wayne", "Webster", "Wheeler", "York"];
const nrdDistricts = ["Central Platte", "Lewis and Clark", "Little Blue", "Lower Big Blue", "Lower Elkhorn", "Lower Loup", "Lower Niobrara", "Lower Platte North", "Lower Platte South", "Lower Republican", "Middle Niobrara", "Middle Republican", "Nemaha", "North Platte", "Papio-Missouri River", "South Platte", "Tri-Basin", "Twin Platte", "Upper Big Blue", "Upper Elkhorn", "Upper Loup", "Upper Niobrara-White", "Upper Republican"];

export default function ViewWell() {
    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));
    const wellName = searchParams.get("wellName");

    const backButton = () => {
        window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
    }

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
                formElements = response.data.WellInfo[0]
                setLoading(false);
            });
    }, []);

    if (formElements.length === 0) {
        const wellCookie = localStorage.getItem("wellData");
        let wells = null;
        if (wellCookie) {
            try {
                wells = JSON.parse(wellCookie).Wells
                formElements = wells.filter(well => well.well_id === well_id)[0]
            }
            catch (e) {
                console.log("wellCookie is inValid JSON")
            }
            
        }
    }

    if (formElements.length!==0) {
        for (let i = 0; i < labelList.length; i += 2) {
            const firstColumnName = labelList[i]
            let firstColumnValue = formElements[keyList[i]];
            debugger
            if (firstColumnName === "Date Entered:")
                //firstColumnValue = firstColumnValue.replace("T", " ").replace("Z", "").replace(".000", "");
            if (firstColumnName === "NRD District:")
                firstColumnValue = nrdDistricts[formElements[keyList[i]]-1]
            let secondColumnValue = ""
            let secondColumnName = ""
            if (i < labelList.length + 2) {
                secondColumnName = labelList[i + 1]
                secondColumnValue = formElements[keyList[i+1]]
            }
            if (secondColumnName === "Date Entered:")
                 //secondColumnValue = secondColumnValue.replace("T", " ").replace("Z", "").replace(".000", "");
            if (secondColumnName === "NRD District:")
                secondColumnValue = nrdDistricts[formElements[keyList[i+1]]-1]
            if (secondColumnName === "County:") {
                secondColumnValue = countyNames[formElements[keyList[i+1]]-1]
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
                <h2>{wellName}: Well Info</h2>
                <br />
                <div class="container" style={{textAlign: "center"}}>
                    {columnList}
                    <br/>
                    <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
                    <br/><br/>
                    <a href="mailto:knowyourwell@unl.edu" style={{ textAlign: "center" }}>
                    If any data is incorrect email us at knowyourwell@unl.edu</a>
                </div>
            </div>
        );
    }
    else {
        return <h1>Loading</h1>
    }
}
