import { Animal } from "../models/animal.model";
import { AnimalCard } from './templates/animal-card.component';
import { AnimalView } from "../interfaces/animal-view.interface";
import { UUID } from "../types/commons.type";

export class AnimalListView extends AnimalView{
    
    private animalsCard: AnimalCard[] = [];
    private cardLayout: HTMLElement = document.querySelector('#root');

    public showAnimals(animals: Animal[], callbackRemove, callbackUpdate): void { 
        this.cardLayout.innerHTML = "";
        for (const animal of animals) {
            const card = new AnimalCard();
            this.cardLayout.appendChild(card.render(animal, callbackRemove, callbackUpdate));
            this.animalsCard.push(card);
        }

    }

    public removeAnimal(id: UUID): void {
        const animalInCard = document.querySelector(`[data-id="${id}"]`);
        animalInCard.remove();
    }

    addAnimal(animal: Animal, callbackRemove: any, callbackUpdate: any): void {
        const card = new AnimalCard();
        this.animalsCard.push(card);
        
        this.cardLayout.appendChild(card.render(animal, callbackRemove, callbackUpdate))
    }

    updateAnimal(animal: Animal): void {
        const card = this.animalsCard.find(c => c.id === animal.id);
        card.updateAnimal(animal);
    }
    
}