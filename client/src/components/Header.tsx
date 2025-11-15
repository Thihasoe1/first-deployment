import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex my-10 items-center justify-between">
      <h2 className="text-xl font-bold">Deployment Project</h2>
      <div className="space-x-4">
        <Link to={"/login"} className="text-white bg-black py-2 px-4 border">
          Login
        </Link>
        <Link to={"/register"} className="text-black py-2 px-4 border">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Header;
