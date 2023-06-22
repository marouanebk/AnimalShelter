export function Navbar() {
  return (
    <nav className="container px-6 mx-auto ">
      <div className="flex justify-between items-center">
        <h1 className="font-black text-xl">Animal Shelter</h1>
        <button className="border-2 border-black bg-blueish  font-bold py-1 px-4">
          Login
        </button>
      </div>
    </nav>
  );
}
