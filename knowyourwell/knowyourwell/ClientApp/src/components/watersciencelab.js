import React, { useEffect, useState } from "react";
import "./css/forms.css";
import Axios from "axios";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUser } from "./usercontext";

let formElements = [];

const nameMap = {
  wsl_samplecode: "Sample Code:",
  wsl_ph: "pH:",
  wsl_conductivity: "Conductivity:",
  wsl_calciumhardness: "Calcium Hardness:",
  wsl_no3no2n: "Nitrate + Nitrite Nitrogen:",
  wsl_nh4n: "Ammonium Nitrogen:",
  wsl_bromide: "Bromide:",
  wsl_chloride: "Chloride:",
  wsl_fluoride: "Fluoride:",
  wsl_orthophosphate: "Orthophosphate:",
  wsl_sulfate: "Sulfate:",
  wsl_arsenic: "Arsenic:",
  wsl_chromium: "Chromium:",
  wsl_copper: "Copper:",
  wsl_iron: "Iron:",
  wsl_manganese: "Manganese:",
  wsl_selenium: "Selenium:",
  wsl_uranium: "Uranium:",
  wsl_zinc: "Zinc:",
  wsl_acetochlor: "Acetochlor:",
  wsl_atrazine: "Atrazine:",
  wsl_butylate: "Butylate:",
  wsl_chlorothalonil: "Chlorothalonil:",
  wsl_cyanazine: "Cyanazine:",
  wsl_de_ethylatrazine: "De-ethylatrazine:",
  wsl_de_iso_propylatrazine: "De-isopropylatrazine:",
  wsl_dimethenamid: "Dimethenamid:",
  wsl_EPTC: "EPTC:",
  wsl_metolachlor: "Metolachlor:",
  wsl_metribuzin: "Metribuzin:",
  wsl_norflurazon: "Norflurazon:",
  wsl_pendamethalin: "Pendimethalin:",
  wsl_permethrin: "Permethrin:",
  wsl_prometon: "Prometon:",
  wsl_propazine: "Propazine:",
  wsl_propachlor: "Propachlor:",
  wsl_simazine: "Simazine:",
  wsl_teflurthrin: "Tefluthrin:",
  wsl_trifluralin: "Trifluralin:",
  wsl_totalcoliform: "Total Coliform:",
  wsl_ecoli: "E. coli:",
  wsl_magnesium: "Magnesium:",
  wsl_comments: "Comments:",
}

const wslInfo = [
  "wsl_samplecode",
  "wsl_ph",
  "wsl_conductivity",
  "wsl_calciumhardness",
  "wsl_no3no2n",
  "wsl_nh4n",
  "wsl_bromide",
  "wsl_chloride",
  "wsl_fluoride",
  "wsl_orthophosphate",
  "wsl_sulfate",
  "wsl_arsenic",
  "wsl_chromium",
  "wsl_copper",
  "wsl_iron",
  "wsl_manganese",
  "wsl_selenium",
  "wsl_uranium",
  "wsl_zinc",
  "wsl_acetochlor",
  "wsl_atrazine",
  "wsl_butylate",
  "wsl_chlorothalonil",
  "wsl_cyanazine",
  "wsl_de_ethylatrazine",
  "wsl_de_iso_propylatrazine",
  "wsl_dimethenamid",
  "wsl_EPTC",
  "wsl_metolachlor",
  "wsl_metribuzin",
  "wsl_norflurazon",
  "wsl_pendamethalin",
  "wsl_permethrin",
  "wsl_prometon",
  "wsl_propazine",
  "wsl_propachlor",
  "wsl_simazine",
  "wsl_teflurthrin",
  "wsl_trifluralin",
  "wsl_totalcoliform",
  "wsl_ecoli",
  "wsl_magnesium",
  "wsl_comments",
];

export default function WaterScienceLab() {
  const [searchParams] = useSearchParams();
  const watersciencelab_id = parseInt(searchParams.get("watersciencelab_id"));
  const wellName = searchParams.get("wellName");
  const well_id = searchParams.get("well_id");
  const wellcode = searchParams.get("wellcode");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.displayn === "") {
      window.alert("You are not yet logged in. Please log in.");
      navigate("/");
    }
  }, [navigate, user]);

  const backButton = () => {
    window.location.href = `/PreviousEntries?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/GetWaterScienceLabEntry", {
      responseType: "json",
      params: {
        watersciencelab_id: watersciencelab_id,
      },
    }).then(function (response) {
      formElements = response.data.WaterScienceLabEntry[0];
      setLoading(false);
    });
  }, [watersciencelab_id]);

  const wslInfoList = [];
  for (const key of wslInfo) {
    wslInfoList.push([key, formElements[key]]);
  }

  let columnList = [];

  console.log(columnList);
  if (formElements) {
    const fields = wslInfoList;
    columnList.push(
      fields.map((field, index) => {
        if (index % 2 === 0) {
          return (
            <div key={index} className="row">
              <div className="col">
                <p style={{ textAlign: "left" }}>
                  <b>{nameMap[field[0]]}</b> {field[1] || "None Provided"}
                </p>
              </div>
              <div className="col">
                {fields[index + 1] &&
                  <p style={{ textAlign: "left" }}>
                    <b>{nameMap[fields[index + 1][0]]}</b> {fields[index + 1][1] || "None Provided"}
                  </p>
                }
              </div>
            </div>
          );
        }
        return null;
      })
    );

    return (
      <div className="css">
        <h2>{wellName}: Water Science Lab</h2>
        <br />
        <div className="container" style={{ textAlign: "center" }}>
          {columnList}
          <div key="dateentered" className="row">
            <div className="col">
              <p style={{ textAlign: "left" }}>
                <b>Date Entered:</b>{" "}
                {moment
                  .utc(formElements["wsl_dateentered"])
                  .local()
                  .format("MM-DD-YYYY hh:mm A")}
              </p>
            </div>
          </div>
          <br />
          <button
            type="button"
            style={{ width: "130px", height: "17%" }}
            className="btn btn-primary btn-lg"
            onClick={backButton}
          >
            Back
          </button>
          <br />
          <br />
          <a href="mailto:knowyourwell@unl.edu" style={{ textAlign: "center" }}>
            If any data is incorrect email us at knowyourwell@unl.edu
          </a>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
