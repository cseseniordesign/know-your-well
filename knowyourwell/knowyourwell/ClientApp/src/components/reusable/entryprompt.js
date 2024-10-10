import { useEffect, useState } from "react";
import Modal from 'react-modal'
import { getFromDB } from "../../App";

const EntryPrompt = ({ id, fieldTitle, required, tooltip }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState();

  useEffect(() => {
    getFromDB('localDB', 'tooltips', id).then((tooltip) => {
      setTooltipText(tooltip.text);
    }).catch((error => {
      setTooltipText(`No tooltip data found for id: ${id}`);
    }));
  });

  const insertLineBreaks = (fieldTitle) => {
    if (fieldTitle.length <= 60) {
      return (
        <div>
          {fieldTitle}
          {tooltip && (
          <>
            {/* Since we're effectively using a link as a button, it doesn't need an href attribute.*/}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="tooltipButton"
              data-testid="tooltipButton"
              onClick={() => setIsOpen(true)}
              tabIndex="0"
            >
              {" "}
              ⓘ
            </a>
            <Modal
              appElement={document.getElementById("root") || undefined}
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
            >
              <div
                className="tooltipContent"
              >
                <div
                  className="titleBar"
                >
                  <h2>{fieldTitle.substring(0, fieldTitle.length - 1)}</h2>
                  <button onClick={() => setIsOpen(false)}>&#x2715;</button>
                </div>
                <img alt="random cat placeholder" src="https://cataas.com/cat" />
                <p>{tooltipText}</p>
              </div>
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
