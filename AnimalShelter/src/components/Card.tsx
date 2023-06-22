import { FaHeart } from "react-icons/fa";
import test from "../assets/test.jpg";

type cardProps = {
  pictures: string[];
  location: string;
  type: string;
};

export function Card({ pictures, location, type }: cardProps) {
  return (
    <div className="max-w-fit  border-[3px]  border-black p-2 bg-white mx-auto sm:mx-0">
      <a href="">
        <img
          src={pictures[0]}
          alt="pic"
          className="w-[183px] h-[196px] object-cover"
        />
      </a>
      <div className="font-bold my-2">
        <p>
          Type: <span>{type}</span>
        </p>
        <p>
          Location: <span>{location}</span>
        </p>
      </div>
      <hr className="mb-2" />
      <a href="">
        <FaHeart />
      </a>
    </div>
  );
}
