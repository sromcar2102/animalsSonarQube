import { AnimalGender } from "../enums/animal-gender";
import { AnimalSize } from "../enums/animal-size";
import { AnimalVaccine } from "../models/animal-vaccine.model";
import { UUID } from "../types/commons.type";

export interface IAnimal {
    id?: UUID;
    image: string;
    name: string;
    birthDate: Date;
    gender: AnimalGender;
    size: AnimalSize;
    breed: string;
    vaccines: AnimalVaccine[];
    update_at: Date;
    create_at: Date;
}
   