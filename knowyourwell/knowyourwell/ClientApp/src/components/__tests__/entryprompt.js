/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import "core-js/stable/structured-clone";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EntryPrompt from "../reusable/entryprompt";
import { idbName } from '../../setupIndexedDB';
import "fake-indexeddb/auto";

let db;

beforeEach(async () => {
  const request = indexedDB.open(idbName, 3);
  await new Promise((resolve, reject) => {
    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains("tooltip-images")) {
        db.createObjectStore("tooltip-images");
      }
    };
    request.onsuccess = function () {
      db = request.result;
      resolve();
    };
    request.onerror = function (err) {
      reject(err);
    };
  });

  const transaction = db.transaction("tooltip-images", "readwrite");
  const store = transaction.objectStore("tooltip-images");

  const mockBlob = new Blob(["mock image data"], { type: "image/png" });
  store.put(mockBlob, "testBlobKey");

  await new Promise((resolve, reject) => {
    transaction.oncomplete = function () {
      resolve();
    };
    transaction.onerror = function (err) {
      reject(err);
    };
  });
});

afterEach(() => {
  if (db) {
    db.close(); 
    db = null; 
  }
});


test("Stores and retrieves blob correctly from IndexedDB", async () => {
  const transaction = db.transaction("tooltip-images", "readonly");
  const store = transaction.objectStore("tooltip-images");

  const retreivedBlob = await new Promise((resolve, reject) => {
    const request = store.get("testBlobKey");
    request.onsuccess = function () {
      resolve(request.result);
    };
    request.onerror = function (err) {
      reject(err);
    }; 
  });

  const reader = new FileReader();
  const readPromise = new Promise((resolve) => {
    reader.onload = function () {
      resolve(reader.result);
    };
  });
  reader.readAsText(retreivedBlob);

  const blobContent = await readPromise;
  expect(blobContent).toBe("mock image data");
});

test("Handles error during blob storage", async () => {
  const mockBlob = new Blob(["mock image data"], { type: "image/png" });

  const transaction = db.transaction("tooltip-images", "readwrite");
  const store = transaction.objectStore("tooltip-images");

  store.put = jest.fn().mockImplementation(() => {
    throw new Error("Simulated error storing blob");
  });

  expect(() => { store.put(mockBlob, "testBlobKey"); }).toThrow(
    "Simulated error storing blob"
  );
});

test("Handles error during blob retrieval", async () => {
  const transaction = db.transaction("tooltip-images", "readonly");
  const store = transaction.objectStore("tooltip-images");

  store.get = jest.fn().mockImplementation(() => {
    throw new Error("Simulated error while retrieving blob");
  });

  expect(() => { store.get("missingBlobKey"); }).toThrow(
    "Simulated error while retrieving blob"
  );
});

var request = indexedDB.open(idbName, 3);
request.onupgradeneeded = function () {
  var db = request.result;
  var textStore = db.createObjectStore("tblTooltip", { keyPath: "prompt_id" });
  var imagePathStore = db.createObjectStore("tblTooltipImage", { keyPath: "image_id" });
  var imageBlobStore = db.createObjectStore("tooltip-images");

  textStore.put({prompt_id: "testId", text: "Test Text", active: 1});
  imagePathStore.put({image_id: "testId", im_filename: "test.png", active: 1});
  imageBlobStore.put({blob: new Blob(['mock image data'], { type: 'image/png' })}, "test.png");
}


test("The tooltip is rendered when a corresponding database entry exists", async () => {
  await act(async () => render(
    <EntryPrompt id="testId" fieldTitle="Test Field" required={true} />
  ));

  expect(await screen.findByTestId('tooltipButton-testId'));
});


test("No tooltip is rendered when there is no corresponding database entry", async () => {
  await act(async () => render(
    <EntryPrompt id="fakePrompt" fieldTitle="Fake Prompt" required={true} />
  ));
 
  expect(await screen.queryByTestId('tooltipButton-fakePrompt')).not.toBeInTheDocument();
});

test("The tooltip modal can be opened properly when a corresponding database entry exists", async () => {
    await act(() => render(
        <EntryPrompt id="testId" fieldTitle="Test Field" required={true} />
      ));
    
    const button = await screen.findByTestId('tooltipButton-testId');
    await userEvent.click(button);
    expect(await screen.findByTestId("tooltipClose-testId"));
});

test("The tootltip modal displays the correct associated text when a corresponding database entry exists", async () => {
    await act(() => render(
      <EntryPrompt id="testId" fieldTitle="Test Field" required={true} />
    ));
    
    const button = await screen.findByTestId('tooltipButton-testId');
    await userEvent.click(button);
    expect(await screen.findByText("Test Text"));
});

test("renders EntryPrompt component without required indicator", () => {
  render(<EntryPrompt id="testId" fieldTitle="Test Field" required={false} />);

  expect(screen.getByText("Test Field")).toBeInTheDocument();
  expect(
    screen.queryByTestId("requiredFieldIndicator"),
  ).not.toBeInTheDocument();
});

test("renders EntryPrompt component with required indicator", () => {
  render(<EntryPrompt id="testId" fieldTitle="Test Field" required={true} />);
  
  expect(screen.getByText("Test Field")).toBeInTheDocument();
  expect(screen.getByTestId("requiredFieldIndicator")).toBeInTheDocument();
});

test("field title longer than 60 characters renders on multiple lines", () => {
  render(
    <EntryPrompt
      id="test3"
      fieldTitle="Test Field with a Really Long Title to Test that long Titles are rendered on multiple lines"
      required={true}
    />
  );

  expect(
    screen.getByText("Test Field with a Really Long Title to"),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Test that long Titles are rendered on"),
  ).toBeInTheDocument();
  expect(screen.getByText("multiple lines")).toBeInTheDocument();
});