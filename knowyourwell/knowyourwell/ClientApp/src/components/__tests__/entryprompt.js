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

test('field title longer than 60 characters renders on multiple lines', () => {
    const entryPrompt = render(
        <EntryPrompt
            id="test3"
            fieldTitle="Test Field with a Really Long Title to Test that long Titles are rendered on multiple lines"
            required={true}
        />
    );

    expect(screen.getByText('Test Field with a Really Long Title to')).toBeInTheDocument();
    expect(screen.getByText('Test that long Titles are rendered on')).toBeInTheDocument();    
    expect(screen.getByText('multiple lines')).toBeInTheDocument();    
});

