﻿import React, { useEffect, useState } from 'react';
import './css/forms.css'
import moment from 'moment';
import Axios from 'axios'
import { useSearchParams } from "react-router-dom";
import countyOptions from './resources/counties';
import nrdOptions from './resources/nrds';
import { useNavigate } from 'react-router-dom';

const firstColumn = [
    { "Well Code:": "wi_wellcode" },
    { "Data Collector:": "wi_datacollector" },
    { "DNR Well ID:": "wi_dnr_well_id" },
    { "Address:": "wi_address" },
    { "State:": "wi_state" },
    { "County:": "county_id" },
    { "Phone # (of well user):": "wi_phone_well_user" },
    { "Well owner (if different from resident):": "wi_well_owner" },
    { "Complaints about smell or taste of water?:": "wi_smelltaste" },
    { "Does the well ever go dry?:": "wi_welldry" },
    { "Maintenance done to the well itself within the last five years:": "wi_maintenance5yr" },
    { "Number of Well Users:": "wi_numberwelluser" },
    { "Estimated Latitude:": "wi_estlatitude" },
    { "Bore hole diameter (inches):": "wi_boreholediameter" },
    { "Water level (feet):": "wi_waterleveldepth" },
    { "Aquifer Class:": "wi_aquiferclass" },
    { "Well Casing Material:": "wi_wellcasematerial" },
];

const secondColumn = [
    { "Well Name:": "wi_wellname" },
    { "Well Registration Number:": "wi_registration_number" },
    { "Name of Resident User:": "wi_well_user" },
    { "Village, Town, or City:": "wi_city" },
    { "Zip code:": "wi_zipcode" },
    { "NRD:": "nrd_id" },
    { "Email (of well user):": "wi_email_well_user" },
    { "Well construction completion year:": "wi_installyear" },
    { "Smell or taste of water desciption:": "wi_smelltaste_description" },
    { "When well goes dry:": "wi_welldry_description" },
    { "Major land use / development changes around the well within the last five years?:": "wi_landuse5yr" },
    { "Manure, fertilizer, or pesticides been applied the well within the last five years:": "wi_pestmanure" },
    { "Estimated Longitude:": "wi_estlongitude" },
    { "Total depth of well (feet):": "wi_totaldepth" },
    { "Aquifer Type:": "wi_aquifertype" },
    { "Well Type (Construction Method):": "wi_welltype" },
    { "Observations:": "wi_observation" }
];

export default function ViewWell() {
    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));
    const wellName = searchParams.get("wellName");
    const navigate = useNavigate();

    useEffect(() => { // login check
        Axios.get('/userinfo', {
            responseType: "json"
        }).then(function (response) {
            let displayname = response.data.displayn;
            if (displayname == "" && process.env.NODE_ENV === "production") {
                window.alert("You are not yet logged in. Please log in.");
                navigate("/");
            }
        }).catch(function (error) {
            console.error("Failed to fetch school id:", error);
        });
    }, [navigate]);

    const backButton = () => {
        window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
    }

    const backToWellsButton = () => {
        window.location.href = '/well';
    }

    const [isLoading, setLoading] = useState(true);

    let formElements = [];

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

    let columnList = [];

    if (formElements) {
        formElements['county_id'] = countyOptions.find(option => option.key === formElements['county_id'].toString()).value;
        formElements['nrd_id'] = nrdOptions.find(option => option.key === formElements['nrd_id'].toString()).value;
        for (let i = 0; i < firstColumn.length; i++) {
            const firstColumnName = Object.keys(firstColumn[i])[0];
            const firstColumnValue = formElements[Object.values(firstColumn[i])[0]];

            const secondColumnName = Object.keys(secondColumn[i])[0];
            const secondColumnValue = formElements[Object.values(secondColumn[i])[0]];

            columnList.push(
                <div key={i} className="row">
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
                <h2>{wellName}: Well Info</h2>
                <br />
                <div className="container" style={{ textAlign: "center" }}>
                    {columnList}
                    <div key="dateentered" className="row">
                        <div className="col">
                            <p style={{ textAlign: "center" }}><b>Date Entered:</b> {moment(formElements["wi_dateentered"]).format('MM-DD-YYYY hh:mm A')}</p>
                        </div>
                    </div>
                    <br />
                    <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
                    <br /><br />
                    <a href="mailto:knowyourwell@unl.edu" style={{ textAlign: "center" }}>
                        If any data is incorrect email us at knowyourwell@unl.edu
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>The well you're looking for does not exist</h1>
                <button
                    type="button" style={{ width: "180px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backToWellsButton}>
                    Back
                </button>
            </div>

        );
    }
}
