import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { calculateTime } from "../../helpers/CalculateTime";
import { IAnimal } from "../../models/IAnimal";
import { IState } from "../../models/IState";
import { getList } from "../../redux/features/animal/animalService";
import {
  feed,
  hungry,
  saveAnimals,
} from "../../redux/features/animal/animalSlice";

const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal>();

  const params = useParams();
  const dispatch = useDispatch();

  const animals = useSelector((state: IState) => state.animals.value);

  const giveFood = () => {
    if (animal) {
      dispatch(feed(animal));
    }
  };

  useEffect(() => {
    if (getList().length <= 0) {
      axios
        .get("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          dispatch(saveAnimals(response.data));
        });
    }

    const foundAnimal = animals.find((animal: IAnimal) => {
      if (params.id) {
        return animal.id === parseInt(params.id);
      }
    });

    setAnimal(foundAnimal);

    if (foundAnimal?.isFed) {
      if (calculateTime(foundAnimal) >= 10800) {
        dispatch(hungry(foundAnimal));
      }
    }

    if (foundAnimal) {
      calculateTime(foundAnimal) >= 14400 &&
        toast(`${foundAnimal.name} is hungry!`);
    }
  }, [giveFood]);

  const factCard =
    "bg-blue-300 flex-1 flex flex-col gap-2 justify-center items-center p-4 rounded-xl min-w-[120px]";

  return (
    <section className="">
      <div className="mt-0 pb-10 mx-auto flex flex-col max-w-[700px] lg:flex-row lg:max-w-[1300px] gap-20 px-10">
        <div className="flex-1 flex flex-col justify-center">
          <Link className="mb-8" to="/">
            &larr;Tillbaka till alla djur
          </Link>
          <h1 className="font-bold text-xl mb-5">{animal?.name}</h1>
          <div>
            <p>{animal?.longDescription}</p>
            <div className="flex justify-between flex-wrap mt-10 gap-5">
              <div className={factCard}>
                <span className="font-semibold">Latinskt Namn</span>
                <span>{animal?.latinName}</span>
              </div>
              <div className={factCard}>
                <span className="font-semibold">Medicin</span>
                <span>{animal?.medicine}</span>
              </div>
              <div className={factCard}>
                <span className="font-semibold">Född</span>
                <span>{animal?.yearOfBirth}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-0 lg:pt-20 flex-1 flex flex-col gap-10">
          <img
            src={animal?.imageUrl}
            onError={(e) => {
              e.currentTarget.src =
                "https://netgraph-connect.com/wp-content/uploads/2020/01/placeholder.png";
            }}
            alt=""
            className="rounded-2xl"
          />
          <div className="flex flex-col items-center gap-5">
            <p>
              Senast matad: {animal?.lastFed.split("T")[0]} kl{" "}
              {animal?.lastFed.split("T")[1].split(".")[0].slice(0, -3)}
            </p>
            <button
              disabled={animal?.isFed}
              onClick={giveFood}
              className={`bg-blue-600 text-white px-10 py-3 font-medium rounded-xl ${
                animal?.isFed && "opacity-75"
              }`}
            >
              {animal?.isFed ? "Inte hungrig!" : "Mata"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Animal;
