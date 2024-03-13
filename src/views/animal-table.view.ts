import { AnimalView } from "../interfaces/animal-view.interface";
import { Animal } from "../models/animal.model";
import { UUID } from "../types/commons.type";
import { TableComponent } from './templates/table.component';

export class AnimalTableView extends AnimalView{
   
    private tableComponent: TableComponent = new TableComponent();

    public showAnimals(animals: Animal[], callbackRemove, callbackUpdate): void { 
        this.tableComponent.animals = animals;
        this.tableComponent.render(callbackRemove, callbackUpdate);

    }
    public removeAnimal(id: UUID) { 
        const animalInTable = document.querySelector(`[data-id="${id}"]`);
        animalInTable.remove();
    }
    public addAnimal(animal: Animal, callbackRemove, callbackUpdate): void {
        this.tableComponent.addAnimal(animal, callbackRemove, callbackUpdate);
    }
    public updateAnimal(animal: Animal): void {
        this.tableComponent.updateAnimal(animal);
    }
}