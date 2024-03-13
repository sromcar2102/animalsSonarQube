import { Animal } from '../../models/animal.model';
import { UUID } from '../../types/commons.type';
import { format } from 'date-fns';

export class TableComponent {
    #animals: Animal[] = [];
    #table: HTMLElement;
    #tbody: HTMLElement;
    
    constructor() { }
    
    public set animals(animals: Animal[]) {
        this.#animals = animals;
    }

    render(callbackRemove, callbackUpdate) {
        this.#initTable();
        this.#tbody.innerHTML = "";
        for (const animal of this.#animals) {
            this.#addTR(animal, callbackRemove, callbackUpdate);
        }
    }

    #initTable() {
        const root = document.querySelector('#root')!;
        root.innerHTML = "";
        const table = document.createElement('table');
        table.classList.add('table-container');
        const tbody = document.createElement('tbody');
        table.innerHTML = `
        <thead>
            <th>Image</th>
            <th>Id</th>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Breed</th>
            <th>Vaccine</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th></th>
            <th></th>
        </thead>
    `;
        table.appendChild(tbody);
        root.appendChild(table);
        this.#table = table;
        this.#tbody = tbody;
    }

    #bindButtons(id: UUID, callbackRemove, callbackUpdate) {
        const tr = this.#table.querySelector(`[data-id="${id}"]`);
        const updateButton = tr.querySelector(`[data-operation="update"]`);
        const removeButton = tr.querySelector(`[data-operation="delete"]`);

        updateButton.addEventListener('click', () => callbackUpdate(id));
        removeButton.addEventListener('click', () => { 
            callbackRemove(id);
        });
    }
    
    #addTR(animal, callbackRemove, callbackUpdate) {
        const tr = `
        <tr data-id="${animal.id}">
            <td><img src="./../../assets/images/${animal?.image}" alt="Image of a ${animal.name}"/></td>
            <td>${animal.id}</td>
            <td>${animal.name}</td>
            <td>${format(animal.birthDate, "dd/MM/yyyy")}</td>
            <td>${animal.gender}</td>
            <td>${animal.size}</td>
            <td>${animal.breed}</td>
            <td></td>
            <td>${format(animal.update_at, "dd/MM/yyyy")}</td>
            <td>${format(animal.create_at, "dd/MM/yyyy")}</td>
            <td><span class="btn-update" data-operation ="update">Update</span></td>
            <td><span class="btn-delete" data-operation ="delete">Delete</span></td>
        </tr>
        `;
        this.#tbody.insertAdjacentHTML('beforeend', tr);
        this.#bindButtons(animal.id, callbackRemove, callbackUpdate);
    }

    updateAnimal(animal: Animal){
        const tr = this.#table.querySelector(`[data-id="${animal.id}"]`);
        const properties = ['name', 'birthDate', 'gender', 'size', 'breed', 'vaccines', 'update_at', 'create_at'];
        const tds = tr.children;
        for(const [index, property] of properties.entries()){
            tds[index + 2].textContent = animal[property] instanceof Date ? format(animal[property], "dd/MM/yyyy"): animal[property]; 
        }
    }
    
    addAnimal(animal: Animal, callbackRemove, callbackUpdate) {
        this.#addTR(animal, callbackRemove, callbackUpdate);
    }
}