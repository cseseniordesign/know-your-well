import React from "react";
import EntryPrompt from "./entryprompt";

const NumberEntry = ({
    id, fieldTitle, value, min, max, label,
    setValue, required, allowDecimal = true
}) => {

    const returnLabel = (min, max, label) => {
        const range = min && max ? `${min}-${max}` : '';
        const labelPart = label ? ` ${label}` : '';
        return range ? `[${range}${labelPart}]` : '';
    };

    const checkRange = (input) => {
        input = parseInt(input);
        if (isNaN(max) && isNaN(min)){
            return true;
        } else if (isNaN(max) || max < 0){
            return input >= min;
        } else if (isNaN(min) || min > 0){
            return input <= max;
        }
        return input > min && input < max;
    }

    const isValidEntry = (input) => {
        const isInRange = checkRange(input);
        return isInRange || input === '-' || input === '';
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (isValidEntry(inputValue)){
            setValue(inputValue);
        }
    };

    const clearIfInvalid = (event) => {
        let input = event.target.value;
        let inRange;
        if (isNaN(max) && isNaN(min)){
            inRange = true;
        } else if (isNaN(max)){
            inRange = input >= min;
        } else if (isNaN(min)){
            inRange = input <= max;
        } else {
            inRange = input >= min && input <= max;
        }
        if (!inRange || isNaN(input)) {
            setValue('');
        } else if (allowDecimal){
            setValue(parseFloat(input));
        } else {
            setValue(parseInt(input));
        }
    }

    return (
        <div className="css">
            <label htmlFor={id}>
                <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
                {returnLabel(min, max, label)}
            </label>
            <input
                type="number"
                value={value}
                className="textarea resize-ta"
                id={id}
                name={fieldTitle}
                required={required}
                onChange={handleInputChange}
                onBlur={clearIfInvalid}
            />
        </div>
    );
};

export default NumberEntry;
