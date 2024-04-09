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
    "Ammonia [0-10 ppm(mg/L)]:", "Calcium hardness [50-500 ppm(mg/L)]:", "Chloride [0-400 ppm(mg/L)]:",
    "Bacteria (Colilert) [Positive if more than 1 MPN/100ml]:", "Copper [0-10 ppm(mg/L)]:", "Iron [0-10 ppm(mg/L)]:",
    "Manganese [0-50 ppm(mg/L)]:", "Nitrate [0-45 ppm(mg/L)]:", "Data Collector’s Name:",
    "Observations:", "Date Entered:"
]

const keyList = [
    "cl_ammonia", "cl_calciumhardness", "cl_chloride",
    "cl_bacteria", "cl_copper", "cl_iron",
    "cl_manganese", "cl_nitrate", "cl_datacollector",
    "cl_observation", "cl_datecollected"
]

export default function ViewLab() {
    const [searchParams, setSearchParams] = useSearchParams();
    const wellName = searchParams.get("wellName")
    const classlab_id = searchParams.get("classlab_id")
    const well_id = searchParams.get("well_id");
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
            .get("/GetLabEntry", {
                responseType: "json",
                params: {
                    classlab_id: classlab_id
                }
            })
            .then(function (response) {
                //console.log(response)
                formElements = response.data.ClassLabEntry[0]
                //console.log(formElements.wi_wellcode)
                setLoading(false);
            });
    }, []);

    if (formElements.length != 0) {
        console.log(formElements)
        //console.log(formElements)
        for (let i = 0; i < labelList.length; i += 2) {
            const firstColumnName = labelList[i]
            let firstColumnValue = formElements[keyList[i]];
            if (firstColumnName == "Date Entered:")
                firstColumnValue = moment.utc(formElements["wi_dateentered"]).format('MM-DD-YYYY hh:mm A')
            let secondColumnValue = ""
            let secondColumnName = ""
            if (i < labelList.length + 1) {
                secondColumnName = labelList[i + 1]
                secondColumnValue = formElements[keyList[i + 1]]
            }
            if (secondColumnName == "Date Entered:")
                secondColumnValue = moment.utc(formElements["wi_dateentered"]).format('MM-DD-YYYY hh:mm A')

            columnList.push(
                <div className="row">
                    <div className="col">
                        <p style={{ textAlign: "center" }}><b>{firstColumnName}</b> {firstColumnValue}</p>
                    </div>
                    <div className="col">
                        <p style={{ textAlign: "center" }}><b>{secondColumnName}</b> {secondColumnValue}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="css">
                <h2>{wellName}: Class Lab</h2>
                <br />
                <div className="container" style={{ textAlign: "center" }}>
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
