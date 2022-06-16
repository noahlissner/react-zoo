import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import TextTruncate from "react-text-truncate";

interface Props {
  animal: IAnimal;
}

const AnimalCard = ({ animal }: Props) => {
  return (
    <div className="bg-slate-200 w-[200px] p-5 flex flex-col rounded-lg">
      <h3 className="font-bold text-xl">{animal.name}</h3>
      <div className="flex flex-col gap-2">
        <p>Född: {animal.yearOfBirth}</p>
        <TextTruncate
          line={4}
          element="p"
          truncateText="..."
          text={animal.shortDescription}
        />
      </div>
      <Link
        to={`/animal/${animal.id}`}
        key={animal.id}
        className="bg-blue-300 p-2 flex items-center justify-center rounded-md mt-5"
      >
        Besök
      </Link>
    </div>
  );
};

export default AnimalCard;
