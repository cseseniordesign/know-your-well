import React, { useEffect, useState } from "react";
import "./css/forms.css";
import Axios from "axios";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "./usercontext";

const { BlobServiceClient } = require("@azure/storage-blob");

let formElements = [];
let columnList = [];
const labelList = [
  "Image Type:",
  "Data Collector’s Name:",
  "Observations:",
  "Latitude:",
  "Longitude:",
  "Date Entered:",
];

const keyList = [
  "im_type",
  "im_datacollector",
  "im_observation",
  "im_latitude",
  "im_longitude",
  "im_datecollected",
];

export default function ViewImage() {
  const [searchParams] = useSearchParams();
  const image_id = parseInt(searchParams.get("image_id"));
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
    window.location.href = `/PreviousImages?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/GetImage", {
      responseType: "json",
      params: {
        image_id: image_id,
      },
    }).then(async (response) => {
      try {
        const AZURE_STORAGE_CONNECTION_STRING = `\
        BlobEndpoint=https://knowyourwell.blob.core.windows.net/;\
        QueueEndpoint=https://knowyourwell.queue.core.windows.net/;\
        FileEndpoint=https://knowyourwell.file.core.windows.net/;\
        TableEndpoint=https://knowyourwell.table.core.windows.net/;\
        SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlactfx&se=2999-12-31T18:59:59Z&st=2024-11-07T20:20:40Z&spr=https&sig=QbowwqDo0yTELgGEKK8XhkNmfI3FSBUnBrMUY8evsSM%3D`;

        const blobServiceClient = BlobServiceClient.fromConnectionString(
          AZURE_STORAGE_CONNECTION_STRING,
        );
        const containerClient =
          blobServiceClient.getContainerClient(`well-images-${well_id}`);
        const blobClient =
          containerClient.getBlobClient(response.data.Image[0].im_filename);
        
        const downloadResponse = await blobClient.download();

        formElements = { blob: await downloadResponse.blobBody, ...response.data.Image[0] };
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    });
  }, [well_id, image_id]);

  if (formElements.length !== 0) {
    for (let i = 0; i < labelList.length; i += 2) {
      const firstColumnName = labelList[i];
      let firstColumnValue = formElements[keyList[i]];
      if (firstColumnName === "Date Entered:")
        firstColumnValue = moment
          .utc(formElements["fa_datecollected"])
          .format("MM-DD-YYYY hh:mm A");
      let secondColumnValue = "";
      let secondColumnName = "";
      if (i < labelList.length + 1) {
        secondColumnName = labelList[i + 1];
        secondColumnValue = formElements[keyList[i + 1]];
      }
      if (secondColumnName === "Date Entered:")
        secondColumnValue = moment
          .utc(formElements["fa_datecollected"])
          .format("MM-DD-YYYY hh:mm A");

      columnList.push(
        <div className="row" key={i}>
          <div className="col">
            <p style={{ textAlign: "center" }}>
              <b>{firstColumnName}</b> {firstColumnValue}
            </p>
          </div>
          <div className="col">
            <p style={{ textAlign: "center" }}>
              <b>{secondColumnName}</b> {secondColumnValue}
            </p>
          </div>
        </div>,
      );
    }

    return (
      <div className="css">
        <h2>{wellName}: Image</h2>
        <br />
        <div className="container" style={{ textAlign: "center" }}>
          <div>
            <img
              src={URL.createObjectURL(formElements.blob)}
              alt="Preview"
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}
              required={true}
            />
          </div>
          {columnList}
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
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1>Loading</h1>
        <button
          type="button"
          style={{ width: "130px", height: "17%" }}
          className="btn btn-primary btn-lg"
          onClick={backButton}
        >
          Back
        </button>
      </div>
    )
    
  }
}
