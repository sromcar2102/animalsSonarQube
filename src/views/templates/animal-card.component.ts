import { Animal } from '../../models/animal.model';
import { UUID } from '../../types/commons.type';
import { format } from 'date-fns';

export class AnimalCard {
    private card: HTMLElement;
    
    constructor() { }

    get id(){
        return this.card.dataset.id ;
    }
    
    public render(animal: Animal, callbackRemove, callbackUpdate) {
        this.card = document.createElement('form');
        this.card.classList.add('card'); //<form class="card";
        this.card.dataset.id = animal.id; //<form class="card" data-id="834lkjfas-"
        this.card.innerHTML = `
        <div><img src="./../../assets/images/${animal?.image}" onerror="${(this as any).src = '../../assets/images/abisinio.png'}" alt="Image of a ${animal.name}"/></div>
        <div class="product-data">
            <h2>${animal.name}</h2>
                    <div class='info-animal'>
                        <p>Fecha de nacimiento: <span>${format(animal.birthDate, "dd/MM/yyyy")}</span></p>
                        <p>Género: <span>${animal.gender}</span></p>
                        <p>Tamaño: <span>${animal.size}</span></p>
                        <p>Raza: <span>${animal.breed}</span></p>
                    </div>
            <span><span class="btn-update" data-operation ="update">Update</span></span>
            <span><span class="btn-delete" data-operation ="delete">Delete</span></span>
        </div>
        `;
        this.#bindButtons(animal.id, callbackRemove, callbackUpdate);
        return this.card;
    }

    #bindButtons(id: UUID, callbackRemove, callbackUpdate) {
        const update = this.card.querySelector('[data-operation="update"]');
        const remove = this.card.querySelector('[data-operation="delete"]');

        update?.addEventListener('click', () => {
            callbackUpdate(id);
         });
        remove?.addEventListener('click', () => {
            callbackRemove(id);
        });

    }

    #addCard(animal: Animal, callbackRemove, callbackUpdate) {
        const newAnimalCard = this.render(animal, callbackRemove, callbackUpdate);
        const container = document.getElementById('root');

        container.appendChild(newAnimalCard);
    }

    addAnimal(animal: Animal, callbackRemove, callbackUpdate) {
        this.#addCard(animal, callbackRemove, callbackUpdate);
    }

    updateAnimal(animal: Animal){
        //Primero el nombre
        const name = this.card.querySelector(".product-data h2");
        name.textContent = animal.name;
        
        const properties = [ 'birthDate', 'gender', 'size', 'breed'];
        const tds = this.card.querySelector(".info-animal").getElementsByTagName('span');
        for (const [index, property] of properties.entries()) {
            tds[index].textContent = animal[property] instanceof Date ? format(animal[property], "dd/MM/yyyy"): animal[property]; 
        }
    }
}