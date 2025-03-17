import { NodeProps } from "@xyflow/react";
import { TrackType } from "./trackData";
import SpotifyNode from "./spotifyNode";
import UserNode from "./userNode";

export default function TrackNode({
  data,
  id,
  selected,
}: NodeProps<TrackType>) {
  return data.spotifyTrack ? (
    <SpotifyNode data={data} id={id} selected={selected} />
  ) : (
    <UserNode data={data} id={id} selected={selected} />
  );
}
