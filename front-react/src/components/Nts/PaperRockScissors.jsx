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

  const renderChoice = (choice) => {
    switch (choice) {
      case "paper":
        return <img src={paper} alt="Paper" className="sm:w-32 object-cover" />;
      case "rock":
        return <img src={rock} alt="Rock" className="sm:w-32 object-cover" />;
      case "scissors":
        return <img src={scissors} alt="Scissors" className="sm:w-32 object-cover" />;
      default:
        return "waiting";
    }
  };

  return (
    <div className={`lg:w-full mx-auto w-[510px] rounded-lg neon-border p-12 text-[20px] lg:text-sm ${className}`}>
      <div className="mx-auto grid gap-8 grid-cols-3 text-center justify-between my-12 text-3xl">
        <div>
          <p className="py-8 neon-container text-[20px] lg:text-sm">You</p>
          <div className="neon-border hover:text-black aspect-square text-center flex justify-center items-center hover:bg-secondary cursor-pointer text-[20px] lg:text-sm z-50 ease-out duration-200 rounded-xl p-2">{userChoice === "" ? "waiting for you" : renderChoice(userChoice)}</div>
        </div>
        <div>
          <p className="w-fit mx-auto py-8 text-[20px] lg:text-sm">Status</p>
          <div className="neon-border hover:text-black text-center text-[20px] lg:text-sm aspect-video flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-4">{status}</div>
        </div>
        <div>
          <p className="py-8 text-[20px] lg:text-sm">Opponent</p>
          <div className="neon-border hover:text-black text-[20px] lg:text-sm text-center aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{serverResponse === "" ? "waiting" : renderChoice(serverResponse)}</div>
        </div>
      </div>
      <div className="flex w-full gap-6 justify-between">
        <div onClick={() => handleChoice("paper")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2" aria-label="Choose Paper">
          <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" />
        </div>
        <div onClick={() => handleChoice("rock")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2" aria-label="Choose Rock">
          <img src={rock} alt="Rock" className="sm:w-32 z-[10] object-cover" />
        </div>
        <div onClick={() => handleChoice("scissors")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2" aria-label="Choose Scissors">
          <img src={scissors} alt="Scissors" className="sm:w-32 z-[10] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PaperRockScissors;
