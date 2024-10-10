import EntryPrompt from "./entryprompt";

const LongTextEntry = ({
  fieldTitle,
  value,
  id,
  setValue,
  maxLength,
  required,
}) => {
  return (
    <div className="css">
      <EntryPrompt id={id} fieldTitle={fieldTitle} required={required} />
      <textarea
        type="text"
        value={value}
        id={id}
        name={id}
        className="textarea resize-ta"
        maxLength={maxLength}
        required={required}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default LongTextEntry;
