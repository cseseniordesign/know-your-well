import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datetime";
import LongTextEntry from "./reusable/longtextentry";
import NumberEntry from "./reusable/numberentry";
import FormFooter from "./reusable/formfooter";

/*
The contents of this file are a protoype! They are intended to get the visuals of the image upload page working.
Major restructuring is expected as this is actually developed.
*/

const checkFieldType = {
  "Well Owner Consent Form": false,
  "Image Release Consent Form": false,
  "Well Head": true,
  "Nearest Surface Water": true,
  "Nearest Cropland": true,
  "Nearest Barnyard or Pasture": true,
  "Nearest Septic System": true,
  "Uncategorized Item": false,
};

export default function Images() {
  const [image, setImage] = useState();
  const [type, setType] = useState();
  const [date, setDate] = useState(Date.now());
  const [observations, setObservations] = useState();
  const [isField, setIsField] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [searchParams] = useSearchParams();
  const well_id = parseInt(searchParams.get("id"));
  const wellName = searchParams.get("wellName");
  const wellcode = searchParams.get("wellcode");

  useEffect(() => {
    // Note: for the sake of the prototype, I did not handle giving an alert when geolocation isn't permitted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const validForm = () => {
    var form = document.getElementById("submissionAlert");
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
      return false;
    }
  };

  //this should be async once it's not a prototype
  function submitForm() {
    if (
      validForm() &&
      type &&
      window.confirm(
        `Submitted data is final and can only be edited by Nebraska Water Center Staff.\n\nSubmit this photo as an image of ${type}?`
      )
    ) {
      //here we will eventually handle the storage stuff. for the prototype, nothing happens
      alert(
        `Photo submitted! Upload another, or press back to return to the ${wellName}.`
      );
      window.location.reload();
    }
  }

  const backButton = () => {
    if (
      //If no type has been specified, the user hasn't interacted with the page and has no data to lose.
      type
        ? window.confirm(
            "Any unsaved data will be lost.\nWould you like to continue?"
          )
        : true
    ) {
      if (well_id != null) {
        window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
      } else {
        window.location.href = `/Well`;
      }
    }
  };

  return (
    <form id="submissionAlert">
      <h2>{wellName}: Images</h2>
      <div className="requiredField">
        <br></br>
        <p>* = Required Field</p>
        <p>
          No punctuation or special characters, such as ,.[]();’/\!@#) in text
          fields.
        </p>
      </div>
      <label>Choose the type of image you want to upload:</label>
      <select
        name="Image Type"
        id="image-type"
        onChange={(e) => {
          setType(e.target.value);
          setIsField(checkFieldType[e.target.value]);
        }}
      >
        <option disabled selected>
          Select a type
        </option>
        <option id="well-owner-consent" value="Well Owner Consent Form">
          Well Owner Consent Form
        </option>
        <option id="image-release-consent" value="Image Release Consent Form">
          Image Release Consent Form
        </option>
        <option id="well-head" value="Well Head">
          Well Head
        </option>
        <option id="nearest-surface-water" value="Nearest Surface Water">
          Nearest Suface Water
        </option>
        <option id="nearest-cropland" value="Nearest Cropland">
          Nearest Cropland
        </option>
        <option
          id="nearest-barnyard-or-pasture"
          value="Nearest Barnyard or Pasture"
        >
          Nearest Barnyard or Pasture
        </option>
        <option id="nearest-septic-system" value="Nearest Septic System">
          Nearest Septic System
        </option>
        <option id="uncategorized-Item" value="Uncategorized Item">
          Uncategorized Item
        </option>
      </select>
      {type ? (
        <div>
          <br />
          <h4>
            {isField ? "Take" : "Upload"} a Photo of the {type}
            <span
              className="requiredField"
              data-testid="requiredFieldIndicator"
            >
              {" "}
              *
            </span>
          </h4>
          {isField ? (
            <input
              type="file"
              id="uploadedImage"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
              required
            />
          ) : (
            <input
              type="file"
              id="uploadedImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          )}
          {image && (
            <div>
              <h4>Preview:</h4>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                required={true}
              />
            </div>
          )}
          <LongTextEntry
            fieldTitle="Observations:"
            value={observations}
            id="observations"
            setValue={(value) => setObservations(value)}
            required={false}
          />
          <div className="css">
            {isField && (
              <div>
                <NumberEntry
                  fieldTitle="Latitude (use 4-12 decimals):"
                  value={latitude}
                  min="40"
                  max="43"
                  id="latitude"
                  label="Degrees"
                  setValue={(value) => setLatitude(value)}
                  required={true}
                />
                <NumberEntry
                  fieldTitle="Longitude (use 4-12 decimals):"
                  value={longitude}
                  min="-104"
                  max="-95.417"
                  id="longitude"
                  label="Degrees"
                  setValue={(value) => setLongitude(value)}
                  required={true}
                />
              </div>
            )}
            <label htmlFor="dateentered">
              Date Taken:
              <span
                className="requiredField"
                data-testid="requiredFieldIndicator"
              >
                {" "}
                *
              </span>
            </label>
            <div id="dateentered">
              <DatePicker
                required
                value={date}
                dateFormat="MM-DD-YYYY"
                timeFormat="hh:mm A"
                onChange={(value) => setDate(value)}
                inputProps={{
                  style: {
                    width: 300,
                    textAlign: "center",
                    border: "1px solid black",
                  },
                }}
              />{" "}
              {"  "}
            </div>
          </div>
          <br />
          {/* Save button doesn't do anything in the prototype */}
          <FormFooter submitForm={submitForm} backButton={backButton} />
        </div>
      ) : (
        <div>
          <br />
          <button
            type="button"
            style={{ width: "130px", height: "17%" }}
            className="btn btn-primary btn-lg"
            onClick={backButton}
          >
            Back
          </button>
        </div>
      )}
    </form>
  );
}
