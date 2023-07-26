import { useParams } from "react-router";
// import { addsData } from "../data/AddsData";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

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

  const [isOwner, setIsOwner] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const [details, setDetails] = useState<Ad | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedAd, setEditedAd] = useState<Ad | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);

  const getAd = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/ads/${id}`);
      const result = await res.data;
      console.log(result.ad.owner.id);
      if (currentUser && currentUser.id == result.ad.owner.id) {
        setIsOwner(true);
      }
      setDetails(result.ad);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoriteClick = async () => {
    if (currentUser) {
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
    }
    if (currentUser == null) {
      alert("You have to sign in first to like an add!");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/deleteAd/${details?._id}`
      );
      if (res.status === 200) {
        navigate(`/user`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleEditClick = () => {
  //   setEditedAd({ ...details });
  //   setShowEditForm(true);
  // };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ediiting");
    try {
      const res = await axios.put(
        import.meta.env.VITE_EDIT_ADS_API_URL+id,
        editedAd
      );
      if (res.status === 200) {

        alert("Ad updated successfully");
        setIsEditMode(false);
        getAd();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAd();
  }, []);

  useEffect(() => {
    // Clone the details object to avoid mutating the original state
    setEditedAd(details);
  }, [details]);

  if (!details) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 1.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex justify-center"
      >
        <div className="lds-heart">
          <div></div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <main>
        <div className="mb-5">
          <h1 className="text-4xl font-bold capitalize">
            {isEditMode ? (
              <input
                type="text"
                value={editedAd?.animalName || ""}
                onChange={(e) =>
                  setEditedAd((prevEditedAd) => ({
                    ...prevEditedAd!,
                    animalName: e.target.value,
                  }))
                }
              />
            ) : (
              editedAd?.animalName || ""
            )}
          </h1>
          <small className="text-lightGrayadd swiping the images">
            Pictures
          </small>
        </div>
        <div className="flex gap-7 items-center justify-between flex-col sm:flex-row max-w-2xl">
          {details.pictures.map((i, index) => (
            <div key={index}>
              <a href={i} target="_blank" rel="noopener noreferrer">
                <motion.img
                  whileHover={{ scale: 1.1 }}
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
                      <td className="px-6 py-4">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={editedAd?.type || ""}
                            onChange={(e) =>
                              setEditedAd((prevEditedAd) => ({
                                ...prevEditedAd!,
                                type: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          editedAd?.type || ""
                        )}
                      </td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Race
                      </th>
                      <td className="px-6 py-4">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={editedAd?.race || ""}
                            onChange={(e) =>
                              setEditedAd((prevEditedAd) => ({
                                ...prevEditedAd!,
                                race: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          editedAd?.race || ""
                        )}
                      </td>{" "}
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Vaccinated?
                      </th>
                      <td className="px-6 py-4">
                        {isEditMode ? (
                          <select
                            value={editedAd?.vaccinated.toString() || "false"}
                            onChange={(e) =>
                              setEditedAd((prevEditedAd) => ({
                                ...prevEditedAd!,
                                vaccinated: e.target.value === "true",
                              }))
                            }
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        ) : (
                          details.vaccinated.toString()
                        )}
                      </td>
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Health
                      </th>
                      <td className="px-6 py-4">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={editedAd?.healthCondition || ""}
                            onChange={(e) =>
                              setEditedAd((prevEditedAd) => ({
                                ...prevEditedAd!,
                                healthCondition: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          editedAd?.healthCondition || ""
                        )}
                      </td>{" "}
                    </tr>
                    <tr className="bg-white border-b-2 border-b-main">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Age
                      </th>
                      <td className="px-6 py-4">
                        {isEditMode ? (
                          <input
                            type="number"
                            value={editedAd?.age || 0}
                            onChange={(e) =>
                              setEditedAd((prevEditedAd) => ({
                                ...prevEditedAd!,
                                age: parseInt(e.target.value),
                              }))
                            }
                          />
                        ) : (
                          editedAd?.age || 0
                        )}
                      </td>{" "}
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

              {isOwner && (
                <div className="flex items-center gap-4 justify-end mt-5">
                  {isEditMode ? (
                    <>
                      <button
                        className="border-2 border-black bg-blueish font-bold py-1 px-4"
                        onClick={handleEditSubmit} // Directly call handleEditSubmit
                      >
                        Save
                      </button>
                      <button
                        className="border-2 border-black bg-redish font-bold py-1 px-4"
                        onClick={() => setIsEditMode(false)} // Directly call setIsEditMode
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="border-2 border-black bg-blueish font-bold py-1 px-4"
                        onClick={() => setIsEditMode(true)} // Directly call setIsEditMode
                      >
                        Edit
                      </button>
                      <button
                        className="border-2 border-black bg-redish font-bold py-1 px-4"
                        onClick={() => setShowDeleteConfirmation(true)} // Directly call setShowDeleteConfirmation
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        <br />
        <Link className="font-black" to="/">
          See More Adds?
        </Link>
      </main>
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 font-semibold ">
          <div className="bg-white p-8 border-2 border-black text-center">
            <p className="mb-4">Are you sure you want to delete this ad?</p>
            <div className="flex items-center justify-center gap-4">
              <button
                className="border-2 border-black bg-redish font-bold py-1 px-4"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="border-2 border-black bg-blueish font-bold py-1 px-4"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
