import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { useRef, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export function Signup() {
  const { dispatch }: any = useContext(AuthContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [wrongAuth, setWrongAuth] = useState(false);

  const togglePassword = () => {
    const inputElement1 = passwordRef.current;
    const inputElement2 = confirmPasswordRef.current;
    if (inputElement1 && inputElement2) {
      if (inputElement1.type === "password") {
        inputElement1.type = "text";
        inputElement2.type = "text";
      } else {
        inputElement1.type = "password";
        inputElement2.type = "password";
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const first_name = firstNameRef.current?.value;
    const last_name = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      console.error("Password confirmation does not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          first_name,
          last_name,
          email,
          password,
        }
      );

      console.log("Signup success:", response.data);
      if (response.status === 200) {
        dispatch({
          type: "LOGIN",
          payload: {
            email: email,
            token: response.data.token,
            id: response.data.id,
          },
        });

        // navigate("/");
      }
      // dispatch({ type: 'LOGIN', payload: { id: response.data.id, email } })
      // dispatch({ type: 'LOGIN', payload: { email : email } })

      //
    } catch (error) {
      setWrongAuth(true);
      console.error("Signup error:", error);
    }
  };

  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div className="filter-active--secondary">
        <div className="w-fit mb-3">
          <h1 className="uppercase text-3xl font-bold">Sign up</h1>
          <small className="capitalize font-thing">welcome</small>
        </div>
        <form onSubmit={handleSignup} className="capitalize font-bold">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <label htmlFor="firstName">Enter your First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
                ref={firstNameRef}
              />
            </div>
            <div>
              <label htmlFor="lastName">Enter your Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
                ref={lastNameRef}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <label htmlFor="email">Enter your Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password">Enter your Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
                ref={passwordRef}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <label htmlFor="confirmPassword">Confirm your Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                required
                ref={confirmPasswordRef}
              />
              <p className="text-red-700 my-2 ">password desn't match</p>
              <input
                type="checkbox"
                className="me-3"
                ref={checkboxRef}
                onClick={togglePassword}
              />
              <label htmlFor="">Show Password</label>
              <p className="mt-2 text-sm font-normal">
                Have an account?{" "}
                <span className="font-bold underline">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
            <div className="mt-auto w-full text-right">
              <button
                type="submit"
                className="border-2 border-black bg-blueish font-bold py-1 px-4"
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
