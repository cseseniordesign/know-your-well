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
  wsl_ph: "pH [0-14]:",
  wsl_conductivity: "Conductivity [100-2000 μS/cm]:",
  wsl_calciumhardness: "Calcium Hardness [50-500 mg/L]:",
  wsl_no3no2n: "Nitrate + Nitrite Nitrogen [0-45 mg/L]:",
  wsl_nh4n: "Ammonium Nitrogen (mg/L):",
  wsl_bromide: "Bromide (mg/L):",
  wsl_chloride: "Chloride (mg/L):",
  wsl_fluoride: "Fluoride (mg/L):",
  wsl_orthophosphate: "Orthophosphate (mg/L):",
  wsl_sulfate: "Sulfate (mg/L):",
  wsl_arsenic: "Arsenic (mg/L):",
  wsl_chromium: "Chromium (μg/L):",
  wsl_copper: "Copper (μg/L):",
  wsl_iron: "Iron (μg/L):",
  wsl_manganese: "Manganese (μg/L):",
  wsl_selenium: "Selenium (μg/L):",
  wsl_uranium: "Uranium (μg/L):",
  wsl_zinc: "Zinc (μg/L):",
  wsl_acetochlor: "Acetochlor (μg/L):",
  wsl_alachlor: "Alachlor (μg/L):",
  wsl_atrazine: "Atrazine (μg/L):",
  wsl_butylate: "Butylate (μg/L):",
  wsl_chlorothalonil: "Chlorothalonil (μg/L):",
  wsl_cyanazine: "Cyanazine (μg/L):",
  wsl_de_ethylatrazine: "De-ethylatrazine (μg/L):",
  wsl_de_iso_propylatrazine: "De-isopropylatrazine (μg/L):",
  wsl_dimethenamid: "Dimethenamid (μg/L):",
  wsl_EPTC: "EPTC (μg/L):",
  wsl_metolachlor: "Metolachlor (μg/L):",
  wsl_metribuzin: "Metribuzin (μg/L):",
  wsl_norflurazon: "Norflurazon (μg/L):",
  wsl_pendamethalin: "Pendimethalin (μg/L):",
  wsl_permethrin: "Permethrin (μg/L):",
  wsl_prometon: "Prometon (μg/L):",
  wsl_propazine: "Propazine (μg/L):",
  wsl_propachlor: "Propachlor (μg/L):",
  wsl_simazine: "Simazine (μg/L):",
  wsl_teflurthrin: "Tefluthrin (μg/L):",
  wsl_trifluralin: "Trifluralin (μg/L):",
  wsl_totalcoliform: "Total Coliform (MPN/100 mL):",
  wsl_ecoli: "E. coli (MPN/100 mL):",
  wsl_magnesium: "Magnesium (μg/L):",
  wsl_comments: "Comments:",
};

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
  "wsl_alachlor",
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

  const basicWaterInfo = [
    "wsl_conductivity",
    "wsl_ph",
    "wsl_calciumhardness",
    "wsl_nh4n",
    "wsl_no3no2n",
    "wsl_chloride",
    "wsl_orthophosphate",
    "wsl_sulfate",
  ];

  const metalsInfo = [
    "wsl_arsenic",
    "wsl_chromium",
    "wsl_copper",
    "wsl_iron",
    "wsl_manganese",
    "wsl_selenium",
    "wsl_uranium",
    "wsl_zinc",
  ];

  const pesticidesInfo = [
    "wsl_acetochlor",
    "wsl_alachlor",
    "wsl_atrazine",
    "wsl_de_ethylatrazine",
    "wsl_de_iso_propylatrazine",
    "wsl_dimethenamid",
    "wsl_metolachlor",
    "wsl_teflurthrin",
  ];

  const miscInfo = wslInfo.filter((key) => {
    return (
      !basicWaterInfo.includes(key) &&
      !metalsInfo.includes(key) &&
      !pesticidesInfo.includes(key) &&
      key !== "wsl_comments" &&
      key !== "wsl_dateentered"
    );
  });

  const miscList = [
    "Miscellaneous",
    ...miscInfo.map((key) => [key, formElements[key]]),
  ];
  console.log(miscList);
  let columnList = [];

  let basicChemList = [
    "Basic Water Chemistry",
    ...basicWaterInfo.map((key) => [key, formElements[key]]),
  ];
  let metalList = [
    "Metals",
    ...metalsInfo.map((key) => [key, formElements[key]]),
  ];
  let pesticideList = [
    "Pesticides",
    ...pesticidesInfo.map((key) => [key, formElements[key]]),
  ];

  if (formElements) {
    for (const section of [basicChemList, metalList, pesticideList, miscList]) {
      const summaryName = section[0];
      const fields = section.slice(1);
      columnList.push(
        <>
          <details
            key={summaryName}
            style={{ marginTop: "2px", alignItems: "center" }}
          >
            <summary
              style={{
                textAlign: "left",
                fontSize: "1.25em",
                background: "#686868",
                padding: "2px 8px",
                color: "white",
              }}
            >
              <b>{summaryName}</b>
            </summary>
            {
              // map through fields and separate into two columns
              fields.map((field, index) => {
                if (index % 2 === 0) {
                  return (
                    <div
                      key={index}
                      className="row"
                      style={{ paddingTop: "8px" }}
                    >
                      <div className="col">
                        <p style={{ textAlign: "left" }}>
                          <b>{nameMap[field[0]]}</b>{" "}
                          {field[1] || "None Provided"}
                        </p>
                      </div>
                      <div className="col">
                        {fields[index + 1] && (
                          <p style={{ textAlign: "left" }}>
                            <b>{nameMap[fields[index + 1][0]]}</b>{" "}
                            {fields[index + 1][1] || "None Provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }
                // return so map is happy
                return null;
              })
            }
          </details>
          <br />
        </>
      );
    }
    return (
      <div className="css">
        <h2>{wellName}: Water Science Lab</h2>
        <br />
        <div className="container" style={{ textAlign: "center" }}>
          {columnList}
          <div key="dateentered" className="row">
            <div className="col">
              <p style={{ textAlign: "left" }}>
                <b>Comments:</b>{" "}
                {formElements["wsl_comments"] || "None Provided"}
              </p>
            </div>
            <div className="col">
              <p style={{ textAlign: "left" }}>
                <b>Date Entered:</b>{" "}
                {moment
                  .utc(formElements["wsl_dateentered"])
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
