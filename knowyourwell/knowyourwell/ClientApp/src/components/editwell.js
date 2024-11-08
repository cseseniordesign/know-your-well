import React from "react";
import { List } from "semantic-ui-react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "./usercontext";

export default function EditWell() {
  const [searchParams] = useSearchParams();
  const wellName = searchParams.get("wellName");
  const FieldRedirect = searchParams.get("FieldRedirect");
  const id = searchParams.get("id");
  const wellcode = searchParams.get("wellcode");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.displayn === "") {
      window.alert("You are not yet logged in. Please log in.");
      navigate("/");
    }
  }, [navigate, user]);

  const backToWells = () => {
    window.location.href = "/well";
  };

  if (localStorage.getItem("fieldData" + id) && !FieldRedirect) {
    const viewSavedForm = window.confirm(
      "You have a saved field form.\n Would you like to view it?",
    );
    if (viewSavedForm) {
      window.location.href = `/Field?id=${id}&wellName=${wellName}&wellcode=${wellcode}&sessionContinued=True`;
    }
  }

  return (
    <List style={{ textAlign: "center" }}>
      <h2>
        {wellcode}: {wellName}
      </h2>
      <List.Item>
        <List.Content>
          <a
            href={`/ViewWell?id=${id}&wellName=${wellName}&wellcode=${wellcode}`}
            /* change to "/ViewWell" */ style={{ width: "45%", height: "17%" }}
            className="btn btn-primary btn-lg btn-block"
          >
            Well Info
          </a>
        </List.Content>
        <br />
      </List.Item>
      <List.Item>
        <List.Content>
          <a
            href={`/Field?id=${id}&wellName=${wellName}&wellcode=${wellcode}`}
            style={{ width: "45%", height: "17%" }}
            className="btn btn-primary btn-lg btn-block"
          >
            Field
          </a>
        </List.Content>
        <br />
      </List.Item>
      <List.Item>
        <List.Content>
          <a
            href={`/fieldselection?id=${id}&wellName=${wellName}&wellcode=${wellcode}`}
            style={{ width: "45%", height: "17%" }}
            className="btn btn-primary btn-lg btn-block"
          >
            Class Lab
          </a>
        </List.Content>
        <br />
      </List.Item>
      <List.Item>
        <List.Content>
          <a
            href={`/PreviousEntries?id=${id}&wellName=${wellName}&wellcode=${wellcode}`}
            style={{ width: "45%", height: "17%" }}
            className="btn btn-primary btn-lg btn-block"
          >
            Previous Entries
          </a>
        </List.Content>
        <br />
      </List.Item>
      <List.Item>
        <List.Content>
          <a
            href={`/images?id=${id}&wellName=${wellName}&wellcode=${wellcode}`}
            style={{ width: "45%", height: "17%" }}
            className="btn btn-primary btn-lg btn-block"
          >
            Upload Images
          </a>
        </List.Content>
        <br />
      </List.Item>
      <List.Item>
        <List.Content>
          <a
            href={`/previousimages?id=${id}&wellName=${wellName}&wellcode=${wellcode}`}
            style={{ width: "45%", height: "17%" }}
            className="btn btn-primary btn-lg btn-block"
          >
            Previous Images
          </a>
        </List.Content>
        <br />
      </List.Item>
      {/*}
            <List.Item>
                <List.Content >
                    <a href={`/FormSubmission?id=${id}&wellName=${wellName}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">Form Submission</a>
                </List.Content>
                <br />
            </List.Item>
            {*/}
      <button
        type="button"
        style={{ width: "180px", height: "17%" }}
        className="btn btn-primary btn-lg"
        onClick={backToWells}
      >
        Back
      </button>
    </List>
  );
}
