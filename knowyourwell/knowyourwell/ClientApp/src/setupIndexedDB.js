import { openDB } from 'idb';

export const idbName = 'localDB';

export default function setupIndexedDB() {
  navigator.storage.persist();
  createLocalDB();
}

// TODO: This is temporary. In the near future, this data will be pulled from the kyw database upon startup instead of being hard-coded. As long as we can make the assumption that an internet connection will always be present upon app startup (because the user cannot login without one), we shouldn't need to hard-code anything.
export async function putFallbackValues() {
  const aquifertypeText = 'An unconfined aquifer is easily accessible through the unsaturated layer and starts at the top of the water table and ends when there is an impermeable layer or bedrock beneath it. A confined aquifer, sometimes called an artesian aquifer, lies between two impermeable layers, called confining layers. Confined aquifers often have increased water pressure which, when accessed, may produce flowing water without the need for a pump.';
  const aquifertypeImageUrl = 'https://geology.utah.gov/wp-content/uploads/GW_cross-section-1-scaled-e1596482827551.jpg';
  const wellcoverText = 'Located at the top of the well and is usually the most visible. The head is a durable piece of PVC or metal that is capped to keep debris out of the well. A smaller pipe is attached protecting the wires attached to the pump. It is often above ground, but sometimes may be located inside a well house or well pit.';
  const wellcoverImageUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.N1NOQEarWQjkMo1PkD2VcAAAAA%26pid%3DApi&f=1&ipt=37aacc00ef62e433e11889330d6193193a84dfed1e97953a2321103309d1d734&ipo=images';
  
  // We need to clear the images before we put them in the db because the key is autoIncremented, not derived. We may want to figure out a way to derive the key.
  const db = await openDB(idbName);
  db.clear('tblTooltipImages');
  db.close();

  // The URL https://justcors.com/tl_aab51cc/ is a proxy that adds CORS headers to the request, allowing it to resolve. This URL needs to be changed every day for the images to be resolved - the new one can be found at https://justcors.com/. We don't need to look for a more permenant solution because the images will be pulled from the kyw database instead in the near future.
  fetch(`https://justcors.com/tl_aab51cc/${aquifertypeImageUrl}`)
  .then(response => response.blob())
  .then(blob => {
    putInDB(idbName, 'tblTooltipImages', { promptId: 'aquifertype', blob: blob });
  });
  fetch(`https://justcors.com/tl_aab51cc/${wellcoverImageUrl}`)
  .then(response => response.blob())
  .then(blob => {
    putInDB(idbName, 'tblTooltipImages', { promptId: 'wellcover', blob: blob });
  });

  putInDB(idbName, 'tblTooltips', { text: aquifertypeText }, 'aquifertype');
  putInDB(idbName, 'tblTooltips', { text: wellcoverText }, 'wellcover');
}

export function createLocalDB() {
  openDB(idbName, 1, {
    upgrade(db) {
      db.createObjectStore('tblTooltips');
      db.createObjectStore('tblTooltipImages', { keyPath: 'id', autoIncrement: true });
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
  // ex. getFilteredValuesFromDB(idbName, 'tblTooltipImages', (record) => {return record.promptId === 'aquifertype'});
  const db = await openDB(database);
  const transaction = db.transaction(objectStore, 'readonly');
  const store = transaction.objectStore(objectStore);

  const allRecords = await store.getAll();

  const filteredRecords = allRecords.filter(filter);

  await transaction.done;
  return filteredRecords
}
