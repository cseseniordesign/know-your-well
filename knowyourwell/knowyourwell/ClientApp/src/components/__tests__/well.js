import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Well from '../well';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


global.ResizeObserver = require('resize-observer-polyfill');


jest.mock('axios');

jest.mock('../usercontext', () => ({ 
    useUser: () => ({
        user: { displayn: 'testuser' },
        setUser: jest.fn(),
    }),
}));

const sampleWells = {
    Wells: [
        {
            well_id: 1,
            wi_wellcode: 'UNL001',
            wi_wellname: 'Alpha Well',
            wi_estlatitude: 40.0,
            wi_estlongitude: -96.0,
            wi_well_owner: 'Owner A',
        },
        {
            well_id: 2,
            wi_wellcode: 'UNL002',
            wi_wellname: 'Beta Well',
            wi_estlatitude: 41.0,
            wi_estlongitude: -97.0,
            wi_well_owner: 'Owner B',
        },
    ],
};

beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
});

describe('Geographic Map Interface in Well Component', () => {
    test('renders the map interface', async () => {
        localStorage.setItem('wellData', JSON.stringify(sampleWells));

        Axios.get.mockImplementation((url) => {
            if (url === '/userinfo') {
                return Promise.resolve({ data: { displayn: 'testuser' } });
            } else if (url === '/Wells') {
                return Promise.resolve({ data: sampleWells });
            }
        });

        const { container } = render(
            <MemoryRouter>
                <Well />
            </MemoryRouter>
        );

        await waitFor(() => {
            const mapContainer = document.getElementById('map-container');
            expect(mapContainer).toBeInTheDocument();
            expect(mapContainer.classList).toContain('leaflet-container');
        });
    });

    test('displays marker images based on wells data', async () => {
        localStorage.setItem('wellData', JSON.stringify(sampleWells));

        Axios.get.mockImplementation((url) => {
            if (url === '/userinfo') {
                return Promise.resolve({ data: { displayn: 'testuser' } });
            } else if (url === '/Wells') {
                return Promise.resolve({ data: sampleWells });
            }
        });

        render(
            <MemoryRouter>
                <Well />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(document.getElementById('map-container')).toBeInTheDocument();
        });

        await waitFor(() => {
            const markers = document.querySelectorAll('img[src*="wellIcon.png"]');
            expect(markers.length).toBeGreaterThanOrEqual(sampleWells.Wells.length);
        });
    });
});
