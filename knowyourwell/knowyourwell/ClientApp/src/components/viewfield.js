import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import './css/forms.css'
import Axios from 'axios'
import moment from 'moment'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

let formElements = []
let columnList = []
const labelList = [
    "Conditions: Weather, temperature, or anything note-worthy the well:", "Condition of the well cover:", "Well Cover Description:", "Topography of the well location:",
    "Evidence of surface run-off entry to the well:", "Evidence of pooling or puddles within 12 ft of the well:", "Groundwater Temperature [Degrees Celsius]:",
    "pH [0-14]:", "Conductivity [uS/cm]:", "Data Collector’s Name:",
    "Observations:", "Latitude:", "Longitude:", "Date Entered:"
]

const keyList = [
    "fa_weather", "fa_wellcovercondition", "fa_wellcoverdescription", "fa_topography", "fa_surfacerunoff",
    "fa_pooling", "fa_groundwatertemp", "fa_ph", "fa_conductivity",
    "fa_datacollector", "fa_observation", "fa_latitude", "fa_longitude", "fa_datecollected"
]

export default function ViewField() {
    const [searchParams, setSearchParams] = useSearchParams();
    const fieldactivity_id = parseInt(searchParams.get("fieldactivity_id"));
    const wellName = searchParams.get("wellName")
    const well_id = searchParams.get("well_id")
    const navigate = useNavigate();

    useEffect(() => { // login check
        Axios.get('/userinfo', {
            responseType: "json"
        }).then(function (response) {
            let displayname = response.data.displayn;
            if (displayname == "") {
                window.alert("You are not yet logged in. Please log in.");
                navigate("/");
            }
        }).catch(function (error) {
            console.error("Failed to fetch school id:", error);
        });
    }, [navigate]);

    const backButton = () => {
        window.location.href = `/PreviousEntries?id=${well_id}&wellName=${wellName}`;
    }

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        Axios
            .get("/GetFieldEntry", {
                responseType: "json",
                params: {
                    fieldactivity_id: fieldactivity_id
                }
            })
            .then(function (response) {
                //console.log(response)
                formElements = response.data.FieldActivity[0]
                //console.log(formElements.wi_wellcode)
                setLoading(false);
            });
    }, []);

    if (formElements === null) {
        /*
        const wellCookie = localStorage.getItem("wellData" + well_id); if (wellCookie) {
            try {
                formElements = JSON.parse(wellCookie)
            }
            catch (e) {
                console.log("wellData is Invalid JSON")
            }
            //console.log(formElements)
        }
        */
    }

    //console.log(formElements)
    if (formElements.length != 0) {
        //console.log(formElements)
        for (let i = 0; i < labelList.length; i += 2) {
            const firstColumnName = labelList[i]
            let firstColumnValue = formElements[keyList[i]];
            if (firstColumnName == "Date Entered:")
                firstColumnValue = moment(firstColumnValue).add(12, 'hour').format("MM-DD-YYYY hh:mm A")
            let secondColumnValue = ""
            let secondColumnName = ""
            if (i < labelList.length + 1) {
                secondColumnName = labelList[i + 1]
                secondColumnValue = formElements[keyList[i + 1]]
            }
            if (secondColumnName == "Date Entered:")
                secondColumnValue = moment(secondColumnValue).format("MM-DD-YYYY hh:mm A")

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
                <h2>{wellName}: Field Activity</h2>
                <br />
                <div class="container" style={{ textAlign: "center" }}>
                    {columnList}
                    <br />
                    <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
                    <br />
                    <br />
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
