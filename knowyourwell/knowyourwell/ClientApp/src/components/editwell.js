import React from 'react'
import { List } from 'semantic-ui-react'
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import moment from 'moment'

export default function EditWell() {

    const [searchParams, setSearchParams] = useSearchParams();
    const wellName = searchParams.get("wellName");
    const id = searchParams.get("id");
    return (
        <List style={{ textAlign: 'center' }}>
            <h2>{wellName}</h2>
            <List.Item>
                <List.Content>
                    <a href={`/ViewWell?id=${id}&wellName=${wellName}`} /* change to "/ViewWell" */ style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Well Info</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href={`/Field?id=${id}&wellName=${wellName}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Field</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item >
                <List.Content>
                    <a href={`/fieldselection?id=${id}&wellName=${wellName}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Class Lab</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content >
                    <a href={`/PreviousEntries?id=${id}&wellName=${wellName}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Previous Entries</a>
                </List.Content>
                <br />
            </List.Item>
            {/*}
            <List.Item>
                <List.Content >
                    <a href={`/FormSubmission?id=${id}&wellName=${wellName}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Form Submission</a>
                </List.Content>
                <br />
            </List.Item>
            {*/}
        </List>
    );
}
