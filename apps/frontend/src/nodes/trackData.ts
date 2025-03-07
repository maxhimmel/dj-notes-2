import { Node } from "@xyflow/react";
import { Track } from "@dj-notes-2/shared";

export type TrackData = Omit<Track, "position" | "nodeId">;

export type TrackType = Node<TrackData, "track">;

export type TrackProps = {
  id: string;
  data: TrackData;
  selected: boolean;
};
