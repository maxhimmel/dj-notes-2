import BaseNode from "./baseNode";
import { TrackProps } from "./trackData";

export default function SpotifyNode({ id, data, selected }: TrackProps) {
  return (
    <BaseNode selected={selected}>
      <figure>
        <img src={data.spotifyTrack?.albumImg} alt="Album" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title">{data.title}</h2>
        <p>{data.artist}</p>
        <div className="card-actions justify-end">{/* extra content? */}</div>
      </div>
    </BaseNode>
  );
}
