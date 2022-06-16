import { IAnimal } from "../models/IAnimal";

export const calculateTime = (animal: IAnimal) => {
  const compareDates =
    new Date().getTime() - new Date(animal.lastFed).getTime();
  return new Date(compareDates).getSeconds();
};
