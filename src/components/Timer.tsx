interface TimerProps {
  time: number;
}

export default function Timer({ time }: TimerProps) {
  return (
    <div id="timer">
      <div id="ticker" style={{
        height: `${time}%`,
        transition: 'height 1s ease-in-out',
      }}></div>
    </div>
  );
}
