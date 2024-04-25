import React, { useState, useEffect } from "react";

function CountdownTimer({ targetDate }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();

      // Check if target date has passed
      if (target < now) {
        setDays(-1);
        setHours(-1);
        setMinutes(-1);
        setSeconds(-1);
        clearInterval(intervalId);
        return;
      }

      const difference = target - now;

      // Calculate remaining days, hours, minutes, and seconds
      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Function to format time units with leading zeros
  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <div>
      {days !== -1 ? (
        <div className="countdown-display lg:text-base">
          <span>{formatTime(days)}روز و </span>
          <span>{formatTime(hours)}ساعت و </span>
          <span>{formatTime(minutes)}دقیقه و </span>
          <span>{formatTime(seconds)} ثانیه</span>
        </div>
      ) : (
        <p className="text-red-700 lg:text-base">فرصت خرید بلیت به پایان رسیده است!</p>
      )}
    </div>
  );
}

export default CountdownTimer;
