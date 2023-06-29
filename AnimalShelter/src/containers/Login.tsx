import bg from "../assets/bg.jpg";

export function Login() {
  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div>
        <div className="filter-active w-fit mb-3">
          <h1 className="uppercase text-3xl font-bold">Log in</h1>
          <small className="capitalize">welcome Back</small>
        </div>
        <form action="" className="capitalize text">
          <div>
            <label htmlFor="">Enter your Email</label>
            <input
              type="email"
              placeholder="Email"
              className="block my-3 bg-lighterGray text-lightGray py-2 px-4  focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="">enter your Password</label>
            <input
              type="password"
              placeholder="Password"
              className="block my-3 bg-lighterGray text-lightGray py-2 px-4  focus:outline-none"
              required
            />
          </div>
          <input type="checkbox" className="me-3" />
          <label htmlFor="">show password</label>
          <div className="mt-4 w-full text-left">
            <button className="border-2 border-black bg-blueish  font-bold py-1 px-4">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="basis-1/2">
        <img src={bg} alt="" />
      </div>
    </main>
  );
}
