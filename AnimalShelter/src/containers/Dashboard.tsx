import { useParams } from "react-router";
import { Card } from "../components/Card";
import { usersData } from "../data/usersData";
import { addsData } from "../data/AddsData";
import { AiOutlinePlusCircle } from "react-icons/ai";

export function Dashboard() {
  const { id } = useParams();

  const user = usersData.find((user) => {
    return user.userId == +id!;
  });

  const favoriteAdds = addsData.filter((add) =>
    user?.favorites.includes(add.id)
  );
  const myAdds = addsData.filter((add) => user?.hisAdds.includes(add.id));

  return (
    <main>
      <section className="mb-10">
        <h1 className="filter-active w-fit text-4xl font-bold capitalize mt-4 ">
          Hello {user?.firstName}
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
            {favoriteAdds.map((add) => (
              <Card
                key={add.id}
                pictures={add.pictures}
                location={add.location}
                type={add.type}
                id={add.id}
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
            {myAdds.map((add) => (
              <Card
                key={add.id}
                pictures={add.pictures}
                location={add.location}
                type={add.type}
                id={add.id}
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
                <tr className="bg-main  border-b-2 border-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    First Name
                  </th>
                  <td className="px-6 py-4">{user?.firstName}</td>
                </tr>
                <tr className="bg-main  border-b-2 border-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Last Name
                  </th>
                  <td className="px-6 py-4">{user?.lastName}</td>
                </tr>
                <tr className="bg-main  border-b-2 border-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    Email Name
                  </th>
                  <td className="px-6 py-4">{user?.info.email}</td>
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
