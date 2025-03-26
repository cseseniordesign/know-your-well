import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useUser } from "./usercontext";

var previousEntries = [];
var listElements = [];

function generateListElements(previousEntries, well_id, name, wellcode) {
  for (var entry of previousEntries) {
    let key = 1;

    listElements.push(
      <>
        <List.Item>
          <h4>
            Field Activity Date:{" "}
            {moment.utc(entry.fieldDate).local().format("MM-DD-YYYY hh:mm A")}
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
          </List.Content>
          <br />
        </List.Item>
        <List.Item>
          <List.Content>
            <details style={{marginTop: "2px", alignItems: "center"}}>
              <summary>Classroom Labs</summary>
              {entry.classLabs}
            </details>
          </List.Content>
        </List.Item>
        <List.Item>
          <details style={{marginTop: "2px", alignItems: "center"}}>
            <summary>Water Science Labs</summary>
            <List>
              {entry.waterScienceLabs}
            </List>
          </details>
        </List.Item>
        <br />
      </>,
    );
    key++;
  }
  return listElements;
}

export default function PreviousEntries() {
  const [searchParams] = useSearchParams();
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

  function getClassLabs(fieldId, well_id, wellcode, wellName) {
    let labList = [];
    Axios.get("/GetClassLabEntryByFieldActivity", {
      responseType: "json",
      params: {
        fieldactivity_id: fieldId,
      },
    }).then(function (response) {
      const labs = response.data.ClassLabEntries;
      console.log(labs);
      for (let i = 0; i < labs.length; i++) {
        const lab = labs[i];
        labList.push(
          <>
            <List.Item>
              <h4>
                Class Lab Date:{" "}
                {moment.utc(lab.fa_datecollected).local().format("MM-DD-YYYY hh:mm A")}
              </h4>
              <a
                href={`/ViewClassLab?classlab_id=${lab.classlab_id}&well_id=${well_id}&wellcode=${wellcode}&wellName=${wellName}`}
                style={{ width: "22.5%", height: "17%" }}
                className={ "btn btn-primary btn-lg"}
              >
                Class Lab{" "}
              </a>
            </List.Item>
          </>
        );
      }
      console.log(labList);
      return labList;
    })
  };

  function getWaterScienceLabs(fieldId, well_id, wellcode, wellName) {
    let labList = [];
    Axios.get("/GetWaterScienceLabEntryByFieldActivity", {
      responseType: "json",
      params: {
        fieldactivity_id: fieldId,
      },
    }).then(function (response) {
      const labs = response.data.WaterScienceLabEntries;
      console.log(labList);
      console.log(response);
      for (let i = 0; i < labs.length; i++) {
        labList.push(
          <List.Item>
            <h4>
              Water Science Lab Date:{" "}
              {/* {moment.utc(entry.wsl_dateentered).local().format("MM-DD-YYYY hh:mm A")} */}
            </h4>
            <a
              // href={`/ViewClassLab?classlab_id=${entry.labID}&well_id=${well_id}&wellcode=${wellcode}&wellName=${wellName}`}
              style={{ width: "22.5%", height: "17%" }}
              // className={buttonClass}
              // aria-disabled={entry.labID === null}
            >
              Class Lab{" "}
              {/* {entry.labID !== null ? `(Lab ID: ${entry.labID})` : "(No Lab ID)"} */}
            </a>
          </List.Item>
        );
      }
      return labList;
    })
  };

  useEffect(() => {
    Axios.get("/GetFieldEntriesByWell", {
      responseType: "json",
      params: {
        well_id: well_id,
      },
    }).then(function (response) {
      const fieldList = response.data.MinimalFieldList;
      console.log(fieldList);
      console.log(response);
      var i;
      for (i = 0; i < fieldList.length; i++) {
        const fieldEntry = fieldList[i];
        const entry = {
          fieldDate: fieldEntry.fa_datecollected,
          fieldID: fieldEntry.fieldactivity_id,
          classLabs: getClassLabs(fieldEntry.fieldactivity_id),
          waterScienceLabs: getWaterScienceLabs(fieldEntry.fieldactivity_id)
        }
        previousEntries.push(entry);
      };
      listElements = generateListElements(
        previousEntries,
        well_id,
        wellName,
        wellcode,
      );
      setLoading(false);
    });
  }, [wellName, well_id, wellcode]);

  if (isLoading) {
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
