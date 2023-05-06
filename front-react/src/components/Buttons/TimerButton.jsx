import React, { useState, useEffect } from "react";

const TimerButton = ({ children, className, timeout, onClick }) => {
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  function hanldeClickPhone() {
    setIsPhoneDisabled(true);
    setTimeout(() => {
        setIsPhoneDisabled(false);
    }, timeout);
  }

  //   useEffect(() => {}, []);

  return (
    <div
    className={`text-nowrap w-[-50%] px-10  rounded-lg cursor-pointer transition-all hover:bg-rose-600 text-white text-[14px] flex items-center justify-center`}
    onClick={() => hanldeClickPhone()}
    >
ارسال کد    </div>
  );
};

export default TimerButton;
