const EntryPrompt = ({ id, fieldTitle, required }) => {
  const insertLineBreaks = (fieldTitle) => {
    if (fieldTitle.length <= 60) {
      return (
        <div>
          {fieldTitle}
          {required && (
            <span
              className="requiredField"
              data-testid="requiredFieldIndicator"
            >
              {" "}
              *
            </span>
          )}
        </div>
      );
    }
    const wordsOrParts = fieldTitle.split(/(?<=\s)/);
    let currentLine = "";
    const lines = [];
    for (let wordOrPart of wordsOrParts) {
      if (currentLine.length + wordOrPart.length <= 40) {
        currentLine += wordOrPart;
      } else {
        lines.push(currentLine);
        currentLine = wordOrPart;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.map((line, index) => (
      <div key={index}>
        {line}
        {index === lines.length - 1 && required && (
          <span className="requiredField" data-testid="requiredFieldIndicator">
            {" "}
            *
          </span>
        )}
      </div>
    ));
  };

  return (
    <label htmlFor={id} style={{ marginBottom: 0 }}>
      {insertLineBreaks(fieldTitle)}
    </label>
  );
};

export default EntryPrompt;
