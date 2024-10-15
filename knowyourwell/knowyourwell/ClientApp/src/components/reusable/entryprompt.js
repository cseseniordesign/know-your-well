import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import { idbName, getFromDB, getFilteredRecordsFromDB } from '../../setupIndexedDB';

const EntryPrompt = ({ id, fieldTitle, required }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState();
  const [tooltipImages, setTooltipImages] = useState();
  
  useEffect(() => {
    getFromDB(idbName, 'tblTooltips', id).then((tooltip) => {
      setTooltipText(tooltip.text);
    }).catch((() => {
      setTooltipText();
    }));
  });

  useEffect(() => {
    getFilteredRecordsFromDB(idbName, 'tblTooltipImages', (record) => {return record.promptId === id}).then((tooltipImages) => {
      const images = [];
      for (const [i, tooltipImage] of tooltipImages.entries()) {
        images.push(<img key={`${tooltipImage.promptId}-img-${i}`} alt={`${tooltipImage.promptId} #${i}`} src={URL.createObjectURL(tooltipImage.blob)} />);
      }
      setTooltipImages(images);
    }).catch((() => {
      setTooltipImages();
    }));
  });

  const insertLineBreaks = (fieldTitle) => {
    if (fieldTitle.length <= 60) {
      return (
        <div>
          {fieldTitle}
          {tooltipText !== undefined && (
          <>
            {/* Since we're effectively using a link as a button, it doesn't need an href attribute.*/}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className='tooltipButton'
              data-testid={`tooltipButton-${id}`}
              onClick={() => setIsOpen(true)}
              tabIndex='0'
            >
              {' '}
              ⓘ
            </a>
            <Modal
              appElement={document.getElementById('root') || undefined}
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
            >
              <div
                className='tooltipContent'
              >
                <div
                  className='titleBar'
                >
                  {/* The regex pattern removes a ':' at the end of the title if one exists */}
                  <h2>{fieldTitle.replace(/:$/, '')}</h2>
                  <button onClick={() => setIsOpen(false)}>&#x2715;</button>
                </div>
                {tooltipImages}
                <p>{tooltipText}</p>
              </div>
            </Modal>
          </>
          )}
          {required && (
            <span
              className='requiredField'
              // TODO: Make the data-testid unique for each EntryPrompt, based on `id`.
              data-testid='requiredFieldIndicator'
            >
              {' '}
              *
            </span>
          )}
        </div>
      );
    }
    const wordsOrParts = fieldTitle.split(/(?<=\s)/);
    let currentLine = '';
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
          <span className='requiredField' data-testid='requiredFieldIndicator'>
            {' '}
            *
          </span>
        )}
      </div>
    ));
  };

  return (
    <label htmlFor={id} onClick={(e) => {if (e.target.nodeName === 'A') e.preventDefault();}} style={{ marginBottom: 0 }}>
      {insertLineBreaks(fieldTitle)}
    </label>
  );
};

export default EntryPrompt;
