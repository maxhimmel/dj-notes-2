import { useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";
import { MdDragHandle } from "react-icons/md";
import BaseNode from "./baseNode";
import { TrackProps } from "./trackData";

export default function UserNode({ id, data, selected }: TrackProps) {
  const { setNodes } = useReactFlow();

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            data: {
              ...data,
              [evt.target.name]: evt.target.value,
            },
          };
        }
        return n;
      })
    );
  }

  return (
    <BaseNode className="bg-base-100" selected={selected}>
      <div className="card-body p-4">
        <div className="flex flex-col rounded-lg">
          <input
            type="text"
            className="input input-sm input-ghost card-title nodrag p-0"
            name="title"
            placeholder="Title"
            value={data.title}
            onChange={handleChange}
          />
          <input
            type="text"
            className="input input-sm input-ghost nodrag p-0 text-sm"
            name="artist"
            placeholder="Artist"
            value={data.artist}
            onChange={handleChange}
          />
        </div>
        <div className="bg-base-300 rounded-lg flex grow items-center justify-center">
          <MdDragHandle className="size-10 mix-blend-soft-light" />
        </div>
      </div>
    </BaseNode>
  );
}
