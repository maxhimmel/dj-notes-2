import { useSession } from "./sessionProvider";
import { PropsWithChildren } from "react";

export default function SignedIn({ children }: PropsWithChildren) {
  const { session } = useSession();
  return session ? <>{children}</> : null;
}
