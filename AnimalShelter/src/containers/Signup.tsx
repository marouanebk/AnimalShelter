import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { useRef, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

export function Signup() {
  const { dispatch }: any = useContext(AuthContext);

  // refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [location, setlocation] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const checkboxRef = useRef<HTMLInputElement>(null);

  const [wrongAuth, setWrongAuth] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const [step, setStep] = useState(1);

  // function to handle click
  // const handleNext = () => {
  //   const first_name = firstNameRef.current?.value;
  //   const last_name = lastNameRef.current?.value;
  //   const email = emailRef.current?.value;
  //   const password = passwordRef.current?.value;
  //   const confirmPassword = confirmPasswordRef.current?.value;

  //   setStep((prev) => prev + 1);
  // };

  // function to make the password visible
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

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const first_name = firstNameRef.current?.value;
    const last_name = lastNameRef.current?.value;

    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    // const phone_number = phoneNumberRef.current?.value;
    // const location = locationRef.current?.value;

    if (password !== confirmPassword) {
      console.error("Password confirmation does not match.");
      setWrongAuth(true);
      return;
    }

    if (step == 1) {
      try {
        console.log("Step 1");
        const response = await axios.post(
          "http://localhost:4000/users/register",
          {
            first_name,
            last_name,
            email,
            password,
          }
        );
        if (response.status === 200) {
          setWrongAuth(false)

          setStep(2);
        } else {
          setWrongAuth(true)
          setAuthMessage(response.data.message)

        }
      }
      catch (error) {
        console.log(error);
      }
    } else if (step == 2) {
      try {
        console.log(email);
        const response = await axios.post(
          "http://localhost:4000/users/register_infos",
          {
            email,
            location,
            phone_number,

          }
        );
        if (response.status === 200) {
          dispatch({
            type: "LOGIN",
            payload: {
              // email: email,
              token: response.data.token,
              id: response.data.id,
            },
          });
        } else {
          setWrongAuth(true)
          setAuthMessage(response.data.message)
        }

      }
      catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div className="filter-active--secondary">
        <div className="w-fit mb-3">
          <h1 className="uppercase text-3xl font-bold">Sign up</h1>
          <small className="capitalize font-thing">welcome</small>
        </div>

        <form onSubmit={handleNext} className="capitalize font-bold">
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "anticipate" }}
              >
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
                      onChange={(e) => setEmail(e.target.value)}
                      value={email !== undefined ? email : ''}

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
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div>
                    <label htmlFor="confirmPassword">
                      Confirm your Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                      required
                      ref={confirmPasswordRef}
                    />
                    {wrongAuth && (
                      <p className="text-red-700 my-2 ">
                        Please check your password
                      </p>
                    )}
                    <input
                      type="checkbox"
                      className="me-3"
                      ref={checkboxRef}
                      onClick={togglePassword}
                    />
                    <label htmlFor="">Show Password</label>
                  </div>
                  <div className="mt-auto w-full text-right">
                    <button
                      type="submit"
                      className="border-2 border-black bg-redish font-bold py-1 px-4"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "anticipate" }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div>
                    <label htmlFor="">Enter Your Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Location"
                      className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                      onChange={(e) => setlocation(e.target.value)}
                      value={location}

                    />
                  </div>
                  <div>
                    <label htmlFor="">Enter Your Phone Number</label>
                    <input
                      type="number"
                      placeholder="Number"
                      className="block px-5 py-2 text-md text-lightGray placeholder:text-lightGray placeholder:text-sm  focus:outline-none font-bold  caret-grayish rounded-sm my-3"
                      value={phone_number}
                      onChange={(e) => setPhone_number(e.target.value)}

                    />
                  </div>
                </div>
                <div className="mt-auto w-full text-right">
                  <button
                    type="submit"
                    className="border-2 border-black bg-blueish font-bold py-1 px-4"
                  >
                    Signup
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <br />
        <p className="mt-2 text-sm font-normal">
          Have an account?{" "}
          <span className="font-bold underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
      <div>
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
