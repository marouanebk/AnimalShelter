import { Navbar } from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./containers/Home";
import { Details } from "./containers/Details";
import { Login } from "./containers/Login";
import { Signup } from "./containers/Signup";
import { Dashboard } from "./containers/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { NewAddForm } from "./containers/NewAddForm";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: any) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };

  const RequireNoAuth = ({ children }: any) => {
    return currentUser ? <Navigate to={"/ads"} /> : children;
  };

  return (
    <>
      <nav className="py-4 bg-white">
        <Navbar />
      </nav>
      <div>
        <main className="container px-8 mx-auto py-8">
          <Routes>
            <Route path="/ads" element={<Home />} />
            <Route path="/ads/:id" element={<Details />} />
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireNoAuth>
                  <Signup />
                </RequireNoAuth>
              }
            />
            <Route
              path="/user"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/user/new-add"
              element={
                <RequireAuth>
                  <NewAddForm />
                </RequireAuth>
              }
            />
            <Route
              path="/user"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/ads" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
