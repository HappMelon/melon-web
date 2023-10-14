import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateTime = () => {
    const currentTime = new Date();
    const diffInSeconds = Math.floor(
      (targetDate.getTime() - currentTime.getTime()) / 1000,
    );

    if (diffInSeconds >= 0) {
      setTime({
        days: Math.floor(diffInSeconds / (60 * 60 * 24)),
        hours: Math.floor((diffInSeconds / (60 * 60)) % 24),
        minutes: Math.floor((diffInSeconds / 60) % 60),
        seconds: Math.floor(diffInSeconds % 60),
      });
    } else {
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex items-center mb-[.3125rem]">
      <span className="flex items-center justify-center w-[1.875rem] h-[1.875rem] rounded-[5px] bg-[#f7f7f7] text-sm font-bold">
        {time.days}
      </span>
      <span className="mx-[.5rem] text-[#9b9b9b] text-sm font-medium">
        Days
      </span>
      <span className="flex items-center justify-center w-[1.875rem] h-[1.875rem] rounded-[5px] bg-[#f7f7f7] text-sm font-bold">
        {time.hours}
      </span>
      <span className="mx-[.5rem] text-[#9b9b9b] text-sm font-medium">
        Hours
      </span>
      <span className="flex items-center justify-center w-[1.875rem] h-[1.875rem] rounded-[5px] bg-[#f7f7f7] text-sm font-bold">
        {time.minutes}
      </span>
      <span className="mx-[.5rem] text-[#9b9b9b] text-sm font-medium">
        Mins
      </span>
      <span className="flex items-center justify-center w-[1.875rem] h-[1.875rem] rounded-[5px] bg-[#f7f7f7] text-sm font-bold">
        {time.seconds}
      </span>
      <span className="mx-[.5rem] text-[#9b9b9b] text-sm font-medium">
        secs
      </span>
    </div>
  );
};

export default Countdown;
