import { Handle, Position } from "@xyflow/react";

export default function Handles() {
  const size = "13px";
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={style}
        className="!-top-[2px]"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={style}
        className="!-bottom-[2px]"
      />
    </>
  );
}
