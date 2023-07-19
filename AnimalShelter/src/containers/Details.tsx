import { useParams } from "react-router";
// import { addsData } from "../data/AddsData";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export function Details() {
  const { currentUser }: any = useContext(AuthContext);

  const { id } = useParams();

  type Ad = {
    _id: number;
    animalName: string;
    type: string;
    location: string;
    pictures: string[];
    date: string;
    race: string;
    vaccinated: boolean;
    healthCondition: string;
    age: number;
    owner: {
      first_name: string;
      last_name: string;
      email: string;
      id: string;
      location: string;
      phone_number: string;
    };
  };

  const [details, setDetails] = useState<Ad | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const getAd = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/ads/${id}`);
      const result = await res.data;
      setDetails(result.ad);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/favorites`, {
        userId: currentUser.id,
        adId: id,
      });
      if (res.status === 200 || res.status === 201) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.log(error);
    }
    // setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    getAd();
  }, []);

  if (!details) {
    return (
      <div className="flex justify-center">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        <div className="mb-5">
          <h1 className="text-4xl font-bold capitalize">
            {details.animalName}
          </h1>
          <small className="text-lightGrayadd swiping the images">
            Pictures
          </small>
        </div>
        <div className="flex gap-7 items-center justify-between flex-col sm:flex-row max-w-2xl">
          {details.pictures.map((i, index) => (
            <div key={index}>
              <a href={i} target="_blank" rel="noopener noreferrer">
                <img
                  src={i}
                  alt="pic"
                  className="block border-[3px] border-black w-52 h-52 object-cover"
                />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-4 mb-11">
          <span className="font-bold me-2">
            you can save this add in your favorites:
          </span>
          <button
            className="font-bold px-3 py-2 bg-redish"
            onClick={handleFavoriteClick}
          >
            <p className="text-lg flex gap-2">
              <span>Favorite</span>
              <FaHeart
                className={`inline text-xl my-auto ${
                  isFavorite ? "text-black" : "text-white"
                }`}
              />
            </p>
          </button>
        </div>
        <section className="capitalize">
          <div className="flex flex-col md:flex-row gap-3 ">
            <div className="basis-1/2">
              <h1 className="font-bold text-xl mb-5">Information</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-lightGray ">
                  <tbody>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        Type
                      </th>
                      <td className="px-6 py-4">{details.type}</td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Race
                      </th>
                      <td className="px-6 py-4">{details.race}</td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Vaccinated?
                      </th>
                      <td className="px-6 py-4">
                        {details.vaccinated.toString()}
                      </td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Health
                      </th>
                      <td className="px-6 py-4">{details.healthCondition}</td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Age
                      </th>
                      <td className="px-6 py-4">{details.age}</td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Post Date
                      </th>
                      <td className="px-6 py-4">
                        {new Date(details.date).toLocaleDateString("en-US")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="basis-1/2">
              <h1 className="font-bold text-xl mb-5">Contact</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-lightGray ">
                  <tbody>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        Owner
                      </th>
                      {/* <td className="px-6 py-4">{details.owner}</td> */}
                      <td className="px-6 py-4">
                        {details.owner.first_name} {details.owner.last_name}
                      </td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        location
                      </th>
                      <td className="px-6 py-4">{details.owner.location}</td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Number
                      </th>
                      <td className="px-6 py-4">
                        {details.owner.phone_number}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-4 justify-end mt-5">
                <button className="border-2 border-black bg-blueish font-bold py-1 px-4">
                  Edit
                </button>
                <button className="border-2 border-black bg-redish font-bold py-1 px-4">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </section>
        <br />
        <Link className="font-black" to="/">
          See More Adds?
        </Link>
      </main>
    </>
  );
}
