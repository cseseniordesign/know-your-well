import React from 'react';
import { List } from 'semantic-ui-react'

export default function FieldSelection() {

    return (
        <List style={{ textAlign: 'center' }}>
            <h2> <strong> Field Selection </strong></h2>
            <List.Item >
                <List.Content>
                    <a href="/lab" style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Field Entry #1 </a>
                </List.Content>
                <br />
            </List.Item>
        </List>

    );
}
