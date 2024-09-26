import EntryPrompt from "./entryprompt";

const ShortTextEntry = ({
  fieldTitle,
  value,
  id,
  setValue,
  maxLength,
  required,
  errorMessage,
  pattern,
  title,
  isValid,
}) => {
  return (
    <div className="css">
      <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
      <input
        type="text"
        value={value}
        pattern={pattern}
        maxLength={maxLength}
        className="textarea resize-ta"
        id={id}
        name={id}
        required={required}
        onChange={(event) => setValue(event.target.value)}
        title={title}
      />
      {!isValid && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ShortTextEntry;
