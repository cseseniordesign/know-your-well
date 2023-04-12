import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import Axios from 'axios'

var wellList = [];

function responseDataToHTMLList(responseData) {
    let HTMLList = []
    try {
        for (const element of responseData) {
            HTMLList.push(
                <List.Item key={element.well_id}>
                    <List.Content>
                        <a href={`/EditWell?id=${element.well_id}&wellName=${element.wi_wellname}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">{element.wi_wellname} </a>
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

export default function Well() {
    const [isLoading, setLoading] = useState(true);

    //credit to https://codewithnico.com/react-wait-axios-to-render/ for conditional rendering
    useEffect(() => {
        Axios
            .get("/Wells", {
                responseType: "json",
            })
            .then(function (response) {
                localStorage.setItem("wellData", JSON.stringify(response.data))
                wellList = responseDataToHTMLList(response.data.Wells)
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        const wellCookie = localStorage.getItem("wellData");
        if (wellCookie) {
            try {
                const wellData = JSON.parse(wellCookie)
                wellList = responseDataToHTMLList(wellData.Wells);
            }
            catch (e) {
                console.log("wellData is Invalid JSON")
            }
        }
        if (wellList.length > 0) {
            return (
                <List style={{ textAlign: 'center' }}>
                    <h2> <strong> Well Selection from localStorage</strong></h2>
                    {wellList}
                </List>
            );
        }
        else {
            return (
                <List style={{ textAlign: 'center' }}>
                    <h2> <strong> Well Selection </strong></h2>
                    <List.Item key={-1}>
                        <List.Content>
                            <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well </a>
                        </List.Content>
                        <br />
                    </List.Item>
                </List>
            );
        }

    }
    return (
        <List style={{ textAlign: 'center' }}>
            <h2> <strong> Well Selection </strong></h2>
            <List.Item key={-1}>
                <List.Content>
                    <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well </a>
                </List.Content>
                <br />
            </List.Item>
            {wellList}
        </List>
    );


}
