/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberEntry from '../reusable/numberentry';

let numberEntryBox;
let element;
let mockSetValue;

const renderNumberEntry = (props) => {
    mockSetValue = jest.fn();
    numberEntryBox = render(
        <NumberEntry
            fieldTitle="Test Field"
            value=""
            label="units"
            setValue={mockSetValue}
            required={true}
            allowDecimal={true}
            {...props}
        />
    );
};

test('renders NumberEntry component without label and range', () => {
    renderNumberEntry({ id: 'test1' });

    element = numberEntryBox.container.querySelector('#test1');

    expect(element).toBeInTheDocument();
    expect(screen.queryByText(/[\[\]\d-]+/)).not.toBeInTheDocument();
});

test('renders NumberEntry component with label and range', () => {
    renderNumberEntry({ id: 'test2', label: 'Test Label', min: 10, max: 20 });

    element = numberEntryBox.container.querySelector('#test2');

    expect(element).toBeInTheDocument();
    // expect(screen.getByText('[10-20 units]').toBeInTheDocument());
    // expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(element).toBeInvalid();
});


test('handles input change', () => {
    renderNumberEntry();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '15' } });
    expect(mockSetValue).toHaveBeenCalledWith('15');
});

test('clears input if invalid on blur', () => {
    renderNumberEntry({ value: 5, min: 10, max: 20 });

    fireEvent.blur(screen.getByRole('textbox'));
    expect(mockSetValue).toHaveBeenCalledWith('');
});

// Add more test cases as needed
