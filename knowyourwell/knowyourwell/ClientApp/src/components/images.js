import { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datetime";
import LongTextEntry from "./reusable/longtextentry";
import NumberEntry from "./reusable/numberentry";
import FormFooter from "./reusable/formfooter";
import uploadPhoto from "./reusable/photoUpload";

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
  const [images, setImages] = useState([]);
  const [type, setType] = useState();
  const [date, setDate] = useState(moment(Date.now()));
  const [observations, setObservations] = useState();
  const [isField, setIsField] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [searchParams] = useSearchParams();
  const well_id = parseInt(searchParams.get("id"));
  const wellName = searchParams.get("wellName");
  const wellcode = searchParams.get("wellcode");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords.latitude && position.coords.longitude) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }
      }, (error) => {
        console.log(error);
        alert(
          "Geolocation is not working right now. If uploading a photo that requires coordinates, please fill them in manually."
        );
      })
    }
  }, []);

  const handleFileChange = (event) => {
    setImages(Array.from(event.target.files));
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

  async function submitForm() {
    if (
      validForm() &&
      type &&
      window.confirm(
        `Submitted data is final and can only be edited by Nebraska Water Center Staff.\n\nSubmit this photo as an image of ${type}?`
      )
    ) {
      try {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const containerName = `well-images-${well_id}`;
          const dateObj = new Date(date);

          const year = dateObj.getFullYear().toString();
          const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
          const day = dateObj.getDate().toString().padStart(2, '0');
          const hour = dateObj.getHours().toString().padStart(2, '0');
          const minute = dateObj.getMinutes().toString().padStart(2, '0');
          const second = dateObj.getSeconds().toString().padStart(2, '0');

          function sanitizeFilename(name) {
            return name.replace(/[\\/#?%*:|"<> ]/g, '-');
          }
          const sanitizedType = sanitizeFilename(type.toLowerCase());
          const fileExtension = image.name.split('.').pop();
          const blobName = `${sanitizedType}-${year}-${month}-${day}-${hour}-${minute}-${second}.${fileExtension}`;

          const metadata = {
            observations: observations || '',
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            dateTaken: dateObj.toISOString(),
            photoType: type,
          };
  
          await Axios.get(`/heartbeat?timestamp=${Date.now()}`)
            .then(async () => {
              await uploadPhoto(
                image,
                containerName,
                blobName,
                metadata,
                {
                  observations: observations || '',
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                  dateTaken: new Date(date).toISOString(),
                  photoType: type,
                }
              );
              await Axios.post("/createimage", {
                well_id: well_id,
                im_type: type,
                im_latitude: latitude,
                im_longitude: longitude,
                im_genlatitude: latitude,
                im_genlongitude: longitude,
                name: 'test',
                observations: observations,
                im_filename: blobName,
                datecollected: date,
              });
              alert(`Photos submitted! Upload more, or press back to return to ${wellName}.`);
            })
        }
        window.location.reload();
      } catch (err) {
        alert(`Error uploading photos: ${err.message}`);
      }
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
      <h2>{wellName}: Upload Images</h2>
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
        defaultValue={"No Selection"}
      >
        <option disabled value="No Selection">
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
          <input
            type="file"
            id="cropLand"
            accept="image/*"
            multiple
            capture={isField ? 'camera' : undefined}
            onChange={handleFileChange}
            required
          />

          {images.length > 0 && (
            <div>
            <h4>Preview:</h4>
            <div style={{ textAlign: 'center' }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
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
          <FormFooter submitForm={submitForm} backButton={backButton} saveEnabled={false} />
        </div>
      ) : (
        <div>
          <br />
          <FormFooter backButton={backButton} saveEnabled={false} submitEnabled={false} />
        </div>
      )}
    </form>
  );
}
