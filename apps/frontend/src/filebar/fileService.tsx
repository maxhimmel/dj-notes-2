import { SetList } from "@dj-notes-2/shared";

export type FileState = "saved" | "saving" | "changed" | "";

export function isEqual(lhs: SetList, rhs: SetList) {
  if (lhs.id !== rhs.id) {
    return false;
  } else if (lhs.name !== rhs.name) {
    return false;
  } else if (lhs.tracks.length !== rhs.tracks.length) {
    return false;
  } else if (lhs.edges.length !== rhs.edges.length) {
    return false;
  }

  for (let idx = 0; idx < lhs.tracks.length; ++idx) {
    const lhsTrack = lhs.tracks[idx];
    const rhsTrack = rhs.tracks[idx];

    if (lhsTrack.nodeId !== rhsTrack.nodeId) {
      return false;
    } else if (lhsTrack.artist !== rhsTrack.artist) {
      return false;
    } else if (lhsTrack.title !== rhsTrack.title) {
      return false;
    } else if (lhsTrack.position.x !== rhsTrack.position.x) {
      return false;
    } else if (lhsTrack.position.y !== rhsTrack.position.y) {
      return false;
    }
  }

  for (let idx = 0; idx < lhs.edges.length; ++idx) {
    const lhsEdge = lhs.edges[idx];
    const rhsEdge = rhs.edges[idx];

    if (lhsEdge.edgeId !== rhsEdge.edgeId) {
      return false;
    } else if (lhsEdge.source !== rhsEdge.source) {
      return false;
    } else if (lhsEdge.target !== rhsEdge.target) {
      return false;
    }
  }

  return true;
}
