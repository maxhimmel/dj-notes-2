import Handles from "./handles";

export default function BaseNode({
  children,
  className = "",
  selected,
}: {
  children: React.ReactNode;
  className?: string;
  selected: boolean;
}) {
  return (
    <div
      className={`card image-full size-52 shadow-xl shadow-neutral border-4 border-base-100 hover:border-4 hover:border-primary ${
        selected ? "!border-primary" : ""
      } ${className}`}
    >
      {children}
      <Handles />
    </div>
  );
}
