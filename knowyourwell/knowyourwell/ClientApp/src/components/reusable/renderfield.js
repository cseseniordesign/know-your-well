import LongTextEntry from "./longtextentry";
import ShortTextEntry from "./shorttextentry";
import NumberEntry from "./numberentry";
import DropDownEntry from "./dropdownentry";

const renderField = (prompt, data, handleChange, isValid = true) => {
    switch (prompt.type) {
        case "longtextentry":
            if (prompt.conditions?.includes(data[prompt.dependsOn]) || prompt.dependsOn === undefined) {
                return (
                    <LongTextEntry
                        fieldTitle={prompt.fieldTitle}
                        value={data[prompt.value]}
                        id={prompt.id}
                        setValue={(event) => handleChange(prompt.value, event)}
                        required={prompt.required}
                    />
                );
            } else {
                return (<></>)
            }
        case "shorttextentry":
            return (
                <ShortTextEntry
                    fieldTitle={prompt.fieldTitle}
                    value={data[prompt.value]}
                    id={prompt.id}
                    setValue={(event) => handleChange(prompt.value, event)}
                    required={prompt.required}
                    errorMessage={prompt.errorMessage}
                    pattern={prompt.pattern}
                    title={prompt.title}
                    isValid={isValid}
                />
            );
        case "numberentry":
             return (
                <NumberEntry
                    fieldTitle={prompt.fieldTitle}
                    value={data[prompt.value]}
                    min={prompt.min}
                    max={prompt.max}
                    id={prompt.id}
                    label={prompt.label}
                    setValue={(event) => handleChange(prompt.value, event)}
                    required={prompt.required}
                />
            );
        case "dropdownentry":
            return (
                <DropDownEntry
                    fieldTitle={prompt.fieldTitle}
                    value={data[prompt.value]}
                    id={prompt.id}
                    options={prompt.options}
                    required={prompt.required}
                    setValue={(event) => handleChange(prompt.value, event)}
                />
            );
        default:
            return null;
    }
};

export default renderField;