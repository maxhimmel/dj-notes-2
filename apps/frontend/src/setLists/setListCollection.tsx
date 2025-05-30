import { SetList } from "@dj-notes-2/shared";
import { trpc } from "@trpc/frontend";
import { useEffect, useState } from "react";
import {
  RiDeleteBin2Line,
  RiEdit2Line,
  RiSparkling2Fill,
} from "react-icons/ri";
import { useNavigate } from "react-router";

export default function SetListCollection() {
  const getSets = trpc.setLists.getSets.useQuery();
  const deleteSetList = trpc.setLists.delete.useMutation();
  const [setLists, setSetLists] = useState(getSets.data?.setLists ?? []);

  useEffect(() => {
    setSetLists(getSets.data?.setLists ?? []);
  }, [getSets.data]);

  async function handleDeleteSetList(id: string) {
    const { setList: deletedSetList } = await deleteSetList.mutateAsync({ id });
    setSetLists(setLists.filter((s) => s.id !== deletedSetList.id));
  }

  return (
    <main className="flex flex-col p-10">
      <div className="flex items-center space-x-4">
        <h1 className="text-5xl font-bold">Set Lists</h1>
        {setLists.length > 0 ? <NewSetListButton /> : null}
      </div>
      <div className="divider divider-secondary"></div>
      {setLists.length <= 0 ? (
        <EmptySetLists />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Tracks</th>
                <th>Modified</th>
              </tr>
            </thead>
            <tbody>
              {setLists.map((set, idx) => (
                <SetListEntry
                  key={set.id}
                  entry={set}
                  index={idx}
                  deleteSet={handleDeleteSetList}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function NewSetListButton() {
  const navigate = useNavigate();
  const createSetList = trpc.setLists.create.useMutation();

  async function handleNewSetList() {
    const { setList } = await createSetList.mutateAsync({
      name: "New Set List",
    });

    navigate(`/setlists/${setList.id}`, { state: setList });
  }
  return (
    <button onClick={handleNewSetList} className="btn btn-secondary">
      New <RiSparkling2Fill className="size-6" />
    </button>
  );
}

function EmptySetLists() {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            You haven't created any sets yet!
          </h1>
          <p className="py-6">
            Click below to get started building a groovy new set list!
          </p>
          <NewSetListButton />
        </div>
      </div>
    </div>
  );
}

function SetListEntry(props: {
  entry: SetList;
  index: number;
  deleteSet: (id: string) => Promise<void>;
}) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/setlists/${props.entry.id}`, { state: props.entry });
  }

  async function handleDelete(evt: React.MouseEvent) {
    evt.stopPropagation();
    await props.deleteSet(props.entry.id);
  }

  const modified = props.entry.updatedAt;

  return (
    <tr className="cursor-pointer hover:!bg-base-300" onClick={handleEdit}>
      <th>{props.index + 1}</th>
      <td>{props.entry.name}</td>
      <td>{props.entry.tracks.length}</td>
      <td>{`${modified.toLocaleTimeString()}, ${modified.toLocaleDateString()}`}</td>
      <td className="text-right space-x-2">
        <div className="tooltip tooltip-primary" data-tip="Edit">
          <button className="btn btn-primary btn-xs" onClick={handleEdit}>
            <RiEdit2Line className="size-5" />
          </button>
        </div>
        <div className="tooltip tooltip-error" data-tip="Delete">
          <button className="btn btn-error btn-xs" onClick={handleDelete}>
            <RiDeleteBin2Line className="size-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
