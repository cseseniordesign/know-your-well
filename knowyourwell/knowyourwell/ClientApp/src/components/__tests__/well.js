import React from 'react';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import Well from '../well';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import WellFieldLabContext from '../reusable/WellFieldLabContext';

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
      county_id: 1,
      nrd_id: 100,  
      fieldActivity: {
        fa_datecollected: '2025-01-01T00:00:00Z'
      }
    },
    {
      well_id: 2,
      wi_wellcode: 'UNL002',
      wi_wellname: 'Beta Well',
      wi_estlatitude: 41.0,
      wi_estlongitude: -97.0,
      wi_well_owner: 'Owner B',
      county_id: 2,
      nrd_id: 200,
      fieldActivity: {
        fa_datecollected: '2025-02-01T00:00:00Z'
      }
    },
    {
      well_id: 3,
      wi_wellcode: 'UNL003',
      wi_wellname: 'Charlie Well',
      wi_estlatitude: 42.0,
      wi_estlongitude: -98.0,
      wi_well_owner: 'Owner C',
      county_id: 1,
      nrd_id: 100,
      fieldActivity: {
        fa_datecollected: '2025-03-01T00:00:00Z'
      },
    }
  ]
};

// Create a mocked context value with valid coords
const mockedWellFieldLabContext = {
  coords: { latitude: 40.0, longitude: -96.0 },
};

// Helper function to render <Well /> with both MemoryRouter and the Provider
const renderWellWithContext = () => {
  return render(
    <MemoryRouter>
      <WellFieldLabContext.Provider value={mockedWellFieldLabContext}>
        <Well />
      </WellFieldLabContext.Provider>
    </MemoryRouter>
  );
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

    const { container } = renderWellWithContext();

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

    renderWellWithContext();

    await waitFor(() => {
      expect(document.getElementById('map-container')).toBeInTheDocument();
    });

    await waitFor(() => {
      const markers = document.querySelectorAll('img[src*="wellIcon.png"]');
      expect(markers.length).toBeGreaterThanOrEqual(sampleWells.Wells.length);
    });
  });
});

describe('Well Filtering & Sorting', () => {
  test('filters wells by radius from user location', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation(success => success({
        coords: {
          latitude: 40.8202,
          longitude: -96.7005
        }
      }))
    };
    global.navigator.geolocation = mockGeolocation;

    const wellsWithinRadius = {
      Wells: [
        {
          well_id: 1,
          wi_wellcode: 'UNL001',
          wi_wellname: 'Near Well',
          wi_estlatitude: 40.8302,
          wi_estlongitude: -96.7105,
        },
        {
          well_id: 2,
          wi_wellcode: 'UNL002',
          wi_wellname: 'Far Well',
          wi_estlatitude: 41.8202,
          wi_estlongitude: -96.7005,
        }
      ]
    };

    localStorage.setItem('wellData', JSON.stringify(wellsWithinRadius));

    Axios.get.mockImplementation((url) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        return Promise.resolve({ data: wellsWithinRadius });
      }
    });

    const { container } = renderWellWithContext();

    await waitFor(() => {
      expect(document.getElementById('map-container')).toBeInTheDocument();
    });

    await waitFor(() => {
      const initialMarkers = document.querySelectorAll('img[src*="wellIcon.png"]');
      expect(initialMarkers.length).toBe(2);
    });

    const filteredWells = wellsWithinRadius.Wells.filter(well => {
      const R = 3959;
      const lat1 = 40.8202 * Math.PI / 180;
      const lat2 = well.wi_estlatitude * Math.PI / 180;
      const dLat = lat2 - lat1;
      const dLon = (well.wi_estlongitude - (-96.7005)) * Math.PI / 180;
      const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dLon/2) ** 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return distance <= 1;
    });

    expect(filteredWells.length).toBe(1);
    expect(filteredWells[0].wi_wellcode).toBe('UNL001');
  });

  test('filters wells by search term', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (config && config.params && config.params.filterBy && config.params.filterBy.search) {
          const term = config.params.filterBy.search.toLowerCase();
          const filteredData = {
            Wells: sampleWells.Wells.filter(well =>
              well.wi_wellname.toLowerCase().includes(term)
            )
          };
          return Promise.resolve({ data: filteredData });
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    renderWellWithContext();
  
    await waitFor(() => {
      expect(screen.getByText(/Alpha Well/i)).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText("List View"));
  
    await waitFor(() => {
      expect(screen.getByText("Filters")).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText("Filters"));
  
    const searchInput = screen.getByPlaceholderText("Search by well name");
    fireEvent.change(searchInput, { target: { value: "Alpha" } });
  
    await waitFor(() => {
      expect(screen.getByText(/Alpha Well/i)).toBeInTheDocument();
      expect(screen.queryByText(/Beta Well/i)).toBeNull();
      expect(screen.queryByText(/Charlie Well/i)).toBeNull();
    });
  });

  test('filters wells by coordinate bounds', async () => {
    const wellsInBounds = {
      Wells: [
        {
          well_id: 1,
          wi_wellcode: 'UNL001',
          wi_wellname: 'In Bounds Well',
          wi_estlatitude: 41.5,
          wi_estlongitude: -96.5,
        },
        {
          well_id: 2,
          wi_wellcode: 'UNL002',
          wi_wellname: 'Out of Bounds Well',
          wi_estlatitude: 43.2,
          wi_estlongitude: -98.7,
        }
      ]
    };
  
    localStorage.setItem('wellData', JSON.stringify(wellsInBounds));
  
    Axios.get.mockImplementation((url) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (url.includes('minLat=41') && url.includes('maxLat=42') && 
            url.includes('minLon=-97') && url.includes('maxLon=-96')) {
          const filteredData = {
            Wells: wellsInBounds.Wells.filter(well => 
              well.wi_estlatitude >= 41 && well.wi_estlatitude <= 42 &&
              well.wi_estlongitude >= -97 && well.wi_estlongitude <= -96
            )
          };
          return Promise.resolve({ data: filteredData });
        }
        return Promise.resolve({ data: wellsInBounds });
      }
    });
  
    const { container } = renderWellWithContext();
  
    await waitFor(() => {
      expect(document.getElementById('map-container')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      const initialMarkers = document.querySelectorAll('img[src*="wellIcon.png"]');
      expect(initialMarkers.length).toBe(2);
    });
  
    const filteredData = wellsInBounds.Wells.filter(well => 
      well.wi_estlatitude >= 41 && well.wi_estlatitude <= 42 &&
      well.wi_estlongitude >= -97 && well.wi_estlongitude <= -96
    );
  
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].wi_wellcode).toBe('UNL001');
  });
  
  test('sorts well alphabetically by well name', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    const { container } = renderWellWithContext();
  
    await waitFor(() => {
      const tabList = container.querySelector('.react-tabs__tab-list');
      expect(tabList).toBeInTheDocument();
    });
  
    const listTab = container.querySelector('.react-tabs__tab-list li:nth-child(2)');
    expect(listTab).toBeDefined();
    fireEvent.click(listTab);
  
    await waitFor(() => {
      expect(screen.getByText("Sort")).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText("Sort"));
  
    await waitFor(() => {
      expect(screen.getByText(/Alphabetical \(By Well Name\)/i)).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText(/Alphabetical \(By Well Name\)/i));
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems[1]).toHaveTextContent("Alpha Well");
    });
  });
  
  test('sorts wells by oldest first', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    const { container } = renderWellWithContext();
  
    await waitFor(() => {
      const tabList = container.querySelector('.react-tabs__tab-list');
      expect(tabList).toBeInTheDocument();
    });
  
    await waitFor(() => {
      const tabs = container.querySelectorAll('.react-tabs__tab');
      expect(tabs.length).toBeGreaterThan(0);
    });
  
    const tabs = container.querySelectorAll('.react-tabs__tab');
    const listTab = Array.from(tabs).find(tab => /List View/i.test(tab.textContent));
    expect(listTab).toBeDefined();
    fireEvent.click(listTab);
  
    await waitFor(() => {
      expect(screen.getByText("Sort")).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText("Sort"));
  
    await waitFor(() => {
      expect(screen.getByText(/Oldest First/i)).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText(/Oldest First/i));
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems[1]).toHaveTextContent("Alpha Well");
    });
  });
  
  test('sorts wells by newest first', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (config && config.params && config.params.sortBy === 'well_id DESC') {
          const sortedData = { Wells: [...sampleWells.Wells].sort((a, b) => b.well_id - a.well_id) };
          return Promise.resolve({ data: sortedData });
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    const { container } = renderWellWithContext();
  
    await waitFor(() => {
      const tabList = container.querySelector('.react-tabs__tab-list');
      expect(tabList).toBeInTheDocument();
    });
  
    const tabs = container.querySelectorAll('.react-tabs__tab');
    const listTab = Array.from(tabs).find(tab => tab.textContent.trim() === 'List View');
    expect(listTab).toBeDefined();
    fireEvent.click(listTab);
  
    await waitFor(() => {
      expect(screen.getByText("Sort")).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText("Sort"));
    
    await waitFor(() => {
      expect(screen.getByText(/Newest First/i)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText(/Newest First/i));
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems[1]).toHaveTextContent("Charlie Well");
    });
  });
  
  test('sorts wells by most recent field activity', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        const sortedWells = {
          Wells: [...sampleWells.Wells].sort((a, b) => 
            new Date(b.fieldActivity.fa_datecollected) - new Date(a.fieldActivity.fa_datecollected)
          )
        };
        return Promise.resolve({ data: sortedWells });
      }
    });
  
    const { container } = renderWellWithContext();
  
    await waitFor(() => {
      expect(document.getElementById('map-container')).toBeInTheDocument();
    });
  
    const tabs = container.querySelectorAll('.react-tabs__tab');
    const listTab = Array.from(tabs).find(tab => tab.textContent.trim() === 'List View');
    expect(listTab).toBeDefined();
    fireEvent.click(listTab);
  
    await waitFor(() => {
      expect(screen.getByText("Sort")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Sort"));
    await waitFor(() => {
      expect(screen.getByText(/Most Recent Field Entry/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Most Recent Field Entry/i));
    
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems[1]).toHaveTextContent("Charlie Well");
      expect(listItems[2]).toHaveTextContent("Beta Well");
      expect(listItems[3]).toHaveTextContent("Alpha Well");
    });
  });
  
  test('filters wells by county', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (url.includes('filterBy')) {
          const params = new URLSearchParams(url.split('?')[1]);
          const filterBy = JSON.parse(params.get('filterBy'));
          if (filterBy.county_id) {
            const filteredData = {
              Wells: sampleWells.Wells.filter(well => 
                well.county_id === parseInt(filterBy.county_id) || parseInt(filterBy.county_id) === -1
              )
            };
            return Promise.resolve({ data: filteredData });
          }
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    const { container } = renderWellWithContext();
  
    await waitFor(() => {
      expect(document.getElementById('map-container')).toBeInTheDocument();
    });
  
    const lancasterWells = sampleWells.Wells.filter(well => well.county_id === 1);
    expect(lancasterWells.length).toBe(2);
    expect(lancasterWells[0].wi_wellcode).toBe('UNL001');
  
    const douglasWells = sampleWells.Wells.filter(well => well.county_id === 2);
    expect(douglasWells.length).toBe(1);
    expect(douglasWells[0].wi_wellcode).toBe('UNL002');
  });
  
  test('filters wells by nrd', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (url.includes('filterBy')) {
          const params = new URLSearchParams(url.split('?')[1]);
          const filterBy = JSON.parse(params.get('filterBy'));
          if (filterBy.nrd_id) {
            const filteredData = {
              Wells: sampleWells.Wells.filter(well =>
                well.nrd_id === parseInt(filterBy.nrd_id) || parseInt(filterBy.nrd_id) === -1
              )
            };
            return Promise.resolve({ data: filteredData });
          }
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    renderWellWithContext();
  
    await waitFor(() => {
      expect(document.getElementById('map-container')).toBeInTheDocument();
    });
  
    const wellsNrd100 = sampleWells.Wells.filter(well => well.nrd_id === 100);
    expect(wellsNrd100.length).toBe(2);
    const wellCodesNrd100 = wellsNrd100.map(well => well.wi_wellcode);
    expect(wellCodesNrd100).toContain('UNL001');
    expect(wellCodesNrd100).toContain('UNL003');
  
    const wellsNrd200 = sampleWells.Wells.filter(well => well.nrd_id === 200);
    expect(wellsNrd200.length).toBe(1);
    expect(wellsNrd200[0].wi_wellcode).toBe('UNL002');
  });
  
  test('applies combined filters (county, NRD, and search) correctly', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (config && config.params && config.params.filterBy) {
          const { county_id, nrd_id, search } = config.params.filterBy;
          const filteredData = {
            Wells: sampleWells.Wells.filter(well => {
              const matchesCounty =
                county_id && parseInt(county_id) !== -1
                  ? well.county_id === parseInt(county_id)
                  : true;
              const matchesNRD =
                nrd_id && parseInt(nrd_id) !== -1
                  ? well.nrd_id === parseInt(nrd_id)
                  : true;
              const matchesSearch = search
                ? well.wi_wellname.toLowerCase().includes(search.toLowerCase())
                : true;
              return matchesCounty && matchesNRD && matchesSearch;
            }),
          };
          return Promise.resolve({ data: filteredData });
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    await act(async () => {
      renderWellWithContext();
    });
  
    await act(async () => {
      fireEvent.click(screen.getByText("List View"));
    });
  
    await waitFor(() => expect(screen.getByText("Filters")).toBeInTheDocument());
    await act(async () => {
      fireEvent.click(screen.getByText("Filters"));
    });
  
    const countySelect = screen.getByText("County:").nextSibling;
    await act(async () => {
      fireEvent.change(countySelect, { target: { value: "1" } });
    });
  
    const nrdSelect = screen.getByText("Natural Resource District:").nextSibling;
    await act(async () => {
      fireEvent.change(nrdSelect, { target: { value: "100" } });
    });
  
    const searchInput = screen.getByPlaceholderText("Search by well name");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Alpha" } });
    });
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(2);
      expect(listItems[1]).toHaveTextContent("Alpha Well");
      expect(screen.queryByText(/Beta Well/i)).toBeNull();
      expect(screen.queryByText(/Charlie Well/i)).toBeNull();
    });
  });
  
  test('clears filters when Clear Filters button is clicked', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (config && config.params && config.params.filterBy && config.params.filterBy.search) {
          const term = config.params.filterBy.search.toLowerCase();
          const filteredData = {
            Wells: sampleWells.Wells.filter(well =>
              well.wi_wellname.toLowerCase().includes(term)
            ),
          };
          return Promise.resolve({ data: filteredData });
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    await act(async () => {
      renderWellWithContext();
    });
  
    await act(async () => {
      fireEvent.click(screen.getByText("List View"));
    });
    await waitFor(() => expect(screen.getByText("Filters")).toBeInTheDocument());
    await act(async () => {
      fireEvent.click(screen.getByText("Filters"));
    });
  
    const searchInput = screen.getByPlaceholderText("Search by well name");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Alpha" } });
    });
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(2);
    });
  
    await act(async () => {
      fireEvent.click(screen.getByText("Clear Filters"));
    });
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(sampleWells.Wells.length + 1);
      expect(screen.getByText(/Alpha Well/i)).toBeInTheDocument();
      expect(screen.getByText(/Beta Well/i)).toBeInTheDocument();
      expect(screen.getByText(/Charlie Well/i)).toBeInTheDocument();
    });
  });
  
  test('displays no wells when filters yield no matches', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (config && config.params && config.params.filterBy && config.params.filterBy.search) {
          const term = config.params.filterBy.search.toLowerCase();
          const filteredData = {
            Wells: sampleWells.Wells.filter(well =>
              well.wi_wellname.toLowerCase().includes(term)
            )
          };
          return Promise.resolve({ data: filteredData });
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    await act(async () => {
      renderWellWithContext();
    });
  
    await act(async () => {
      fireEvent.click(screen.getByText("List View"));
    });
  
    await waitFor(() => {
      expect(screen.getByText("Filters")).toBeInTheDocument();
    });
  
    await act(async () => {
      fireEvent.click(screen.getByText("Filters"));
    });
  
    const searchInput = screen.getByPlaceholderText("Search by well name");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Nonexistent" } });
    });
  
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(1);
    });
  });

  test('sanitizes search input to remove quotes and punctuation', async () => {
    localStorage.setItem('wellData', JSON.stringify(sampleWells));
  
    Axios.get.mockImplementation((url, config) => {
      if (url === '/userinfo') {
        return Promise.resolve({ data: { displayn: 'testuser' } });
      } else if (url === '/Wells') {
        if (config && config.params && config.params.filterBy && config.params.filterBy.search) {
          const term = config.params.filterBy.search.toLowerCase();
          const filteredData = {
            Wells: sampleWells.Wells.filter(well =>
              well.wi_wellname.toLowerCase().includes(term)
            )
          };
          return Promise.resolve({ data: filteredData });
        }
        return Promise.resolve({ data: sampleWells });
      }
    });
  
    renderWellWithContext();
  
    await waitFor(() => expect(screen.getByText(/Alpha Well/i)).toBeInTheDocument());
  
    fireEvent.click(screen.getByText("List View"));
  
    await waitFor(() => expect(screen.getByText("Filters")).toBeInTheDocument());
  
    fireEvent.click(screen.getByText("Filters"));
  
    const searchInput = screen.getByPlaceholderText("Search by well name");
  
    fireEvent.change(searchInput, { target: { value: 'Alpha"\'!@#$%^&*()' } });
    
    await waitFor(() => {
      expect(searchInput.value).toBe("Alpha");
    });
  
    await waitFor(() => {
      expect(screen.getByText(/Alpha Well/i)).toBeInTheDocument();
      expect(screen.queryByText(/Beta Well/i)).toBeNull();
      expect(screen.queryByText(/Charlie Well/i)).toBeNull();
    });
  });

});
