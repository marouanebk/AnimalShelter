import { Card } from "../components/Card";
import { AiOutlinePlusCircle, AiOutlineEdit } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useUserAds from "../hooks/useUserAds";
import useUserFavorites from "../hooks/useUserFavorites";
import useUseInfo from "../hooks/useUserInfo";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { currentUser }: any = useContext(AuthContext);

  const { userAds } = useUserAds(currentUser.id);
  const { userFavorites } = useUserFavorites(currentUser.id);
  const { userInfo } = useUseInfo(currentUser.id);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState(userInfo);
  useEffect(() => {
    setEditedUserInfo(userInfo);
  }, [userInfo]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/users/${currentUser.id}`,
        editedUserInfo
      );
      if (res.status === 200) {
        // setUserInfo(editedUserInfo); // Update the userInfo state with editedUserInfo
      }
    } catch (error) {
      console.log(error);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedUserInfo(userInfo);
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="mb-10">
        <h1 className="filter-active w-fit text-4xl font-bold capitalize mt-4">
          Hello {userInfo?.first_name}
        </h1>
        <p className="font-mono text-sm text-lightgray">
          This is your dashboard
        </p>
      </section>
      <div>
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="font-bold text-lg">Favorite</h2>
            <p className="font-mono text-sm text-lightgray">Adds you liked!</p>
          </div>
          <div className="grid grid-cols-fill gap-4">
            {userFavorites.map((add) => (
              <Card
                key={add._id}
                pictures={add.pictures}
                location={add.location}
                type={add.type}
                id={add._id}
                date={add.date}
                isFavorite={true}
              />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="font-bold text-lg">My Adds</h2>
            <p className="font-mono text-sm text-lightgray">
              Adds you published!
            </p>
          </div>
          <div className="grid grid-cols-fill gap-4">
            {userAds.map((add) => (
              <Card
                key={add._id}
                pictures={add.pictures}
                location={add.location}
                type={add.type}
                id={add._id}
                date={add.date}
                isFavorite={add.isFavorite}
              />
            ))}
            <NewAdd />
          </div>
        </section>
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="font-bold text-lg">Account Information</h2>
          </div>
          <div>
            <table className="w-full text-sm text-left text-lightGray">
              <tbody>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    First Name
                  </th>
                  <td className="px-6 py-4">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="first_name"
                        value={editedUserInfo?.first_name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userInfo.first_name
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Last Name
                  </th>
                  <td className="px-6 py-4">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="last_name"
                        value={editedUserInfo?.last_name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userInfo.last_name
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Email
                  </th>
                  <td className="px-6 py-4">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="email"
                        value={editedUserInfo?.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userInfo.email
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Phone Number
                  </th>
                  <td className="px-6 py-4">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={editedUserInfo?.phone_number}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userInfo.phone_number
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Location
                  </th>
                  <td className="px-6 py-4">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="location"
                        value={editedUserInfo?.location}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userInfo.location
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {isEditMode ? (
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-green-500 text-white rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function NewAdd() {
  return (
    <div className="max-w-fit  border-[3px] bg-white  border-black p-2  mx-auto sm:mx-0 min-w-[205px] min-h-[309px] flex items-center justify-center">
      <Link to="/user/new-add">
        <AiOutlinePlusCircle className="text-6xl text-lightGray" />
      </Link>
    </div>
  );
}
