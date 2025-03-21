import { SetList } from "@dj-notes-2/shared";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { DragEvent, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import DnDProvider, { useDnD } from "../dragDrop/dndProvider";
import { FileBar } from "../filebar/fileBar";
import { TrackType } from "../nodes/trackData";
import TrackNode from "../nodes/trackNode";
import SetListProvider, { useSetList } from "./setListProvider";
import { SideBar } from "./sideBar";
import { isEqual } from "../filebar/fileService";

export default function SetListPage() {
  const navigate = useNavigate();
  const setListData = useLocation().state as SetList;
  const { id } = useParams<{ id: string }>();

  if (!id) {
    navigate("/setLists");
    return;
  }

  return (
    <SetListProvider initialSetListData={setListData} id={id}>
      <SetListComponent />
    </SetListProvider>
  );
}

function SetListComponent() {
  const { draftSetList, setDraftSetList } = useSetList();

  return (
    <div className="relative flex grow">
      <div className="flex flex-col grow">
        <FileBar />
        <div className="relative flex grow h-full">
          <ReactFlowProvider>
            <DnDProvider>
              <ReactFlowAdapter
                initialEdges={toReactFlowEdges(draftSetList)}
                initialNodes={toReactFlowNodes(draftSetList)}
                onUpdate={({ edges, nodes }) => {
                  const updated = toSetList({
                    setList: draftSetList,
                    edges,
                    nodes,
                  });
                  if (!isEqual(updated, draftSetList)) {
                    setDraftSetList(updated);
                  }
                }}
              />
              <div className="absolute top-0 right-0 bottom-0 space-y-4 max-w-sm min-w-sm">
                <SideBar />
              </div>
            </DnDProvider>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

function ReactFlowAdapter(props: {
  initialNodes: TrackType[];
  initialEdges: Edge[];
  onUpdate: (args: { nodes: TrackType[]; edges: Edge[] }) => void;
}) {
  const flowInstance = useReactFlow();
  const nodeTypes = useMemo(() => ({ track: TrackNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState<TrackType>(
    props.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
    props.initialEdges
  );

  // Create react-flow callbacks for updating the graph
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
    props.onUpdate?.({
      nodes,
      edges,
    });
  }, [nodes, edges, props.onUpdate]);

  return (
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

function toSetList({
  setList,
  nodes,
  edges,
}: {
  setList: SetList;
  nodes: TrackType[];
  edges: Edge[];
}): SetList {
  return {
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
  };
}
