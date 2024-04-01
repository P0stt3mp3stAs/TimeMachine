import { useState, useEffect } from 'react';

const Calendar: React.FC = ({}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [circleHeight, setCircleHeight] = useState<number>(0);

  useEffect(() => {
    const calculateCircleHeight = () => {
      const screenHeight = window.innerHeight;
      const targetHeight = screenHeight * (3 / 5);
      setCircleHeight(targetHeight);
    };

    calculateCircleHeight();

    window.addEventListener('resize', calculateCircleHeight);

    return () => {
      window.removeEventListener('resize', calculateCircleHeight);
    };
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    if (!selectedDate) return;
    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    setSelectedDate(prevMonth);
  };

  const handleNextMonth = () => {
    if (!selectedDate) return;
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    setSelectedDate(nextMonth);
  };

  const generateDays = () => {
    if (!selectedDate) return;

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const days = [];
    const angleIncrement = (2 * Math.PI) / daysInMonth;
    const monthDaysRadius = circleHeight / 2 - 10;

    for (let i = 1; i <= daysInMonth; i++) {
      const angle = angleIncrement * (i - 1);
      const x = monthDaysRadius * Math.cos(angle);
      const y = monthDaysRadius * Math.sin(angle);

      const style = {
        transform: `translate(${x}px, ${y}px)`
      };

      const currentDateObj = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);

      days.push(
        <div
          key={i}
          className="day cursor-pointer flex flex-col items-center justify-center absolute"
          style={style}
          onClick={() => handleDateClick(currentDateObj)}
        >
          <span className={`text-xl ${currentDay === i && currentMonth === selectedDate.getMonth() ? 'text-red-500' : ''}`}>{i}</span>
        </div>
      );
    }

    return days;
  };

  const generateWeekDays = () => {
    const weekdays = ['SA', 'S', 'M', 'T', 'W', 'TH', 'F'];
    const weekDaysRadius = circleHeight / 3;
    const currentDayOfWeek = new Date().getDay();
  
    const weekDayElements = weekdays.map((day, index) => {
      const adjustedIndex = (currentDayOfWeek + index) % 7;
      const angle = ((2 * Math.PI) / 7) * adjustedIndex - Math.PI / 2;
      const x = Math.cos(angle) * weekDaysRadius;
      const y = Math.sin(angle) * weekDaysRadius;
      const textColorClass = adjustedIndex === currentDayOfWeek ? 'text-red-500' : '';
  
      return (
        <div
          key={day}
          className={`weekday absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${textColorClass}`}
          style={{ top: `calc(50% - ${y}px)`, left: `calc(50% + ${x}px)` }}
        >
          {day}
        </div>
      );
    });
  
    return weekDayElements;
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i);
    return <option key={i} value={i}>{month.toLocaleString('default', { month: 'long' })}</option>;
  });

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return <option key={i} value={year}>{year}</option>;
  });

  return (
    <div className="calendar relative flex flex-col items-center justify-between h-3/4 w-screen">
        <div className="w-3/12 flex justify-center">
          <select
            value={selectedDate ? selectedDate.getFullYear() : ''}
            className='text-center bg-gray-500 rounded appearance-none w-2/6 mx-6 hover:bg-gray-400'
            onChange={(e) => {
              if (!selectedDate) return;
              const newYear = parseInt(e.target.value);
              setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
            }}
          >
            {yearOptions}
          </select>
          <select
            value={selectedDate ? selectedDate.getMonth() : ''}
            className='text-center bg-gray-500 rounded appearance-none w-2/6 mx-6 hover:bg-gray-400'
            onChange={(e) => {
              if (!selectedDate) return;
              const newMonth = parseInt(e.target.value);
              setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
            }}
          >
            {monthOptions}
          </select>
        </div>
        
        <div className="clock-face relative flex items-center justify-center" style={{ height: `${circleHeight}px`, width: `${circleHeight}px` }}>
          {generateDays()}
          <div className="weekdays-circle relative flex items-center justify-center" style={{ height: `${circleHeight / 2}px`, width: `${circleHeight / 2}px` }}>
            {generateWeekDays()}
          </div>
        </div>

      <div className="w-3/12 flex justify-center">
        <button className='bg-gray-500 rounded w-2/6 mx-6 hover:bg-gray-400' onClick={handlePrevMonth}>Prev</button>
        <button className='bg-gray-500 rounded w-2/6 mx-6 hover:bg-gray-400' onClick={handleNextMonth}>Next</button>
      </div>
    </div>
  );
};

export default Calendar;
