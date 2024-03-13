export abstract class CustomStorage {
    abstract init(keyLocalStorage: string, value: string): void;
    abstract getItem(key);
    abstract getItems();
    abstract setItem(key, value);
    abstract deleteItem(key);
    abstract clear();
}