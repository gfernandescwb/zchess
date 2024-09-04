import Captured from "./Captured";

interface PlayerProps {
  name: string;
  captured: string[];
}

export default function Player2({ name, captured }: PlayerProps) {
  return (
    <div id="playerbox2">
      <Captured captured={captured} />
      <div className="flex flex-row items-center justify-center gap-5">
        <span>{name}</span>
        {/* <div id="playeravatar"></div> */}
      </div>
    </div>
  );
}
