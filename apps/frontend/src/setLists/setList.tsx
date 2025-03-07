import { SetList } from "@dj-notes-2/shared";
import { trpc } from "@trpc/frontend";
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
import {
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import DnDProvider, { useDnD } from "../dragDrop/dndProvider";
import { FileBar } from "../filebar/fileBar";
import { TrackData, TrackType } from "../nodes/trackData";
import TrackNode from "../nodes/trackNode";
import UserTrackNode from "../nodes/userNode";
import { SideBar } from "./sidebar";

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

  const navigate = useNavigate();
  const location = useLocation();

  const initialSetList = location.state as SetList | undefined;
  const [setList, setSetList] = useState<SetList | undefined>(initialSetList);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<TrackData>>(
    setList ? toReactFlowNodes(setList) : []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
    setList ? toReactFlowEdges(setList) : []
  );

  const { id } = useParams<"id">();
  const getSet = trpc.setLists.getSet.useQuery({ id: id as string });

  const { type: dragType } = useDnD();
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

      const position = flowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node<TrackData> = {
        id: nodes.length.toString(),
        position,
        type: "track",
        data: dragType.data as TrackData,
      };

      setNodes([...nodes, newNode]);
    },
    [flowInstance.screenToFlowPosition, dragType, nodes]
  );

  useEffect(() => {
    if (setList) {
      setSetList({
        ...setList,
        tracks: nodes.map((n) => {
          return {
            id: n.data.id,
            nodeId: n.id,
            position: { ...n.position, id: "" },
            title: n.data.title,
            artist: n.data.artist,
            spotifyTrack: n.data.spotifyTrack,
          };
        }),
        edges: edges.map((e) => {
          return {
            id: "",
            edgeId: e.id,
            source: e.source,
            target: e.target,
          };
        }),
      });
      return;
    }

    (async () => {
      const setList = await getSet.data?.setList;
      setSetList(setList);
      setNodes(toReactFlowNodes(setList));
      setEdges(toReactFlowEdges(setList));

      navigate(location.pathname, { state: setList });
    })();
  }, [nodes, edges]);

  const nodeTypes = useMemo(
    () => ({
      userTrack: UserTrackNode,
      track: TrackNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="relative flex grow">
      <div className="flex flex-col grow" ref={flowWrapper}>
        <FileBar
          originalSetList={initialSetList}
          setList={setList}
          setSetList={setSetList}
        />
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
