import { Session } from "@auth/express";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const defaultState = {
  session: null as Session | null,
  setSession: (session: Session | null) => {
    // This method will be assigned by useState
  },
  signIn: () => (window.location.href = "/api/auth/signin"),
  signOut: () => (window.location.href = "/api/auth/signout"),
};
const context = createContext(defaultState);

export const useSession = () => useContext(context);

export default function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getSession();
      setSession(result);
    })();
  }, []);

  return (
    <context.Provider
      value={{
        ...defaultState,
        session,
        setSession,
      }}
    >
      {children}
    </context.Provider>
  );
}

async function getSession(): Promise<Session | null> {
  const response = await fetch("/api/auth/session");
  return await response.json();
}
