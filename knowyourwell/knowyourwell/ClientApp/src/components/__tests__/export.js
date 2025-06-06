import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import ExportPage from '../export';
import NavMenu from '../navmenu';
import Axios from 'axios';

jest.mock('axios');

jest.mock('../usercontext', () => ({
  useUser: () => ({
    user: { displayn: 'Test User' },
    setUser: jest.fn(),
  }),
}));

describe('ExportPage', () => {
  test('clicking export CSV button triggers data export', async () => {
    render(<ExportPage />);
    
    Axios.get.mockResolvedValueOnce({ data: { Data: [] } });

    const buttons = screen.getAllByRole('button', { name: 'Download Data' });
    
    fireEvent.click(buttons[0]);
    
    expect(Axios.get).toHaveBeenCalledWith('/csvqueries', {
      responseType: 'json'
    });
  });

  test('clicking export image metadata button triggers image data export', async () => {
    render(<ExportPage />);
    
    Axios.get.mockResolvedValueOnce({ data: { Data: [] } });

    const buttons = screen.getAllByRole('button', { name: 'Download Data' });
    
    fireEvent.click(buttons[1]);
    
    expect(Axios.get).toHaveBeenCalledWith('/allImageMetadata', {
      responseType: 'json'
    });
  });
});

describe('Navigation via NavMenu', () => {
  test('clicking Export Data link navigates to the ExportPage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<NavMenu />} />
          <Route path="/Export" element={<ExportPage />} />
        </Routes>
      </MemoryRouter>
    );

    const exportLink = screen.getByText('Export Data');
    fireEvent.click(exportLink);

    expect(
      screen.getByRole('heading', { name: /Export Data/i })
    ).toBeInTheDocument();
  });
});
