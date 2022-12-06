import React from 'react';
import { List } from 'semantic-ui-react'


export default function ViewField() {

    return (
        <List style={{ textAlign: 'center' }}>
            <br />
            <h2>Well ID: Field</h2>
            <br />
            <div class="css">
                <label>
                    <div>
                        Conditions: Describe weather, temperature, or anything note-worthy about your well
                    </div>
                    <p><textarea type="text" class="textarea resize-ta" autoFocus disabled="disabled"></textarea></p>
                </label>
            </div>
            <div class="css">
                <label>
                    <div>
                        Condition of the well cover:
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} disabled="disabled" >

                            </select>
                        </div>
                    </div>
                    <div>
                        Description of well cover:
                    </div>
                    <p><textarea type="text" class="textarea resize-ta" disabled="disabled" ></textarea></p>
                </label>
            </div>
            <div class="css">
                <label>
                    <div>
                        Is there evidence of surface run-off entry to the well?
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
                        Is there evidence of pooling or puddles within 12 ft of the well?
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
                        Groundwater Temperature in Celsius:
                    </div>
                    <input type="text" onChange={this.setGroundwater_Temperature} disabled="disabled" />
                </label>
            </div>
            <div class="css">
                <label>
                    <div>
                        pH (0-14):
                    </div>
                    <input type="text" onChange={this.setPH} disabled="disabled" />
                </label>
            </div>
            <div class="css">
                <label>
                    <div>
                        Conductivity (uS/cm):
                    </div>
                    <input type="text" onChange={this.setConductivity} disabled="disabled" />
                </label>
            </div>
            <div class="css">
                <label>
                    <div>
                        Data Collector’s Name:
                    </div>
                    <input type="text" onChange={this.setCollector_Name} disabled="disabled" />
                </label>
            </div>
            <div class="css">
                <label>
                    <div>
                        Observations:
                    </div>
                    <p><textarea type="text" class="textarea resize-ta" disabled="disabled"></textarea></p>
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
