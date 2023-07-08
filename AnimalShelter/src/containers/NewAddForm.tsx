import { AiOutlinePlusCircle } from "react-icons/ai";

export function NewAddForm() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">
        Publishing an advertisement for your pet
      </h1>
      <p className="font-bold mb-4">Upload Your pictures</p>
      <div className="max-w-fit  border-[3px] bg-white  border-black p-2  mx-auto sm:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center">
        <AiOutlinePlusCircle className="text-6xl text-lightGray cursor-pointer" />
      </div>

      <form className="my-10 flex flex-col md:flex-row gap-40 font-semibold filter-active w-fit">
        <div>
          <h2 className="text-xl font-bold mb-4">Your Pet's Information</h2>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div>
              <label htmlFor="text">Enter your pet's name</label>
              <input
                type="text"
                placeholder="Name"
                className="block px-5 py-2 text-md text-black  placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
              />
            </div>
            <div>
              <label htmlFor="text">Enter your pet's Type</label>
              <select
                name=""
                id=""
                className="block px-5 py-2 text-md text-black bg-white focus:outline-none font-bold  rounded-sm my-3"
              >
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4  items-start">
            <div>
              <label htmlFor="text">Enter your pet's race</label>
              <input
                type="text"
                placeholder="Race"
                className="block px-5 py-2 text-md  text-black placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
              />
            </div>
            <div>
              <label htmlFor="text">Enter your pet's Health</label>
              <input
                type="text"
                placeholder="Good"
                className="block px-5 py-2 text-md  text-black  placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <div className="flex gap-4 flex-col">
              <div>
                <label htmlFor="text">Enter your pet's Age</label>
                <input
                  type="text"
                  placeholder="Age in years"
                  className="block px-5 py-2 text-md  text-black placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm mt-3"
                  required
                />
              </div>
              <div className="flex items-center gap-4 ">
                <input type="checkbox" className="w-5 h-5" required />
                <label htmlFor="text">Vaccinated</label>
              </div>
            </div>
            <div className="mt-auto  md:text-right md:ms-auto">
              <button
                type="submit"
                className="border-2 border-black bg-blueish  font-bold py-1 px-4 mr-3"
              >
                Submit
              </button>
              <button className="border-2 border-black bg-redish  font-bold py-1 px-4">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
