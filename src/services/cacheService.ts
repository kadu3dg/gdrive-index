import { openDB } from 'idb';

const DB_NAME = 'gdrive-who-cache';
const STORE_NAME = 'files';
const DB_VERSION = 1;

interface CacheItem {
  key: string;
  data: any;
  timestamp: number;
  expiresIn: number;
}

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
};

export const cacheService = {
  async set(key: string, data: any, expiresIn = 3600000) { // 1 hora por padrão
    const db = await initDB();
    const item: CacheItem = {
      key,
      data,
      timestamp: Date.now(),
      expiresIn,
    };
    await db.put(STORE_NAME, item);
  },

  async get(key: string): Promise<any> {
    const db = await initDB();
    const item = await db.get(STORE_NAME, key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.expiresIn) {
      await db.delete(STORE_NAME, key);
      return null;
    }
    
    return item.data;
  },

  async clear() {
    const db = await initDB();
    await db.clear(STORE_NAME);
  },

  async clearExpired() {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const items = await store.getAll();
    
    const now = Date.now();
    const expired = items.filter(item => now - item.timestamp > item.expiresIn);
    
    await Promise.all(expired.map(item => store.delete(item.key)));
    await tx.done;
  }
}; 