const NumberEntry = ({ fieldTitle, metric, min, max, label, setValue }) => {
    const enforceConstraints = (min, max, entry) => {
        const allowEmptyAndNegative = entry === "" || (entry === "-" && min < 0);
        const enforceMinAndMax = (!isNaN(min) && !isNaN(max)) || (entry >= Number(min) && entry <= Number(max));
        return enforceMinAndMax && !isNaN(entry) || allowEmptyAndNegative;
    };

    const returnLabel = (min, max, label) => {
        if(min && max && label){
            return `[${min}-${max} ${label}]`;
        } else if (min && max && !label){
            return `[${min}-${max}]`;
        } else {
            return `[${label}]`
        }
    };

    return (
        <div className="css">
            <label htmlFor={fieldTitle}>
            {fieldTitle} <br /> {returnLabel(min, max, label)}
                <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
            </label>
            <input type="text" value={metric} className="textarea resize-ta" id={fieldTitle} name={fieldTitle} required
                onChange={(event) => {
                    if (enforceConstraints(min, max, event.target.value)) {
                        setValue(event.target.value);
                    }
                }}
            />
        </div>
    );
};

export default NumberEntry;