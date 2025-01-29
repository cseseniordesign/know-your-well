import { uploadPhotoOffline, retryUploads, getUploadQueue, clearUploadQueue } from '../images';
import { openDB } from 'idb';
import 'fake-indexeddb/auto';
import structuredClone from '@ungap/structured-clone';

global.structuredClone = structuredClone;

// Mock the image-related functions
jest.mock('../images', () => ({
  uploadPhotoOffline: jest.fn(),
  retryUploads: jest.fn(),
  getUploadQueue: jest.fn(),
  clearUploadQueue: jest.fn(),
}));

describe('Offline Photo Upload', () => {
  let db;
  let navigatorOnLineSpy;

  // Set up IndexedDB for testing       
  beforeAll(async () => {
    db = await openDB('test-db', 1, {
      upgrade(db) {
        db.createObjectStore('photos', {
          keyPath: 'id',
          autoIncrement: true,
        });
      },
    });
  });

  // Reset mocks and navigator status before each test
  beforeEach(() => {
    jest.clearAllMocks();
    navigatorOnLineSpy = jest.spyOn(global.navigator, 'onLine', 'get');
  });

  // Clean up the IndexedDB after tests
  afterAll(async () => {
    await db.clear('photos');
    db.close();
  });

  it('should save a photo to IndexedDB when offline', async () => {
    // Prepare mock photo and simulate offline mode
    const mockPhoto = { id: 1, name: 'test-photo.jpg', data: 'mock-image-data' };
    navigatorOnLineSpy.mockReturnValue(false);

    // Mock saving photo to IndexedDB
    uploadPhotoOffline.mockImplementation(async (photo) => {
      await db.add('photos', photo);
    });

    // Call function to save photo offline
    await uploadPhotoOffline(mockPhoto);

    // Verify photo is saved in IndexedDB
    const savedPhoto = await db.get('photos', 1);
    expect(savedPhoto).toEqual(mockPhoto);
  });

  it('should add photos to the upload queue if offline', async () => {
    // Prepare multiple mock photos and simulate offline mode
    const mockPhoto1 = { id: 4, name: 'test-photo-4.jpg', data: 'mock-image-data-4' };
    const mockPhoto2 = { id: 5, name: 'test-photo-5.jpg', data: 'mock-image-data-5' };
    navigatorOnLineSpy.mockReturnValue(false);

    // Mock saving multiple photos to IndexedDB
    uploadPhotoOffline.mockImplementation(async (photo) => {
      await db.add('photos', photo);
    });

    // Call function to save multiple photos offline
    await uploadPhotoOffline(mockPhoto1);
    await uploadPhotoOffline(mockPhoto2);

    // Verify that all photos are saved in IndexedDB
    const savedPhoto1 = await db.get('photos', 4);
    const savedPhoto2 = await db.get('photos', 5);
    expect(savedPhoto1).toEqual(mockPhoto1);
    expect(savedPhoto2).toEqual(mockPhoto2);

    // Verify upload queue contents
    getUploadQueue.mockResolvedValue([mockPhoto1, mockPhoto2]);
    const uploadQueue = await getUploadQueue();
    expect(uploadQueue).toContainEqual(mockPhoto1);
    expect(uploadQueue).toContainEqual(mockPhoto2);
  });

  it('should retry photo uploads when coming back online', async () => {
    // Prepare a single mock photo and simulate offline mode
    const mockPhoto = { id: 2, name: 'test-photo-2.jpg', data: 'mock-image-data' };
    navigatorOnLineSpy.mockReturnValue(false);
    uploadPhotoOffline.mockImplementation(async (photo) => {
      await db.add('photos', photo);
    });
    await uploadPhotoOffline(mockPhoto);
    navigatorOnLineSpy.mockReturnValue(true);

    // Simulate reconnection and retry photo upload
    retryUploads.mockResolvedValueOnce(true);
    await retryUploads();

    // Verify retryUploads was called
    expect(retryUploads).toHaveBeenCalled();
  });

  it('should retry all photos in the queue when coming back online', async () => {
    // Prepare multiple mock photos and simulate offline mode
    const mockPhoto1 = { id: 6, name: 'test-photo-6.jpg', data: 'mock-image-data-6' };
    const mockPhoto2 = { id: 7, name: 'test-photo-7.jpg', data: 'mock-image-data-7' };
    navigatorOnLineSpy.mockReturnValue(false);
    uploadPhotoOffline.mockImplementation(async (photo) => {
      await db.add('photos', photo);
    });
    await uploadPhotoOffline(mockPhoto1);
    await uploadPhotoOffline(mockPhoto2);
    navigatorOnLineSpy.mockReturnValue(true);

    // Simulate reconnection and retry all photo uploads
    retryUploads.mockResolvedValueOnce(true);
    await retryUploads();

    // Verify retryUploads was called once and queue is cleared
    expect(retryUploads).toHaveBeenCalledTimes(1);

    clearUploadQueue.mockResolvedValueOnce();
    await clearUploadQueue();
    getUploadQueue.mockResolvedValue([]);
    const uploadQueue = await getUploadQueue();
    expect(uploadQueue).toEqual([]);
  });

  it('should handle errors during retryUploads', async () => {
    // Prepare a mock photo and simulate offline mode
    const mockPhoto = { id: 3, name: 'test-photo-3.jpg', data: 'mock-image-data' };
    navigatorOnLineSpy.mockReturnValue(false);
    uploadPhotoOffline.mockImplementation(async (photo) => {
      await db.add('photos', photo);
    });
    await uploadPhotoOffline(mockPhoto);
    navigatorOnLineSpy.mockReturnValue(true);

    // Simulate failure during retryUploads and verify error handling
    retryUploads.mockRejectedValueOnce(new Error('Upload failed'));
    await expect(retryUploads()).rejects.toThrow('Upload failed');
  });
});
