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
  prevSetListState: undefined as SetListQuery,
  setPrevSetListState: (setList: SetListQuery) => {
    // This is assigned in the provider
  },
};
const context = createContext(defaultState);

export const useSetList = () => useContext(context);

export default function SetListProvider({ children }: PropsWithChildren) {
  const { id } = useParams<"id">();
  const [setList, setSetList] = useState<SetListQuery>();
  const [prevSetListState, setPrevSetListState] = useState<SetListQuery>();
  const getSet = trpc.useUtils().setLists.getSet;

  useEffect(() => {
    console.log("SLP", { id });

    if (!id) {
      console.log("SLP", "reset");
      setSetList(undefined);
      setPrevSetListState(undefined);
    } else {
      (async () => {
        if (!prevSetListState) {
          const setList = (await getSet.fetch({ id }))?.setList;
          console.log("SLP", "setting initial set list", setList);
          setSetList(setList);
          setPrevSetListState(setList);
        }
      })();
    }
  }, [id]);

  return (
    <context.Provider
      value={{
        setList,
        setSetList,
        prevSetListState,
        setPrevSetListState,
      }}
    >
      {children}
    </context.Provider>
  );
}
