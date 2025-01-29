const FormFooter = ({ submitForm, backButton, cacheForm, submitEnabled = true, backEnabled = true, saveEnabled = true }) => {
  return (
    <div>
      {submitEnabled && 
        <button
          type="button"
          style={{ width: "130px", height: "17%" }}
          className="btn btn-primary btn-lg"
          onClick={submitForm}
        >
          Submit
        </button>
      }
      {backEnabled &&
        <button
          type="button"
          style={{ width: "130px", height: "17%" }}
          className="btn btn-primary btn-lg"
          onClick={backButton}
        >
          Back
      </button>
      }
      {saveEnabled &&
        <button
          type="button"
          style={{ width: "130px", height: "17%" }}
          className="btn btn-primary btn-lg"
          onClick={cacheForm}
        >
          Save
        </button>
      }<div className="requiredField">
        <br></br>* = Required Field
      </div>
    </div>
  );
};
export default FormFooter;