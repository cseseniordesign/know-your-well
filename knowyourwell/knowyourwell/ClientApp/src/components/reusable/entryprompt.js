const EntryPrompt = ({ id, fieldTitle, required }) => {
    const insertLineBreaks = (fieldTitle) => {
        if (fieldTitle.length <= 60) {
            return (
                <div>{fieldTitle}
                    {required && <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>}
                </div>
            );
        }
        const parts = fieldTitle.split(/(?<=\s)/);
        let currentLine = '';
        const lines = [];
        for (let part of parts) {
            if (currentLine.length + part.length <= 40) {
                currentLine += part;
            } else {
                lines.push(currentLine);
                currentLine = part;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }

        return lines.map((line, index) => (
            <div key={index}>
                {line}
                {index === lines.length - 1 && required &&
                    <span className="requiredField" data-testid="requiredFieldIndicator"> *</span>
                }
            </div>
        ));
    }

    return (
        <label htmlFor={id} style={{ marginBottom: 0 }}>
            {insertLineBreaks(fieldTitle)}
        </label>
    );
};

export default EntryPrompt;