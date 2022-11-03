﻿import React, { Component } from 'react';
import { List } from 'semantic-ui-react'


export class ViewLab extends Component {
    static displayName = ViewLab.name;

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
                <h2>Well ID: Lab</h2>
                <br />
                <List.Item >
                    <List.Content>
                        <a href="/Lab" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">---</a>
                    </List.Content>
                    <br />
                </List.Item>
            </List>
        );
    }
}
