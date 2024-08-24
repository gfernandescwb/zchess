interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function Timer({ time, setTime }: TimerProps) {
  return (
    <div id="timer">
      <div id="ticker" style={{
        height: `${time}%`,
        transition: 'height 1s ease-in-out',
      }}></div>
    </div>
  );
}
