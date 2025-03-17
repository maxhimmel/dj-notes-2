import { SetList } from "@dj-notes-2/shared";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { DragEvent, useCallback, useEffect, useMemo, useRef } from "react";
import DnDProvider, { useDnD } from "../dragDrop/dndProvider";
import { FileBar } from "../filebar/fileBar";
import { TrackData, TrackType } from "../nodes/trackData";
import TrackNode from "../nodes/trackNode";
import { useSetList } from "./setListProvider";
import { SideBar } from "./sideBar";

export default function Component() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <SetListComponent />
      </DnDProvider>
    </ReactFlowProvider>
  );
}

function SetListComponent() {
  const flowInstance = useReactFlow();
  const flowWrapper = useRef<HTMLDivElement>(null);
  const { setList, setSetList, prevSetListState } = useSetList();

  const nodeTypes = useMemo(() => ({ track: TrackNode }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<TrackData>>(
    toReactFlowNodes(prevSetListState)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
    toReactFlowEdges(prevSetListState)
  );

  useEffect(() => {
    setNodes(toReactFlowNodes(prevSetListState));
    setEdges(toReactFlowEdges(prevSetListState));
  }, [prevSetListState]);

  console.log("MOUNT", setList, nodes, edges);

  const { dragType } = useDnD();
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!dragType) {
        return;
      }

      const newNode: TrackType = {
        id: (nodes.length > 0
          ? Number.parseInt(nodes[nodes.length - 1].id) + 1
          : 0
        ).toString(),
        position: flowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        type: "track",
        data: dragType.data,
      };

      setNodes([...nodes, newNode]);
    },
    [flowInstance.screenToFlowPosition, dragType, nodes]
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (setList) {
      console.log("updating set list", setList);
      setSetList({
        ...setList,
        tracks: nodes.map((n) => ({
          nodeId: n.id,
          position: n.position,
          title: n.data.title,
          artist: n.data.artist,
          spotifyTrack: n.data.spotifyTrack,
        })),
        edges: edges.map((e) => ({
          edgeId: e.id,
          source: e.source,
          target: e.target,
        })),
      });
      return;
    }
  }, [nodes, edges]);

  return (
    <div className="relative flex grow">
      <div className="flex flex-col grow" ref={flowWrapper}>
        <FileBar />
        <div className="relative flex grow h-full">
          <ReactFlow
            colorMode="dark"
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={(instance) => instance.fitView()}
          >
            <MiniMap position="bottom-left" />
            <Controls className="!left-52" />
            <Background gap={24} size={1} />
          </ReactFlow>
          <div className="absolute top-0 right-0 bottom-0 space-y-4 max-w-sm min-w-sm">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- */

function toReactFlowNodes(setList: SetList | undefined): TrackType[] {
  if (!setList) {
    return [];
  }

  return setList.tracks.map((data) => {
    return {
      id: data.nodeId,
      position: data.position,
      type: "track",
      data,
    };
  });
}

function toReactFlowEdges(setList: SetList | undefined): Edge[] {
  if (!setList) {
    return [];
  }

  return setList.edges.map((e) => {
    return {
      id: e.edgeId,
      source: e.source,
      target: e.target,
    };
  });
}
