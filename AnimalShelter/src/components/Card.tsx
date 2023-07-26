import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import nopic from "../assets/nopic.jpg";

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
    if (currentUser == null) {
      alert("You have to sign in first to like an add!");
    }

    const userId = currentUser.id;

    if (userId != null) {
      try {
        const res = await axios.post(
          import.meta.env.VITE_POST_FAVORITE_API_URL,
          {
            userId,
            adId: id,
          }
        );
        if (res.status === 200 || res.status === 201) {
          setFavorite(!favorite);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-fit border-[3px] border-black p-2 bg-white mx-auto sm:mx-0 w-[205px] h-[309px]"
    >
      <div className="slide-container">
        <Link to={`/ads/${id}`}>
          {pictures.length > 0 ? (
            <img
              style={{ width: "100%" }}
              src={pictures[0]}
              alt="pic"
              className="w-[183px] min-w-[183px] min-h-[196px] h-[196px] object-cover"
            />
          ) : (
            <img
              style={{ width: "100%" }}
              src={nopic}
              alt="No Pic"
              className="w-[183px] min-w-[183px] min-h-[196px] h-[196px] object-cover"
            />
          )}
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
        <motion.div whileHover={{ scale: 1.5 }}>
          <FaHeart
            onClick={handleFavoriteClick}
            className="w-full"
            style={{ color: favorite ? "#FD5ADA" : "black", cursor: "pointer" }}
          />
        </motion.div>
        <p className="text-sm text-lightGray">
          {new Date(date).toLocaleDateString("en-US")}
        </p>
      </div>
    </motion.div>
  );
}
