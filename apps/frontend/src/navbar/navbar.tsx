import { MdQueueMusic } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { useSession } from "../auth/sessionProvider";
import SignedIn from "../auth/signedIn";
import SignedOut from "../auth/signedOut";

export default function Navbar() {
  const { session, signIn, signOut } = useSession();

  return (
    <div className="navbar bg-base-300 text-base-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Scratch Notes
        </Link>
        {session ? (
          <NavLink
            to="/setlists"
            end
            className={({ isActive }) =>
              isActive ? "hidden" : "btn btn-secondary"
            }
          >
            My Sets <MdQueueMusic className="size-6" />
          </NavLink>
        ) : null}
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
