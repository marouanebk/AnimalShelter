import { useRef, useState } from "react";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";
import other from "../assets/other.jpg";

type FilterProps = {
  setFilterState: (s: string) => void;
  filterState: string;
};

export function Filter({ setFilterState, filterState }: FilterProps) {
  const catRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  // function that toggles the category filter styling
  function handleClick(e: MouseEvent) {
    const target = e.target as Element;

    if (target.parentElement!.classList.contains("filter-active")) {
      [catRef, dogRef, otherRef].forEach((element) => {
        element.current!.classList.remove("filter-active");
      });
      setFilterState("");
    } else {
      [catRef, dogRef, otherRef].forEach((element) => {
        element.current!.classList.remove("filter-active");
      });
      target.parentElement!.classList.add("filter-active");
    }
  }

  return (
    <main className="mb-10">
      <input
        className="px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  w-full md:w-[350px] focus:outline-none font-bold  caret-grayish shadow-strong"
        type="text"
        placeholder="Search By Location"
      />
      <div className="my-6">
        <div className="my-5">
          <h1 className="text-lg font-bold">What are you looking for?</h1>
          <small className="text-grayish">filter by preference</small>
        </div>
        <div className="flex gap-5 items-center justify-between w-full md:w-[450px] font-bold">
          <div
            onClick={(e: any) => {
              handleClick(e);
            }}
            ref={catRef}
          >
            <img
              src={cat}
              alt="cat"
              className="aspect-square w-[150px] border-[3px] border-black "
              onClick={() => setFilterState("cat")}
            />
            <h2 className="mt-3 text-lg">Cats</h2>
          </div>
          <div
            onClick={(e: any) => {
              handleClick(e);
            }}
            ref={dogRef}
          >
            <img
              src={dog}
              alt="cat"
              className="aspect-square w-[150px] border-[3px]
                 border-black"
              onClick={() => setFilterState("dog")}
            />

            <h2 className="mt-3 text-lg">Dogs</h2>
          </div>
          <div
            onClick={(e: any) => {
              handleClick(e);
            }}
            ref={otherRef}
          >
            <img
              src={other}
              alt="other"
              className="aspect-square w-[150px] h-auto object-cover border-[3px]  border-black "
              onClick={() => setFilterState("other")}
            />
            <h2 className="mt-3 text-lg">Other</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
