import React, { Component } from 'react';
import Select from 'react-select'; 
import { List } from 'semantic-ui-react'



export class Well extends Component {
    static displayName = Well.name;


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
                <h2> <strong> Well Selection </strong></h2>
                <List.Item >
                    <List.Content>
                        <a href="/EditWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #1 </a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/EditWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #2</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/EditWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #3</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/EditWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #4</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/EditWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #5</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #6</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/EditWell" style={{ width: "45%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #7</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item >
                    <List.Content>
                        <a href="/PreField" style={{ color: 'grey', width: "45%", height: "17%", borderWidth: 3, borderStyle: 'dashed', borderRadius: 1, borderColor: 'grey' }} class="btn btn-light btn-lg btn-block">New Well</a>
                    </List.Content>
                    <br />
                </List.Item>
            </List>
        );
    }
}
