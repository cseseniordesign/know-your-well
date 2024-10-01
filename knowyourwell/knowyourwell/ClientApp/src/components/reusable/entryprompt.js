import React from "react";
import Modal from 'react-modal'

const EntryPrompt = ({ id, fieldTitle, required, tooltip }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const insertLineBreaks = (fieldTitle) => {
    if (fieldTitle.length <= 60) {
      return (
        <div>
          {fieldTitle}
          {tooltip && (
          <>
            {" "}
            {/* Since we're effectively using a link as a button, it doesn't need an href attribute.*/}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="tooltipButton"
              data-testid="tooltipButton"
              onClick={() => setIsOpen(true)}
              // eslint-disable-next-line no-script-url
              href="javascript:void(0);"
            >
              ⓘ
            </a>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
            >
              <h2>Info</h2>
              <button onClick={() => setIsOpen(false)}>x</button>
              <p>Info Body</p>
            </Modal>
          </>
          )}
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
