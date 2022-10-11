import React, { Component } from 'react';
import Select from 'react-select'; 

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


export class Well extends Component {
    static displayName = Well.name;
    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render() {
        const { selectedOption } = this.state;

        return (
            <Select>
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            </Select>
          
        );
    }
}
