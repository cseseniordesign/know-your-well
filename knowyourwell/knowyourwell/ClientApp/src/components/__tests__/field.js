/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';
import Field from '../field';

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

const searchParams = jest.fn();

test('Field page renders', () => {
    render(
        <Router>
            <Field searchParams={searchParams} />
        </Router>
    );
    expect(screen.getByText('Well Cover Description')).toBeInTheDocument();
});

test('dev inputs are working', () => {
    render(
        <Router>
            <Field searchParams={searchParams} />
        </Router>
    );
    expect(screen.getByText('sample dev well cover description')).toBeInTheDocument();;
});

test('inputting bad data clears box', async () => {
    render(
        <Router>
            <Field searchParams={searchParams} />
        </Router>
    );
    userEvent.setup();
    const element = screen.getByDisplayValue('50');
    userEvent.type(element, '110');
    fireEvent.blur(element);
    expect(screen.getByDisplayValue('50')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('110')).not.toBeInTheDocument();
});