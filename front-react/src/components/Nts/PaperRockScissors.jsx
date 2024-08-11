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
    <div className={`w-1/2 lg:w-full mx-auto bg-base-200 rounded-lg p-12 ${className}`}>
      <div className="mx-auto flex text-center justify-between my-12 text-3xl">
        <div>
          <p className="py-8 neon-container">You </p>
          <div className="neon-border text-center hover:text-black w-44 h-44 flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{userChoice === "" ? "waiting for you" : userChoice === "paper" ? <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" /> : userChoice === "rock" ? <img src={rock} alt="Rock" className="sm:w-24 sm:h-24 object-cover" /> : <img src={scissors} alt="Scissors" className="sm:w-32 object-cover" />}</div>
        </div>
        <div>
          <p className="w-fit mx-auto py-8">Status</p>
          <div className="neon-border hover:text-black text-center w-44 h-20 flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{status}</div>
        </div>
        <div>
          <p className="py-8">Opponent</p>
          <div className="neon-border hover:text-black text-center w-44 h-44 flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{serverResponse === "" ? "waiting for Server" : serverResponse === "paper" ? <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" /> : serverResponse === "rock" ? <img src={rock} alt="Rock" className="sm:w-24 sm:h-24 object-cover" /> : <img src={scissors} alt="Scissors" className="sm:w-32 object-cover" />}</div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div onClick={() => handleChoice("paper")} className="bg-secondary w-44 h-44 flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" />
        </div>
        <div onClick={() => handleChoice("rock")} className="bg-secondary w-44 h-44 flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={rock} alt="Rock" className="sm:w-24 sm:h-24 object-cover" />
        </div>
        <div onClick={() => handleChoice("scissors")} className="bg-secondary w-44 h-44 flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
          <img src={scissors} alt="Scissors" className="sm:w-32 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PaperRockScissors;
