import React  from 'react'
import { List } from 'semantic-ui-react'


export default function EditLog() {

        return (
            <List style={{ textAlign: 'center' }}>
                <br />
                <h2>Edit Well ID </h2>
                <br />
                <List.Item>
                    <List.Content>
                        <a href="/Field" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Field</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/Lab" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Lab</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">______</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">______</a>
                    </List.Content>
                    <br />
                </List.Item>
            </List>
        );
}
