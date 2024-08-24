"use client";

import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { FaBook } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import Prompt from "@ZCHESS/components/Prompt";
import History from "@ZCHESS/components/History";
import Timer from "@ZCHESS/components/Timer";
import Board from "@ZCHESS/components/Board";
import Rules from "@ZCHESS/components/Rules";

export default function Game() {
  const router = useRouter();

  const [rules, setRules] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [color, setColor] = useState("w");
  const [iaColor, setIaColor] = useState("b");
  const [game, setGame] = useState(new Chess());
  const [move, setMove] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [whistory, setWHistory] = useState<string[] | []>([]);
  const [bhistory, setBHistory] = useState<string[] | []>([]);
  const [whiteTime, setWhiteTime] = useState<number>(300);
  const [blackTime, setBlackTime] = useState<number>(300);
  const [capturedWhitePieces, setCapturedWhitePieces] = useState<string[]>([]);
  const [capturedBlackPieces, setCapturedBlackPieces] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>("");
  const [gameOver, setGameOver] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: "",
  });

  useEffect(() => {
    const usernick = sessionStorage.getItem("nickname");
    const usercolor = sessionStorage.getItem("color");

    if (usernick && usercolor) {
      setLoading(false);
      setNickname(usernick);
      setColor(usercolor);
      setIaColor(usercolor === "w" ? "b" : "w");
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (game.turn() === "w") {
        if (whiteTime > 0) {
          setWhiteTime((prevTime) => prevTime - 1);
          setTime((prevTime) => prevTime + 0.3333);
        } else {
          alert("White time ran out. Black wins!");
          resetGame();
        }
      } else if (game.turn() === "b") {
        if (blackTime > 0) {
          setBlackTime((prevTime) => prevTime - 1);
        } else {
          alert("Black time ran out. White wins!");
          resetGame();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [whiteTime, blackTime, game]);

  const makeAIMove = () => {
    if (game.turn() !== iaColor) {
      console.log("Not IA's turn.");
      return;
    }

    if (game.isGameOver()) {
      console.log("Game over. No more moves can be made.");
      return;
    }

    const moves = game
      .moves({ verbose: true })
      .filter((m) => m.color === iaColor);

    if (moves.length > 0) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      game.move(randomMove.san);

      setBHistory((prevHistory: string[]) => [...prevHistory, randomMove.san]);

      setGame(new Chess(game.fen()));
    }
  };

  const handleMoveInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMove(event.target.value);
  };

  const handleMoveSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const moves = game.moves({ verbose: true });
      const validMove = moves.find((m) => m.san === move && m.color === color);

      if (validMove) {
        const moveResult = game.move(move);

        if (moveResult.captured) {
          if (moveResult.color === "w") {
            setCapturedWhitePieces([
              ...capturedWhitePieces,
              moveResult.captured,
            ]);
          } else {
            setCapturedBlackPieces([
              ...capturedBlackPieces,
              moveResult.captured,
            ]);
          }
        }

        setWHistory((prevHistory: string[]) => [...prevHistory, move]);
        setGame(new Chess(game.fen()));
        setMove("");

        if (game.isCheckmate()) {
          setGameOver({
            status: true,
            message: "Checkmate!",
          });
        } else if (
          game.isDraw() ||
          game.isStalemate() ||
          game.isThreefoldRepetition() ||
          game.isInsufficientMaterial()
        ) {
          setGameOver({
            status: true,
            message: "Draw!",
          });
        } else {
          setTimeout(makeAIMove, 500);
        }
      } else {
        alert("Invalid move, or move not allowed for this color. Try again.");
      }
    }
  };

  const resetGame = () => {
    setTime(0);
    setGame(new Chess());
    setWhiteTime(300);
    setBlackTime(300);
    setMove("");
    setWHistory([]);
    setBHistory([]);
    setCapturedWhitePieces([]);
    setCapturedBlackPieces([]);
  };

  if (loading) {
    return <div className="text-white text-2xl"></div>;
  }

  return (
    <>
      {gameOver.status && (
        <div className="absolute w-full h-full flex items-center justify-center z-50 bg-[#39393932]">
          <div className="w-[50%] h-[50%] bg-white p-6 border-8 border-[#393939] overflow-y-auto">
            <h1>{gameOver.message}</h1>
            <div>
              <button onClick={() => resetGame()}>Play again</button>
              <button onClick={() => {}}>Change options</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-6 left-6">
        <FaBook
          color="#fff"
          size={24}
          onClick={() => setRules(true)}
          className="cursor-pointer"
        />
      </div>

      {rules && <Rules setRules={() => setRules(false)} />}

      <section id="board">
        <div id="boardntimer">
          <Timer setTime={setTime} time={time} />
          <Board
            nickname={nickname}
            playerColor={color}
            game={game}
            isFlipped={isFlipped}
            wcapturedPieces={capturedWhitePieces}
            bcapturedPieces={capturedBlackPieces}
          />
        </div>
      </section>
      <section id="prompt">
        <History w={whistory} b={bhistory} />
        <Prompt
          move={move}
          onMove={handleMoveInput}
          onSubmit={handleMoveSubmit}
        />
      </section>
    </>
  );
}
