import { IVaccine } from '../interfaces/vaccine.interface';
import { UUID } from '../types/commons.type';
import { v4 as uuidv4 } from 'uuid';

export class Vaccine implements IVaccine{
    #id: UUID;
    #name: string;
 
    constructor(vaccine: IVaccine) {
        this.#id = vaccine.id || uuidv4();
        this.#name = vaccine.name;
    }


    public get name(){
        return this.#name;
    }

    public get id(){
        return this.#id;
    }


    toJSON(){
        return {
            id: this.#id,
            name: this.#name,
        }
    }

}