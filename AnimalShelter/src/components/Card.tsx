import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

type cardProps = {
  pictures: string[];
  location: string;
  type: string;
  id: number;
  date: string;
};

export function Card({ pictures, location, type, id, date }: cardProps) {
  return (
    <div className="max-w-fit  border-[3px]  border-black p-2 bg-white mx-auto sm:mx-0">
      <Link to={`/${id}`}>
        <img
          src={pictures[0]}
          alt="pic"
          className="w-[183px] h-[196px] object-cover"
        />
      </Link>
      <div className="font-bold my-2">
        <p>
          Type: <span>{type}</span>
        </p>
        <p>
          Location: <span>{location}</span>
        </p>
      </div>
      <hr className="mb-2" />
      <div className="flex justify-between">
        <FaHeart />
        <p className="text-sm text-lightGray">{date}</p>
      </div>
    </div>
  );
}
