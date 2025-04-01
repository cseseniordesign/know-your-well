import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PreviousEntries from '../previousentries';
import { UserProvider } from '../usercontext';
import Axios from 'axios';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams('?id=1&wellName=TestWell&wellcode=ABC123')],
  useNavigate: () => jest.fn()
}));

describe('PreviousEntries', () => {
  const mockUser = { displayn: 'Test User' };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    Axios.get.mockImplementation(() => 
      Promise.resolve({
        data: {
          ExpandedFieldList: []
        }
      })
    );
  });

  test('renders entries with labs', async () => {
    const mockData = {
      data: {
        ExpandedFieldList: [{
          fa_datecollected: '2023-01-01',
          fieldactivity_id: 1,
          classlab_id: 2,
          cl_datecollected: '2023-01-02',
          watersciencelab_id: 3,
          wsl_dateentered: '2023-01-03'
        }]
      }
    };
    
    Axios.get.mockImplementation(() => Promise.resolve(mockData));

    render(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser }}>
          <PreviousEntries />
        </UserProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/TestWell: Previous Entries/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Field \(Field ID: 1\)/i)).toBeInTheDocument();
  });

  test('navigates on back click', async () => {
    const mockData = {
      data: {
        ExpandedFieldList: []
      }
    };
    
    Axios.get.mockImplementation(() => Promise.resolve(mockData));

    render(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser }}>
          <PreviousEntries />
        </UserProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();

    const originalLocation = window.location;
    delete window.location;
    window.location = { href: jest.fn() };

    fireEvent.click(backButton);
    
    expect(window.location.href).toBe('/EditWell?id=1&wellcode=ABC123&wellName=TestWell');

    window.location = originalLocation;
  });
});
