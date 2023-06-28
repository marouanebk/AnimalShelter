import { useParams } from "react-router";
import { data } from "../data/add";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Details() {
  const { id } = useParams();
  const addDetails = data.find((item) => item.id == +id!)!;

  return (
    <>
      <main>
        <div className="mb-5">
          <h1 className="text-4xl font-bold capitalize">{addDetails?.name}</h1>
          <small className="text-lightGrayadd swiping the images">
            Pictures
          </small>
        </div>
        <div className="flex gap-7 items-center justify-between flex-col sm:flex-row max-w-2xl">
          {addDetails.pictures.map((i, index) => (
            <div key={index}>
              <img
                src={i.url}
                alt="pic"
                className="block border-[3px] border-black w-52 h-52 object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 mb-11">
          <span className="font-bold me-2">
            you can save this add in your favorites:
          </span>
          <button className="font-bold px-3 py-2 bg-redish  ">
            <p className="text-lg flex gap-2">
              <span>Favorite</span>
              <FaHeart className="inline text-xl my-auto " />
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
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        Type
                      </th>
                      <td className="px-6 py-4">{addDetails.type}</td>
                    </tr>
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Race
                      </th>
                      <td className="px-6 py-4">{addDetails.race}</td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Vaccinated?
                      </th>
                      <td className="px-6 py-4">
                        {addDetails.vaccinated.toString()}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Health
                      </th>
                      <td className="px-6 py-4">{addDetails.health}</td>
                    </tr>
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Age
                      </th>
                      <td className="px-6 py-4">{addDetails.age}</td>
                    </tr>
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Post Date
                      </th>
                      <td className="px-6 py-4">{addDetails.date}</td>
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
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        Owner
                      </th>
                      <td className="px-6 py-4">{addDetails.owner}</td>
                    </tr>
                    <tr className="bg-white border-b border-orange">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        location
                      </th>
                      <td className="px-6 py-4">{addDetails.location}</td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                      >
                        Number
                      </th>
                      <td className="px-6 py-4">{addDetails.number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <br />
        <Link className="font-black text-md  text-lightGray" to="/">
          See More Adds?
        </Link>
      </main>
    </>
  );
}
