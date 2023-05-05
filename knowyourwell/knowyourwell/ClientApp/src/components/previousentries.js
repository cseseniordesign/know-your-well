import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import moment from 'moment'
import FieldSelection from './fieldselection';

var previousEntries = []
var listElements = []

function generatelistElements(previousEntries, well_id, name) {
    //console.log(previousEntries[0].date)
    for (var entry of previousEntries) {
        let key = 0

        //console.log(entry)
        const buttonClass = entry.labID == null ? "btn btn-primary btn-lg disabled" : "btn btn-primary btn-lg"
        listElements.push(
            <>
                < List.Item >
                    <h4>Field Activity Date: {moment(entry.date).format("MMMM DD, YYYY")}</h4>
                </List.Item >
                <List.Item key={key}>
                    <List.Content>
                        <a href={`/ViewField?fieldactivity_id=${entry.fieldID}&well_id=${well_id}&wellName=${name}`} style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg">Field</a>
                        <a href={`/ViewClassLab?classlab_id=${entry.labID}&well_id=${well_id}&wellName=${name}`} style={{ width: "22.5%", height: "17%" }} class={buttonClass} aria-disabled={entry.labID == null}>Class Lab</a>
                    </List.Content>
                    <br />
                </List.Item>
            </>
        );
        key++
    }
    return listElements
}

export default function PreviousEntries() {
    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));
    const wellName = searchParams.get("wellName")

    const backbutton = () => {
        window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
    }

    const [isLoading, setLoading] = useState(true);

    //credit to https://codewithnico.com/react-wait-axios-to-render/ for conditional rendering
    useEffect(() => {
        Axios
            .get("/FieldList", {
                responseType: "json",
                params: {
                    well_id: well_id
                }
            })
            .then(function (response) {
                const fieldList = response.data.FieldList;
                console.log(fieldList)
                //setLoading(fieldList.length>0)
                console.log(response)
                var i
                for (i = 0; i < fieldList.length; i++) {
                    const fieldEntry = fieldList[i]
                    const entry = { date: fieldEntry.fa_datecollected, fieldID: fieldEntry.fieldactivity_id, labID: fieldEntry.classlab_id }
                    previousEntries.push(entry);
                }
                listElements = generatelistElements(previousEntries, well_id, wellName);
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <List style={{ textAlign: 'center' }}>
            <br />
            <h2>Previous Entries: {wellName}</h2>
            <br />
            {listElements}

            <List.Item>
                <List.Content>
                    <button type="submit" onClick={backbutton} >Back</button>
                </List.Content>
            </List.Item>
        </List>
    );
}
