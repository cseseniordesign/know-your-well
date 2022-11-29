import React from 'react'
import './css/PreField.css'
import './css/forms.css'
import { useState } from 'react';
import Axios from 'axios' 

export default function Lab() {

    const [Ammonia, setAmmonia] = useState(0);
    const [Calcium, setCalcium] = useState(0);
    const [Chloride, setChloride] = useState(0);
    const [Copper, setCopper] = useState(0);
    const [Iron, setIron] = useState(0);
    const [Manganese, setManganese] = useState(0);
    const [Nitrate, setNitrate] = useState(0);
    const [Name, setName] = useState("");
    const [observations, setObservations] = useState("");

    const [Bacteria, setBacteria] = useState("");
    const handleChange_Bacteria = (event) => {
        setBacteria(event.target.value);
    };

    const addLab = () => {
        Axios.post('http://localhost:7193/createlab', {
            Ammonia: Ammonia,
            Calcium: Calcium,
            Chloride: Chloride,
            Copper: Copper,
            Bacteria: Bacteria,
            Iron: Iron,
            Manganese: Manganese,
            Nitrate: Nitrate,
            Name: Name,
            observations: observations,
        })
            .then(() => {
                console.log("success");
            })
    };

    var form = document.getElementById('submissionAlert');
    const myFunction = () => {
        if (form.checkValidity()) {
            alert("Succesfully submitted!");
        }
    }

    return (
        <div className="form-container">
            <form method="post" id="submissionAlert"  >
                <h2>Lab</h2>
                <div className="css">
                    <label for="Ammonia">
                        Ammonia <br /> [0-10 ppm(mg/L)]
                    </label>
                    <input
                        type="number" className="textarea resize-ta" id="Ammonia" name="Ammonia" min="0" max="10" required
                        onChange={(event) => {
                            setAmmonia(event.target.value);
                        }}
                    />
                </div>
                <div className="css">
                    <label for="Calcium">
                        Calcium hardness <br /> [50-500 ppm(mg/L)]
                    </label>
                    <input
                        type="number" className="textarea resize-ta" id="Calcium" name="Calcium" min="50" max="500" required
                        onChange={(event) => {
                            setCalcium(event.target.value);
                        }}

                    />
                </div>
                <div className="css">
                    <label for="Chloride">
                        Chloride <br /> [0-400 ppm(mg/L)]
                    </label>
                    <input
                        type="number" className="textarea resize-ta" id="Chloride" name="Chloride" min="0" max="400" required
                        onChange={(event) => {
                            setChloride(event.target.value);
                        }}
                    />
                </div>
                <div className="css">
                    <label for="Bacteria">
                        Bacteria (Colilert) <br />
                        [Positive if more than 1 MPN/100ml]
                    </label>
                    <div id="App">
                        <div className="select-container">
                            <select
                                value={Bacteria}
                                onChange={handleChange_Bacteria}
                            >
                                <option hidden selected>Select one...</option>
                                <option value="Clear" id="Bacteria" name="Bacteria" required >Clear</option>
                                <option value="Yellow_with_fluorescent" id="Bacteria" name="Bacteria" required>Yellow with fluorescent rim </option>
                                <option value="Yellow_without_fluorescent" id="Bacteria" name="Bacteria" required >Yellow without fluorescent rim</option>
                            </select>  
                        </div>
                    </div>
                </div>
                <div className="css">
                    <label for="">
                        Copper <br /> [0-10 ppm(mg/L)]
                    </label>
                    <input
                        type="number" className="textarea resize-ta" id="Copper" name="Copper" min="0" max="10" required
                        onChange={(event) => {
                            setCopper(event.target.value);
                        }}
                    />
                </div>
                <div className="css">
                    <label for="Iron">
                        Iron<br /> [0-10 ppm(mg/L)]
                    </label>
                    <input

                        type="number" className="textarea resize-ta" id="Iron" name="Iron" min="0" max="10" required
                        onChange={(event) => {
                            setIron(event.target.value);
                        }}

                    />
                </div>
                <div className="css">
                    <label for="Manganese">
                        Manganese<br /> [0-50 ppm(mg/L)]
                    </label>
                    <input
                        type="number" className="textarea resize-ta" id="Manganese" name="Manganese" min="0" max="50" required
                        onChange={(event) => {
                            setManganese(event.target.value);
                        }}
                    />
                </div>
                <div className="css">
                    <label for="Nitrate">
                        Nitrate <br /> [0-45 ppm(mg/L)]
                    </label>
                    <input
                        type="number" className="textarea resize-ta" id="Nitrate" name="Nitrate" min="0" max="45" required
                        onChange={(event) => {
                            setNitrate(event.target.value);
                        }}
                    />
                </div>
                <div className="css">
                    <label for="Name">
                        Data Collector’s Name:
                    </label>
                    <input
                        type="text" className="textarea resize-ta" id="Name" name="Name" required
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div className="css">
                    <label for="observations">
                        Additional observations:
                    </label>
                    <textarea
                        type="text" className="textarea resize-ta" maxLength="150" id="observations" name="observations" required
                        onChange={(event) => {
                            setObservations(event.target.value);
                        }}
                    />
                </div>
                <button type="submit" onClick={addLab, myFunction}  >Save</button>
            </form>
        </div>
    );
}