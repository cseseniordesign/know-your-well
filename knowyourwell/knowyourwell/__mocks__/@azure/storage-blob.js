const mockCreateIfNotExists = jest.fn();
const mockUploadData = jest.fn();

export const BlobServiceClient = {
  fromConnectionString: jest.fn(() => ({
    getContainerClient: jest.fn(() => ({
      createIfNotExists: mockCreateIfNotExists,
      getBlockBlobClient: jest.fn(() => ({
        uploadData: mockUploadData,
      })),
    })),
  })),
};

export const __setCreateIfNotExistsMock = (impl) => {
  mockCreateIfNotExists.mockImplementation(impl);
};

export const __setUploadDataMock = (impl) => {
  mockUploadData.mockImplementation(impl);
};