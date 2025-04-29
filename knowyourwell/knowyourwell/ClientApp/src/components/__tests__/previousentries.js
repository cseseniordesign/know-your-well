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

describe('Previous Entries page', () => {
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

  const sql = require("mssql");

jest.mock("mssql");

describe("Water Science Lab logic", () => {
  let mockReq, mockRes, mockTransaction, mockRequest;

  beforeEach(() => {
    mockReq = {
      query: {
        watersciencelab_id: 1,
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn(),
    };

    mockTransaction = {
      begin: jest.fn((cb) => cb(null)),
      commit: jest.fn((cb) => cb(null)),
      rollback: jest.fn((cb) => cb(null)),
      on: jest.fn(),
    };

    sql.ConnectionPool.mockImplementation(() => ({
      transaction: () => mockTransaction,
      request: () => mockRequest,
    }));
  });

  test("should return a successful WaterScienceLabEntry", () => {
    mockRequest.query.mockImplementation((query, cb) => {
      cb(null, {
        recordset: [{ watersciencelab_id: 1, samplecode: "ABC" }],
      });
    });

    const appPool = new sql.ConnectionPool({});
    const transaction = appPool.transaction();
    transaction.begin((err) => {
      if (err) console.error("Transaction Failed");
      const request = appPool.request(transaction);
      let rolledBack = false;

      transaction.on("rollback", (aborted) => {
        rolledBack = true;
      });

      request
        .input("watersciencelab_id", sql.Int, mockReq.query.watersciencelab_id)
        .query(
          "SELECT * FROM dbo.tblWaterScienceLab WHERE watersciencelab_id = @watersciencelab_id;",
          function (err, recordset) {
            if (err) {
              mockRes.status(500).send("Query does not execute.");
              if (!rolledBack) {
                transaction.rollback(() => {});
              }
            } else {
              transaction.commit((err) => {
                if (err) {
                  mockRes.status(500).send("500: Server Error.");
                } else {
                  mockRes
                    .status(200)
                    .json({ WaterScienceLabEntry: recordset.recordset });
                }
              });
            }
          },
        );
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      WaterScienceLabEntry: [{ watersciencelab_id: 1, samplecode: "ABC" }],
    });
  });

  test("should return WaterScienceLabEntries by fieldactivity_id", () => {
    const mockReq = {
      query: {
        fieldactivity_id: 5,
      },
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn(),
    };
  
    const mockTransaction = {
      begin: jest.fn((cb) => cb(null)),
      commit: jest.fn((cb) => cb(null)),
      rollback: jest.fn((cb) => cb(null)),
      on: jest.fn(),
    };
  
    sql.ConnectionPool.mockImplementation(() => ({
      transaction: () => mockTransaction,
      request: () => mockRequest,
    }));
  
    mockRequest.query.mockImplementation((query, cb) => {
      cb(null, {
        recordset: [
          { watersciencelab_id: 10, fieldactivity_id: 5, samplecode: "WSL123" },
        ],
      });
    });
  
    const appPool = new sql.ConnectionPool({});
    const transaction = appPool.transaction();
    transaction.begin((err) => {
      if (err) console.error("Transaction Failed");
      const request = appPool.request(transaction);
      let rolledBack = false;
  
      transaction.on("rollback", (aborted) => {
        rolledBack = true;
      });
  
      request
        .input("fieldactivity_id", sql.Int, mockReq.query.fieldactivity_id)
        .query(
          "SELECT * FROM dbo.tblWaterScienceLab WHERE fieldactivity_id = @fieldactivity_id;",
          function (err, recordset) {
            if (err) {
              mockRes.status(500).send("Query does not execute.");
              if (!rolledBack) {
                transaction.rollback(() => {});
              }
            } else {
              transaction.commit((err) => {
                if (err) {
                  mockRes.status(500).send("500: Server Error.");
                } else {
                  mockRes
                    .status(200)
                    .json({ WaterScienceLabEntries: recordset.recordset });
                }
              });
            }
          },
        );
    });
  
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      WaterScienceLabEntries: [
        { watersciencelab_id: 10, fieldactivity_id: 5, samplecode: "WSL123" },
      ],
    });
  });

  test("should return ClassLabEntries by fieldactivity_id", () => {
    const mockReq = {
      query: { fieldactivity_id: 3 },
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn(),
    };
  
    const mockTransaction = {
      begin: jest.fn((cb) => cb(null)),
      commit: jest.fn((cb) => cb(null)),
      rollback: jest.fn((cb) => cb(null)),
      on: jest.fn(),
    };
  
    sql.ConnectionPool.mockImplementation(() => ({
      transaction: () => mockTransaction,
      request: () => mockRequest,
    }));
  
    mockRequest.query.mockImplementation((query, cb) => {
      cb(null, {
        recordset: [{ classlab_id: 1, fieldactivity_id: 3, nitrate: 6.5 }],
      });
    });
  
    const appPool = new sql.ConnectionPool({});
    const transaction = appPool.transaction();
    transaction.begin(() => {
      const request = appPool.request(transaction);
      let rolledBack = false;
  
      transaction.on("rollback", () => {
        rolledBack = true;
      });
  
      request
        .input("fieldactivity_id", sql.Int, mockReq.query.fieldactivity_id)
        .query(
          "SELECT * FROM dbo.tblClassroomLab WHERE fieldactivity_id = @fieldactivity_id;",
          function (err, recordset) {
            if (err) {
              mockRes.status(500).send("Query does not execute.");
              if (!rolledBack) transaction.rollback(() => {});
            } else {
              transaction.commit((err) => {
                if (err) {
                  mockRes.status(500).send("500: Server Error.");
                } else {
                  mockRes
                    .status(200)
                    .json({ ClassLabEntries: recordset.recordset });
                }
              });
            }
          },
        );
      });
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        ClassLabEntries: [{ classlab_id: 1, fieldactivity_id: 3, nitrate: 6.5 }],
      });
    });
  });
});
