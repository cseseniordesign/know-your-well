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
        if (isNaN(input)) {
            return false;
        }
        input = parseInt(input);
        return (isNaN(max) && isNaN(min)) ||
            ((isNaN(max) || max < 0) && input >= min) ||
            ((isNaN(min) || min > 0) && input <= max) ||
            (input > min && input < max);
    }

    const isValidEntry = (input) => {
        const isInRange = checkRange(input);
        const decimal = allowDecimal || (!allowDecimal && !input.includes('.'));
        return (isInRange || input === '-' || input === '') && decimal;
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (isValidEntry(inputValue)) {
            setValue(inputValue);
        }
    };

    const clearIfInvalid = (event) => {
        let input = parseFloat(event.target.value);
        const inRange = (isNaN(max) && input >= min) ||
            (isNaN(min) && input <= max) ||
            (isNaN(max) && isNaN(min)) ||
            (!isNaN(max) && !isNaN(min) && input >= min && input <= max);
        if (!inRange || isNaN(input)) {
            setValue('');
        } else if (input % 1 === 0) {
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
                type="text" inputmode="numeric"
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
