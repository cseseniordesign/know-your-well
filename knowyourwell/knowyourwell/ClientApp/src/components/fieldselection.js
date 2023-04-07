import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'

var fieldList = [];

function responseDataToHTMLList(responseData) {
    let HTMLList = []
    try {
        for (const element of responseData) {
            //Credit to https://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
            //or a quick solution.
            // Split timestamp into [ Y, M, D, h, m, s ]
            var t = JSON.stringify(element.fa_datecollected).split(/[- :]/);
            // Apply each element to the Date function
            var fieldEntryDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).toString();
            console.log(JSON.stringify(fieldEntryDate))

            HTMLList.push(
                <List.Item key={element.well_id}>
                    <List.Content>
                        <a href={`/classlab?id=${element.fieldactivity_id}&dateCollected=${element.fa_datecollected}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">{element.fa_datecollected} </a>
                    </List.Content>
                    <br />
                </List.Item>
            );
        }
    }
    catch (e) {
        console.log("Error Parsing Data into HTML List.")
    }
    return HTMLList
}

export default function FieldSelection() {

    const [searchParams, setSearchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));

    const backButton = () => {
        window.location.href = "/editwell";
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
                localStorage.setItem("fieldListData", JSON.stringify(response.data))
                fieldList = responseDataToHTMLList(response.data.FieldList)
                setLoading(false);
            });
    }, []);

    if (isLoading) {
       return (<h1>Loading</h1>)
    }

    return (
        <List style={{ textAlign: 'center' }}>
            <h2> <strong> Field Selection </strong></h2>
            {fieldList}
            <List.Item>
                <List.Content>
                    <button type="submit" onClick={backButton} >Back</button>
                </List.Content>
            </List.Item>
        </List>

    );
}
