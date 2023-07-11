import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

type CardProps = {
  id: number;
  pictures: string[];
  location: string;
  type: string;
  date: string;
  isFavorited: boolean;
};

export function Card({ pictures, location, type, id, date }: CardProps) {
  const { currentUser }: any = useContext(AuthContext);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    const userId = currentUser.id;

    if (userId != null) {
      try {
        const res = await axios.post("http://localhost:4000/favorites", {
          userId,
          adId: id,
        });
        if (res.status === 201) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-fit border-[3px] border-black p-2 bg-white mx-auto sm:mx-0 w-[205px] h-[309px]">
      <div className="slide-container">
        <Slide>
          {pictures.map((picture, index) => (
            <Link to={`/ads/${id}`} key={index}>
              <img
                style={{ width: "100%" }}
                src={picture}
                alt="pic"
                className="w-[183px] h-[196px] object-cover"
              />
            </Link>
          ))}
        </Slide>
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
          style={{ color: isFavorite ? "red" : "black", cursor: "pointer" }}
        />
        <p className="text-sm text-lightGray">
          {new Date(date).toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
}
