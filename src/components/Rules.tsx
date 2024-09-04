interface RulesProps {
  setRules: (value: boolean) => void;
}

export default function Rules({ setRules }: RulesProps) {
  return (
    <div className="absolute w-full h-full flex items-center justify-center z-50 bg-[#39393932]">
      <div className="w-full h-full lg:w-[50%] lg:h-[85%] bg-white p-0 lg:p-6 border-8 border-[#393939] overflow-y-auto">
        <div
          className="w-full h-full flex flex-col items-end justify-between overflow-hidden overflow-y-auto"
          style={{ color: "#393939" }}
        >
          <div className="w-full flex flex-col gap-4 p-6 lg:p-0">
            <h1 className="text-2xl font-[600] w-full">Rules</h1>
            <ul>
              <li>
                <strong>K</strong> - King.
              </li>
              <li>
                <strong>Q</strong> - Queen.
              </li>
              <li>
                <strong>R</strong> - Rook.
              </li>
              <li>
                <strong>B</strong> - Bishop.
              </li>
              <li>
                <strong>N</strong> - Knight.
              </li>
              <li className="mb-8">
                <strong className="pl-[1.2rem]"> </strong> - Pawn, using empty
                space.
              </li>
              <li>
                <strong>Move</strong> - Move a piece to a square. Example:{" "}
                <code>e4</code>
              </li>
              <li>
                <strong>Capture</strong> - Capture an opponent’s piece. Example:{" "}
                <code>Bxe5</code>
              </li>
              <li>
                <strong>King-side Castling</strong> - Castling on the king’s
                side. Example: <code>O-O</code>
              </li>
              <li>
                <strong>Queen-side Castling</strong> - Castling on the queen’s
                side. Example: <code>O-O-O</code>
              </li>
              <li>
                <strong>Check</strong> - Put the opponent’s king in check.
                Example: <code>Qe5+</code>
              </li>
              <li>
                <strong>Checkmate</strong> - Checkmate the opponent. Example:{" "}
                <code>Qe5#</code>
              </li>
              <li>
                <strong>Pawn Promotion</strong> - Promote a pawn to another
                piece. Example: <code>d8=Q</code>
              </li>
              <li>
                <strong>En Passant</strong> - Capture a pawn en passant.
                Example: <code>exd6 e.p.</code>
              </li>
              <li>
                <strong>Stalemate</strong> - A situation where the player to
                move has no legal move and is not in check. The game is drawn.
                Noted as <code>½-½</code>.
              </li>
              <li>
                <strong>Threefold Repetition</strong> - If the same position
                occurs three times with the same player to move, the game is
                drawn. Noted as <code>½-½</code>.
              </li>
              <li>
                <strong>50-Move Rule</strong> - If fifty moves pass without a
                pawn move or a capture, the game is drawn. Noted as{" "}
                <code>½-½</code>.
              </li>
            </ul>
          </div>
          <div className="w-full px-6 pb-6 lg:px-0 lg:pb-0">
          <button
            className="mt-4 bg-[#393939] w-full lg:w-[120px] p-2 text-white"
            onClick={() => setRules(false)}
          >
            Close
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
