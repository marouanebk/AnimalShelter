import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { useRef, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
export function Login() {
  const { dispatch }: any = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [wrongAuth, setWrongAuth] = useState(false);

  const togglePassword = () => {
    const inputElement = passwordRef.current;
    if (inputElement) {
      if (inputElement.type === "password") {
        inputElement.type = "text";
      } else {
        inputElement.type = "password";
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_URL, {
        email,
        password,
      });
      console.log("Login success:", response.status);
      if (response.status === 200) {
        setWrongAuth(false);
        dispatch({
          type: "LOGIN",
          payload: {
            token: response.data.token,
            id: response.data.id,
          },
        });

        // navigate("/");
      } else if (response.status === 401) {
        setWrongAuth(true);
      }
      // dispatch({ type: 'LOGIN', payload: { email: email } })
    } catch (error) {
      setWrongAuth(true);
      console.error("Login error:", error);
    }
  };

  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div className="filter-active--secondary">
        <div className="w-fit mb-3">
          <h1 className="uppercase text-3xl font-bold">Log in</h1>
          <small className="capitalize font-thin">welcome Back</small>
        </div>
        <form onSubmit={handleLogin} className="capitalize font-bold">
          <div>
            <label htmlFor="email">Enter your Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
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
              className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
              required
              ref={passwordRef}
            />
          </div>
          <input
            type="checkbox"
            className="me-3"
            ref={checkboxRef}
            onClick={togglePassword}
          />
          <label htmlFor="showPassword">Show Password</label>
          <div className="mt-4 w-full text-left">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="border-2 border-black bg-blueish  font-bold py-1 px-4"
            >
              Login
            </motion.button>
            {wrongAuth && (
              <p className="text-red-700 mt-2 ">Email or password incorrect</p>
            )}
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
