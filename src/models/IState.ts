import { IAnimal } from "./IAnimal";

export interface IState {
  animals: IValue;
}

export interface IValue {
  value: IAnimal[];
}
