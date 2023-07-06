import { useParams } from "react-router";
import { Card } from "../components/Card";
// import { usersData } from "../data/usersData";
// import { addsData } from "../data/AddsData";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useUserAds from "../hooks/useUserAds";
import useUserFavorites from "../hooks/useUserFavorites";

export function Dashboard() {
  // const { id } = useParams();
  type User = {
    first_name: number;
    last_name: string;
    email: string;
  };

  // const [details, setDetails] = useState<Ad | null>(null);

  const { currentUser }: any = useContext(AuthContext);

  const { userAds } = useUserAds(currentUser.id);
  const { userFavorites } = useUserFavorites(currentUser.id);

  const [userInfo, setUserInfo] = useState<User | null>(null);

  const getUser = async () => {
    try {
      console.log("user: " + currentUser.id);
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      const res = await axios.get(
        `http://localhost:4000/users/${currentUser.id}`
      );
      const result = await res.data;
      setUserInfo(result);
      // setDetails(result);
      console.log(result, "RESULT");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

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
        <h1 className="filter-active w-fit text-4xl font-bold capitalize mt-4 ">
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
              />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="font-bold text-lg">My Adds</h2>
            <p className="font-mono text-sm text-lightgray">Adds you liked!</p>
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
            <table className="w-full text-sm text-left text-lightGray ">
              <tbody>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    First Name
                  </th>
                  <td className="px-6 py-4">{userInfo?.first_name}</td>
                </tr>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Last Name
                  </th>
                  <td className="px-6 py-4">{userInfo?.last_name}</td>
                </tr>
                <tr className="bg-white border-b-2 border-b-main">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Email Name
                  </th>
                  <td className="px-6 py-4">{userInfo?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function NewAdd() {
  return (
    <div className="max-w-fit  border-[3px] bg-main  border-black p-2  mx-auto sm:mx-0 min-w-[205px] min-h-[309px] flex items-center justify-center">
      <AiOutlinePlusCircle className="text-6xl text-lightGray" />
    </div>
  );
}
