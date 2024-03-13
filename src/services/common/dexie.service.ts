import { Dexie, IndexableType, Table } from "dexie";

// TODO: Separar
export class DexieService {

    #database: Dexie;
    store: Table<any, IndexableType>;

    constructor(databaseName: string, storeName: string, indexes: string) {
        this.#database = new Dexie(databaseName);
        this.#database.version(1).stores({
            [storeName]: indexes
        });
        this.store = this.#database.table(storeName);
    }

    public async save(values: any[]): Promise<any> {
        return await this.#database.transaction<any>("rw", this.store,
            async () => {
                return await this.store.bulkAdd(values);
            });
    }
    public create(value: any): Promise<any> {
        return this.store.add(value);
    }

    public delete(key: string): Promise<void> {
        return this.store.delete(key);
    }

    public clear(): Promise<void> {
        return this.store.clear();
    }

    public update(key: string, value: any): Promise<number> {
        return this.store.update(key, value);
    }

    public getAll(): Promise<any[]> {
        return this.store.toArray();
    }
}
