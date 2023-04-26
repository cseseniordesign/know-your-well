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
                //console.log(response)
                formElements = response.data.WellInfo[0]
                //console.log(formElements.wi_wellcode)
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
                console.log(e)
            }
            
        }
    }

    //console.log(formElements)
    if (formElements.length!==0) {
        for (let i = 0; i < labelList.length; i += 2) {
            const firstColumnName = labelList[i]
            let firstColumnValue = formElements[keyList[i]];
            if (firstColumnName === "Date Entered:")
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
                    <button type="button" onClick={backButton} >Back</button>
                    <br/>
                    <br/>
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
