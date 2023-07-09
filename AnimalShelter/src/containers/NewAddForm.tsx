import { useState, useContext , useEffect} from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import storage from "../firebaseconfig"



export function NewAddForm() {
  const { currentUser }: any = useContext(AuthContext);

  const [formData, setFormData] = useState<{
    owner: any;
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
    type: "",
    race: "",
    vaccinated: true,
    healthCondition: "",
    age: "",
    pictures: [],
  });

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };
  const [files, setFiles] = useState([]);
  const [percent, setPercent] = useState(0);


  function handleChange(event: any) {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  }

  // Handles input change event and updates state
  function handleUpload(formData) {
    return new Promise((resolve, reject) => {
      if (!files.length) {
        alert("Please choose at least one file first!");
        reject();
        return;
      }
  
      const uploadedPictures =[];
  
      const uploadTasks = files.map((file) => {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
  
              setPercent(percent);
            },
            (err) => {
              console.log(err);
              reject(err);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  uploadedPictures.push(url);
                  console.log(url);
                  resolve();
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
            }
          );
        });
      });
  
      Promise.all(uploadTasks)
        .then(() => {
          console.log("uploaded pictures ",uploadedPictures);
          const updatedFormData = { ...formData, pictures: uploadedPictures };
          setFormData(updatedFormData);
          console.log(formData.pictures);
          resolve(uploadedPictures);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
  const handleFormSubmit = async (event : any) => {
    event.preventDefault();
  
    try {
      console.log("in function");
      const uploadedPictures = await handleUpload(formData); // Wait for handleUpload to complete and get the updated pictures array
  
      const updatedFormData = { ...formData, pictures: uploadedPictures }; // Update the formData with the new pictures array
      setFormData(updatedFormData); // Update the state with the new formData
  
      console.log(updatedFormData.pictures);
      const result = await axios.post(
        "http://localhost:4000/createAd",
        updatedFormData
      );
      console.log("after request completed");
      // Request successful, handle success (e.g., display a success message or redirect the user)
    } catch (error) {
      // Request failed, handle error (e.g., display an error message or handle the error in an appropriate manner)
    }
  };

  // useEffect(() => {
  //   console.log("Updated formData.pictures:", formData.pictures);
  // }, [formData]);


  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">
        Publishing an advertisement for your pet
      </h1>
      <p className="font-bold mb-4">Upload Your pictures</p>

      <input type="file" onChange={handleChange} accept="image/*" multiple />
      {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
      <p>{percent} "% done"</p>

      {/*  */}
      {/* <div className="max-w-fit border-[3px] bg-white border-black p-2 mx-auto sm:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center">
        <AiOutlinePlusCircle className="text-6xl text-lightGray cursor-pointer" />
      </div> */}
      <div className="max-w-fit border-[3px] bg-white border-black p-2 mx-auto sm:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center">
        {files.length === 0 ? (
          <AiOutlinePlusCircle className="text-6xl text-lightGray cursor-pointer" />
        ) : (
          <div className="flex gap-7 items-center justify-between flex-col sm:flex-row max-w-2xl">
            {files.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`pic-${index}`}
                  className="block border-[3px] border-black w-52 h-52 object-cover"
                />
              </div>
            ))}
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
                  type="text"
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
              >
                Submit
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
    </main>
  );
}
