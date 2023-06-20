import { FaHeart } from "react-icons/fa";
import test from "../assets/test.jpg";

export function Card() {
  return (
    <div className="max-w-fit  border-4 rounded-[10px] border-black p-2 ">
      <a href="">
        <img
          src={test}
          alt="pic"
          className="rounded-lg w-[183px] h-[196px] object-cover"
        />
      </a>
      <div className="font-bold my-2">
        <p>
          Type: <span>Cat</span>
        </p>
        <p>
          Location: <span>Alger</span>
        </p>
      </div>
      <hr className="mb-2" />
      <a href="">
        <FaHeart />
      </a>
    </div>
  );
}
