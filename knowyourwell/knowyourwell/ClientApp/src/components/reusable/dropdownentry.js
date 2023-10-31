import EntryPrompt from "./entryprompt";

const DropDownEntry = ({ fieldTitle, id, onChange, options, value, required }) => {
    return (
        <div className="css">
            <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
            <div id="App">
                <div className="select-container">
                    <select id={id} value={value} onChange={onChange} required={required}>
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
