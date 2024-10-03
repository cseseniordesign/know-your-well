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
            {/* Since we're effectively using a link as a button, it doesn't need an href attribute.*/}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="tooltipButton"
              data-testid="tooltipButton"
              onClick={() => setIsOpen(true)}
              // eslint-disable-next-line no-script-url
              href="javascript:;"
            >
              {" "}
              ⓘ
            </a>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
            >
              <div
                className="tooltipContent"
              >
                <div
                  className="titleBar"
                >
                  <h2>Lorem ipsum dolor</h2>
                  <button onClick={() => setIsOpen(false)}>&#x2715;</button>
                </div>
                <img alt="random cat placeholder" src="https://cataas.com/cat" />
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec faucibus risus, ut congue metus. In ornare gravida tempor. Morbi orci velit, viverra vitae enim nec, laoreet faucibus nisl. Donec quis augue a ante pulvinar lacinia id sit amet mi. Proin scelerisque felis a massa mattis, vel elementum nulla egestas. Donec et velit gravida, auctor purus vel, bibendum tellus. Aenean semper, turpis posuere condimentum blandit, felis dui suscipit velit, ac ultrices orci augue sodales arcu. Etiam vehicula, nulla sed faucibus porta, libero quam ultrices nibh, sit amet iaculis augue risus sit amet ex. Morbi metus massa, tempus at finibus eget, bibendum et tortor. Suspendisse nec lorem malesuada, aliquam felis eget, fermentum neque. Sed id arcu vel nunc consequat pulvinar sed laoreet risus. Donec tristique mi non dapibus porttitor. Duis faucibus eu magna at lobortis. Aenean sed posuere mi. Donec convallis libero sed posuere scelerisque. Suspendisse quis arcu volutpat, ultrices odio eget, sodales felis.
                <br/><br/>
                Mauris condimentum facilisis massa sed varius. Nulla id purus vel libero aliquam consequat. Nulla dapibus dapibus mauris, non accumsan sapien efficitur eget. Vestibulum purus nibh, finibus non urna sed, egestas sagittis nisl. Sed in consequat ligula. Duis eleifend elementum nisl, quis hendrerit velit viverra fermentum. Nam blandit velit et pretium egestas.
                <br/><br/>
                Integer quis nisi nulla. Sed semper dolor hendrerit sapien iaculis tempus. Nunc molestie laoreet convallis. Etiam elementum tortor id lacus semper blandit. Mauris tincidunt mattis tellus et facilisis. Nulla facilisi. Morbi sollicitudin iaculis mi, ac gravida eros aliquam vel. Quisque commodo nec lorem vel condimentum. Duis arcu quam, congue vel maximus vel, feugiat a ipsum. Mauris nulla erat, ultrices eu erat eget, ornare tempor quam. Nullam placerat neque vel ligula commodo malesuada. Cras tempor auctor lorem, quis condimentum magna semper ac. Duis eu purus in felis pretium blandit. Maecenas mattis cursus fermentum. 
                </p>
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
