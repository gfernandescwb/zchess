import Captured from "./Captured";

interface PlayerProps {
  name: string;
  captured: string[];
}

export default function Player1({ name, captured }: PlayerProps) {
  return (
    <div id="playerbox1">
      <div className="flex flex-row items-center justify-center gap-5">
        <div id="playeravatar"></div>
        <span>{name}</span>
      </div>
      <Captured captured={captured} />
    </div>
  );
}
