import React, { useContext, useState } from "react";
import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";
import { GameProfileContext } from "../../contexts/GameProfileContext.js";
import computer from "../../assets/images/NTSComputer.png";
const PaperRockScissors = ({ onChoice, className, serverResponse, status }) => {
  const [userChoice, setUserChoice] = useState("");

  const handleChoice = (choice) => {
    setUserChoice(choice);
    onChoice(choice);
  };
  const userProfile = useContext(GameProfileContext);

  const renderUserChoice = (choice) => {
    switch (choice) {
      case "paper":
        return <img src={paper} alt="Paper" className="w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 right-2 p-1 -rotate-[20deg] md:-right-9 md:bottom-0 md:h-8 md:w-8" />;
      case "rock":
        return <img src={rock} alt="Rock" className="w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 right-2 p-1 -rotate-[20deg] md:-right-9 md:bottom-0 md:h-8 md:w-8" />;
      case "scissors":
        return <img src={scissors} alt="Scissors" className="w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 right-2 p-1 -rotate-[20deg] md:-right-9 md:bottom-0 md:h-8 md:w-8" />;
      default:
        return "waiting";
    }
  };
  const renderServerChoice = (choice) => {
    switch (choice) {
      case "paper":
        return <img src={paper} alt="Paper" className="w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 left-2 p-1 -rotate-[20deg] md:-left-9 md:bottom-0 md:h-8 md:w-8" />;
      case "rock":
        return <img src={rock} alt="Rock" className="w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 left-2 p-1 -rotate-[20deg] md:-left-9 md:bottom-0 md:h-8 md:w-8" />;
      case "scissors":
        return <img src={scissors} alt="Scissors" className="w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 left-2 p-1 -rotate-[20deg] md:-left-9 md:bottom-0 md:h-8 md:w-8" />;
      default:
        return "waiting";
    }
  };

  return (
    <div className={`mx-auto md:w-full shadow-md shadow-white w-[550px] rounded-3xl bg-base-300 px-8 py-2 text-[20px] lg:text-sm ${className}`}>
      <div className="mx-auto items-end grid grid-cols-3 md:grid-cols-4 gap-3 text-center justify-between my-12 text-3xl">
        <div>
          <p className="pb-8 neon-container text-[20px] lg:text-sm">You</p>
          <div className="neon-border relative hover:text-black aspect-square text-center flex justify-center items-center hover:bg-secondary cursor-pointer text-[20px] lg:text-sm z-50 ease-out duration-200 rounded-xl p-2">
            <img src={userProfile?.profile_picture} alt="" />
            {userChoice === "" ? "" : renderUserChoice(userChoice)}
          </div>
        </div>
        {
          //  <div>
          //       <p className="w-fit mx-auto py-8 text-[20px] lg:text-sm">Status</p>
          //       <div className="neon-border hover:text-black text-center text-[20px] lg:text-sm aspect-video flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-4">{status}</div>
          //     </div>
        }
        <div className="w-full md:col-span-2">
          <div className="flex gap-2 justify-between">
            <img onClick={() => handleChoice("paper")} src={paper} alt="Paper" className="p-2 md:w-12 md:h-12 bg-neutral w-[70px] h-[70px] flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full object-cover" />
            <img onClick={() => handleChoice("rock")} src={rock} alt="Rock" className=" bg-neutral md:w-12 md:h-12 w-[70px] h-[70px] flex justify-center items-center hover:bg-secondary cursor-pointer ease-out duration-200 rounded-full p-2 z-[10] object-cover" />
          </div>
          <div onClick={() => handleChoice("scissors")} className="bg-neutral md:w-12 md:h-12 w-[70px] h-[70px] mx-auto flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2" aria-label="Choose Scissors">
            <img src={scissors} alt="Scissors" className="sm:w-32 z-[10] object-cover" />
          </div>
        </div>
        <div>
          <p className="pb-8 text-[20px] lg:text-sm">Server</p>
          <div className="relative neon-border hover:text-black text-[20px] lg:text-sm text-center aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">
            <img src={computer} alt="" />
            {userChoice === "" ? "" : renderServerChoice(userChoice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperRockScissors;
