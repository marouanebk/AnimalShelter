import { Card } from "./Card";
import { addsData } from "../data/AddsData";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type AddsProps = {
  filterState: string;
};

export function Adds({ filterState }: AddsProps) {
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

  const [ads, setAds] = useState<Ad[]>([]);
  const location = useLocation();

  const filteredData = addsData.filter((add) => {
    return add.type.includes(filterState);
  });

  const getAds = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const filterState = searchParams.get("type");
      const searchQuery = searchParams.get("location");

      let apiUrl = "http://localhost:4000/ads";
      if (filterState) {
        apiUrl += `?type=${filterState}`;
      }

      if (searchQuery) {
        apiUrl += `&location=${searchQuery}`;
      }
      console.log(apiUrl);

      const res = await axios.get(apiUrl);
      const result = await res.data["ads"];
      setAds(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAds();
  }, [location.search]);

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
          />
        ))}
      </div>
    </section>
  );
}
