import EntryPrompt from "./entryprompt";

const ShortTextEntry = ({ fieldTitle, value, id, setValue, maxLength, required }) => {

    return (
        <div className="css">
            <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
            <input type="text" value={value}
                maxLength={maxLength} className="textarea resize-ta"
                id={id} name={id} required={required}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
        </div>
    );
};

export default ShortTextEntry;