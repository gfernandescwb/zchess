import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa6";

interface CapturedProps {
    captured: string[];
}

export default function Captured({ captured }: CapturedProps) {
  return (
    <div className="flex flex-row items-center">
      {captured.map((piece, index) => {
        switch (piece) {
          case "k":
            return <FaChessKing key={index} color="#fff" size={22} />;
          case "q":
            return <FaChessQueen key={index} color="#fff" size={22} />;
          case "r":
            return <FaChessRook key={index} color="#fff" size={22} />;
          case "b":
            return <FaChessBishop key={index} color="#fff" size={22} />;
          case "n":
            return <FaChessKnight key={index} color="#fff" size={22} />;
          case "p":
            return <FaChessPawn key={index} color="#fff" size={22} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
