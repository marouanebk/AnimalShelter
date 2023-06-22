import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";
import other from "../assets/other.jpg";

export function Filter() {
  return (
    <main className="mb-10">
      <input
        className="px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  w-full md:w-[350px] focus:outline-none bg-white font-bold  caret-grayish shadow-strong"
        type="text"
        placeholder="Search By Location"
      />
      <div className="my-6">
        <div className="my-5">
          <h1 className="text-lg font-bold">What are you looking for?</h1>
          <small className="text-grayish">filter by preference</small>
        </div>
        <div className="flex gap-2 items-center justify-between max-w-xl font-bold">
          <a href="#">
            <div>
              <img
                src={cat}
                alt="cat"
                className="aspect-square w-[150px] border-[3px]  border-black "
              />
              <h2 className="mt-3 text-lg">Cats</h2>
            </div>
          </a>
          <a href="">
            <div>
              <img
                src={dog}
                alt="cat"
                className="aspect-square w-[150px] border-[3px]
                 border-black"
              />
              <h2 className="mt-3 text-lg">Dogs</h2>
            </div>
          </a>
          <a href="">
            <div>
              <img
                src={other}
                alt="other"
                className="aspect-square w-[150px] h-auto object-cover border-[3px]  border-black "
              />
              <h2 className="mt-3 text-lg">Other</h2>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
