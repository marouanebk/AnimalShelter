import { Filter } from "./components/Filter";
import { Navbar } from "./components/Navbar";
import { Adds } from "./components/Adds";
function App() {
  return (
    <main className="container px-6 mx-auto">
      <Navbar />
      <Filter />
      <Adds />
    </main>
  );
}

export default App;
