import { Navbar } from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./containers/Home";
import { Details } from "./containers/Details";
import { Login } from "./containers/Login";
import { Signup } from "./containers/Signup";
import { Dashboard } from "./containers/Dashboard";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: any) => {
    return currentUser ? children : <Navigate to={"/auth"} />;
  };

  const RequireNoAuth = ({ children }: any) => {
    return currentUser ? <Navigate to={"/"} /> : children;
  };

  return (
    <>
      <nav className="py-4 ">
        <Navbar />
      </nav>
      <div>
        <main className="container px-6 mx-auto py-8">
          <Routes>
            <Route path="/ads" element={<Home />} />
            <Route path="/ads/:id" element={<Details />} />
            <Route path="/login" element={<RequireNoAuth><Login /></RequireNoAuth>} />
            <Route path="/signup" element={<RequireNoAuth><Signup /></RequireNoAuth>} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:id" element={<RequireAuth><Dashboard /> </RequireAuth>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
