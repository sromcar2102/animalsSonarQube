import { IAnimalVaccine } from "../interfaces/animal-vaccine.interface";
import { Vaccine } from "./vaccine.model";

export class AnimalVaccine implements IAnimalVaccine{
    #date: Date;
    #vaccine: Vaccine;

    constructor(animalVaccine: IAnimalVaccine) {
        this.#vaccine = animalVaccine.vaccine;
        this.#date = animalVaccine.date;
    }

    public get date(): Date {
        return this.#date;
    }

    public get vaccine(): Vaccine {
        return this.#vaccine;
    }

    toJSON(){
        return {
            vaccine: {
                id: this.#vaccine.id,
                name: this.#vaccine.name,
            },
            date: this.#date
        }
    }
}