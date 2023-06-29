import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";

export function Signup() {
  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div className="filter-active--secondary">
        <div className="w-fit mb-3">
          <h1 className="uppercase text-3xl font-bold">Sign up</h1>
          <small className="capitalize font-thing">welcome</small>
        </div>
        <form action="" className="capitalize font-bold">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <label htmlFor="">enter your first name</label>
              <input
                type="text"
                placeholder="First Name"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
              />
            </div>
            <div>
              <label htmlFor="">enter your Last name</label>
              <input
                type="text"
                placeholder="Last name"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <label htmlFor="">enter your Email</label>
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
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <label htmlFor="">confirm your Password</label>
              <input
                type="password"
                placeholder="Confirm"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
              />
              <input type="checkbox" className="me-3" />
              <label htmlFor="">show password</label>
            </div>
            <div className="mt-auto w-full text-right">
              <button className="border-2 border-black bg-blueish  font-bold py-1 px-4">
                Signup
              </button>
            </div>
          </div>
          <p className="my-2 text-sm font-normal">
            Have an account?{" "}
            <span className="font-bold underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
      <div>
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
