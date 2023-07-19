import { Card } from "./Card";
import { addsData } from "../data/AddsData";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type AddsProps = {
  filterState: string;
  searchQuery: string;
};

export function Adds({ filterState }: AddsProps) {
  const { currentUser }: any = useContext(AuthContext);

  type Ad = {
    _id: number;
    type: string;
    location: string;
    pictures: string[];
    date: string;
    owner: {
      location: string;
    };
    isFavorite: boolean;
  };

  const [ads, setAds] = useState<Ad[]>([]);
  const location = useLocation();

  const filteredData = addsData.filter((add) => {
    return add.type.includes(filterState);
  });

  const getAds = async () => {
    try {
      setAds([]);
      const searchParams = new URLSearchParams(location.search);
      const filterState = searchParams.get("type");
      const searchQuery = searchParams.get("location");

      let apiUrl = "http://localhost:4000/ads";
      if (currentUser != null) {
        apiUrl += `?userId=${currentUser.id}`;
      }
      if (filterState) {
        apiUrl += `&type=${filterState}`;
      }

      if (searchQuery) {
        apiUrl += `&location=${searchQuery}`;
        console.log("seaaaaaaaaaaaach queryyyyyyy");
      }

      console.log("apiUrl: " + apiUrl);

      const res = await axios.get(apiUrl);
      const result = await res.data["ads"];
      console.log(result);
      setAds(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAds();
  }, [location.search]);

  if (ads.length == 0) {
    return (
      <div className="flex justify-center">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-5 pb-10">
      <div className="my-5">
        <h1 className="text-lg font-bold">Advertisement</h1>
        <small className="text-lightGray">For Adoption</small>
      </div>
      <div className="grid grid-cols-fill gap-4">
        {ads.map((ad) => (
          <Card
            key={ad._id}
            type={ad.type}
            location={ad.owner.location}
            pictures={ad.pictures}
            id={ad._id}
            date={ad.date}
            isFavorite={ad.isFavorite}
          />
        ))}
      </div>
    </section>
  );
}
