﻿import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import Select from 'react-select';
=======
>>>>>>> parent of cdcc2b7 (Merge pull request #119 from cseseniordesign/backend)
=======
>>>>>>> parent of 099cfc8 (Delete direcotry)
import { List } from 'semantic-ui-react'


export class EditWell extends Component {
    static displayName = EditWell.name;

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
                <h2>Edit Well</h2>
                <br />
                <br />
                <h2>What are you doing today?</h2>
               
                <List.Item>
                    <List.Content>
                        <a href="/PreField" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Pre-field</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/Field" style={{ width: "45%", height: "17%"}} class="btn btn-primary btn-lg btn-block">Field</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item >
                    <List.Content>
                        <a href="/Lab" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Lab Test</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content >
                        <a href="/EditLog" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">View Previous Log</a>
                    </List.Content>
                    <br />
                </List.Item>
            </List>
        );
    }
}
