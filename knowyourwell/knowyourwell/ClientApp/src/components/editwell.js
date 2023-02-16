﻿import React from 'react'
import { List } from 'semantic-ui-react'
import { useSearchParams } from "react-router-dom";

export default function EditWell() {

    const [searchParams, setSearchParams] = useSearchParams();
    const wellName = searchParams.get("wellName")
    return (
        <List style={{ textAlign: 'center' }}>
            <h2>{wellName} [Well Name/Id]</h2>
            <List.Item>
                <List.Content>
                    <a href="/WellInfo" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well Info</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/Field" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Field</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item >
                <List.Content>
                    <a href="/fieldselection" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Class Lab</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content >
                    <a href="/PreviousEntries" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Previous Entries</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content >
                    <a href="/FormSubmission" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Form Submission</a>
                </List.Content>
                <br />
            </List.Item>
        </List>
    );
}
