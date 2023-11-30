import EntryPrompt from "./entryprompt";

const DropDownEntry = ({ fieldTitle, id, setValue, options, value, required }) => {
    return (
        <div className="css">
            <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
            <div id="App">
                <div className="select-container">
                    <select id={id} value={value} 
                    onChange={(event) => setValue(event.target.value)} 
                    required={required}>
                        <option value="" hidden>Select one...</option>
                        {options.map((option, index) => (
                            <option key={index} value={getOptionKey(option)} id={id} name={id}>
                                {getOptionValue(option)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

const getOptionKey = option => {
    if (typeof option === 'object' && option.key) {
        return option.key;
    }
    return option;
};

const getOptionValue = option => {
    if (typeof option === 'object' && option.value) {
        return option.value;
    }
    return option;
};

export default DropDownEntry;
