import React from 'react'
import './css/PreField.css'
import './css/forms.css'



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
        <div className="form-container">
            <form >
                <h2>Prefield</h2>
                <div className="css">
                    <label>
                        Well ID:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                        Well Name:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                        Name of the resident well user:
                    </label>
                    <input type="text" />
                </div>

                <div className="css">
                    <label>
                            Address:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            City:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            State:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Zip code:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Well owner (if different from resident):
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Well construction completed:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Any complaints about smell or taste of water?
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Does the well ever go dry? <br />
                            (if so, when?)
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Any complaints about smell or taste of water?
                    </label>
                    <input type="text" />
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
                            How many people use this well?
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Has any manure or pesticides been
                            applied near the well within the last
                            five years?
                    </label>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}  >
                                {pestmanure.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="css">
                    <label>
                            Well GPS Coordinates (if registered):
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Bore hole diameter:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Total depth of well:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Field Title
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Water level:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Aquifer Type:
                    </label>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}   >
                                {Aquifer_Type.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="css">
                    <label>
                            Aquifer className:
                    </label>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}   >
                                {Aquifer_Class.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="css">
                    <label>
                            Well Type:
                    </label>
                    <div id="App">
                        <div className="select-container">
                            <select style={{ width: '20em' }}>
                                {Well_Type.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="css">
                    <label>
                            What is the well casing material made of?
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Data Collector’s Name:
                    </label>
                    <input type="text" />
                </div>
                <div className="css">
                    <label>
                            Comments:
                    </label>
                    <input type="text" />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
