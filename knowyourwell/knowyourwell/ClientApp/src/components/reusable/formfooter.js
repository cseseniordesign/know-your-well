const FormFooter = ({ submitForm, backButton, cacheForm, submitEnabled = true, backEnabled = true, saveEnabled = true }) => {
  return (
    <div>
      {backEnabled &&
        <button
          type="button"
          style={{ width: "130px", height: "17%", margin: "8px" }}
          className="btn btn-primary btn-lg"
          onClick={backButton}
        >
          Back
        </button>
      }
      {saveEnabled &&
        <button
          type="button"
          style={{ width: "130px", height: "17%", margin: "8px" }}
          className="btn btn-primary btn-lg"
          onClick={cacheForm}
        >
          Save
        </button>
      }
      {submitEnabled &&
        <button
          type="button"
          style={{ width: "130px", height: "17%", margin: "8px" }}
          className="btn btn-primary btn-lg"
          onClick={submitForm}
        >
          Submit
        </button>
      }
      <div className="requiredField">
        <br></br>* = Required Field
      </div>
    </div>
  );
};
export default FormFooter;