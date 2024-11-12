import {
    uploadBlob,
    downloadBlob,
    deleteBlob,
    __setUploadDataMock,
    __setDownloadMock,
    __setDeleteMock,
  } from '../../../../__mocks__/@azure/storage-blob';
  
  import { BlobServiceClient } from '../../../../__mocks__/@azure/storage-blob';
  
  describe('Azure Blob Storage Tests', () => {
    beforeEach(() => {
      __setUploadDataMock(() => Promise.resolve('Upload successful'));
      __setDownloadMock(() => Promise.resolve('Download successful'));
      __setDeleteMock(() => Promise.resolve('Delete successful'));
    });
  
    test('uploadBlob successfully uploads data', async () => {
      const data = Buffer.from('test data');
      await uploadBlob('testBlob', data);
  
      const containerClient = BlobServiceClient.fromConnectionString().getContainerClient();
      const blockBlobClient = containerClient.getBlockBlobClient('testBlob');
  
      expect(blockBlobClient.uploadData).toHaveBeenCalledWith(data);
    });
  
    test('downloadBlob successfully downloads data', async () => {
      await downloadBlob('testBlob');
  
      const containerClient = BlobServiceClient.fromConnectionString().getContainerClient();
      const blockBlobClient = containerClient.getBlockBlobClient('testBlob');
  
      expect(blockBlobClient.download).toHaveBeenCalled();
    });
  
    test('deleteBlob successfully deletes a blob', async () => {
      await deleteBlob('testBlob');
  
      const containerClient = BlobServiceClient.fromConnectionString().getContainerClient();
      const blockBlobClient = containerClient.getBlockBlobClient('testBlob');
  
      expect(blockBlobClient.delete).toHaveBeenCalled();
    });
  });
  