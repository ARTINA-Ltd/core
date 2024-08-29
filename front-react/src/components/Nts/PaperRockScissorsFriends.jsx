import React, { useState, useEffect } from "react";
import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";
import BorderButton from "../Buttons/BorderButton.jsx";
import axios from "axios";

const PaperRockScissorsFriend = (props) => {
  const { gameId, className, opChoice: initialOpChoice, result: initialResult, opProfile, opUsername, choice } = props;

  // Initialize state with props
  const [userChoice, setUserChoice] = useState("");
  const [opChoice, setOpChoice] = useState(initialOpChoice);
  const [result, setResult] = useState(initialResult);

  const handleChoice = (choice) => {
    setUserChoice(choice);
  };

  const handleSubmit = () => {
    axios
      .post(
        `https://api.artina.org/api/game/games/${gameId}/play_friend/`,
        { choice: userChoice },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((response) => {
        // Assuming the response contains data for opChoice and result
        const { opponent_choice, result } = response.data;
        setOpChoice(opponent_choice);
        setResult(result);
      })
      .catch((error) => {
        console.error("Error submitting choice:", error);
      });
  };
  console.log(opChoice);

  return (
    <div className={`md:w-full h-full mx-auto rounded-lg neon-border p-12 lg:text-sm ${className}`}>
      <div className="flex items-center gap-8">
        <img src={opProfile} className="w-16 aspect-square rounded-full neon-border p-2" alt="" />
        <h1 className="text-3xl sm:text-lg">{opUsername}</h1>
      </div>
      <div className="mx-auto grid gap-8 grid-cols-3 text-center justify-between my-12 text-3xl">
        <div className="">
          <p className="py-8 neon-container lg:text-sm">You </p>
          <div className="neon-border hover:text-black aspect-square text-center flex justify-center items-center hover:bg-secondary cursor-pointer lg:text-sm z-50 ease-out duration-200 rounded-xl p-2">{choice ? <img src={choice === "paper" ? paper : choice === "rock" ? rock : scissors} alt="" className="sm:w-32 z-[10] object-cover" /> : userChoice ? <img src={userChoice === "paper" ? paper : userChoice === "rock" ? rock : scissors} alt="" className="sm:w-32 z-[10] object-cover" /> : "Waiting For Your Choice"}</div>
        </div>
        <div className="">
          <p className="w-fit mx-auto py-8 lg:text-sm">Status</p>
          <div className="neon-border hover:text-black text-center lg:text-sm aspect-video flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{result}</div>
        </div>
        <div className="">
          <p className="py-8 lg:text-sm">Opponent</p>
          <div className="neon-border hover:text-black lg:text-sm text-center aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{opChoice === null || result === null ? "waiting for Opponent" : opChoice === "paper" ? <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" /> : opChoice === "rock" ? <img src={rock} alt="Rock" className="sm:w-24 sm:h-24 object-cover" /> : <img src={scissors} alt="Scissors" className="sm:w-32 object-cover" />}</div>
        </div>
      </div>
      {!result && (
        <div className="flex w-full gap-6 justify-between">
          <div onClick={() => handleChoice("paper")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
            <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" />
          </div>
          <div onClick={() => handleChoice("rock")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
            <img src={rock} alt="Rock" className="sm:w-32 z-[10] object-cover" />
          </div>
          <div onClick={() => handleChoice("scissors")} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
            <img src={scissors} alt="Scissors" className="sm:w-32 z-[10] object-cover" />
          </div>
        </div>
      )}
      {!result && (
        <div className="w-fit mx-auto mt-7">
          <BorderButton onClick={handleSubmit} className={"w-32"}>
            Play!
          </BorderButton>
        </div>
      )}
    </div>
  );
};

export default PaperRockScissorsFriend;
