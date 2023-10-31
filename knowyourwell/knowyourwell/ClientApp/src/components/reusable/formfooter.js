const FormFooter = ({ submitForm, backButton, cacheForm }) => {
    return (
        <div>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={submitForm}>Submit</button>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={backButton}>Back</button>
            <button type="button" style={{ width: "130px", height: "17%" }} className="btn btn-primary btn-lg" onClick={cacheForm}>Save</button>
            <div className="requiredField">
                <br></br>
                * = Required Field
            </div>
        </div>
    );
};
export default FormFooter;