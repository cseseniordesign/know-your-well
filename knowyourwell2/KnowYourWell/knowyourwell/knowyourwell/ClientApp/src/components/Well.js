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
                <h1> <strong>Know Your Well </strong></h1>
                <p> <strong> Well Selection </strong></p>
                <List.Item >
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #1 </a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #2</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #3</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #4</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #5</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #6</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item>
                    <List.Content>
                        <a href="/" style={{ width: "17%", height: "17%" }} class="btn btn-primary btn-lg btn-block">Well #7</a>
                    </List.Content>
                    <br />
                </List.Item>
                <List.Item >
                    <List.Content>
                        <a href="/EditWell" style={{ color: 'grey', width: "17%", height: "17%", borderWidth: 3, borderStyle: 'dashed', borderRadius: 1, borderColor: 'grey' }} class="btn btn-light btn-lg btn-block">New Well</a>
                    </List.Content>
                    <br />
                </List.Item>
            </List>



/*
            <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit} >
                <label style={{ paddingRight: '4px' }} >
                   
                    <a href="/Signup" class="btn btn-secondary">New Well</a>
                    <br />
                    <br />
                    <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange}>
                        <option value="Well_1">Well #1</option>
                        <option value="Well_2">Well #2</option>
                        <option value="Well_3">Well #3</option>
                        <option value="Well_4">Well #4</option>
                        <option value="Well_5">Well #5</option>
                        <option value="Well_6">Well #6</option>
                        <option value="Well_7">Well #7</option>
                    </select>
                </label>
                <input type="submit" value=" Submit" />
            </form>
*/
        );
    }
}
