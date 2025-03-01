import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 text-base-content">
      <Link to="/" className="btn btn-ghost text-xl">
        Scratch Notes
      </Link>
    </div>
  );
}
