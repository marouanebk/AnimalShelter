import { Filter } from "./components/Filter";
import { Navbar } from "./components/Navbar";
import { Adds } from "./components/Adds";

function App() {
  return (
    <>
      <nav className="bg-white py-4 ">
        <Navbar />
      </nav>
      <div className="pt-8">
        <main className="container px-6 mx-auto ">
          <Filter />
          <Adds />
        </main>
      </div>
    </>
  );
}

export default App;
