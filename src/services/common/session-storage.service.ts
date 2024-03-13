import { CustomStorage } from "../../interfaces/custom-storage.interface";

export class SessionStorageService extends CustomStorage {
  init(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
  getItem(key) {
    return sessionStorage.getItem(key);
  }

  getItems() {
    const items = { ...sessionStorage };
    return items;
  }

  setItem(key, value): void {
    sessionStorage.setItem(key, value);
  }

  deleteItem(key: any): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}