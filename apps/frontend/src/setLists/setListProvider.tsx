import { SetList } from "@dj-notes-2/shared";
import { trpc } from "@trpc/frontend";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type SetListQuery = SetList | undefined;

const context = createContext<{
  setList: SetListQuery;
  draftSetList: SetList;
  setDraftSetList: (setList: SetList) => void;
  saveDraft: () => Promise<void>;
}>({
  setList: undefined,
  draftSetList: undefined as unknown as SetList,
  setDraftSetList: () => {
    return;
  },
  saveDraft: () => Promise.resolve(),
});

export const useSetList = () => useContext(context);

export default function SetListProvider({
  children,
  initialSetListData,
  id,
}: PropsWithChildren & {
  initialSetListData: SetList | undefined;
  id: string;
}) {
  const setList = trpc.setLists.getSet.useQuery(
    { id },
    {
      initialData: initialSetListData
        ? { setList: initialSetListData }
        : undefined,
    }
  );

  const updateSetList = trpc.setLists.update.useMutation();

  if (setList.isFetching && !setList.data) {
    return <div>Loading</div>;
  }

  if (!setList.data) {
    throw new Error();
  }

  const [draftSetList, setDraftSetList] = useState(setList.data.setList);

  useEffect(() => {
    if (setList.data?.setList) {
      setDraftSetList(setList.data.setList);
    }
  }, [setList.data.setList]);

  console.table([
    {
      name: "initialSetListData",
      id: initialSetListData?.id,
      updatedAt: initialSetListData?.updatedAt.getMilliseconds(),
    },
    {
      name: "setList.data",
      id: setList.data.setList.id,
      updatedAt: setList.data.setList.updatedAt.getMilliseconds(),
    },
    {
      name: "draft",
      id: draftSetList.id,
      updatedAt: draftSetList.updatedAt.getMilliseconds(),
    },
  ]);
  return (
    <context.Provider
      value={{
        setList: setList.data?.setList,
        draftSetList,
        setDraftSetList,
        saveDraft,
      }}
    >
      {children}
    </context.Provider>
  );

  async function saveDraft() {
    if (!draftSetList) {
      return;
    }

    await updateSetList.mutateAsync({
      setList: draftSetList,
    });
    await setList.refetch();
  }
}
