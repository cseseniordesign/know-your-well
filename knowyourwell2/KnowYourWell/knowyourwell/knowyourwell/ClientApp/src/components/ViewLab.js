import React, { Component } from 'react';
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
                <div class="css">
                    <label>
                        <div>
                            Ammonia (0-10 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setAmmonia} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Calcium hardness (50-500 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setCalciumHardness} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Chloride (0-400 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setChloride} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Bacteria (Colilert): <br />
                            (Positive if more than 1 MPN/100ml)
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
                            Copper (0-10 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setCopper} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Iron (0-10 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setIron} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Manganese (0-50 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setManganese} disabled="disabled" />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Nitrate (0-45 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setNitrate} disabled="disabled" />
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
                            Additional observations:
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
                <div class="css">
                    <label>
                        <div>
                            Comments:
                        </div>
                        <p><textarea type="text" class="textarea resize-ta" disabled="disabled"></textarea></p>
                    </label>
                </div>
            </List>
        );
    }
}
