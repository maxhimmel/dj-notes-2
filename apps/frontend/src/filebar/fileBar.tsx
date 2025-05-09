import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { useSetList } from "../setLists/setListProvider";
import { isEqual } from "./fileService";
import Notification from "./notification";

type FileState = "saved" | "saving" | "changed" | "";

export function FileBar() {
  const { setList, draftSetList, setDraftSetList, saveDraft } = useSetList();
  const [fileState, setFileState] = useState<FileState>("");

  useEffect(() => {
    function handlePreventWindowClose(evt: BeforeUnloadEvent) {
      evt.preventDefault();
    }

    if (draftSetList && setList) {
      if (!isEqual(draftSetList, setList)) {
        setFileState("changed");
        window.addEventListener("beforeunload", handlePreventWindowClose);
      } else {
        setFileState("");
        window.removeEventListener("beforeunload", handlePreventWindowClose);
      }
    }

    return () =>
      window.removeEventListener("beforeunload", handlePreventWindowClose);
  }, [setList, draftSetList]);

  async function handleSave(evt: FormEvent) {
    if (!setList) {
      return;
    }

    evt.preventDefault();

    setFileState("saving");
    await saveDraft();
    setFileState("saved");
  }

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!setList) {
      return;
    }

    setDraftSetList({
      ...setList,
      [evt.target.name]: evt.target.value,
    });
  }

  if (!setList) {
    return null;
  }

  return (
    <div className="w-full bg-base-200 border-b-2 border-neutral p-2 pl-4 flex flex-col">
      <form
        onSubmit={handleSave}
        className="relative space-x-2 flex items-center"
      >
        <div className="tooltip tooltip-primary tooltip-bottom" data-tip="Save">
          <button className="btn btn-primary btn-square btn-lg">
            <FaRegSave className="size-7" />
          </button>
        </div>
        <input
          className="input input-lg w-56"
          type="text"
          name="name"
          required
          placeholder="Set List Name"
          value={setList.name}
          onChange={handleNameChange}
          // style={{ width: `${setList.name.length + 1}ch` }} // input expands to fit char length
        />
        <Notification fileState={fileState} />
      </form>
    </div>
  );
}
