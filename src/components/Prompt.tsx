import { useEffect, useRef } from "react";

interface PromptProps {
  onMove: (move: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (move: React.KeyboardEvent<HTMLInputElement>) => void;
  move: string;
}

export default function Prompt({ move, onMove, onSubmit }: PromptProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div id="input">
      <label htmlFor="prompt" id="label">
        Your move:
      </label>
      <input
        name="prompt"
        type="text"
        id="input_text"
        placeholder="Type your move here..."
        value={move}
        onChange={(e) => onMove(e)}
        onKeyDown={(e) => onSubmit(e)}
        ref={inputRef}
      />
    </div>
  );
}
