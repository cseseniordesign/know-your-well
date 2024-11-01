import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datetime";
import LongTextEntry from "./reusable/longtextentry";
import FormFooter from "./reusable/formfooter";

/*
The contents of this file are a protoype! They are intended to get the visuals of the image upload page working.
Major restructuring is expected as this is actually developed.
*/

export default function Images() {
    const [image, setImage] = useState();
    const [type, setType] = useState();
    const [date, setDate] = useState(Date.now());
    const [comments, setComments] = useState();
    const [searchParams] = useSearchParams();
    const well_id = parseInt(searchParams.get("id"));
    const wellName = searchParams.get("wellName");
    const wellcode = searchParams.get("wellcode");

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
      };


    //this should be async once it's not a prototype
    function submitForm() {
    if (
        // validForm() &&
        type && window.confirm(
        `Submitted data is final and can only be edited by Nebraska Water Center Staff.\n\nSubmit this photo as an image of ${type}?`,
        )
    ) {
       //here we will eventually handle the storage stuff
       alert(`Photo submitted! Upload another, or press back to return to the ${wellName}.`);
       window.location.reload();
    }
    }

    const backButton = () => {
        if (
          //If no type has been specified, the user hasn't interacted with the page and has no data to lose.
          type ? window.confirm(
            "Any unsaved data will be lost.\nWould you like to continue?",
          ) : true
        ) {
          if (well_id != null) {
            window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
          } else {
            window.location.href = `/Well`;
          }
        }
      };

    return (
        <form>
        <label>Choose the type of image you want to upload:</label>
        <select name="Image Type" id="image-type" onChange={e => setType(e.target.value)}>
            <option disabled selected>Select a type</option>
            <option id="well-owner-consent" value="Well Owner Consent Form">Well Owner Consent Form</option>
            <option id="image-release-consent" value="Image Release Consent Form">Image Release Consent Form</option>
            <option id="well-head" value="Well Head">Well Head</option>
            <option id="nearest-surface-water" value="Nearest Surface Water">Nearest Suface Water</option>
            <option id="nearest-cropland" value="Nearest Cropland">Nearest Cropland</option>
            <option id="nearest-barnyard-or-pasture" value="Nearest Barnyard or Pasture">Nearest Barnyard or Pasture</option>
            <option id="nearest-septic-system" value="Nearest Septic System">Nearest Septic System</option>
            <option id="uncategorized-Item" value="Uncategorized Item">Uncategorized Item</option>
        </select>
        {type ? (
            <>
        <h4>Upload a Photo of the {type}<span className="requiredField" data-testid="requiredFieldIndicator">
            {" "}
            *
          </span></h4>
            <input
              type="file"
              id="cropLand"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
            />

            {image && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                  required={true}
                />
              </div>)}
              <LongTextEntry
              fieldTitle="Comments on this Image:"
              value={comments}
              id="comments"
              setValue={(value) => setComments(value)}
              required={false}
            />
            <div className="css">
        <label htmlFor="dateentered">
          Date Entered or Taken:
          <span className="requiredField" data-testid="requiredFieldIndicator">
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
        <FormFooter
        submitForm={submitForm}
        backButton={backButton}
      />
              </>
        ) : 
        (<button
          type="button"
          style={{ width: "130px", height: "17%" }}
          className="btn btn-primary btn-lg"
          onClick={backButton}
        >
          Back
        </button>)}
        </form>
    );
}

