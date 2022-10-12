import React, { Component } from 'react';
import Select from 'react-select';
import { List } from 'semantic-ui-react'
import './css/PreField.css'

const Topography = [
    {
        label: "Hill Top",
        value: "Hill_Top",
    },
    {
        label: "Hill Bottom",
        value: "Hill_Bottom",
    },
 
];

const Well_Cover_Condition = [
    {
        label: "Good",
        value: "Good",
    },
    {
        label: "Fair",
        value: "Fair",
    },
    {
        label: "Bad",
        value: "Bad",
    },
];

const Surface_Run_Off_Evidence = [
    {
        label: "Yes",
        value: "Yes",
    },
    {
        label: "No",
        value: "No",
    },
    {
        label: "Unknown",
        value: "Unknown",
    },
];

const Evidence_Of_Pooling = [
    {
        label: "Yes",
        value: "Yes",
    },
    {
        label: "No",
        value: "No",
    },
    {
        label: "Unknown",
        value: "Unknown",
    },
];

export class Field extends Component {
    static displayName = Field.name;
    state = {};
    submit = (e) => {
        e.preventDefault(); // Prevent submitting form to the server
        window.alert(`This ${this.state.name}! has been submitted `); //${this.state.food}!${this.state.isDessert ? ' A lovely dessert!' : ''}
    };

    setGroundwater_Temperature = (e) => this.setState({ Groundwater_Temperature: e.target.value });
    setPH = (e) => this.setState({ Well_Name: e.target.value });
    setConductivity = (e) => this.setState({ Conductivity: e.target.value });
    setCollector_Name = (e) => this.setState({ Collector_Name: e.target.value });

    render() {
        return (
            <form method="post" style={{ display: 'block', textAlign: 'center', paddingBottom: '40px', paddingTop: '20px', border: 'solid' }} onSubmit={this.submit}>
                <h1><strong>Know Your Well</strong></h1>
                <h2>Field</h2>
                <div class="css">
                    <label>
                        <div>
                            Conditions: Describe weather,
                            temperature,<br/> or anything
                            note-worthy about your well
                        </div>
                        <p><textarea type="text" class="textarea resize-ta" required autoFocus></textarea></p>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Topography of the well location
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Topography.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Condition of the well cover
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Well_Cover_Condition.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Is there evidence of surface
                            run-off entry to the well?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Surface_Run_Off_Evidence.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Is there evidence of pooling or
                            Puddles within 12 ft of the well?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Evidence_Of_Pooling.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Groundwater Temperature<br /> [Degrees Celsius]

                        </div>
                        <input type="text" onChange={this.setGroundwater_Temperature} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            PH<br /> [0-14]

                        </div>
                        <input type="text" onChange={this.setPH} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Conductivity <br/> [uS/cm]
                        </div>
                        <input type="text" onChange={this.setConductivity} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Data Collector’s Name:
                        </div>
                        <input type="text" onChange={this.setCollector_Name} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Observations:
                        </div>
                        <p><textarea type="text" class="textarea resize-ta" required autoFocus></textarea></p>
                    </label>

                </div>
                <button type="submit">Save</button>
            </form>
        );
    }
}



