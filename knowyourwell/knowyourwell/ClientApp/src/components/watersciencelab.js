import React, { useEffect, useState } from "react";
import "./css/forms.css";
import Axios from "axios";
import moment from "moment";
import {
  basicWaterInfo,
  metalsInfo,
  pesticidesInfo,
  nameMap,
  wslInfo,
} from "./resources/wslConstants";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUser } from "./usercontext";

let formElements = [];

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
      alert("You are not yet logged in. Please log in.");
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
