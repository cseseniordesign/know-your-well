import React, { Component } from 'react';
import './css/WellInfo.css'

const Bacteria = [
    {
        label: "Clear",
        value: "Clear",
    },
    {
        label: "Yellow without fluorescent rim",
        value: "Yellow_without_fluorescent",
    },
    {
        label: "Yellow with fluorescent rim ",
        value: "Yellow_with_fluorescent ",
    },

];


export class Lab extends Component {
    static displayName = Lab.name;
    state = {};
    submit = (e) => {
        e.preventDefault(); // Prevent submitting form to the server
        window.alert(`This ${this.state.name}! has been submitted `); //${this.state.food}!${this.state.isDessert ? ' A lovely dessert!' : ''}
    };

    setAmmonia = (e) => this.setState({ Ammonia: e.target.value });
    setCalciumHardness = (e) => this.setState({ Calcium_Hardness: e.target.value });
    setChloride = (e) => this.setState({ Chloride: e.target.value });
    setCopper = (e) => this.setState({ Copper: e.target.value });
    setIron = (e) => this.setState({ Iron: e.target.value });
    setManganese = (e) => this.setState({ Manganese: e.target.value });
    setNitrate = (e) => this.setState({ Nitrate: e.target.value });
    setCollectorName = (e) => this.setState({ CollectorName: e.target.value });

    render() {
        return (
            <form method="post" style={{ display: 'block', textAlign: 'center', paddingBottom: '40px', paddingTop: '20px', border: 'solid' }} onSubmit={this.submit}>
                <h2>Lab</h2>
                <div class="css">
                    <label>
                        <div>
                            Ammonia (0-10 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setAmmonia} autoFocus/>
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Calcium hardness (50-500 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setCalciumHardness} />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Chloride (0-400 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setChloride} />
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
                                <select style={{ width: '20em' }} value={this.state.value} onChange={this.handleChange} >
                                    {Bacteria.map((option) => (
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
                            Copper (0-10 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setCopper} />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Iron (0-10 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setIron} />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Manganese (0-50 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setManganese} />
                    </label>
                </div>
                <div class="css">
                    <label>
                        <div>
                            Nitrate (0-45 ppm(mg/L)):
                        </div>
                        <input type="number" onChange={this.setNitrate} />
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
                            Additional observations:
                        </div>
                        <p><textarea type="text" class="textarea resize-ta"></textarea></p>
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
                <div class="css">
                    <label>
                        <div>
                            Comments:
                        </div>
                        <p><textarea type="text" class="textarea resize-ta"></textarea></p>
                    </label>
                </div>

                <br />

                <button type="submit">Save</button>
            </form>
        );
    }
}