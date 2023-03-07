﻿import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import Axios from 'axios'

var wellList = [];

function responseDataToHTMLList(responseData) {
    let HTMLList = []
    for (const element of responseData) {
        HTMLList.push(
            <List.Item key={element.id}>
                <List.Content>
                    <a href={`/EditWell?id=${element.id}&wellName=${element.wellname}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">{element.wellname} </a>
                </List.Content>
                <br />
            </List.Item>
        );
    }
    return HTMLList
}

export default function Well() {
    var example = [< h1 > test1</h1>, <h1>test2</h1>];
    const [isLoading, setLoading] = useState(true);

    //credit to https://codewithnico.com/react-wait-axios-to-render/ for conditional rendering
    useEffect(() => {
        Axios
            .get("/Wells", {
                responseType: "json",
            })
            .then(function (response) {
                console.log(response)
                localStorage.setItem("wellData", JSON.stringify(response.data))
                wellList = responseDataToHTMLList(response.data.data)
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        const wellCookie = localStorage.getItem("wellData");
        if (wellCookie) {
            const wellData = JSON.parse(wellCookie)
            wellList = responseDataToHTMLList(wellData.data);
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
            return <h1>Loading</h1>
        }

    }

    return (
        <List style={{ textAlign: 'center' }}>
            <h2> <strong> Well Selection </strong></h2>
            {wellList}
        </List>
    );
}
