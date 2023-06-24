import { Card } from "./Card";
import { data } from "../data/add";
export function Adds() {
  return (
    <section className="mt-5 pb-10">
      <div className="my-5">
        <h1 className="text-lg font-bold">Advertisement</h1>
        <small className="text-lightGray">For Adoption</small>
      </div>
      <div className="grid grid-cols-fill gap-4">
        {data.map((ad) => (
          <Card
            key={ad.id}
            type={ad.type}
            location={ad.location}
            pictures={ad.pictures}
            id={ad.id}
          />
        ))}
      </div>
    </section>
  );
}
