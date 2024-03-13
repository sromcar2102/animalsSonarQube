import { Animal } from "../models/animal.model";
import { IAnimal } from "../interfaces/animal.interface";
import { LocalStorageService } from "./common/local-storage.service"

export class AnimalStorageService {
    #key = "LOCALSTORATGE_ANIMAL";
    
    #localStorageService = new LocalStorageService();

    constructor(){
        const animals = this.#localStorageService.getItem(this.#key);

        if(!animals){
            this.#localStorageService.init(this.#key);
        }
    }

    getItems(): IAnimal[]{
        const localItems = this.#localStorageService.getItems();
        return JSON.parse(localItems[this.#key]); // JSON de localstorage_animals
    }

    setItems(animals: Animal[]){
        this.#localStorageService.setItem(this.#key, animals);
    }

    setItem(animal: Animal){
        const animals = this.getItems();
        this.#localStorageService.setItem(this.#key, [...animals, animal]);
    }

    deleteItem(animal: Animal){
        const animals = this.getItems().filter(_animal => _animal.id !== animal.id);
        this.#localStorageService.setItem(this.#key, animals);
    }
}