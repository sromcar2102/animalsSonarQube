import { IndexableType, Table } from "dexie";

import { Animal } from "../models/animal.model";
import { DexieService } from "./common/dexie.service";
import { UUID } from "../types/commons.type";

export class AnimalDexieService {
    
    #dexieService: DexieService = new DexieService('Animals', 'animals', 'id, name');

    public load(animals: Animal[]){
        this.#dexieService.clear();
        this.#dexieService.save(animals);
    }

    public create(animal: Animal){
        this.#dexieService.create(animal);
    }

    public delete(id: UUID): Promise<void> {
        return this.#dexieService.delete(id);
    }

    public update(animal: Animal){
        this.#dexieService.update(animal.id, animal);
    }

}