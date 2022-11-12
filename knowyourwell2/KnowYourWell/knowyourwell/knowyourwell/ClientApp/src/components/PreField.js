﻿import React, { Component } from 'react';
import './css/PreField.css'


const Maintenance = [
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
    } 
];

const Development = [
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
    }
];

const Fertilizers_Pesticides = [
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
    }
];

const Aquifer_Type = [
    {

        label: "Confined",
        value: "Confined",
    },
    {
        label: "Unconfined",
        value: "Unconfined",
    },
    {
        label: "Unknown",
        value: "Unknown",
    },
];

const Aquifer_Class = [
    {
        label: "Bedrock",
        value: "Bedrock",
    },
    {
        label: "Sand or Gravel",
        value: "Sand_or_Gravel",
    },
    {
        label: "Unknown",
        value: "Unknown",
    },
];

const Well_Type = [
    {
        label: "Drilled",
        value: "Drilled",
    },
    {
        label: "Driven",
        value: "Driven",
    },
    {
        label: "Dug",
        value: "Dug",
    },
    {
        label: "Unknown",
        value: "Unknown",
    },
];

const Topography = [
    {
        label: "Hill top",
        value: "Hill top",
    },
    {
        label: "Hill Slope",
        value: "Hill Slope",
    },
    {
        label: "Level land",
        value: "Level land",
    },
    {
        label: "Depression",
        value: "Depression",
    },
];

export class PreField extends Component {
    static displayName = PreField.name;
    state = {};
    submit = (e) => {
        e.preventDefault(); // Prevent submitting form to the server
        window.alert(`This ${this.state.name}! has been submitted `); //${this.state.food}!${this.state.isDessert ? ' A lovely dessert!' : ''}
    };
    setWellID = (e) => this.setState({ Well_ID: e.target.value });
    setWellName = (e) => this.setState({ Well_Name: e.target.value });
    setResidentName = (e) => this.setState({ Resident_Name: e.target.value });
    setAddress = (e) => this.setState({ Address: e.target.value });
    setCity = (e) => this.setState({ City: e.target.value });
    setState = (e) => this.setState({ State: e.target.value });
    setZibCode = (e) => this.setState({ Zib_Code: e.target.value });
    setWellOwner = (e) => this.setState({ Well_Owner: e.target.value });
    setWellConstructionCompletation = (e) => this.setState({ Completation_Of_Well_Construction: e.target.value });
    setComplaints = (e) => this.setState({ Smell_Or_Taste_Of_WaterComplaints: e.target.value });
    setWellDryness = (e) => this.setState({ Well_Dryness: e.target.value });
    setWellUsage = (e) => this.setState({ Well_Usage: e.target.value });
    setGPSCoordinates = (e) => this.setState({ GPS_Coordinates: e.target.value });
    setBoreHoleDiameter = (e) => this.setState({ Bore_Hole_Diameter: e.target.value });
    setDepthOfWell = (e) => this.setState({ Depth_Of_Well: e.target.value });
    setFieldTitle = (e) => this.setState({ Field_Title: e.target.value });
    setWaterLevel = (e) => this.setState({ Water_Level: e.target.value });
    setCasingMaterial = (e) => this.setState({ Casing_Material: e.target.value });
    setCollectorName = (e) => this.setState({ Collector_Name: e.target.value });
    setComments = (e) => this.setState({ Comments: e.target.value });

    render() {
        return (
            <form method="post" style={{ display: 'block', textAlign: 'center', paddingBottom: '40px', paddingTop:'20px', border: 'solid' }} onSubmit={this.submit}>
                <h2>Well Info</h2>
                <div class="css">
                    <label>
                        <div>
                            Well ID:
                        </div>
                        <input type="text" onChange={this.setWellID} required autoFocus />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well Name:
                        </div>
                        <input type="text" onChange={this.setWellName} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Name of the resident well user:
                        </div>
                        <input type="text" onChange={this.setResidentName} required autoFocus />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Address:
                        </div>
                        <input type="text" onChange={this.setAddress} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            City:
                        </div>
                        <input type="text" onChange={this.setCity} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            State:
                        </div>
                        <input type="text" onChange={this.setState} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Zip code:
                        </div>
                        <input type="text" onChange={this.setZibCode} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well owner (if different from resident):
                        </div>
                        <input type="text" onChange={this.setWellOwner} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Well construction completed:
                        </div>
                        <input type="text" onChange={this.setWellConstructionCompletation} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Any complaints about smell or taste of water?
                        </div>
                        <input type="text" onChange={this.setComplaints} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Does the well ever go dry? <br />
                            (if so, when?)
                        </div>
                        <input type="text" onChange={this.setComplaints} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Any complaints about smell or taste of water?
                        </div>
                        <input type="text" onChange={this.setComplaints} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Any maintenance done to the well itself
                            within the last five years?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Maintenance.map((option) => (
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
                            Any major land use / development
                            changes around the well within the
                            last five years?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Development.map((option) => (
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
                            How many people use this well?
                        </div>
                        <input type="text" onChange={this.setWellUsage} required />
                    </label>
                </div>
                <div class="css"> 
                    <label>
                        <div>
                            Has any manure or pesticides been
                            applied near the well within the last
                            five years?
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Fertilizers_Pesticides.map((option) => (
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
                            Well GPS Coordinates (if registered):
                        </div>
                        <input type="text" onChange={this.setGPSCoordinates} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Bore hole diameter in inches:
                        </div>
                        <input type="text" onChange={this.setBoreHoleDiameter} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Total depth of well in feet:
                        </div>
                        <input type="text" onChange={this.setDepthOfWell} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Water level in feet:
                        </div>
                        <input type="text" onChange={this.setDepthOfWell} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Aquifer Type:
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Aquifer_Type.map((option) => (
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
                            Aquifer Class:
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Aquifer_Class.map((option) => (
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
                            Well Type (construction method):
                        </div>
                        <div id="App">
                            <div className="select-container">
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Well_Type.map((option) => (
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
                            What is the well casing material made of?
                        </div>
                        <input type="text" onChange={this.setCasingMaterial} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Data Collector’s Name:
                        </div>
                        <input type="text" onChange={this.setCollectorName} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Data Collector's Observations:
                        </div>
                        <input type="text" onChange={this.Comments} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Topography of the well location:
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
                            Comments:
                        </div>
                        <input type="text" onChange={this.Comments} required />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Date:
                        </div>
                        <input type="date" onChange={this.Comments} required />
                    </label>
                </div>

                <button type="submit">Save</button>
            </form>
            
        );
    }
}




