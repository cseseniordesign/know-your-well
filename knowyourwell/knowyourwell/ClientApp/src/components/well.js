﻿import React from 'react';
import { List } from 'semantic-ui-react'
import Axios from 'axios'

var wellList = [];
Axios
    .get("http://localhost:7193/Wells", {
        responseType: "json",
    })
    .then(function (response) {
        //console.log(response.data.data);
        for (const element of response.data.data) {
            wellList.push(element.wellname);
        }
        var data = response;
        printWellList();
    });


function printWellList() {
    console.log(wellList.length);
    for (const well of wellList) {
        console.log(well);
    }
}

export default function Well() {

    return (
        <List style={{ textAlign: 'center' }}>
            <h2> <strong> Well Selection </strong></h2>
            <List.Item >
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #1 </a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #2</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #3</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #4</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #5</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #6</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/EditWell" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well #7</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item >
                <List.Content>
                    <a href="/WellInfo" style={{ color: 'grey', width: "45%", height: "17%", borderWidth: 3, borderStyle: 'dashed', borderRadius: 1, borderColor: 'grey' }} className="btn btn-light btn-lg btn-block">New Well</a>
                </List.Content>
                <br />
            </List.Item>
        </List>
    );
}
