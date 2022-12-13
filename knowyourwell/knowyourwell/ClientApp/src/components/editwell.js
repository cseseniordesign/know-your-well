import React from 'react'
import { List } from 'semantic-ui-react'
const [searchParams, setSearchParams] = useSearchParams();

const wellName = searchParams.get("wellName")

export default function EditWell() {

    return (
        <List style={{ textAlign: 'center' }}>
            <h2>{wellName}</h2>
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
                    <a href="/Lab" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Lab Test</a>
                </List.Content>
                <br />
            </List.Item>
            <List.Item>
                <List.Content >
                    <a href="/EditLog" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">View Previous Log</a>
                </List.Content>
                <br />
            </List.Item>
        </List>
    );
}
