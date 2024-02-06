/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LongTextEntry from '../reusable/longtextentry';

test('renders LongTextEntry component', () => {
    render(
        <LongTextEntry
            fieldTitle="Test Field"
            value=""
            id="testId"
            setValue={() => { }}
            maxLength={100}
            required
        />
    );

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('handles input change', () => {
    const mockSetValue = jest.fn();
    render(
        <LongTextEntry
            fieldTitle="Test Field"
            value=""
            id="testId"
            setValue={mockSetValue}
            maxLength={100}
            required
        />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Lorem ipsum' } });
    expect(mockSetValue).toHaveBeenCalledWith('Lorem ipsum');
});

// Add more test cases as needed
