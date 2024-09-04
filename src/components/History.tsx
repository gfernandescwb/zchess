import React, { useEffect, useRef } from "react";

interface HistoryProps {
  w: string[] | [];
  b: string[] | [];
}

export default function History({ b, w }: HistoryProps) {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [w, b]);

  return (
    <div
      id="history"
      ref={historyRef}
      // className="overflow-y-auto max-h-[400px]"
    >
      {w.map((move, index) => (
        <div
          key={`${index}-move`}
          className="w-full flex flex-row items-center justify-between text-white border-b-[1px] border-white pb-2"
        >
          <span className="w-[20%]">{index + 1}.</span>
          <div className="flex flex-row items-center justify-end gap-2 w-[40%]">
            <span>{move}</span>
          </div>
          <div className="flex flex-row items-center justify-end gap-2 w-[40%]">
            <span>{b[index]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
