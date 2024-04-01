import { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<{ lap: number; split: string; total: string; }[]>([]);
  const [lapNumber, setLapNumber] = useState(1);
  const [splitTime, setSplitTime] = useState(0);
  const [smallestSplit, setSmallestSplit] = useState(Number.MAX_SAFE_INTEGER);
  const [biggestSplit, setBiggestSplit] = useState(Number.MIN_SAFE_INTEGER);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  
  const resetLap = () => {
    if (isRunning) {
      const split = lapNumber === 1 ? time : time - splitTime;
      const lapTotal = formatTime(time);
      const lapSplit = formatTime(split);
      
      setLaps((prevLaps) => [
        ...prevLaps,
        { lap: lapNumber, split: lapSplit, total: lapTotal },
      ]);

      if (split < smallestSplit) {
        setSmallestSplit(split);
      }

      if (split > biggestSplit) {
        setBiggestSplit(split);
      }

      setSplitTime(time);
      setLapNumber((prevLapNumber) => prevLapNumber + 1);
    } else {
      // Reset
      setTime(0);
      setLaps([]);
      setLapNumber(1);
      setSplitTime(0);
      setSmallestSplit(Number.MAX_SAFE_INTEGER);
      setBiggestSplit(Number.MIN_SAFE_INTEGER);
    }
  };

  

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className='biscuit w-4/5 flex flex-col'>
      <div className="font-bold text-5xl text-center">
        StopWatch
      </div>
      <div className='text-center text-6xl m-10'>
        {formatTime(time)}
      </div>
      <table>
        <thead className='flex justify-center'>
          <tr className='w-11/12 flex justify-between'>
            <th className='w-2/6'>Lap-N°</th>
            <th className='w-2/6'>Split</th>
            <th className='w-2/6'>Total</th>
          </tr>
        </thead>
        <tbody className='flex flex-col items-center justify-center'>
          {laps.map((lapData, index) => (
              <tr className='w-11/12 flex justify-between text-center' key={index}>
                <td className={`w-2/6 ${lapData.split === formatTime(smallestSplit) ? 'text-green-500' : lapData.split === formatTime(biggestSplit) ? 'text-red-500' : ''}`}>{`Lap ${lapData.lap}`}</td>
                <td className={`w-2/6 ${lapData.split === formatTime(smallestSplit) ? 'text-green-500' : lapData.split === formatTime(biggestSplit) ? 'text-red-500' : ''}`}>{lapData.split}</td>
                <td className={`w-2/6 ${lapData.split === formatTime(smallestSplit) ? 'text-green-500' : lapData.split === formatTime(biggestSplit) ? 'text-red-500' : ''}`}>{lapData.total}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center justify-center'>
        <button className={`w-2/6 m-9 p-3 rounded-lg ${isRunning ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}`} onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button className='w-2/6 m-9 p-3 bg-blue-500 hover:bg-blue-400 rounded-lg' onClick={resetLap}>{isRunning ? 'Lap' : 'Reset'}</button>
      </div>
    </div>
  );
};

export default Stopwatch;
