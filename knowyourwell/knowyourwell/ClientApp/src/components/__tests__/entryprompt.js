/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import "fake-indexeddb/auto";
import "core-js/stable/structured-clone";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { idbName } from "../../setupIndexedDB";
import EntryPrompt from "../reusable/entryprompt";

global.indexedDB = new IDBFactory();

const initializeDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(idbName, 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const store = db.createObjectStore("tblTooltip", {
        keyPath: "prompt_id",
      });
      store.transaction.oncomplete = function () {
        const itemTransaction = db.transaction("tblTooltip", "readwrite");
        const objectStore = itemTransaction.objectStore("tblTooltip");
        objectStore.add({ prompt_id: "testmodal", name: "Test tooltip text" });
      };
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function () {
      reject("Error opening database.");
    };
  });
};

describe("The tool tip modal", () => {
  beforeEach(async () => {
    await initializeDB();
  });

  it("displays text correctly when a corresponding database entry exists", async () => {
    const user = userEvent.setup();

    render(
      <EntryPrompt id="testmodal" fieldTitle="Test Field" required={true} />
    );
    await user.click(screen.getByTestId("tooltipButton-wellname"));
  });
});

test("renders EntryPrompt component without required indicator", () => {
  render(<EntryPrompt id="testId" fieldTitle="Test Field" required={false} />);

  expect(screen.getByText("Test Field"));
  expect(
    screen.queryByTestId("requiredFieldIndicator")
  ).not.toBeInTheDocument();
});

test("renders EntryPrompt component with required indicator", () => {
  render(<EntryPrompt id="testId" fieldTitle="Test Field" required={true} />);

  expect(screen.getByText("Test Field"));
  expect(screen.getByTestId("requiredFieldIndicator"));
});

test("field title longer than 60 characters renders on multiple lines", () => {
  render(
    <EntryPrompt
      id="test3"
      fieldTitle="Test Field with a Really Long Title to Test that long Titles are rendered on multiple lines"
      required={true}
    />
  );

  expect(screen.getByText("Test Field with a Really Long Title to"));
  expect(screen.getByText("Test that long Titles are rendered on"));
  expect(screen.getByText("multiple lines"));
});
