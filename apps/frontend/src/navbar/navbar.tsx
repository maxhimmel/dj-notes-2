import { trpc } from "@trpc/frontend";
import { Link } from "react-router";

export default function Navbar() {
  const getUser = trpc.user.getUser.useQuery("scooby!");

  return (
    <div className="navbar bg-base-300 text-base-content">
      <Link to="/" className="btn btn-ghost text-xl">
        Scratch Notes {getUser.data?.name} + {getUser.data?.id}
      </Link>
    </div>
  );
}
