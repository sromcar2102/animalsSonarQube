import { Animal } from "../models/animal.model";
import { UUID } from "../types/commons.type";
import { Vaccine } from "../models/vaccine.model";
import { format } from 'date-fns';

export class AnimalFormView {
    #form: HTMLFormElement = document.querySelector('#formAnimal');

    #name: HTMLInputElement = document.querySelector('#name');
    #uuid: HTMLInputElement = document.querySelector('#animalId');
    #image: HTMLInputElement = document.querySelector('#animalImage');
    #birthDate: HTMLInputElement = document.querySelector('#birthDate');
    #size: HTMLSelectElement = document.querySelector('#size');
    #breed: HTMLInputElement = document.querySelector('#breed');
    #gender: HTMLInputElement = document.querySelector('#gender');
    #vaccine: HTMLSelectElement = document.querySelector('#vaccine')!;

    #add: HTMLElement = document.querySelector('#add')!;
    #update: HTMLElement = document.querySelector('#update')!;


    constructor() { }

    set vaccines(vaccines: Map<UUID, Vaccine>) {
        for (const vaccine of Array.from(vaccines.values())) {
            const option = document.createElement('option');
            option.value = vaccine.id;
            option.setAttribute('name', vaccine.name);
            option.textContent = vaccine.name;
            this.#vaccine.appendChild(option);
        }
    }
    
    bindCreateAnimal(addCallback) {
        this.#add.addEventListener('click', () => {
    

            const animal = Object.fromEntries(new FormData(this.#form) as any );
           // animal.set('vaccines', "[]");

/*             const animal = {
                name: this.#name.value,
                birthDate: this.#birthDate.value,
                size: this.#size.value,
                breed: this.#breed.value,
                vaccines: [],
            }; */

            addCallback(animal);
        })
    }
    bindFormUpdateAnimal(updateCallback){
       this.#update.addEventListener('click', () => {
            const animal = {
                id: this.#uuid.value,
                image: this.#image.value,
                ...Object.fromEntries(new FormData(this.#form) as any), //Objeto Plano
            }

            updateCallback(animal);
            //Si va bien mostrar un alert de éxito.
            //En caso de error mostrar un label en rojito del error
       }) 
    }
    
    fillForm(animal: Animal){
        this.#uuid.value = animal.id;
        this.#image.value = animal.image;
        this.#name.value = animal.name;
        this.#birthDate.value = format(animal.birthDate, "yyyy-MM-dd");
        
        const gender: HTMLInputElement = document.querySelector(`[data-gender=${animal.gender}]`);
        gender.checked = true;

        const size: HTMLOptionElement = document.querySelector(`[data-size=${animal.size}]`);
        size.selected = true;
        
        this.#breed.value = animal.breed;
    }

}