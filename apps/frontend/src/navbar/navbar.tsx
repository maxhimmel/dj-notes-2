import { useSession } from "../auth/sessionProvider";
import SignedIn from "../auth/signedIn";
import SignedOut from "../auth/signedOut";
import { Link } from "react-router";

export default function Navbar() {
  const { signIn, signOut } = useSession();

  return (
    <div className="navbar bg-base-300 text-base-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Scratch Notes
        </Link>
      </div>
      <div className="flex-none">
        <SignedOut>
          <button onClick={signIn} className="btn btn-primary btn-outline">
            Sign In
          </button>
        </SignedOut>
        <SignedIn>
          <button onClick={signOut} className="btn btn-primary">
            Sign Out
          </button>
        </SignedIn>
      </div>
    </div>
  );
}
