import { AnimalView } from "../interfaces/animal-view.interface";
import { IAnimal } from "../interfaces/animal.interface";
import { Animal } from "../models/animal.model";
import { AnimalService } from "../services/animal.service";
import { VaccineService } from "../services/vaccine.service";

import { UUID } from "../types/commons.type";
import { AnimalFormView } from '../views/animal-form.view';

export class AnimalController {
    #view: AnimalView;
    #animalService: AnimalService;
    #vaccineService: VaccineService;
    #animalFormView: AnimalFormView;

    constructor(
        animalService: AnimalService,
        vaccineService: VaccineService, 
        animalView: AnimalView,
        animalFormView: AnimalFormView,
    ) {
        this.#animalService = animalService;
        this.#vaccineService = vaccineService;
/*         this.#vaccineService.load().then(
            vaccines => this.#animalFormView.vaccines = vaccines
        ); */
        
        this.view = animalView;
        this.#animalFormView = animalFormView;

        this.#animalFormView.bindCreateAnimal(this.handleAddAnimal);
        this.#animalFormView.bindFormUpdateAnimal(this.handleFormUpdateAnimal);
    }

    public set view(view) {
        this.#view = view;
        this.#animalService.load()
            .then((animals: Map<UUID, Animal>) => {
                this.#view.showAnimals(Array.from(animals.values()), this.handleRemoveAnimal, this.handleUpdateAnimal);
            })
    }
    handleRemoveAnimal = (id: UUID) => {
        this.#view.removeAnimal(id);
        this.#animalService.remove(id);
    }
    handleUpdateAnimal = (id: UUID) => {
        this.#animalService.findOne(id).then(animal => this.#animalFormView.fillForm(animal));
    }
    handleAddAnimal = (animal /*: InterfazAnimalEspecíficoDeLaVista */) => {
        const animalToCreate = new Animal(animal);
        this.#animalService.create(animalToCreate)/* .then(
            () => this.#view.showSuccessful('Animal agregado')
        ) */;
        this.#view.addAnimal(animalToCreate, this.handleRemoveAnimal, this.handleUpdateAnimal);
    }
    handleFormUpdateAnimal = async (animal: IAnimal) => {
        const animalToUpdate = new Animal(animal);
        const animalOld = new Animal(await this.#animalService.findOne(animalToUpdate.id));
        try {
            this.#animalService.update(animalToUpdate.id, animalToUpdate)
        } catch (e) {
            this.#view.updateAnimal(animalOld);
        }
        this.#view.updateAnimal(animalToUpdate);
    }
}