import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
//import FieldSelection from './fieldselection';

import { useUser } from "./usercontext";

var previousEntries = [];
var listElements = [];

function generateListElements(previousEntries, well_id, name, wellcode) {
  //console.log(previousEntries[0].date)
  for (var entry of previousEntries) {
    let key = 1;

    //console.log(entry)
    const buttonClass =
      entry.labID == null
        ? "btn btn-primary btn-lg disabled"
        : "btn btn-primary btn-lg";
    listElements.push(
      <>
        <List.Item>
          <h4>
            Field Activity Date:{" "}
            {moment.utc(entry.fieldDate).format("MM-DD-YYYY hh:mm A")}
          </h4>
          <h4>
            Class Lab Date:{" "}
            {moment.utc(entry.labDate).format("MM-DD-YYYY hh:mm A")}
          </h4>
        </List.Item>
        <List.Item key={key}>
          <List.Content>
            <a
              href={`/ViewField?fieldactivity_id=${entry.fieldID}&well_id=${well_id}&wellcode=${wellcode}&wellName=${name}`}
              style={{ width: "22.5%", height: "17%" }}
              className="btn btn-primary btn-lg"
            >
              Field (Field ID: {entry.fieldID})
            </a>
            <a
              href={`/ViewClassLab?classlab_id=${entry.labID}&well_id=${well_id}&wellcode=${wellcode}&wellName=${name}`}
              style={{ width: "22.5%", height: "17%" }}
              className={buttonClass}
              aria-disabled={entry.labID == null}
            >
              Class Lab{" "}
              {entry.labID != null ? `(Lab ID: ${entry.labID})` : "(No Lab ID)"}
            </a>
          </List.Content>
          <br />
        </List.Item>
      </>,
    );
    key++;
  }
  return listElements;
}

export default function PreviousEntries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const well_id = parseInt(searchParams.get("id"));
  const wellName = searchParams.get("wellName");
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
    window.location.href = `/EditWell?id=${well_id}&wellcode=${wellcode}&wellName=${wellName}`;
  };

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/previousentries", {
      responseType: "json",
      params: {
        well_id: well_id,
      },
    }).then(function (response) {
      const fieldList = response.data.FieldList;
      console.log(fieldList);
      //setLoading(fieldList.length>0)
      console.log(response);
      var i;
      for (i = 0; i < fieldList.length; i++) {
        const fieldEntry = fieldList[i];
        const entry = {
          fieldDate: fieldEntry.fa_datecollected,
          fieldID: fieldEntry.fieldactivity_id,
          labID: fieldEntry.classlab_id,
          labDate: fieldEntry.cl_datecollected,
        };
        previousEntries.push(entry);
      }
      listElements = generateListElements(
        previousEntries,
        well_id,
        wellName,
        wellcode,
      );
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    // We need to add the back button here too so that the user doesn't get stuck on this page.
    return (
      <List style={{ textAlign: "center" }}>
        <br />
        <h1>Loading</h1>
        <br />
        <List.Item>
          <List.Content>
            <br />
            <button
              type="button"
              style={{ width: "130px", height: "17%" }}
              className="btn btn-primary btn-lg"
              onClick={backButton}
            >
              Back
            </button>
          </List.Content>
        </List.Item>
      </List>
    )
  }

  return (
    <List style={{ textAlign: "center" }}>
      <br />
      <h2>{wellName}: Previous Entries</h2>
      <br />
      {listElements}
      <List.Item>
        <List.Content>
          <br />
          <button
            type="button"
            style={{ width: "130px", height: "17%" }}
            className="btn btn-primary btn-lg"
            onClick={backButton}
          >
            Back
          </button>
        </List.Content>
      </List.Item>
    </List>
  );
}
