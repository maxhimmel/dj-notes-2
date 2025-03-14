import { SetList } from "@dj-notes-2/shared";
import { trpc } from "@trpc/frontend";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";

type SetListQuery = SetList | undefined;

const defaultState = {
  setList: undefined as SetListQuery,
  setSetList: (setList: SetListQuery) => {
    // This is assigned in the provider
  },
};
const context = createContext(defaultState);

export const useSetList = () => useContext(context);

export default function SetListProvider({ children }: PropsWithChildren) {
  const { id } = useParams<"id">();
  const [setList, setSetList] = useState<SetListQuery>();
  const getSet = trpc.setLists.getSet.useQuery({ id }, { enabled: !!id });

  useEffect(() => {
    setSetList(getSet.data?.setList);
  }, [getSet.data, id]);

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
