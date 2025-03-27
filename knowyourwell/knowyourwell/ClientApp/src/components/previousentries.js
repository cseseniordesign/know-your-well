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
              <summary style={{textAlign: "left", fontSize: "1.25em", background: "#686868", padding: "2px 8px", color: "white"}}>
                {`Class Labs (${entry.classLabs.length})`}
              </summary>
              <br />
              {entry.classLabs}
            </details>
          </List.Content>
        </List.Item>
        <List.Item>
          <details style={{marginTop: "2px", alignItems: "center"}}>
            <summary style={{textAlign: "left", fontSize: "1.25em", background: "#686868", padding: "2px 8px", color: "white"}}>
              {`Water Science Labs (${entry.waterScienceLabs.length})`}
            </summary>
              <br />
              {entry.waterScienceLabs}
          </details>
        </List.Item>
        <hr />
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

  async function getClassLabs(fieldId, well_id, wellcode, wellName) {
    let labList = [];
    const response = await Axios.get("/GetClassLabEntryByFieldActivity", {
      responseType: "json",
      params: {
        fieldactivity_id: fieldId,
      },
    });
    const labs = response.data.ClassLabEntries;
    console.log(labs);
    for (let i = 0; i < labs.length; i++) {
      const lab = labs[i];
      labList.push(
        <List.Item key={`class-${lab.classlab_id}`}>
          <h4>
            Class Lab Date:{" "}
                {moment.utc(lab.cl_datecollected).local().format("MM-DD-YYYY hh:mm A")}
          </h4>
          <a
            href={`/ViewClassLab?classlab_id=${lab.classlab_id}&well_id=${well_id}&wellcode=${wellcode}&wellName=${wellName}`}
            style={{ width: "22.5%", height: "17%" }}
                className={"btn btn-primary btn-lg"}
          >
                Class Lab{" "}
          </a>
          <br /><br />
        </List.Item>
      );
    }
    console.log(labList);
    return labList;
  }

  async function getWaterScienceLabs(fieldId, well_id, wellcode, wellName) {
    let labList = [];
    const response = await Axios.get("/GetWaterScienceLabEntryByFieldActivity", {
      responseType: "json",
      params: {
        fieldactivity_id: fieldId,
      },
    });
    const labs = response.data.WaterScienceLabEntries;
    console.log(labList);
    console.log(response);
    for (let i = 0; i < labs.length; i++) {
      const lab = labs[i];
      labList.push(
        <List.Item key={`wsl-${lab.watersciencelab_id}`}>
          <h4>
            Water Science Lab Date:{" "}
            {moment.utc(lab.wsl_dateentered).format("MM-DD-YYYY hh:mm A")}
          </h4>
          <a
            href={`/Well`} // replace
            style={{ width: "22.5%", height: "17%" }}
            className={"btn btn-primary btn-lg"}
          >
              Water Science Lab{" "}
          </a>
          <br /><br />
        </List.Item>
      );
    }
    return labList;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/GetFieldEntriesByWell", {
        responseType: "json",
        params: {
          well_id: well_id,
        },
      });
      const fieldList = response.data.MinimalFieldList;
      console.log(fieldList);
      console.log(response);
      previousEntries = [];
      
      for (let i = 0; i < fieldList.length; i++) {
        const fieldEntry = fieldList[i];
        const classLabs = await getClassLabs(fieldEntry.fieldactivity_id, well_id, wellcode, wellName);
        const waterScienceLabs = await getWaterScienceLabs(fieldEntry.fieldactivity_id, well_id, wellcode, wellName);
        
        const entry = {
          fieldDate: fieldEntry.fa_datecollected,
          fieldID: fieldEntry.fieldactivity_id,
          classLabs: classLabs,
          waterScienceLabs: waterScienceLabs
        };
        previousEntries.push(entry);
      };
      listElements = generateListElements(
        previousEntries,
        well_id,
        wellName,
        wellcode,
      );
      setLoading(false);
    }
    
    fetchData();
  }, [well_id, wellName, wellcode]);

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
    <div className="container">
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
    </div>
  );
}
