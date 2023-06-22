import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router";
import { Home } from "./containers/Home";
import { Details } from "./containers/Details";

function App() {
  return (
    <>
      <nav className="bg-white py-4 ">
        <Navbar />
      </nav>
      <div className="pt-8">
        <main className="container px-6 mx-auto ">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/:id" element={<Details />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
