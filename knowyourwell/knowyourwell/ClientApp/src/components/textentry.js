const TextEntry = ({ fieldTitle, value, id, setValue, maxLength, required }) => {

    return (
        <div className="css">
        <label htmlFor={id}>
            {fieldTitle}
            <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
        </label>
        <input type="text" value={value} maxLength={maxLength} className="textarea resize-ta" id={id} name={id} required
            onChange={(event) => {
                setValue(event.target.value);
            }}
        />
    </div>
    );
};

export default TextEntry;