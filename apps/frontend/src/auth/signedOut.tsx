import { useSession } from "./sessionProvider";
import { PropsWithChildren } from "react";

export default function SignedOut({ children }: PropsWithChildren) {
  const { session } = useSession();
  return !session ? <>{children}</> : null;
}
