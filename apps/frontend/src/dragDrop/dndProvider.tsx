import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TrackData } from "../nodes/trackData";

type DragType = {
  // type: string;
  data: TrackData;
};

const DnDContext = createContext({
  type: {} as DragType | null,
  setType: (type: DragType) => {
    // Set by provider ...
  },
});

export const useDnD = () => useContext(DnDContext);

export default function DnDProvider(props: PropsWithChildren) {
  const [type, setType] = useState<DragType | null>(null);

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {props.children}
    </DnDContext.Provider>
  );
}
