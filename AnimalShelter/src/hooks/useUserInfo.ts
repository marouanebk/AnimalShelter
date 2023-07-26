import axios from "axios";
import { useState, useEffect } from "react";

const useUserInfo = (userId: string) => {
  type User = {
    _id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    location: string;
  };

  const [userInfo, setUserInfo] = useState<User>();

  const fetchUser = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_GET_USER_INFO_URL+userId);
      const result = await res.data;
      setUserInfo(result);
      console.log(result, "RESULT");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return { userInfo };
};

export default useUserInfo;
