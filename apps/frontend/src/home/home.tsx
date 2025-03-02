import { trpc } from "@trpc/frontend";
import { useSession } from "../auth/sessionProvider";

export default function Home() {
  const { session } = useSession();
  const getUser = trpc.user.getUser.useQuery("Hello world!");

  return (
    <ul className="flex flex-col">
      <li>
        User's name? {"-->"} {session?.user?.name ?? "Signed out"}
      </li>
      <li>
        {"API Test: /api/user.getUser?input='Hello world!' --> < " +
          getUser.data?.id +
          ", " +
          getUser.data?.name +
          " >"}
      </li>
    </ul>
  );
}
