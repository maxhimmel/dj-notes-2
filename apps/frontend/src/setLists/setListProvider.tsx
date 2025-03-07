import { SetList } from "@dj-notes-2/shared";
import { trpc } from "@trpc/frontend";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useParams } from "react-router";

const defaultState = {
  setList: undefined as SetList | undefined,
  setSetList: (setList: SetList | undefined) => {
    // This is assigned in the provider
  },
};
const context = createContext(defaultState);

export const useSetList = () => useContext(context);

export default function SetListProvider({ children }: PropsWithChildren) {
  const { id } = useParams<"id">();
  const getSet = trpc.setLists.getSet.useQuery({ id });

  const [setList, setSetList] = useState(getSet.data?.setList);

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
