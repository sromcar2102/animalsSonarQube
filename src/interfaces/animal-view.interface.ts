import { UUID } from "../types/commons.type";
import { Animal } from "../models/animal.model";

export abstract class AnimalView {
    abstract removeAnimal(id: UUID): void;
    abstract showAnimals(animals: Animal[], callbackRemove, callbackUpdate): void;
    abstract addAnimal(animal: Animal, callbackRemove, callbackUpdate): void;
    abstract updateAnimal(animal: Animal): void;

}