import { AnimalNotFoundException, BackendException } from '../exceptions/';

import { Animal } from "../models/animal.model";
import { AnimalDexieService } from './animal-dexie.service';
import { AnimalStorageService } from "./animal-storage.service"
import { HttpService } from './common/http.service';
import { UUID } from "../types/commons.type";

export class AnimalService {
    endpoint = 'http://127.0.0.1:3000/animals';
    #animals: Map<UUID, Animal> = new Map();

    constructor(private readonly httpService: HttpService, private readonly animalStorageService: AnimalStorageService, private readonly animalDexieService: AnimalDexieService) { }

    public async load(): Promise<Map<UUID, Animal>> {
        
        const localAnimals = this.animalStorageService.getItems(); // Recoge del localStorage
        this.#animals = new Map(localAnimals.map(animal => [animal.id, new Animal(animal)])); // Carga en ram del localStorage
        
        const serverAnimals = await this.httpService.get(this.endpoint); //Recoge del servidor
        this.animalDexieService.load(serverAnimals);
        this.animalStorageService.setItems(serverAnimals); //Guarda en el localStorage
        this.#animals = new Map(serverAnimals.map(animal => [animal.id, new Animal(animal)])); // Machaca con los datos del servidor
        
        return this.#animals;
    }
    
    toArray(): Animal[] {
        return Array.from(this.#animals.values());
    }

    async create(animal: Animal): Promise<void> { 
        try {
            this.#animals.set(animal.id, animal);
            this.animalStorageService.setItem(animal);
            this.animalDexieService.create(animal);
            return await this.httpService.post(this.endpoint, animal);
        } catch (e) {
            this.#animals.delete(animal.id);
            this.animalDexieService.delete(animal.id);
            this.animalStorageService.deleteItem(animal);
            throw new BackendException('Error al agregar');
        }
            
    }
    
    remove(id: UUID): Promise<any> { 
        const animal = this.#animals.get(id);
        if (!animal) {
            throw new AnimalNotFoundException(id);
        }
        this.#animals.delete(id); // MEMORIA RAM 
        this.animalStorageService.setItems(this.toArray());
        this.animalDexieService.delete(id);
        return this.httpService.delete(`${this.endpoint}/${id}`)  //BACKEND
            .catch(e => {
                this.#animals.set(id, animal);
                this.animalStorageService.setItems(this.toArray());
                this.animalDexieService.create(animal);
                throw new BackendException(`Error en el servidor: ${e.message}`);
        })

    }
    
    async update(id: UUID, animalToUpdate: Animal) { 
        const animal = this.#animals.get(id);
        if (!animal) {
            throw new AnimalNotFoundException(id);
        }
        try {
            this.#animals.set(id, animalToUpdate);
            this.animalStorageService.setItems(this.toArray());
            this.animalDexieService.update(animalToUpdate);
            return await this.httpService.put(`${this.endpoint}/${id}`, animalToUpdate);
        } catch (e) {
            this.#animals.set(id, animal);
            this.animalStorageService.setItems(this.toArray());
            this.animalDexieService.update(animal);
            throw new BackendException(`Error en el servidor: ${e.message}`);
        }
    }

    find(): Animal[] { 
       return Array.from(this.#animals.values());
    }
    
    findOne(id: UUID): Promise<Animal> { 
        const animal = this.#animals.get(id);
        if(!animal){
            return this.httpService.get(`${this.endpoint}/${id}`).then(animal => new Animal(animal));
        }
        return Promise.resolve(animal);
    }
    
    /* Versión Async-Await */
   /* async findOne(id: UUID): Promise<Animal> { 
        const animal = this.#animals.get(id);
        if(!animal){
            const animal = await this.httpService.get(`${this.endpoint}/${id}`)
            return new Animal(animal);
        }
        return animal;
    }*/
    

}