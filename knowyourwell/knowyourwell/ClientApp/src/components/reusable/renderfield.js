import LongTextEntry from "./longtextentry";
import ShortTextEntry from "./shorttextentry";
import NumberEntry from "./numberentry";
import DropDownEntry from "./dropdownentry";

const renderField = (prompt, fieldData, updateFieldData, handleDropdownChange) => {
    switch (prompt.type) {
        case 'longtextentry':
            if (prompt.conditions?.includes(fieldData[prompt.dependsOn]) || prompt.dependsOn === undefined) {
                return (
                    <LongTextEntry
                        fieldTitle={prompt.fieldTitle}
                        value={fieldData[prompt.value]}
                        id={prompt.id}
                        setValue={(value) => updateFieldData(prompt.value, value)}
                        required={prompt.required}
                    />
                );
            } else {
                return (<></>)
            }
        case 'shorttextentry':
            return (
                <ShortTextEntry
                    fieldTitle={prompt.fieldTitle}
                    value={fieldData[prompt.value]}
                    id={prompt.id}
                    setValue={(value) => updateFieldData(prompt.value, value)}
                    required={prompt.required}
                />
            );
        case 'numberentry':
            return (
                <NumberEntry
                    fieldTitle={prompt.fieldTitle}
                    metric={fieldData[prompt.value]}
                    min={prompt.min}
                    max={prompt.max}
                    id={prompt.id}
                    label={prompt.label}
                    setValue={(value) => updateFieldData(prompt.value, value)}
                    required={prompt.required}
                />
            );
        case 'dropdownentry':
            return (
                <DropDownEntry
                    fieldTitle={prompt.fieldTitle}
                    value={fieldData[prompt.value]}
                    id={prompt.id}
                    options={prompt.options}
                    required={prompt.required}
                    onChange={(event) => handleDropdownChange(prompt.value, event)}
                />
            );
        default:
            return null;
    }
};

export default renderField;