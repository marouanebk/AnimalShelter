import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";
import other from "../assets/other.jpg";

type FilterProps = {
  setFilterState: (s: string) => void;
  filterState: string;
  setSearchQuery: (s: string) => void;
};

export function Filter({ setFilterState, filterState }: FilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const catRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // function that toggles the category filter styling
  function handleClick(category: string) {
    [catRef, dogRef, otherRef].forEach((element) => {
      element.current!.classList.remove("filter-active");
    });

    if (filterState === category) {
      setFilterState("");
      navigate(`/ads`);
    } else {
      setFilterState(category);
      navigate(`/ads?type=${category}`);
    }
  }

  return (
    <main className="mb-10">
      <input
        className="px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  w-full md:w-[350px] focus:outline-none font-bold  caret-grayish shadow-strong"
        type="text"
        placeholder="Search By Location"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="my-6">
        <div className="my-5">
          <h1 className="text-lg font-bold">What are you looking for?</h1>
          <small className="text-grayish">filter by preference</small>
        </div>
        <div className="flex gap-5 items-center justify-between w-full md:w-[450px] font-bold">
          <div
            onClick={() => handleClick("cat")}
            ref={catRef}
            className={filterState === "cat" ? "filter-active" : ""}
          >
            <img src={cat} alt="cat" className="aspect-square w-[150px] border-[3px] border-black" />
            <h2 className="mt-3 text-lg">Cats</h2>
          </div>
          <div
            onClick={() => handleClick("dog")}
            ref={dogRef}
            className={filterState === "dog" ? "filter-active" : ""}
          >
            <img src={dog} alt="dog" className="aspect-square w-[150px] border-[3px] border-black" />
            <h2 className="mt-3 text-lg">Dogs</h2>
          </div>
          <div
            onClick={() => handleClick("other")}
            ref={otherRef}
            className={filterState === "other" ? "filter-active" : ""}
          >
            <img src={other} alt="other" className="aspect-square w-[150px] h-auto object-cover border-[3px] border-black" />
            <h2 className="mt-3 text-lg">Other</h2>
          </div>
        </div>
      </div>
    </main>
  );
}