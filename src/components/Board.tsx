import React from "react";
import styles from "@ZCHESS/styles/Board.module.css";
import Player1 from "./Player1";
import Player2 from "./Player2";
import { Chess } from "chess.js";

type BoardProps = {
  game: Chess;
  playerColor: string;
  isFlipped: boolean;
  wcapturedPieces: string[];
  bcapturedPieces: string[];
  nickname: string;
};

const pieceClassMap: { [key: string]: string } = {
  wK: "king-white",
  wQ: "queen-white",
  wB: "bishop-white",
  wN: "knight-white",
  wR: "rook-white",
  wP: "pawn-white",
  bK: "king-black",
  bQ: "queen-black",
  bB: "bishop-black",
  bN: "knight-black",
  bR: "rook-black",
  bP: "pawn-black",
};

export default function Board({ game, isFlipped, bcapturedPieces, wcapturedPieces, playerColor, nickname }: BoardProps) {
  let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let rows = [8, 7, 6, 5, 4, 3, 2, 1];

  if (isFlipped) {
    columns = columns.reverse();
    rows = rows.reverse();
  }

  const renderSquare = (square: string, piece: any) => {
    const pieceKey = piece ? piece.color + piece.type.toUpperCase() : '';
    const pieceClass = pieceKey ? `${styles.piece} ${styles[pieceClassMap[pieceKey]]}` : '';
    return (
      <div
        key={square}
        className={`${styles.square} ${
          (parseInt(square[1]) + columns.indexOf(square[0])) % 2 === 0 ? styles.black : styles.white
        }`}
      >
        {piece && <div className={pieceClass}></div>}
      </div>
    );
  };

  const renderBoard = () => {
    return rows.map((row) =>
      columns.map((column) => {
        const square: any = `${column}${row}`;
        const piece = game.get(square); 
        return renderSquare(square, piece);
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <Player1 name="Computer" captured={playerColor === "w" ? bcapturedPieces : wcapturedPieces} />
      <div className={styles.boardAndRows}>
        {/* Linhas do lado esquerdo */}
        <div className={styles.rowLabels}>
          {rows.map((row) => (
            <div key={row} className={styles.label1}>
              {row}
            </div>
          ))}
        </div>

        {/* Tabuleiro */}
        <div className={styles.board}>
          {renderBoard()}
        </div>
      </div>

      {/* Colunas inferiores */}
      <div className={styles.columnLabels}>
        <div className={styles.emptyCorner}></div>
        {columns.map((column) => (
          <div key={column} className={styles.label2}>
            {column}
          </div>
        ))}
      </div>

      <Player2 name={nickname} captured={playerColor === "w" ? wcapturedPieces: bcapturedPieces} />
    </div>
  );
}
