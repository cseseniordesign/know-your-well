/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDownEntry from "../reusable/dropdownentry";

describe("DropDownEntry", () => {
  const options = [
    { key: "option1", value: "Option 1" },
    { key: "option2", value: "Option 2" },
    { key: "option3", value: "Option 3" },
  ];

  test("renders DropDownEntry component", () => {
    render(
      <DropDownEntry
        fieldTitle="Test Field"
        id="testId"
        setValue={() => {}}
        options={options}
        value=""
        required
      />,
    );

    expect(screen.getByText("Test Field")).toBeInTheDocument();
    expect(screen.getByText("Select one...")).toBeInTheDocument();
  });

  test("handles option selection", () => {
    const mockSetValue = jest.fn();
    render(
      <DropDownEntry
        fieldTitle="Test Field"
        id="testId"
        setValue={mockSetValue}
        options={options}
        value=""
        required
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "option2" },
    });
    expect(mockSetValue).toHaveBeenCalledWith("option2");
  });

  // Add more test cases as needed
});
