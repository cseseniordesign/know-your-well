import "./css/forms.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import DatePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useSearchParams } from "react-router-dom";
import NumberEntry from "./reusable/numberentry";
import { useContext } from "react";
import FormFooter from "./reusable/formfooter";
import devFieldData from "./resources/devfielddata";
import prodFieldData from "./resources/prodfielddata";
import fieldPrompts from "./resources/fieldprompts";
import renderField from "./reusable/renderfield";
import WellFieldLabContext from "./reusable/WellFieldLabContext";
import uploadPhoto from "./reusable/photoUpload";
import LongTextEntry from "./reusable/longtextentry";

export default function Field() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const { fieldQueue, setLocalFieldQueue } = useContext(WellFieldLabContext);
  const well_id = parseInt(searchParams.get("id"));
  const [photosFeatureFlag, setPhotosFeatureFlag] = useState(false);
  const wellcode = searchParams.get("wellcode");

  let initialFieldData;

  if (
    window.location.href.indexOf("kywtest") > -1 ||
    process.env.NODE_ENV != "production"
  ) {
    initialFieldData = devFieldData;
  } else {
    initialFieldData = prodFieldData;
  }

  // Checking for saved sessions
  const [sessionContinued, setSessionContinued] = useState(
    searchParams.get("sessionContinued"),
  );
  if (localStorage.getItem("fieldData" + well_id)) {
    if (sessionContinued === null) {
      const continue_session = window.confirm("Continue last saved session?");
      if (continue_session) {
        setSessionContinued(true);
      } else {
        handleClearLocalStorage();
        setSessionContinued(false); // ends forever pop-up loop
        /* will need to be changed if sessionContinued is ever used elsewhere,
                potenitally add another var to set to true / false if question has already been asked? */
      }
    }
  }
  let pullCachedData = sessionContinued;

  const cachedData = pullCachedData
    ? JSON.parse(localStorage.getItem("fieldData" + well_id))
    : null;
  if (sessionContinued && cachedData && cachedData.dateentered) {
    cachedData.dateentered = moment(cachedData.dateentered).format(
      "MM-DD-YYYY hh:mm A",
    );
  }
  const wellName = searchParams.get("wellName");
  const [fieldData, setFieldData] = useState(
    sessionContinued ? cachedData : initialFieldData,
  );
  const fa_genlatitude = Math.round(fieldData.fa_latitude * 100) / 100; // rounds to third decimal place
  const fa_genlongitude = Math.round(fieldData.fa_longitude * 100) / 100; // rounds to third decimal place

  const [cropLatitude, setCropLatitude] = useState("");
  const [cropLongitude, setCropLongitude] = useState("");
  const [cropComments, setCropComments] = useState("");
  const [pastureLatitude, setPastureLatitude] = useState("");
  const [pastureLongitude, setPastureLongitude] = useState("");
  const [pastureComments, setPastureComments] = useState("");
  const [septicLatitude, setSepticLatitude] = useState("");
  const [septicLongitude, setSepticLongitude] = useState("");
  const [septicComments, setSepticComments] = useState("");
  const [surfaceWaterLatitude, setSurfaceWaterLatitude] = useState("");
  const [surfaceWaterLongitude, setSurfaceWaterLongitude] = useState("");
  const [surfaceWaterComments, setSurfaceWaterComments] = useState("");

  // Updating if user decides to load session
  useEffect(() => {
    setFieldData(sessionContinued ? cachedData : initialFieldData);
  }, [sessionContinued]);

  function updateFieldData(fieldName, value) {
    setFieldData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  }
  useEffect(() => {
    const savedFieldData = localStorage.getItem("fieldData");
    if (savedFieldData) {
      const confirmContinue = window.confirm("Continue with saved data?");
      if (confirmContinue) {
        fieldData(JSON.parse(savedFieldData));
      } else {
        localStorage.removeItem("fieldData");
      }
    }
  }, []);

  function cacheWellInfo() {
    localStorage.setItem("fieldData", JSON.stringify(fieldData));
    alert("Field Data has been saved!");
  }

  function clearLocalStorage() {
    localStorage.removeItem("fieldData");
  }

  const handleChange = (fieldName, value) => {
    if (fieldName === "wellcover" && value === "Intact") {
      updateFieldData("wellcoverdescription", "");
    }
    updateFieldData(fieldName, value);
  };

  // geolocation
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!sessionContinued) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation(position.coords);
          updateFieldData("fa_latitude", position.coords.latitude);
          updateFieldData("fa_longitude", position.coords.longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
        alert(
          "Geolocation is not working right now, please fill it in manually.",
        );
      }
    }
  }, []);

  function submitCropFeature() {
    // if(navigator.online){
    if (true) {
      Axios.post("/feature/crop", {
        well_id: well_id,
        cropLatitude: cropLatitude,
        cropGenLatitude: Math.round(cropLatitude * 100) / 100,
        cropLongitude: cropLongitude,
        cropGenLongitude: Math.round(cropLongitude * 100) / 100,
        cropComments: cropComments,
        datecollected: fieldData.dateentered,
        observer: fieldData.name,
      }).then(() => {
        console.log("success");
      });
    } else {
      console.log("Offline, cannot submit land features.");
    }
  }

  function submitPastureFeature() {
    // if(navigator.online){
    if (true) {
      Axios.post("/feature/pasture", {
        well_id: well_id,
        pastureLatitude: pastureLatitude,
        pastureGenLatitude: Math.round(pastureLatitude * 100) / 100,
        pastureLongitude: pastureLongitude,
        pastureGenLongitude: Math.round(pastureLongitude * 100) / 100,
        pastureComments: pastureComments,
        datecollected: fieldData.dateentered,
        observer: fieldData.name,
      }).then(() => {
        console.log("success");
      });
    } else {
      console.log("Offline, cannot submit land features.");
    }
  }

  function submitSepticFeature() {
    // if(navigator.online){
    if (true) {
      Axios.post("/feature/septic", {
        well_id: well_id,
        septicLatitude: septicLatitude,
        septicGenLatitude: Math.round(septicLatitude * 100) / 100,
        septicLongitude: septicLongitude,
        septicGenLongitude: Math.round(septicLongitude * 100) / 100,
        septicComments: septicComments,
        datecollected: fieldData.dateentered,
        observer: fieldData.name,
      }).then(() => {
        console.log("success");
      });
    } else {
      console.log("Offline, cannot submit land features.");
    }
  }

  function submitSurfaceWaterFeature() {
    // if(navigator.online){
    if (true) {
      Axios.post("/feature/surfaceWater", {
        well_id: well_id,
        surfaceWaterLatitude: surfaceWaterLatitude,
        surfaceWaterGenLatitude: Math.round(surfaceWaterLatitude * 100) / 100,
        surfaceWaterLongitude: surfaceWaterLongitude,
        surfaceWaterGenLongitude: Math.round(surfaceWaterLongitude * 100) / 100,
        surfaceWaterComments: surfaceWaterComments,
        datecollected: fieldData.dateentered,
        observer: fieldData.name,
      }).then(() => {
        console.log("success");
      });
    } else {
      console.log("Offline, cannot submit land features.");
    }
  }

  function addFieldData() {
    fieldData.well_id = well_id;
    const updatedQueue = [
      ...fieldQueue,
      {
        ...fieldData,
        well_id: fieldData.well_id,
        fa_genlatitude: fa_genlatitude,
        fa_genlongitude: fa_genlongitude,
      },
    ];
    if (navigator.onLine) {
      Axios.post("/api/insert", {
        well_id: fieldData.well_id,
        fa_latitude: fieldData.fa_latitude,
        fa_longitude: fieldData.fa_longitude,
        fa_genlatitude: fa_genlatitude,
        fa_genlongitude: fa_genlongitude,
        weather: fieldData.conditions,
        wellcovercondition: fieldData.wellcover,
        wellcoverdescription: fieldData.wellcoverdescription,
        topography: fieldData.topography,
        surfacerunoff: fieldData.evidence,
        pooling: fieldData.pooling,
        groundwatertemp: fieldData.temp,
        ph: fieldData.ph,
        conductivity: fieldData.conductivity,
        name: fieldData.name,
        observations: fieldData.observations,
        datecollected: fieldData.dateentered,
      }).then(() => {
        console.log("success");
      });
    } else {
      setLocalFieldQueue(updatedQueue);

      alert(
        "You are offline, Field Form will submit automatically when you regain an internet connection",
      );
    }
  }

  const idList = [
    "fa_latitude",
    "fa_longitude",
    "conditions",
    "wellcover",
    "temp",
    "ph",
    "conductivity",
    "name",
    "observations",
  ];
  // caching - local storage
  function cacheFieldForm() {
    let elementsValid = true;
    // Checking if entered elements are valid.
    for (let i = 0; i < idList.length && elementsValid; i++) {
      const id = idList[i];
      const element = document.getElementById(id);
      elementsValid = element.value === "" || element.checkValidity();
      if (!elementsValid) {
        element.reportValidity();
      }
    }

    if (
      elementsValid &&
      window.confirm(
        "Any previously saved data will be overwritten.\nWould you like to continue?",
      )
    ) {
      localStorage.setItem("fieldData" + well_id, JSON.stringify(fieldData));
      alert("Information Saved!");
      window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&FieldRedirect=True&wellcode=${wellcode}`;
    }
  }

  function handleClearLocalStorage() {
    localStorage.removeItem("fieldData" + well_id);
  }

  const validForm = () => {
    var form = document.getElementById("submissionAlert");
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
      return false;
    }
  };
  const backButton = () => {
    if (
      window.confirm(
        "Any unsaved data will be lost.\nWould you like to continue?",
      )
    ) {
      if (well_id != null) {
        window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
      } else {
        window.location.href = `/Well`;
      }
    }
  };

  function getExtension(file) {
    const fileName = file.name;
    const fileExtension = "." + fileName.split(".").pop();
    return fileExtension;
  }

  // async function uploadPhotos() {
  //     // Axios.get("/GetWellInfo", {
  //     //     responseType: "json",
  //     //     params: {
  //     //         well_id: well_id
  //     //     },
  //     //     headers: {
  //     //         'Accept-Encoding': 'application/json'
  //     //     }
  //     // })
  //     // .then(function (response) {
  //     //     setWellCode(response.data.WellInfo[0].wellcode);
  //     //     console.log("===========================================================\n")
  //     //     console.log(response.data)
  //     //     console.log("\n===========================================================\n")
  //     //     // alert("HERE : : " + response.data.WellInfo[0].well_code)

  //     // });

  //     let uploads = "";
  //     if (document.getElementById("wellHead").files.length !== 0) {
  //         let file = document.getElementById("wellHead").files[0]
  //         await uploadPhoto(file, well_id, "Well " + well_id + " - Well Head" + getExtension(file));
  //         uploads += "Well Head, ";
  //     }
  //     if (document.getElementById("cropLand").files.length !== 0) {
  //         let file = document.getElementById("cropLand").files[0];
  //         await uploadPhoto(file, well_id, "Well " + well_id + " - Crop Land" + getExtension(file));
  //         uploads += "Crop Land, ";
  //     }
  //     if (document.getElementById("barnyardPasture").files.length !== 0) {
  //         let file = document.getElementById("barnyardPasture").files[0]
  //         await uploadPhoto(file, well_id, "Well " + well_id + " - Barnyard Pasture" + getExtension(file));
  //         uploads += "Barnyard Pasture, ";
  //     }
  //     if (document.getElementById("septicTank").files.length !== 0) {
  //         let file = document.getElementById("septicTank").files[0];
  //         await uploadPhoto(file, well_id, "Well " + well_id + " - Septic Tank" + getExtension(file))
  //         uploads += "Septic Tank, ";
  //     }
  //     alert("Successfully uploaded images for: " + uploads.slice(0, -1) + " to wellid-" + well_id)
  // }

  async function submitForm() {
    if (
      validForm() &&
      window.confirm(
        "Submitted data is final and can only be edited by Nebraska Water Center Staff.\nWould you like to continue?",
      )
    ) {
      // await uploadPhotos();
      addFieldData();
      // submitCropFeature();
      // submitPastureFeature();
      // submitSepticFeature();
      // submitSurfaceWaterFeature();
      clearLocalStorage();
      handleClearLocalStorage();
      window.location.href = `/EditWell?id=${well_id}&wellName=${wellName}&wellcode=${wellcode}`;
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form id="submissionAlert">
      <h2>{wellName}: Field</h2>
      <div className="requiredField">
        <br></br>
        <p>* = Required Field</p>
        <p>
          No punctuation or special characters, such as ,.[]();’/\!@#) in text
          fields.
        </p>
      </div>
      <div>
        {location || sessionContinued || !navigator.onLine ? (
          <div>
            <NumberEntry
              fieldTitle="Latitude (use 4-12 decimals):"
              value={fieldData.fa_latitude}
              min="40"
              max="43"
              id="fa_latitude"
              label="Degrees"
              setValue={(value) => updateFieldData("fa_latitude", value)}
              required={true}
            />
            <NumberEntry
              fieldTitle="Longitude (use 4-12 decimals):"
              value={fieldData.fa_longitude}
              min="-104"
              max="-95.417"
              id="fa_longitude"
              label="Degrees"
              setValue={(value) => updateFieldData("fa_longitude", value)}
              required={true}
            />
          </div>
        ) : (
          <div>
            <p>Please allow this site to access your location</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        )}
      </div>
      {fieldPrompts.map((prompt) => (
        <div key={prompt.id}>
          {renderField(prompt, fieldData, handleChange)}
        </div>
      ))}
      {!photosFeatureFlag ? (
        <div>Photo upload coming soon</div>
      ) : (
        <>
          <div>
            <h4>Upload a Photo of the Well Head</h4>
            <input
              type="file"
              id="wellHead"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
            />

            {selectedFile && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>
          <hr className="section-divider" />
          <div>
            <h4>Upload a Photo of the Nearest Crop Land</h4>
            <input
              type="file"
              id="cropLand"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
            />

            {selectedFile && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>

          <div>
            <NumberEntry
              fieldTitle="Latitude of nearest crop land(use 4-12 decimals):"
              value={cropLatitude}
              min="40"
              max="43"
              id="crop_latitude"
              label="Degrees"
              setValue={(value) => setCropLatitude(value)}
              required={false}
            />
            <NumberEntry
              fieldTitle="Longitude of nearest crop land(use 4-12 decimals):"
              value={cropLongitude}
              min="-104"
              max="-95.417"
              id="crop_longitude"
              label="Degrees"
              setValue={(value) => setCropLongitude(value)}
              required={false}
            />
            <LongTextEntry
              fieldTitle="Crop Land Comments"
              value={cropComments}
              id="croplandcomments"
              setValue={(value) => setCropComments(value)}
              required={false}
            />
          </div>
          <hr className="section-divider" />

          <div>
            <h4>Upload a Photo of the Nearest Barn Yard/Pasture</h4>
            <input
              type="file"
              id="barnyardPasture"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
            />

            {selectedFile && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>

          <div>
            <NumberEntry
              fieldTitle="Latitude of Nearest Barn Yard/Pasture (use 4-12 decimals):"
              value={pastureLatitude}
              min="40"
              max="43"
              id="fa_latitude"
              label="Degrees"
              setValue={(value) => setPastureLatitude(value)}
              required={false}
            />
            <NumberEntry
              fieldTitle="Longitude of Nearest Barn Yard/Pasture (use 4-12 decimals):"
              value={pastureLongitude}
              min="-104"
              max="-95.417"
              id="fa_longitude"
              label="Degrees"
              setValue={(value) => setPastureLongitude(value)}
              required={false}
            />
            <LongTextEntry
              fieldTitle="Barn Yard/Pasture Comments"
              value={pastureComments}
              id="pasturecomments"
              setValue={(value) => setPastureComments(value)}
              required={false}
            />
          </div>
          <hr className="section-divider" />

          <div>
            <h4>Upload a Photo of the of Nearest Septic Tank</h4>
            <input
              type="file"
              id="septicTank"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
            />

            {selectedFile && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>

          <div>
            <NumberEntry
              fieldTitle="Latitude of Nearest Septic Tank (use 4-12 decimals):"
              value={septicLatitude}
              min="40"
              max="43"
              id="fa_latitude"
              label="Degrees"
              setValue={(value) => setSepticLatitude(value)}
              required={false}
            />
            <NumberEntry
              fieldTitle="Longitude of Nearest Septic Tank (use 4-12 decimals):"
              value={septicLongitude}
              min="-104"
              max="-95.417"
              id="fa_longitude"
              label="Degrees"
              setValue={(value) => setSepticLongitude(value)}
              required={false}
            />
            <LongTextEntry
              fieldTitle="Septic Tank Comments"
              value={septicComments}
              id="septictankcomments"
              setValue={(value) => setSepticComments(value)}
              required={false}
            />
          </div>
          <hr className="section-divider" />
          <div>
            <h4>Upload a Photo of the of Nearest Surface Water</h4>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
            />

            {selectedFile && (
              <div>
                <h4>Preview:</h4>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>

          <div>
            <NumberEntry
              fieldTitle="Latitude of Nearest Surface Water (use 4-12 decimals):"
              value={surfaceWaterLatitude}
              min="40"
              max="43"
              id="fa_latitude"
              label="Degrees"
              setValue={(value) => setSurfaceWaterLatitude(value)}
              required={false}
            />
            <NumberEntry
              fieldTitle="Longitude of Nearest Surface Water (use 4-12 decimals):"
              value={surfaceWaterLongitude}
              min="-104"
              max="-95.417"
              id="fa_longitude"
              label="Degrees"
              setValue={(value) => setSurfaceWaterLongitude(value)}
              required={false}
            />
            <LongTextEntry
              fieldTitle="Surface Water Comments"
              value={surfaceWaterComments}
              id="septictankcomments"
              setValue={(value) => setSurfaceWaterComments(value)}
              required={false}
            />
          </div>
        </>
      )}
      <hr className="section-divider" />
      <div className="css">
        <label htmlFor="dateentered">
          Date Entered:
          <span className="requiredField" data-testid="requiredFieldIndicator">
            {" "}
            *
          </span>
        </label>
        <div id="dateentered">
          <DatePicker
            required
            value={fieldData.dateentered}
            dateFormat="MM-DD-YYYY"
            timeFormat="hh:mm A"
            onChange={(value) => updateFieldData("dateentered", value)}
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
      <FormFooter
        submitForm={submitForm}
        onClick={cacheWellInfo}
        backButton={backButton}
        cacheForm={cacheFieldForm}
      />
      <br />
    </form>
  );
}
