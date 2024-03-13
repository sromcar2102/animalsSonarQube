import { CustomStorage } from "../../interfaces/custom-storage.interface"

export class LocalStorageService extends CustomStorage {
  
  init(key: string, value = '[]') {
    localStorage.setItem(key, value);
  }
  
  getItem(key) {
    return localStorage.getItem(key);
  }

  getItems() {
    const items = { ...localStorage };
    return items;
  }

  setItem(key, value, stringify = true): void {
    localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
  }

  deleteItem(key: any): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
