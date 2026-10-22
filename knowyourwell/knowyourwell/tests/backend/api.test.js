/**
 * api.test.js
 * 
 * This module contains tests for the backend API endpoints.
 */

const request = require("supertest");
const createApp = require("../../app.js");

function createFakePool({ recordset = [], queryError } = {}) {
  const query = jest.fn(async () => {
    if (queryError) {
      throw queryError;
    }

    return { recordset };
  });

  const dbRequest = {
    input: jest.fn().mockReturnThis(),
    query,
  };

  return {
    pool: {
      request: jest.fn(() => dbRequest),
    },
    sqlClient: { Int: "SQL_INT" },
    dbRequest,
  };
}

describe("backend API", () => {
  test("GET /heartbeat responds successfully", async () => {
    const { pool, sqlClient } = createFakePool();
    const app = createApp({ pool, sqlClient });

    await request(app).get("/heartbeat").expect(200);
  });

  test("GET /LandFeatures returns rows for the requested well", async () => {
    const rows = [{ well_id: 42, lf_type: "Crop Land" }];
    const { pool, sqlClient, dbRequest } = createFakePool({ recordset: rows });
    const app = createApp({ pool, sqlClient });

    const response = await request(app)
      .get("/LandFeatures")
      .query({ well_id: 42 })
      .expect(200);

    expect(response.body).toEqual({ LandFeatures: rows });
    expect(dbRequest.input).toHaveBeenCalledWith("well_id", "SQL_INT", "42");
    expect(dbRequest.query).toHaveBeenCalledWith(
      "SELECT * FROM dbo.tblLandFeature WHERE well_id = @well_id",
    );
  });

  test("GET /LandFeatures responds with 500 when the database query fails", async () => {
    const { pool, sqlClient } = createFakePool({ queryError: new Error("database unavailable") });
    const app = createApp({ pool, sqlClient });
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      await request(app)
        .get("/LandFeatures")
        .query({ well_id: 42 })
        .expect(500, "SERVER ERROR");
    } finally {
      consoleError.mockRestore();
    }
  });
});