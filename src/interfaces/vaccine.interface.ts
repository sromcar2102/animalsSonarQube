import { UUID } from "../types/commons.type";

export interface IVaccine{
    readonly id?: UUID;
    readonly name:string
}
/* 
Herencia de interfaces para ids;

export interface IVaccineCreate extends IVaccine {
    readonly id: UUID;
} */