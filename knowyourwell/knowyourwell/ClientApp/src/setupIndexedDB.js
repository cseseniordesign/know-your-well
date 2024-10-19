import Axios from 'axios';
import { openDB } from 'idb';

const { BlobServiceClient } = require("@azure/storage-blob");


export const idbName = 'localDB';

export default async function setupIndexedDB() {
  navigator.storage.persist();
  await createLocalDB();
  await getRemoteTooltipImages();
  await getTooltipDataFromSqlDatabase();
}

async function createLocalDB() {
  // If you are updating the schema of the database, you need to increment the version number or users with a local instance of the IndexedDB will not have their database restructured.
  await openDB(idbName, 1, {
    upgrade(db) {
      db.createObjectStore('tblTooltip', { keyPath: 'prompt_id' });
      db.createObjectStore('tblTooltipImage', { keyPath: 'image_id' });
      db.createObjectStore('tooltip-images');
    }
  });
}

async function getRemoteTooltipImages() {
  const AZURE_STORAGE_CONNECTION_STRING = `\
  BlobEndpoint=https://knowyourwell.blob.core.windows.net/;\
  QueueEndpoint=https://knowyourwell.queue.core.windows.net/;\
  FileEndpoint=https://knowyourwell.file.core.windows.net/;\
  TableEndpoint=https://knowyourwell.table.core.windows.net/;\
  SharedAccessSignature=sp=rl&st=2024-10-18T20:43:54Z&se=2999-12-31T23:59:59Z&spr=https&sv=2022-11-02&sr=c&sig=aQklhPHpC%2F1rM%2FEr%2Fo8%2ByuiaRSk38CXW7wMZjuCmiig%3D`;

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING,
  );
  const containerClient = blobServiceClient.getContainerClient("tooltip-images");

  for await (const blobMetadata of containerClient.listBlobsFlat()) {
    const blobClient = containerClient.getBlobClient(blobMetadata.name);
    const downloadResponse = await blobClient.download();
    
    let blob;
    blob = await downloadResponse.blobBody;

    putInDB(idbName, 'tooltip-images', { blob: blob }, blobMetadata.name);
  }
}

export async function getTooltipDataFromSqlDatabase() {
  Axios.get("/tooltips", {
    responseType: "json",
  }).then((response) => {
    for (const tooltip of response.data.tooltip) {
      putInDB(idbName, 'tblTooltip', tooltip);
    }
    for (const tooltipImage of response.data.tooltipImage) {
      putInDB(idbName, 'tblTooltipImage', tooltipImage);
    }
  });
}

export async function putInDB(database, objectStore, value, key = undefined) {
  // Using put() rather than add() means that existing values will be overwritten
  const db = await openDB(database);
  db.put(objectStore, value, key);
  db.close();
}

export async function getFromDB(database, objectStore, key) {
  const db = await openDB(database);
  const value = db.get(objectStore, key);
  db.close();
  return value;
}

export async function getFilteredRecordsFromDB(database, objectStore, filter) {
  // `filter` is an arrow function, taking a single parameter, that either returns `true` or `false`.
  // ex. getFilteredValuesFromDB(idbName, 'tblTooltipImage', (record) => {return record.prompt_id === 'aquifertype'});
  const db = await openDB(database);
  const transaction = db.transaction(objectStore, 'readonly');
  const store = transaction.objectStore(objectStore);

  const allRecords = await store.getAll();

  const filteredRecords = allRecords.filter(filter);

  await transaction.done;
  return filteredRecords
}
