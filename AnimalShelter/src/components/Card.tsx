import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

type CardProps = {
  id: number;
  pictures: string[];
  location: string;
  type: string;
  date: string;
  isFavorite: boolean;
};

export function Card({
  pictures,
  location,
  type,
  id,
  date,
  isFavorite,
}: CardProps) {
  const { currentUser }: any = useContext(AuthContext);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = async () => {
    const userId = currentUser.id;

    if (userId != null) {
      try {
        const res = await axios.post("http://localhost:4000/favorites", {
          userId,
          adId: id,
        });
        if (res.status === 200 || res.status === 201) {
          setFavorite(!favorite);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-fit border-[3px] border-black p-2 bg-white mx-auto sm:mx-0 w-[205px] h-[309px]">
      <div className="slide-container">
        <Link to={`/ads/${id}`}>
          <img
            style={{ width: "100%" }}
            src={pictures[0]}
            alt="pic"
            className="w-[183px] min-w-[183px] min-h-[196px] h-[196px] object-cover"
          />
        </Link>
      </div>

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
        <FaHeart
          onClick={handleFavoriteClick}
          style={{ color: favorite ? "red" : "black", cursor: "pointer" }}
        />
        <p className="text-sm text-lightGray">
          {new Date(date).toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
}
