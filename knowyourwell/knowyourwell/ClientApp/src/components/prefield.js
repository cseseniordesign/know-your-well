import React from 'react'
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

const pestmanure = [
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


export default function PreField() {

    return (
        <form style={{ display: 'block', textAlign: 'center', paddingBottom: '40px', paddingTop: '20px', border: 'solid' }}  >
            <h2>Prefield</h2>
            <div className="css">
                <label>
                    <div>
                        Well ID:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Well Name:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Name of the resident well user:
                    </div>
                    <input type="text" />
                </label>
            </div>

            <div className="css">
                <label>
                    <div>
                        Address:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        City:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        State:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Zip code:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Well owner (if different from resident):
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Well construction completed:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Any complaints about smell or taste of water?
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Does the well ever go dry? <br />
                        (if so, when?)
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Any complaints about smell or taste of water?
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Any maintenance done to the well itself
                        within the last five years?
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}   >
                                {Maintenance.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Any major land use / development
                        changes around the well within the
                        last five year
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}   >
                                {Development.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        How many people use this well?
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Has any manure or pesticides been
                        applied near the well within the last
                        five years?
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}  >
                                {pestmanure.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Well GPS Coordinates (if registered):
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Bore hole diameter:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Total depth of well:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Field Title
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Water level:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Aquifer Type:
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}   >
                                {Aquifer_Type.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Aquifer className:
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}   >
                                {Aquifer_Class.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Well Type:
                    </div>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}>
                                {Well_Type.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        What is the well casing material made of?
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Data Collector’s Name:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <div className="css">
                <label>
                    <div>
                        Comments:
                    </div>
                    <input type="text" />
                </label>
            </div>
            <button type="submit">Save</button>
        </form>
    );
}
