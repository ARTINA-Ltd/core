import React, { useState } from "react";
import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";
import BorderButton from "../Buttons/BorderButton.jsx";
import axios from "axios";

const PaperRockScissorsFriend = ({ gameId, className, opChoice: initialOpChoice, result: initialResult, opProfile, opUsername, choice, isActive }) => {
  const [userChoice, setUserChoice] = useState("");
  const [opChoice, setOpChoice] = useState(initialOpChoice);
  const [result, setResult] = useState(initialResult);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChoice = (choice) => setUserChoice(choice);

  const handleSubmit = () => {
    if (!userChoice) {
      alert("Please make a choice before playing!");
      return;
    }

    setIsSubmitted(true); // Hide the button once clicked

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
        const { opponent_choice, result } = response.data;
        setOpChoice(opponent_choice);
        setResult(result);
      })
      .catch((error) => {
        console.error("Error submitting choice:", error);
        alert("An error occurred while submitting your choice. Please try again.");
        setIsSubmitted(false); // Show the button again if there was an error
      });
  };

  const renderChoiceImage = (choice) => {
    switch (choice) {
      case "rock":
        return <img src={rock} alt="Rock" className="sm:w-32 z-[10] object-cover" />;
      case "paper":
        return <img src={paper} alt="Paper" className="sm:w-32 z-[10] object-cover" />;
      case "scissors":
        return <img src={scissors} alt="Scissors" className="sm:w-32 z-[10] object-cover" />;
      default:
        return "Waiting For Your Choice";
    }
  };

  return (
    <div className={`${!isActive ? "pointer-events-none opacity-70" : ""} md:w-full h-full mx-auto rounded-lg neon-border p-12 lg:text-sm ${className}`}>
      <div className="flex flex-wrap justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <img src={opProfile} className="w-16 aspect-square rounded-full neon-border p-2" alt="Opponent Profile" />
          <h1 className="text-3xl sm:text-lg">{opUsername}</h1>
        </div>
        <p>{!isActive && "Closed"}</p>
      </div>
      <div className="mx-auto grid gap-8 grid-cols-3 text-center justify-between my-12 text-3xl">
        <div>
          <p className="py-8 neon-container lg:text-sm">You</p>
          <div className="neon-border hover:text-black aspect-square text-center flex justify-center items-center hover:bg-secondary cursor-pointer lg:text-sm z-50 ease-out duration-200 rounded-xl p-2">{choice ? renderChoiceImage(choice) : renderChoiceImage(userChoice)}</div>
        </div>
        <div>
          <p className="w-fit mx-auto py-8 lg:text-sm">Status</p>
          <div className="neon-border hover:text-black text-center lg:text-sm aspect-video flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{result}</div>
        </div>
        <div>
          <p className="py-8 lg:text-sm">Opponent</p>
          <div className="neon-border hover:text-black lg:text-sm text-center aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-xl p-2">{opChoice === null || result === null ? "Waiting for Opponent" : renderChoiceImage(opChoice)}</div>
        </div>
      </div>
      {!result && (
        <>
          <div className="flex w-full gap-6 justify-between">
            {["paper", "rock", "scissors"].map((item) => (
              <div key={item} onClick={() => handleChoice(item)} className="bg-secondary aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2">
                {renderChoiceImage(item)}
              </div>
            ))}
          </div>
          {!isSubmitted && (
            <div className="w-fit mx-auto mt-7">
              <BorderButton onClick={handleSubmit} className="w-32">
                Play!
              </BorderButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaperRockScissorsFriend;
