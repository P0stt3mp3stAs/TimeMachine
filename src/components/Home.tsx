import React, { useEffect, useState } from 'react';

interface ClockProps {
  size?: number;
}

const Clock: React.FC<ClockProps> = ({ size = 200 }) => {
  const numbers = Array.from(Array(12).keys()).map((index) => index + 1);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = ((hour + minute / 60) - 3) * 30;
  const minuteAngle = (minute - 15) * 6;
  const secondAngle = (second - 15) * 6;

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="container flex flex-col items-center justify-center h-screen">
        <div className="h-4/6">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {numbers.map((number) => {
              const angle = (number - 3) * 30;
              const radians = (angle * Math.PI) / 180;
              const x = size / 2 + Math.cos(radians) * (size * 0.4);
              const y = size / 2 + Math.sin(radians) * (size * 0.4);
              return (
                <text
                  key={number}
                  x={Math.round(x * 100) / 100}
                  y={Math.round(y * 100) / 100}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-lg font-semibold"
                  fill="white"
                >
                  {number}
                </text>
              );
            })}
            <line
              x1={size / 2}
              y1={size / 2}
              x2={size / 2 + Math.cos((hourAngle * Math.PI) / 180) * (size * 0.2)}
  y2={(size / 2 + Math.sin((hourAngle * Math.PI) / 180) * (size * 0.2)).toFixed(2)}
              strokeWidth="4"
              strokeLinecap="round"
              stroke="#333"
            />
            <line
              x1={size / 2}
              y1={size / 2}
              x2={size / 2 + Math.cos((minuteAngle * Math.PI) / 180) * (size * 0.3)}
              y2={size / 2 + Math.sin((minuteAngle * Math.PI) / 180) * (size * 0.3)}
              strokeWidth="4"
              strokeLinecap="round"
              stroke="#333"
            />
            <line
              x1={size / 2}
              y1={size / 2}
              x2={size / 2 + Math.cos((secondAngle * Math.PI) / 180) * (size * 0.35)}
              y2={size / 2 + Math.sin((secondAngle * Math.PI) / 180) * (size * 0.35)}
              strokeWidth="2"
              strokeLinecap="round"
              stroke="red"
            />
          </svg>
        </div>
        <div className="text-white h-1/12 text-center text-3xl p-4 mt-4">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Clock;
