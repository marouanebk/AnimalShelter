import { useState } from "react";
import { Adds } from "../components/Adds";
import { Filter } from "../components/Filter";

export function Home() {
  const [filterState, setFilterState] = useState("");
  const [, setSearchQuery] = useState("");

  return (
    <>
      <Filter
        setFilterState={setFilterState}
        filterState={filterState}
        setSearchQuery={setSearchQuery}
      />
      <Adds />
    </>
  );
}
