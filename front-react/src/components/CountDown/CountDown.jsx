import React, { useState, useEffect } from "react";

const Countdown = ({ end_date }) => {
  const endDate = new Date(end_date);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  // console.log("END DATE -------> ", endDate);

  useEffect(() => {
    if (end_date) {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [end_date]);

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="flex items-center justify-center text-center">
      <div className="flex gap-2 md:text-sm sm:text-xs">
        <p className="ml-2">زمان باقی مانده تا پایان مزایده:</p>
        <p className="text-error">{timeRemaining.days}روز</p>
        <p className="text-error">{timeRemaining.hours}ساعت</p>
        <p className="text-error">{timeRemaining.minutes}دقیقه</p>
        <p className="text-error">{timeRemaining.seconds}ثانیه</p>
      </div>
    </div>
  );
};

export default Countdown;
