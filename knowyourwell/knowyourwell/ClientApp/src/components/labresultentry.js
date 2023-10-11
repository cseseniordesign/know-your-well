const LabResultEntry = ({ fieldTitle, mineral, min, max, label, setValue }) => {
    const enforceMinAndMax = (min, max, entry) => {
        return entry >= min && entry <= max;
    };

    return (
        <div className="css">
            <label htmlFor={mineral}>
                {fieldTitle} <br /> [{min}, {max} {label}]
                <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
            </label>
            <input type="text" value={mineral} className="textarea resize-ta" id={mineral} name={mineral} required
                onChange={(event) => {
                    if (enforceMinAndMax(min, max, event.target.value)) {
                        setValue(event.target.value);
                    }
                }}
            />
        </div>
    );
};

export default LabResultEntry;