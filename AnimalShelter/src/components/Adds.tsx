import { Card } from "./Card";
import { addsData } from "../data/AddsData";
type AddsProps = {
  filterState: string;
};

export function Adds({ filterState }: AddsProps) {
  const filteredData = addsData.filter((add) => {
    return add.type.includes(filterState);
  });
  // const filteredData = data;
  return (
    <section className="mt-5 pb-10">
      <div className="my-5">
        <h1 className="text-lg font-bold">Advertisement</h1>
        <small className="text-lightGray">For Adoption</small>
      </div>
      <div className="grid grid-cols-fill gap-4">
        {filteredData.map((ad) => (
          <Card
            key={ad.id}
            type={ad.type}
            location={ad.location}
            pictures={ad.pictures}
            id={ad.id}
            date={ad.date}
          />
        ))}
      </div>
    </section>
  );
}
