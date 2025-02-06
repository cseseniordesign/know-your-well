import { __setCreateIfNotExistsMock, __setUploadDataMock } from '@azure/storage-blob';
import photoUpload from '../reusable/photoUpload';

global.alert = jest.fn();

jest.mock('@azure/storage-blob');

describe('uploadPhoto function', () => {
  beforeEach(() => {
    __setCreateIfNotExistsMock(async () => {});
    __setUploadDataMock(async () => {});
    global.alert.mockClear();
  });

  test('successfully uploads a blob to Azure Blob Storage', async () => {
    const mockBlob = new Blob(['mock image data'], { type: 'image/png' });
    const container = 'testContainer';
    const name = 'testBlob';
    const fileName = 'fileName.png';

    await expect(photoUpload(mockBlob, container, name, fileName)).resolves.toBeUndefined();
  });

  test('handles network failure during blob upload', async () => {
    __setUploadDataMock(async () => {
      throw new Error('Simulated network failure');
    });

    const mockBlob = new Blob(['mock image data'], { type: 'image/png' });
    const container = 'testContainer';
    const name = 'testBlob';
    const fileName = 'fileName.png';

    await expect(photoUpload(mockBlob, container, name, fileName)).rejects.toThrow(
      'Simulated network failure'
    );
  });
});
