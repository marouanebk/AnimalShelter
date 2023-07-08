import axios from "axios";
import { useState, useEffect } from "react";

const useUserFavorites = (userId: string) => {

  type Ad = {
    _id: number;
    type: string;
    location: string;
    pictures: string[];
    date: string;
    owner: {
      location: string;
    }
  };

  const [userFavorites, setuserFavorites] = useState<Ad[]>([]);


  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/favorites/${userId}`);

      if (response && response.status === 200 && response.data) {
        setuserFavorites(response.data["favorites"]);
      }
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return { userFavorites };
};

export default useUserFavorites;