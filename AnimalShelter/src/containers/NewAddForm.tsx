import { useState, useContext } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { handleUpload } from "../utils/uploadUtils";

export function NewAddForm() {
  const { currentUser }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    owner: string;
    animalName: string;
    type: string;
    race: string;
    vaccinated: boolean;
    healthCondition: string;
    age: string;
    pictures: string[]; // Specify the type as an array of strings
  }>({
    owner: currentUser.id,
    animalName: "",
    type: "cat",
    race: "",
    vaccinated: true,
    healthCondition: "",
    age: "",
    pictures: [],
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };
  const [files, setFiles] = useState([]);

  function handleChange(event: any) {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles as any);
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const uploadedPictures = await handleUpload(files);

      const updatedFormData = { ...formData, pictures: uploadedPictures };

      const result = await axios.post(
        import.meta.env.VITE_CREATE_AD_API_URL,
        updatedFormData
      );
      if (result.status == 200) {
        alert("Add has been published");
        navigate("/user");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">
        Publishing an advertisement for your pet
      </h1>
      <p className="font-bold ">Upload Your pictures</p>
      <small className="font-bold text-sm ">
        Select three pictures at the time
      </small>
      <p className="my-4 font-semibold"></p>
      <div className="flex gap-5 flex-col md:flex-row items-center justify-start ">
        {files.length === 0 ? (
          <>
            <div className="max-w-fit   border-[3px] bg-white  border-black sm:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center my-5">
              <input
                type="file"
                id="fileInput"
                onChange={handleChange}
                accept="image/*"
                multiple
                className="custom-file-input"
              />
              <label htmlFor="fileInput" className="custom-file-label">
                <AiOutlinePlusCircle className="text-6xl text-lightGray cursor-pointer" />
              </label>
            </div>
          </>
        ) : (
          <div className="flex gap-5 flex-col md:flex-row items-center justify-start my-5">
            {files.map((file, index) => (
              <div
                key={index}
                className="max-w-fit  border-[3px] bg-white  border-black  mx-auto sm:mx-0 min-w-[200px] min-h-[200px] w-[200px] h-[200px] overflow-hidden flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`pic-${index}`}
                  className="w-[198px] h-[198px] object-cover"
                />
              </div>
            ))}
            <div className="max-w-fit  border-[3px] bg-white  border-black   mx-auto sm:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center">
              <input
                type="file"
                id="fileInput"
                onChange={handleChange}
                accept="image/*"
                multiple
                className="custom-file-input"
              />
              <label htmlFor="fileInput" className="custom-file-label">
                <AiOutlinePlusCircle className="text-6xl text-lightGray cursor-pointer" />
              </label>
            </div>
          </div>
        )}
      </div>

      <form
        className="my-10 flex flex-col md:flex-row gap-40 font-semibold filter-active w-fit"
        onSubmit={handleFormSubmit}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Your Pet's Information</h2>
          <div className="flex gap-4 flex-col md:flex-row md:items-start">
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
          </div>
          <div className="flex gap-4 flex-col md:flex-row md:items-start">
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
          </div>
          <div className="flex gap-4 flex-col md:flex-row md:items-start">
            <div>
              <div>
                <label htmlFor="age">Enter your pet's Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age in years"
                  className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm mt-3"
                  value={formData.age}
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
            </div>
            <div className="mt-auto md:text-right md:ms-auto">
              <button
                type="submit"
                className="border-2 border-black bg-blueish font-bold py-1 px-4 mr-3"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <Link to="/user">
                <button className="border-2 border-black bg-redish font-bold py-1 px-4">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
      {/* {popped && <article className="popup">
              <h2>Add Has been added!</h2>
      </article>} */}
    </main>
  );
}
