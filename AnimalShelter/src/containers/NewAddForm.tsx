import { useState, useContext } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";


export function NewAddForm() {
  const { currentUser }: any = useContext(AuthContext);


  const [formData, setFormData] = useState({
    owner: currentUser.id,
    animalName: "",
    type: "cat",
    race: "",
    vaccinated: false,
    healthCondition: "",
    age: "",
    pictures: [
      "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_640.jpg",
      "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg"
    ]
  });

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      console.log("in function")
      const result = await axios.post("http://localhost:4000/createAd", formData);
      console.log("after request completed");
      // Request successful, handle success (e.g., display a success message or redirect the user)
    } catch (error) {
      // Request failed, handle error (e.g., display an error message or handle the error in an appropriate manner)
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">
        Publishing an advertisement for your pet
      </h1>
      <p className="font-bold mb-4">Upload Your pictures</p>
      <div className="max-w-fit border-[3px] bg-white border-black p-2 mx-auto sm:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center">
        <AiOutlinePlusCircle className="text-6xl text-lightGray" />
      </div>

      <form
        className="my-10 flex flex-col md:flex-row gap-40 font-semibold filter-active w-fit"
        onSubmit={handleFormSubmit}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Your Pet's Information</h2>
          <div>
            <label htmlFor="animalName">Enter your pet's name</label>
            <input
              type="text"
              name="animalName"
              placeholder="Name"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
              value={formData.animalName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="type">Enter your pet's Type</label>
            <select
              name="type"
              className="block px-5 py-2 text-md text-black bg-white focus:outline-none font-bold rounded-sm my-3"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="race">Enter your pet's race</label>
            <input
              type="text"
              name="race"
              placeholder="Race"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
              value={formData.race}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="healthCondition">Enter your pet's Health</label>
            <input
              type="text"
              name="healthCondition"
              placeholder="Good"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
              value={formData.healthCondition}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center gap-4 my-3">
            <input
              type="checkbox"
              name="vaccinated"
              className="w-5 h-5"
              checked={formData.vaccinated}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="vaccinated">Vaccinated</label>
          </div>
          <div>
            <label htmlFor="age">Enter your pet's Age</label>
            <input
              type="text"
              name="age"
              placeholder="Age in years"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm mt-3"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">Your Information</h2>
          <div>
            <label htmlFor="owner">Enter your phone number</label>
            <input
              type="number"
              name="owner"
              placeholder="Owner's Number"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
              // value={formData.owner}
              // onChange={handleInputChange}
              
            />
          </div>
          <div>
            <label htmlFor="location">Enter your location</label>
            <input
              type="text"
              name="location"
              placeholder="Algiers"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
              // value={formData.location}
              // onChange={handleInputChange}
              
            />
          </div>
          <div className="mt-auto text-right">
            <button
              type="submit"
              className="border-2 border-black bg-blueish font-bold py-1 px-4 mr-3"
            >
              Submit
            </button>
            <button className="border-2 border-black bg-redish font-bold py-1 px-4">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
