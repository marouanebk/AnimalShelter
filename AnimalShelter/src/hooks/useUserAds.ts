import axios from "axios";
import { useState, useEffect } from "react";

const useUserAds = (userId: string) => {

  type Ad = {
    _id: number;
    type: string;
    location: string;
    pictures: string[];
    date: string;
    owner: {
      location: string;
    }
    isFavorite : boolean;
    
  };

  const [userAds, setUserAds] = useState<Ad[]>([]);


  const fetchUserAds = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_ADS_BY_USER_API_URL+userId);

      if (response && response.status === 200 && response.data) {
        setUserAds(response.data["ads"]);
      }
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  useEffect(() => {
    fetchUserAds();
  }, [userId]);

  return { userAds };
};

export default useUserAds;
