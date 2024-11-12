const mockCreateIfNotExists = jest.fn();
const mockUploadData = jest.fn();
const mockDownload = jest.fn();
const mockDelete = jest.fn();

// Mocking BlobServiceClient to simulate Azure Blob operations
export const BlobServiceClient = {
  fromConnectionString: jest.fn(() => ({
    getContainerClient: jest.fn(() => ({
      createIfNotExists: mockCreateIfNotExists,
      getBlockBlobClient: jest.fn(() => ({
        uploadData: mockUploadData,
        download: mockDownload,
        delete: mockDelete,
      })),
    })),
  })),
};

// Standalone function wrappers to make usage more direct in tests
export const uploadBlob = async (blobName, data) => {
  const containerClient = BlobServiceClient.fromConnectionString('fakeConnectionString').getContainerClient('fakeContainer');
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  return blockBlobClient.uploadData(data);
};

export const downloadBlob = async (blobName) => {
  const containerClient = BlobServiceClient.fromConnectionString('fakeConnectionString').getContainerClient('fakeContainer');
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  return blockBlobClient.download();
};

export const deleteBlob = async (blobName) => {
  const containerClient = BlobServiceClient.fromConnectionString('fakeConnectionString').getContainerClient('fakeContainer');
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  return blockBlobClient.delete();
};

// Mock functions that can be used to set different behaviors in your tests
export const __setCreateIfNotExistsMock = (impl) => {
  mockCreateIfNotExists.mockImplementation(impl);
};

export const __setUploadDataMock = (impl) => {
  mockUploadData.mockImplementation(impl);
};

export const __setDownloadMock = (impl) => {
  mockDownload.mockImplementation(impl);
};

export const __setDeleteMock = (impl) => {
  mockDelete.mockImplementation(impl);
};
