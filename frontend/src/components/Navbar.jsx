import { Link } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Project Handover Portal</h2>

      <div>
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/create">
          <button>Create Project</button>
        </Link>

        <Link to="/projects">
          <button>View Projects</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;