import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import FieldSelection from './fieldselection';

var previousEntries = []
var listElements = []

function generatelistElements(previousEntries) {
    for (const entry in PreviousEntries) {
        let key = 0
        listElements.push(
            <>
                <List.Item key={key}>
                    <List.Content>
                        <a href={'/ViewField?fieldactivity_id=${entry[0]}'} style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg">Field</a>
                        <a href={'/ViewClassLab?classlab_id=${entry[1]}'} style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg">Class Lab</a>
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
                console.log(response)
                const fieldList = response.data.FieldList;
                for (const fieldEntry of fieldList) {
                    Axios
                        .get("/LabID", {
                            responseType: "json",
                            params: {
                                fieldactivity_id: parseInt(fieldEntry.fieldactivity_id)
                            }
                        })
                        .then(function (response) {
                            previousEntries.push(parseInt(fieldEntry.fieldactivity_id), parseInt(response.data.LabID))
                        });
                }
                listElements = generatelistElements(previousEntries)
                console.log(listElements.length)
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return <h1>Loading</h1>
    }

    return (
        <List style={{ textAlign: 'center' }}>
            <br />
            <h2>Previous Entries: [Well ID]</h2>
            <br />

            <List.Item>
                <h4>[Field Date]</h4>
            </List.Item>
            {listElements}

            <List.Item>
                <List.Content>
                    <button type="submit" onClick={backbutton} >Back</button>
                </List.Content>
            </List.Item>
        </List>
    );
}
