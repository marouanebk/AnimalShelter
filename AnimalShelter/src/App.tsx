import { Navbar } from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./containers/Home";
import { Details } from "./containers/Details";
import { Authentication } from "./containers/authentication";

function App() {
  return (
    <>
      <nav className="bg-white py-4 ">
        <Navbar />
      </nav>
      <div className="">
        <main className="container px-6 mx-auto py-8">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
