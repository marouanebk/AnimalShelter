import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";
import other from "../assets/other.jpg";
import { motion } from "framer-motion";

type FilterProps = {
  setFilterState: (s: string) => void;
  filterState: string;
  setSearchQuery: (s: string) => void;
};

export function Filter({
  setFilterState,
  filterState,
  setSearchQuery,
}: FilterProps) {
  const [searchQuery, setSearchQueryInternal] = useState("");
  const navigate = useNavigate();

  const catRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryInternal(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchQuery);
    navigate(`/ads?location=${searchQuery}`);
  };

  // function that toggles the category filter styling
  function handleClick(category: string) {
    [catRef, dogRef, otherRef].forEach((element) => {
      element.current!.classList.remove("filter-active");
    });

    if (filterState === category) {
      setFilterState("");
      navigate(`/ads?location=${searchQuery}`);
    } else {
      setFilterState(category);
      navigate(`/ads?type=${category}&location=${searchQuery}`);
    }
  }

  return (
    <main className="mb-10">
      <div className="flex flex-col md:flex-row justify-start items-start md:items-center  gap-6 mb-4">
        <input
          className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish shadow-strong"
          type="text"
          placeholder="Search By Location"
          value={searchQuery}
          onChange={handleSearch}
        />
        <motion.button
          whileTap={{ scale: 0.9, x: 4, y: 4 }}
          className="border-2 border-black bg-blueish font-bold py-1 px-4 shadow-strong"
          onClick={handleSearchClick}
        >
          Search
        </motion.button>
      </div>
      <div className="my-6">
        <div className="my-5">
          <h1 className="text-lg font-bold">What are you looking for?</h1>
          <small className="text-grayish">filter by preference</small>
        </div>
        <div className="flex gap-5 items-center justify-between w-full md:w-[450px] font-bold">
          <motion.div
            whileHover={{ scale: 0.9 }}
            onClick={() => handleClick("cat")}
            ref={catRef}
            className={
              filterState === "cat"
                ? "filter-active cursor-pointer"
                : "cursor-pointer"
            }
          >
            <img
              src={cat}
              alt="cat"
              className="aspect-square w-[150px] border-[3px] border-black"
            />
            <h2 className="mt-3 text-lg">Cats</h2>
          </motion.div>
          <motion.div
            whileHover={{ scale: 0.9 }}
            onClick={() => handleClick("dog")}
            ref={dogRef}
            className={
              filterState === "dog"
                ? "filter-active cursor-pointer"
                : "cursor-pointer"
            }
          >
            <img
              src={dog}
              alt="dog"
              className="aspect-square w-[150px] border-[3px] border-black"
            />
            <h2 className="mt-3 text-lg">Dogs</h2>
          </motion.div>
          <motion.div
            whileHover={{ scale: 0.9 }}
            onClick={() => handleClick("other")}
            ref={otherRef}
            className={
              filterState === "other"
                ? "filter-active cursor-pointer"
                : "cursor-pointer"
            }
          >
            <img
              src={other}
              alt="other"
              className="aspect-square w-[150px] h-auto object-cover border-[3px] border-black"
            />
            <h2 className="mt-3 text-lg">Other</h2>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
