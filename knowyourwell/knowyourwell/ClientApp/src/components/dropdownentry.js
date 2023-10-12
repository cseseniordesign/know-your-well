const DropDownEntry = ({ fieldTitle, id, onChange, options, value }) => {

    return (
        <div className="css">
            <label htmlFor={id}>
                {fieldTitle}
                <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
            </label>
            <div id="App">
                <div className="select-container">
                    <select id={id} value={value} onChange={onChange} required>
                        <option value="" hidden>Select one...</option>
                        {options.map((option, index) => (
                            <option key={index} value={option} id={id} name={id}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DropDownEntry;
