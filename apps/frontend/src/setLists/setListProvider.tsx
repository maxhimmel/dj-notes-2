import { createContext, PropsWithChildren, useContext, useState } from "react";
import { SetList } from "@dj-notes-2/shared";

const defaultState = {
  setList: undefined as SetList | undefined,
  setSetList: (setList: SetList | undefined) => {
    // This is assigned in the provider
  },
};
const context = createContext(defaultState);

export const useSetList = () => useContext(context);

export default function SetListProvider({ children }: PropsWithChildren) {
  const [setList, setSetList] = useState<SetList | undefined>(undefined);

  return (
    <context.Provider
      value={{
        setList,
        setSetList,
      }}
    >
      {children}
    </context.Provider>
  );
}
