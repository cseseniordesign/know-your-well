import React from "react";
import { List } from "semantic-ui-react";
import { useSearchParams } from "react-router-dom";

export default function FormSubmission() {
  const [searchParams, setSearchParams] = useSearchParams();
  const wellName = searchParams.get("wellName");
  const well_id = searchParams.get("id");

  const backButton = () => {
    window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}`;
  };

  return (
    <List style={{ textAlign: "center" }}>
      <h2>
        {" "}
        <strong> Form Submission </strong>
      </h2>
      <button type="button" onClick={backButton}>
        Back
      </button>
    </List>
  );
}
