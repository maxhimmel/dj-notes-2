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
  updateSetList: (setList: SetListQuery) => {
    // This is assigned in the provider
  },
  initialSetList: undefined as SetListQuery,
  initializeSetList: (setList: SetListQuery) => {
    // This is assigned in the provider
  },
};
const context = createContext(defaultState);

export const useSetList = () => useContext(context);

export default function SetListProvider({ children }: PropsWithChildren) {
  const { id } = useParams<"id">();
  const [setList, setSetList] = useState<SetListQuery>();
  const [initialSetList, setInitialSetList] = useState<SetListQuery>();
  const getSet = trpc.useUtils().setLists.getSet;

  function initializeSetList(setList: SetListQuery) {
    updateSetList(setList);
    setInitialSetList(setList);
  }

  function updateSetList(setList: SetListQuery) {
    setSetList(setList);
  }

  useEffect(() => {
    if (!id) {
      initializeSetList(undefined);
    } else if (!setList) {
      (async () => {
        console.log("Querying setlist by:", id);
        const setList = (await getSet.fetch({ id }))?.setList;
        initializeSetList(setList);
        console.log("Set setlist to:", setList);
      })();
    }
  }, [id]);

  return (
    <context.Provider
      value={{
        setList,
        updateSetList,
        initialSetList,
        initializeSetList,
      }}
    >
      {children}
    </context.Provider>
  );
}
