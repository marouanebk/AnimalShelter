import { useState } from "react";
import { Adds } from "../components/Adds";
import { Filter } from "../components/Filter";

export function Home() {
  const [filterState, setFilterState] = useState("");

  return (
    <>
      <Filter setFilterState={setFilterState} filterState={filterState} />
      <Adds filterState={filterState} />
    </>
  );
}
