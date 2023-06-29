import { Navbar } from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./containers/Home";
import { Details } from "./containers/Details";
import { Login } from "./containers/Login";
import { Signup } from "./containers/Signup";

function App() {
  return (
    <>
      <nav className="py-4 ">
        <Navbar />
      </nav>
      <div>
        <main className="container px-6 mx-auto py-8">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
