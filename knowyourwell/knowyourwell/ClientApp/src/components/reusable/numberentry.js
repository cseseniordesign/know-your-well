import EntryPrompt from "./entryprompt";

const NumberEntry = ({ id, fieldTitle, metric, min, max, label, setValue, required }) => {
    const enforceConstraints = (min, max, entry) => {
        const allowEmptyAndNegative = entry === "" || (entry === "-" && min < 0);
        entry = parseFloat(entry);
        if(allowEmptyAndNegative || (min > 0 && entry < min) || (max < 0 && entry > max)){
            return true;
        }
        const enforceMinAndMax = (!isNaN(min) && !isNaN(max)) && (entry >= Number(min) && entry <= Number(max));
        return (enforceMinAndMax && !isNaN(entry)) || isNaN(min) || isNaN(max);
    };

    const clearIfInvalid = (min, max, entry) => {
        const hasConstraints = !isNaN(min) && !isNaN(max);
        entry = parseFloat(entry);
        const tooSmall = entry < min;
        const tooBig = entry > max;
        const outsideOfRange = (tooSmall && !tooBig) || (!tooSmall && tooBig);
        if(hasConstraints && outsideOfRange && !isNaN(miN) && !isNaN(max)){
            setValue("");
        }
    }

    const returnLabel = (min, max, label) => {
        if (min && max && label) {
            return `[${min}-${max} ${label}]`;
        } else if (min && max && !label) {
            return `[${min}-${max}]`;
        } else if (label) {
            return `[${label}]`
        } 
        return;
    };

    return (
        <div className="css">
            <label htmlFor={id}>
                <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
                {returnLabel(min, max, label)}
            </label>
            <input
                type="text"
                value={metric}
                className="textarea resize-ta"
                id={id}
                name={fieldTitle}
                required={required}
                onChange={(event) => {
                    if (enforceConstraints(min, max, event.target.value)) {
                        setValue(event.target.value);
                    }
                }}
                onBlur={(event) => {
                    clearIfInvalid(min, max, event.target.value)
                }}
            />
        </div>
    );
};

export default NumberEntry;