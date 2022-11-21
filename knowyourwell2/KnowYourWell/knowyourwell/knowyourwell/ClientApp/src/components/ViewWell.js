import React, { Component } from 'react';
import { List } from 'semantic-ui-react'


export class ViewWell extends Component {
    static displayName = ViewWell.name;

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
                <h2>Well ID</h2>
                <br />
                <div class="css">
                    <label>
                        <div>
                            Well Name:
                        </div>
                        <input type="text" onChange={this.setWellName} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Name of the resident well user:
                        </div>
                        <input type="text" onChange={this.setResidentName} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Address:
                        </div>
                        <input type="text" onChange={this.setAddress} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            City:
                        </div>
                        <input type="text" onChange={this.setCity} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            State:
                        </div>
                        <input type="text" onChange={this.setState} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Zip code:
                        </div>
                        <input type="text" onChange={this.setZibCode} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well owner (if different from resident):
                        </div>
                        <input type="text" onChange={this.setWellOwner} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well construction completed:
                        </div>
                        <input type="text" onChange={this.setWellConstructionCompletation} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Any complaints about smell or taste of water?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled">
                                    
                                </select>
                            </div>
                        </div>
                        <input type="text" onChange={this.setWellConstructionCompletation} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Does the well ever go dry?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                        <div>
                            If so, when?
                        </div>
                        <input type="text" onChange={this.setWellConstructionCompletation} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Any maintenance done to the well itself within the last five years?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Any major land use / development changes around the well within the last five years?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            How many people use this well?
                        </div>
                        <input type="text" onChange={this.setWellUsage} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Has any manure or pesticides been applied near the well within the last five years?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well GPS Coordinates (if registered):
                        </div>
                        <input type="text" onChange={this.setGPSCoordinates} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Bore hole diameter in inches:
                        </div>
                        <input type="text" onChange={this.setBoreHoleDiameter} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Total depth of well in feet:
                        </div>
                        <input type="text" onChange={this.setDepthOfWell} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Water level in feet:
                        </div>
                        <input type="text" onChange={this.setDepthOfWell} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Aquifer Type:
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Aquifer Class:
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well Type (construction method):
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            What is the well casing material made of?
                        </div>
                        <input type="text" onChange={this.setCasingMaterial} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Data Collector’s Name:
                        </div>
                        <input type="text" onChange={this.setCollectorName} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Data Collector's Observations:
                        </div>
                        <input type="text" onChange={this.Comments} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Topography of the well location:
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >
                                    
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Comments:
                        </div>
                        <p><textarea type="text" class="textarea resize-ta" disabled="disabled"></textarea></p>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Date:
                        </div>
                        <input type="date" onChange={this.Comments} disabled="disabled" />
                    </label>
                </div>
            </List>
        );
    }
}
