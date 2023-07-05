import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

export function Navbar() {
  const { pathname } = useLocation();

  let check = true;
  if (pathname == "/login" || pathname == "/signup") {
    check = false;
  }
  const { currentUser, dispatch }: any = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="container px-6 mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="font-black text-xl">Animal Shelter</h1>
        </Link>
        {check && currentUser ? (
          <div className="flex gap-4 items-center justify-between">
            <Link to={`/user/${currentUser.token}`}>
              <FaUser className="text-2xl" />
            </Link>
            <button
              className="border-2 border-black bg-blueish font-bold py-1 px-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          check && (
            <Link to="/login">
              <button className="border-2 border-black bg-blueish font-bold py-1 px-4">
                Login
              </button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
