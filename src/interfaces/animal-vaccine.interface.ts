import { Vaccine } from "../models/vaccine.model";

export interface IAnimalVaccine{
    readonly vaccine: Vaccine;
    readonly date: Date;
}