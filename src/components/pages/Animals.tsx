import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { calculateTime } from "../../helpers/CalculateTime";
import { IAnimal } from "../../models/IAnimal";
import { IState } from "../../models/IState";
import { getList } from "../../redux/features/animal/animalService";
import { saveAnimals } from "../../redux/features/animal/animalSlice";
import AnimalCard from "../AnimalCard";

const Animals = () => {
  const dispatch = useDispatch();
  const animals = useSelector((state: IState) => state.animals.value);

  useEffect(() => {
    if (getList().length <= 0) {
      axios
        .get("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          dispatch(saveAnimals(response.data));
        });
    }

    animals.map((animal) => {
      if (animal) {
        calculateTime(animal) >= 14400 && toast(`${animal.name} is hungry!`);
      }
    });
  }, []);

  return (
    <section className="mt-10">
      <div className="container mx-auto flex flex-wrap gap-5 justify-between">
        {animals?.map((animal: IAnimal) => (
          <div key={animal.id}>
            <AnimalCard animal={animal} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Animals;
