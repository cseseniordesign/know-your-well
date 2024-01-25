/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EntryPrompt from '../reusable/entryprompt';

test('renders EntryPrompt component without required indicator', () => {
    render(
        <EntryPrompt
            id="testId"
            fieldTitle="Test Field"
            required={false}
        />
    );

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.queryByTestId('requiredFieldIndicator')).not.toBeInTheDocument();
});

test('renders EntryPrompt component with required indicator', () => {
    render(
        <EntryPrompt
            id="testId"
            fieldTitle="Test Field"
            required={true}
        />
    );

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByTestId('requiredFieldIndicator')).toBeInTheDocument();
});

// Add more test cases as needed
