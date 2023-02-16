import React from 'react'
import { List } from 'semantic-ui-react'


export default function PreviousEntries() {

    const backbutton = () => {
        window.location.href = "/editwell";
    }


    return (
        <List style={{ textAlign: 'center' }}>
            <br />
            <h2>Previous Entries: [Well ID]</h2>
            <br />
            <List.Item>
                <List.Content>
                    <a href="/ViewWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well Info</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <h4>[Field Date]</h4>
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/ViewField" style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg">Field</a>
                    <a href="/ViewClassLab" style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg">Class Lab</a>
                </List.Content>
                <br />
            </List.Item>

            <List.Item>
                <h4>[Field Date]</h4>
            </List.Item>
            <List.Item>
                <List.Content>
                    <a href="/ViewField" style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg">Field</a>
                    <a href="/ViewClassLab" style={{ width: "22.5%", height: "17%" }} class="btn btn-primary btn-lg disabled" disabled>Class Lab</a>
                </List.Content>
                <br />
            </List.Item>

            <List.Item>
                <List.Content>
                    <button type="submit" onClick={backbutton} >Back</button>
                </List.Content>
            </List.Item>
        </List>
    );
}
