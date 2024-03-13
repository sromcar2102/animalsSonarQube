import { AnimalGender } from "../enums/animal-gender";
import { AnimalSize } from "../enums/animal-size";
import { AnimalVaccine } from "./animal-vaccine.model";
import { IAnimal } from "../interfaces/animal.interface";
import { UUID } from "../types/commons.type";
import { v4 as uuidv4 } from 'uuid';

export class Animal implements IAnimal{

    #image: string;
    #id: UUID;
    #name: string;
    #birthDate: Date;
    #gender: AnimalGender;
    #size: AnimalSize;
    #breed: string;
    #vaccines: AnimalVaccine[] = [];
    #update_at: Date;
    #create_at: Date;

    constructor(animal: IAnimal) {
        this.#image = animal.image;
        this.#id = animal.id || uuidv4();
        this.#name = animal.name;
        this.#birthDate = new Date(animal.birthDate);
        this.#gender = animal.gender;
        this.#size = animal.size;
        this.#breed = animal.breed;    
        this.#vaccines = (animal.vaccines || []).map(animalVaccine => new AnimalVaccine(animalVaccine));
        this.#update_at = animal.update_at ? new Date(animal.update_at) : new Date();
        this.#create_at = animal.create_at ? new Date(animal.create_at) : new Date();
    }

    public get id(): string{
        return this.#id;
    }
    public get name(): string {
        return this.#name;
    }

    public get birthDate():Date{
        return this.#birthDate;
    }
    
    public get gender() : AnimalGender {
        return this.#gender;
    }

    public get size() : AnimalSize {
        return this.#size;
    }

    public get breed(): string{
        return this.#breed;
    }

    public get vaccines(): AnimalVaccine[] {
        return this.#vaccines;
    }
    public get update_at(): Date{
        return this.#update_at;
    }

    public get create_at():Date{
        return this.#create_at;
    }

    public get image():string{
        return this.#image;
    }
    
    toJSON(){
        return {
            image: this.#image,
            id: this.#id,
            name: this.#name,
            birthDate : this.#birthDate,
            gender: this.#gender,
            size: this.#size,
            breed: this.#breed,
            vaccines: this.#vaccines.map((vaccine) => vaccine.toJSON()),
            update_at: this.#update_at,
            create_at: this.#create_at,
        }
    }
}