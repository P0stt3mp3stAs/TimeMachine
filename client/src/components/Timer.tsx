import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (isActive) {
      timer = setInterval(() => {
        tick();
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const tick = () => {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          setIsActive(false);
          playAlarmSound();
          return;
        }
        setHours((prevHours) => prevHours - 1);
        setMinutes(59);
      } else {
        setMinutes((prevMinutes) => prevMinutes - 1);
      }
      setSeconds(59);
    } else {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setHours(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 60) {
      setMinutes(value);
    }
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 60) {
      setSeconds(value);
    }
  };

  const playAlarmSound = () => {
    const audio = new Audio('/alarm.mp3');
    audio.play();
  };

  return (
    <div className='w-4/5 h-4/5 flex flex-col '>
      <div className="mt-9 font-bold text-5xl text-center">
        TIMER
      </div>
      <div className='flex flex-col items-center justify-center my-20'>
        <div className='flex items-center justify-between text-lg text-gray-300 w-5/6'>
          <div className='w-3/12 text-center'>hr</div>
          <div className='3/24'></div>
          <div className='w-3/12 text-center'>min</div>
          <div className='3/24'></div>
          <div className='w-3/12 text-center'>sec</div>
        </div>
        <div className='flex justify-between text-5xl font-bold w-5/6'>
          <label className='flex justify-center w-3/12'>
            <input
              className='text-center w-20 h-20 bg-gray-400 rounded-2xl mx-3 p-2 hover:bg-blue-500 focus:bg-blue-500 placeholder-gray-300 spin-button-none outline-none'
              type="number"
              // value={hours}
              value={isActive ? hours : hours === 0 ? '' : hours}
              placeholder='00'
              onChange={handleHourChange}
            />
          </label>
          <div className='text-6xl mt-1 w-3/24'>:</div>
          <label className='flex justify-center w-3/12'>
            
            <input
              className='text-center w-20 h-20 bg-gray-400 rounded-2xl mx-3 p-2 hover:bg-blue-500 focus:bg-blue-500 placeholder-gray-300 spin-button-none outline-none'
              type="number"
              value={isActive ? minutes : minutes === 0 ? '' : minutes}
              placeholder='00'
              onChange={handleMinuteChange}
            />
          </label>
          <div className='text-6xl mt-1 w-3/24'>:</div>
          <label className='flex justify-center w-3/12'>
            <input
              type="number"
              className='text-center w-20 h-20 bg-gray-400 rounded-2xl mx-3 p-2 hover:bg-blue-500 focus:bg-blue-500 placeholder-gray-300 spin-button-none outline-none'
              value={isActive ? seconds : seconds === 0 ? '' : seconds}
              placeholder='00'
              onChange={handleSecondChange}
            />
          </label>
        </div>
      </div>
      <div className='flex text-lg items-center justify-center outline-none'>
        <button className={`w-2/6 m-9 p-3 rounded-lg ${isActive ? 'bg-red-500 hover:bg-red-400' : 'bg-green-400 hover:bg-green-300'}`} onClick={handleStartPause}>{isActive ? 'Pause' : 'Start'}</button>
        <button className='w-2/6 m-9 p-3 bg-blue-500 hover:bg-blue-400 rounded-lg' onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
