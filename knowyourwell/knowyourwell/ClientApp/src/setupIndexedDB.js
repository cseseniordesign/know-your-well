import Axios from 'axios';
import { openDB } from 'idb';

export const idbName = 'localDB';

export default function setupIndexedDB() {
  navigator.storage.persist();
  createLocalDB();
}

export async function putFallbackValues() {
  Axios.get("/tooltips", {
    responseType: "json",
  }).then((response) => {
    for (const tooltip of response.data.tooltip) {
      const {prompt_id: _, ...rest} = tooltip;
      putInDB(idbName, 'tblTooltip', rest, tooltip.prompt_id);
    }
    for (const tooltipImage of response.data.tooltipImage) {
      const {image_id: _, ...rest} = tooltipImage;
      putInDB(idbName, 'tblTooltip', rest, tooltipImage.image_id);
    }
  });
}

export function createLocalDB() {
  openDB(idbName, 1, {
    upgrade(db) {
      db.createObjectStore('tblTooltip', { keyPath: 'prompt_id' });
      db.createObjectStore('tblTooltipImage', { keyPath: 'image_id' });
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
  // ex. getFilteredValuesFromDB(idbName, 'tblTooltipImage', (record) => {return record.promptId === 'aquifertype'});
  const db = await openDB(database);
  const transaction = db.transaction(objectStore, 'readonly');
  const store = transaction.objectStore(objectStore);

  const allRecords = await store.getAll();

  const filteredRecords = allRecords.filter(filter);

  await transaction.done;
  return filteredRecords
}
