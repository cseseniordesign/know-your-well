import { jSXAttribute } from "@babel/types";
import EntryPrompt from "./entryprompt";

const NumberEntry = ({ id, fieldTitle, metric, min, max, label, setValue, required, allowDecimal = true }) => {
    const enforceConstraints = (min, max, entry, allowDecimal) => {
        if ((allowDecimal && entry.slice(-1) === ".")) {
            return true;
        }
        const allowEmptyAndNegative = entry === "" || (entry === "-" && min < 0);
        if (allowEmptyAndNegative) {
            return true;
        }
        const doNotAllowText = isNaN(entry.slice(-1));
        if (doNotAllowText) {
            return false;
        }
        entry = parseFloat(entry);
        const allowEntryForIrregularMinOrMax = (min > 0 && entry < min) || (max < 0 && entry > max);
        if (allowEntryForIrregularMinOrMax) {
            return true;
        }
        const enforceMinAndMax = (entry >= Number(min) && entry <= Number(max));
        return enforceMinAndMax || isNaN(min) || isNaN(max);
    };

    const clearIfInvalid = (min, max, entry) => {
        entry = parseFloat(entry);
        const tooSmall = entry < min;
        const tooBig = entry > max;
        const outsideOfRange = (tooSmall && !tooBig) || (!tooSmall && tooBig);
        if (outsideOfRange || isNaN(entry)) {
            setValue("");
        } else {
            setValue(entry);
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
                    if (enforceConstraints(min, max, event.target.value, allowDecimal)) {
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