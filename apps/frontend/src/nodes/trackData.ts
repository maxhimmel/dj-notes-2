import { Node } from "@xyflow/react";
import { ITrack } from "@dj-notes-2/shared";

export type TrackData = Omit<ITrack, "position" | "nodeId">;

export type TrackType = Node<TrackData, "track">;

export type TrackProps = {
  id: string;
  data: TrackData;
  selected: boolean;
};
