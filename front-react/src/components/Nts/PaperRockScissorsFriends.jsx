import React, { useState } from "react";
import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";

const PaperRockScissors = ({ onChoice, className, serverResponse, status }) => {
  const [userChoice, setUserChoice] = useState("");

  const handleChoice = (choice) => {
    setUserChoice(choice);
    onChoice(choice);
  };

  return (
    <div className={`md:w-full mx-auto w-full rounded-lg neon-border p-6 lg:text-sm ${className}`}>
      <div className="mx-auto grid gap-6 grid-cols-3 text-center justify-between my-8 text-2xl sm:text-xl lg:text-3xl">
        <div>
          <p className="py-6 neon-container sm:text-sm">You</p>
          <div className="neon-border hover:text-black aspect-square text-center flex justify-center items-center hover:bg-secondary cursor-pointer sm:text-sm z-50 ease-out duration-200 rounded-xl p-2">{userChoice === "" ? "waiting for you" : userChoice === "paper" ? <img src={paper} alt="Paper" className="sm:w-24 lg:w-32 z-[10] object-cover" /> : userChoice === "rock" ? <img src={rock} alt="Rock" className="sm:w-24 lg:w-32 object-cover" /> : <img src={scissors} alt="Scissors" className="sm:w-24 lg:w-32 object-cover" />}</div>
        </div>
        <div>
          <p className="w-fit mx-auto py-6 sm:text-sm">Status</p>
          <div className="neon-border hover:text-black text-center sm:text-sm aspect-video flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-4">{status}</div>
        </div>
        <div>
          <p className="py-6 sm:text-sm">Opponent</p>
          <div className="neon-border hover:text-black sm:text-sm text-center aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{serverResponse === "" ? "waiting" : serverResponse === "paper" ? <img src={paper} alt="Paper" className="sm:w-24 lg:w-32 z-[10] object-cover" /> : serverResponse === "rock" ? <img src={rock} alt="Rock" className="sm:w-24 lg:w-32 object-cover" /> : <img src={scissors} alt="Scissors" className="sm:w-24 lg:w-32 object-cover" />}</div>
        </div>
      </div>
      <div className="flex w-full gap-4 justify-between">
        <div onClick={() => handleChoice("paper")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={paper} alt="Paper" className="sm:w-24 lg:w-32 z-[10] object-cover" />
        </div>
        <div onClick={() => handleChoice("rock")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={rock} alt="Rock" className="sm:w-24 lg:w-32 z-[10] object-cover" />
        </div>
        <div onClick={() => handleChoice("scissors")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={scissors} alt="Scissors" className="sm:w-24 lg:w-32 z-[10] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PaperRockScissors;
