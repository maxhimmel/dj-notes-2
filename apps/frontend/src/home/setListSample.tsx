import {
  addEdge,
  Background,
  Connection,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";
import { TrackType } from "../nodes/trackData";
import TrackNode from "../nodes/trackNode";

const { NODES, EDGES, NODE_TYPES } = createSampleData();

export function SetListSample() {
  const [nodes, setNodes, onNodesChange] = useNodesState<TrackType>(NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(EDGES);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <>
      <div className="relative flex grow h-full">
        <div className="flex flex-col grow">
          <div className="relative flex grow h-full">
            <ReactFlow
              colorMode="dark"
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              zoomOnScroll={false}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              onInit={(instance) => instance.fitView()}
            >
              <Background gap={24} size={1} />
            </ReactFlow>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-base-100 to-75%"></div>
    </>
  );
}

function createSampleData() {
  const NODES: TrackType[] = [
    {
      id: "0",
      position: {
        x: -44.13524842260216,
        y: -209.22272213263807,
      },
      type: "track",
      data: {
        title: "LIL DUTCHIE",
        artist: "Zackey Force Funk",
        spotifyTrack: {
          spotifyId: "4sb8zLR2LRPoYv02qRyqoa",
          albumImg:
            "https://i.scdn.co/image/ab67616d0000b273b555f20e34e93914d8e13c33",
          id: "679bde33882770e6cc508efa",
        },
        id: "679bde33882770e6cc508ef8",
      },
      measured: {
        width: 208,
        height: 208,
      },
    },
    {
      id: "1",
      position: {
        x: -226.32383930435662,
        y: 86.94206559281355,
      },
      type: "track",
      data: {
        title: "Love Me Right - XL Middleton Remix",
        artist: "MIA",
        spotifyTrack: {
          spotifyId: "3Q4ACYzBdMohplw3DxVeti",
          albumImg:
            "https://i.scdn.co/image/ab67616d0000b273186b5cf4f39c14f7a026365b",
          id: "679bde33882770e6cc508efd",
        },
        id: "679bde33882770e6cc508efb",
      },
      measured: {
        width: 208,
        height: 208,
      },
    },
    {
      id: "2",
      position: {
        x: 142.7971854699502,
        y: 86.5464758243973,
      },
      type: "track",
      data: {
        title: "Stone Love",
        artist: "Kashif",
        spotifyTrack: {
          spotifyId: "2wPJBZ7o4a1TurmrgmNEUK",
          albumImg:
            "https://i.scdn.co/image/ab67616d0000b273658c72f04961c635653a5a81",
          id: "679bde33882770e6cc508f00",
        },
        id: "679bde33882770e6cc508efe",
      },
      measured: {
        width: 208,
        height: 208,
      },
    },
    {
      id: "3",
      position: {
        x: -170.22298831820993,
        y: 382.0915852247382,
      },
      type: "track",
      data: {
        title: "Funktown Nights",
        artist: "E. Live",
        spotifyTrack: {
          spotifyId: "1dZ1GPgg5KSgbcgBTQwVR7",
          albumImg:
            "https://i.scdn.co/image/ab67616d0000b273a1c2bb45aab86c4ac5508778",
          id: "679bde33882770e6cc508f03",
        },
        id: "679bde33882770e6cc508f01",
      },
      measured: {
        width: 208,
        height: 208,
      },
    },
  ];

  const EDGES = [
    {
      id: "xy-edge__1-0",
      source: "0",
      target: "1",
    },
    {
      id: "xy-edge__2-0",
      source: "0",
      target: "2",
    },
    {
      id: "xy-edge__3-1",
      source: "1",
      target: "3",
    },
  ];

  const NODE_TYPES = {
    track: TrackNode,
  };

  return { NODES, EDGES, NODE_TYPES };
}
