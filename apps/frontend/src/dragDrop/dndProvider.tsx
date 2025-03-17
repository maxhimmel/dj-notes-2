import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TrackData } from "../nodes/trackData";

type DragType = {
  // type: string;
  data: TrackData;
};

const DnDContext = createContext({
  dragType: {} as DragType | null,
  setType: (type: DragType) => {
    // Set by provider ...
  },
});

export const useDnD = () => useContext(DnDContext);

export default function DnDProvider(props: PropsWithChildren) {
  const [dragType, setType] = useState<DragType | null>(null);

  return (
    <DnDContext.Provider value={{ dragType, setType }}>
      {props.children}
    </DnDContext.Provider>
  );
}
