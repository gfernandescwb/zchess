interface HistoryProps {
  w: string[] | [];
  b: string[] | [];
}

export default function History({ b, w }: HistoryProps) {
  return (
    <div id="history">
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
