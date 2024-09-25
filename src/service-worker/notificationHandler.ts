import {
  GenerateNextImageProxy,
  IDB_NotiCache_Config,
  IDB_NotiCache_DBName,
  IDB_NotiCache_DBStoreName,
  StoredNotificationItem,
} from "@/components/base/NotificationManager";

export async function SaveAndCacheImage(url?: string) {
  if (!url)
    return {
      img_bin: null,
      img_src_url: url,
    };
  try {
    const imageFetch = fetch(GenerateNextImageProxy(url), {});
    imageFetch.catch(console.error);
    const image = await imageFetch;
    return {
      img_bin: await image.blob(),
      img_src_url: url,
    };
  } catch (e) {
    console.error("error", e);
    return {
      img_bin: null,
      img_src_url: url,
    };
  }
}

let tempdb: IDBDatabase | null = null;
export function InitIndexeddb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const DBOpenRequest = indexedDB.open(
      IDB_NotiCache_Config.databaseName,
      IDB_NotiCache_Config.version
    );
    DBOpenRequest.onupgradeneeded = (e) => {
      tempdb = DBOpenRequest.result;
      tempdb.onerror = (event) => {
        console.error("ERROR!", e);
      };

      IDB_NotiCache_Config.stores.forEach((val) => {
        if (!tempdb) return;
        const objectStore = tempdb.createObjectStore(val.name, {
          keyPath: val.id.keyPath,
          autoIncrement: val.id.autoIncrement ?? true,
        });
        val.indices.forEach((indice) => {
          objectStore.createIndex(indice.name, indice.keyPath, indice.options);
        });
      });

      console.info("noti cache from sw started!", e);
    };
    DBOpenRequest.onsuccess = () => {
      resolve(DBOpenRequest.result);
    };
    DBOpenRequest.onerror = (e) => {
      reject();
      console.error("ERROR!", e);
    };
  });
}

export async function UpdateNotiCache(
  db: IDBDatabase,
  item: StoredNotificationItem
) {
  console.log(db, item);
  if (!db) return;
  console.log(db, item);
  const bin = await SaveAndCacheImage(item.img_src_url);
  const transaction = db.transaction([IDB_NotiCache_DBStoreName], "readwrite");
  const data: StoredNotificationItem = { ...bin, ...item };
  console.log(transaction, bin, db, data);
  transaction.objectStore(IDB_NotiCache_DBStoreName).add(data);
  transaction.oncomplete = (e) => {
    console.info("SUCCESS", e);
  };
}
