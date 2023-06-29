import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";

export function Login() {
  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div className="filter-active--secondary">
        <div className="w-fit mb-3">
          <h1 className="uppercase text-3xl font-bold">Log in</h1>
          <small className="capitalize font-thin">welcome Back</small>
        </div>
        <form action="" className="capitalize font-bold">
          <div>
            <label htmlFor="">Enter your Email</label>
            <input
              type="email"
              placeholder="Email"
              className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
              required
            />
          </div>
          <div>
            <label htmlFor="">enter your Password</label>
            <input
              type="password"
              placeholder="Password"
              className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
              required
            />
          </div>
          <input type="checkbox" className="me-3" />
          <label htmlFor="">show password</label>
          <div className="mt-4 w-full text-left">
            <button className="border-2 border-black bg-blueish  font-bold py-1 px-4">
              Login
            </button>
          </div>
        </form>
        <p className="my-2 text-sm">
          Do not have an account?{" "}
          <span className="font-bold underline">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
      <div className="basis-1/2">
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
