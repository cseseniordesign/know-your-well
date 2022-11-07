import React, { Component } from 'react';
import { List } from 'semantic-ui-react'


export class EditLog extends Component {
    static displayName = EditLog.name;

    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('You Selected: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <List style={{ textAlign: 'center' }}>
                <br />
                <h2>Edit Well ID </h2>
                <br />
                <List.Item >
                    <List.Content>
                        <a href="/Prefield" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well </a>
                    </List.Content>
                    <br />
                </List.Item>
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
}
