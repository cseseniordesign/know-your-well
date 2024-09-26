/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ShortTextEntry from "../reusable/shorttextentry";

test("renders ShortTextEntry component", () => {
  render(
    <ShortTextEntry
      fieldTitle="Test Field"
      value=""
      id="testId"
      setValue={() => {}}
      maxLength={10}
      required
      errorMessage="Field is required"
      pattern="\d+"
      title="Numeric input"
      isValid
    />,
  );

  expect(screen.getByText("Test Field")).toBeInTheDocument();
  expect(screen.getByTitle("Numeric input")).toBeInTheDocument();
});

test("handles input change", () => {
  const mockSetValue = jest.fn();
  render(
    <ShortTextEntry
      fieldTitle="Test Field"
      value=""
      id="testId"
      setValue={mockSetValue}
      maxLength={10}
      required
      errorMessage="Field is required"
      pattern="\d+"
      title="Numeric input"
      isValid
    />,
  );

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "123" } });
  expect(mockSetValue).toHaveBeenCalledWith("123");
});

// Add more test cases as needed
