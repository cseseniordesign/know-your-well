import React, { useEffect, useState } from "react";
import "./css/forms.css";
import Axios from "axios";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUser } from "./usercontext";

let formElements = [];
const nameMap = {
  "cl_ammonia": "Ammonia [0-10 ppm(mg/L)]:",
  "cl_calciumhardness": "Calcium hardness [50-500 ppm(mg/L)]:",
  "cl_chloride": "Chloride [0-400 ppm(mg/L)]:",
  "cl_bacteria": "Bacteria (Colilert) [Positive if more than 1 MPN/100ml]:",
  "cl_copper": "Copper [0-10 ppm(mg/L)]:",
  "cl_iron": "Iron [0-10 ppm(mg/L)]:",
  "cl_manganese": "Manganese [0-50 ppm(mg/L)]:",
  "cl_nitrate": "Nitrate [0-45 ppm(mg/L)]:",
  "cl_datacollector": "Data Collector’s Name:",
  "cl_observation": "Observations:",
};

const classLabInfo = [
  "cl_ammonia",
  "cl_calciumhardness",
  "cl_chloride",
  "cl_bacteria",
  "cl_copper",
  "cl_iron",
  "cl_manganese",
  "cl_nitrate",
  "cl_datacollector",
  "cl_observation",
];

export default function ViewLab() {
  const [searchParams] = useSearchParams();
  const wellName = searchParams.get("wellName");
  const classlab_id = searchParams.get("classlab_id");
  const well_id = searchParams.get("well_id");
  const wellcode = searchParams.get("wellcode");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.displayn === "") {
      alert("You are not yet logged in. Please log in.");
      navigate("/");
    }
  }, [navigate, user]);

  const backButton = () => {
    window.location.href = `/PreviousEntries?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/GetLabEntry", {
      responseType: "json",
      params: {
        classlab_id: classlab_id,
      },
    }).then(function (response) {
      //console.log(response)
      formElements = response.data.ClassLabEntry[0];
      //console.log(formElements.wi_wellcode)
      setLoading(false);
    });
  }, [classlab_id]);

  const classLabInfoList = [];
  for (const key of classLabInfo) {
    if (formElements[key]) {
      classLabInfoList.push([key, formElements[key]]);
    }
  }

  let columnList = [];

  if (formElements) {
    const fields = classLabInfoList;
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
        <h2>{wellName}: Class Lab</h2>
        <br />
        <div className="container" style={{ textAlign: "center" }}>
          {columnList}
          <div key="dateentered" className="row">
            <div className="col">
              <p style={{ textAlign: "left" }}>
                <b>Date Entered:</b>{" "}
                {moment
                  .utc(formElements["cl_datecollected"])
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
