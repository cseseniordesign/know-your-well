import React from "react";
import { List } from "semantic-ui-react";
import Axios from "axios";
import csvKey from "./resources/csvkey";

const exportCSV = () => {
  Axios.get("/csvqueries", {
    responseType: "json",
  })
    .then(function (response) {
      let csv = [""];
      let headerRow = 1;
      for (let i = 0; i < response.data.Data.length; i++) {
        csv[i + 1] = "";
        for (const [key, value] of Object.entries(response.data.Data[i])) {
          if (headerRow) {
            csv[0] += csvKey[key] + ",";
          }
          csv[i + 1] += value + ",";
        }
        csv[i + 1] += "\n";
        headerRow = 0;
      }
      csv[0] += "\n";
      const file = new File(csv, "welldata.csv", {
        type: "text/csv",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(file);

      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(function (error) {
      // Handle error
      console.error("Error fetching data:", error);
    });
};

const exportImageMetadata = () => {
  Axios.get('/allImageMetadata', {
    responseType: "json",
  }).then((response) => {
    console.log(response);
    let csv = [""];
    let headerRow = 1;
    for (let i = 0; i < response.data.length; i++) {
      csv[i + 1] = "";
      for (const [key, value] of Object.entries(response.data[i])) {
        if (headerRow) {
          csv[0] += csvKey[key] + ",";
        }
        csv[i + 1] += value + ",";
      }
      csv[i + 1] += "\n";
      headerRow = 0;
    }
    csv[0] += "\n";
    const file = new File(csv, "imagedata.csv", {
      type: "text/csv",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  }).catch((error) => {
    console.log(error);
  });
};

export default function ExportPage() {
  return (
    <form
      style={{
        display: "block",
        textAlign: "center",
        margin: "20px",
        fontSize: 16,
      }}
    >
      <List style={{ textAlign: "center" }}>
        <h2>
          Export Data
        </h2>
        <br />
        <List.Item>
          <List.Content>
            <button
              type="button"
              onClick={exportCSV}
              style={{ width: "45%", height: "17%" }}
              className="btn btn-primary btn-lg btn-block"
            >
              Export Well, Field, Class Lab, and Water Science Lab Data
            </button>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Content>
            <button
              type="button"
              onClick={exportImageMetadata}
              style={{ width: "45%", height: "17%" }}
              className="btn btn-primary btn-lg btn-block"
            >
              Export Well and Image Data
            </button>
          </List.Content>
        </List.Item>
        <br />
      </List>
    </form>
  );
}