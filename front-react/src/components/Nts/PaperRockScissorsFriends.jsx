import React, { useContext, useEffect, useState } from "react";
import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissors.png";
import BorderButton from "../Buttons/BorderButton.jsx";
import axios from "axios";
import { GameProfileContext } from "../../contexts/GameProfileContext.js";

const PaperRockScissorsFriend = ({ gameId, className, opChoice: initialOpChoice, result: initialResult, opProfile, opUsername, choice, isActive, userTurn }) => {
  const [userChoice, setUserChoice] = useState("");
  const [result, setResult] = useState(initialResult);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userProfile = useContext(GameProfileContext);
  const [turn, setTurn] = useState(userTurn);

  const handleChoice = (choice) => {
    if (!isSubmitted) setUserChoice(choice);
  };

  const handleSubmit = () => {
    if (!userChoice) {
      alert("Please make a choice before playing!");
      return;
    }

    setIsSubmitted(true);

    axios
      .post(
        `https://api.artina.org/api/game/games/${gameId}/play_turn/`,
        { choice: userChoice },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((response) => {
        const { result } = response.data;
        setTurn(false);
        setResult(result);
      })
      .catch((error) => {
        console.error("Error submitting choice:", error);
        alert("An error occurred while submitting your choice. Please try again.");
        setIsSubmitted(false);
      });
  };

  // This function determines the opponent's choice based on the result and user's choice.
  const getOpponentChoice = () => {
    // Ensure the userChoice is one of the valid choices
    if (!["rock", "paper", "scissors"].includes(userChoice)) {
      return null; // or some default value like "rock"
    }

    // If it's a draw, the opponent chose the same as the user
    if (result === "draw") {
      return userChoice;
    }

    // Mapping user choices to winning and losing scenarios
    const choicesMap = {
      rock: { win: "scissors", lose: "paper" },
      paper: { win: "rock", lose: "scissors" },
      scissors: { win: "paper", lose: "rock" },
    };

    // If the user wins, opponent's choice is the one that loses to userChoice
    // If the user loses, opponent's choice is the one that wins against userChoice
    return result === "win" ? choicesMap[userChoice].win : choicesMap[userChoice].lose;
  };

  // Render user and opponent's choice
  const renderChoice = (choice, isUser = true) => {
    let image;
    switch (choice) {
      case "paper":
        image = paper;
        break;
      case "rock":
        image = rock;
        break;
      case "scissors":
        image = scissors;
        break;
      default:
        return null;
    }
    const positionClass = isUser ? "right-2 md:-right-9" : "left-2 md:-left-9";

    return <img src={image} alt={choice} className={`w-12 h-12 object-cover rounded-full border bg-accent absolute bottom-2 ${positionClass} p-1 -rotate-[20deg] md:-bottom-5 md:h-8 md:w-8`} />;
  };

  useEffect(() => {
    handleChoice(choice);
  }, [choice]);

  return (
    <div className={`mx-auto md:w-full shadow-md pb-4 shadow-white w-[550px] rounded-3xl bg-base-300  text-[20px] lg:text-sm ${className}`}>
      <div className="rounded-t-3xl h-12 py-2 md:text-sm items-center font-bold bg-primary px-4 text-[20px] flex justify-between text-primary-content">
        <p className="">{result ? "This Game Is Finished" : turn ? "Make a move" : "Wait Till it's Your Turn"}</p>
        <p className="">{result}</p>
      </div>
      <div className="mx-auto px-8 items-end grid grid-cols-3 md:grid-cols-4 gap-3 text-center justify-between mt-8 text-3xl">
        {/* User's Section */}
        <div>
          <div className="neon-border md:p-0 relative hover:text-black aspect-square text-center flex justify-center items-center hover:bg-secondary cursor-pointer text-[20px] lg:text-sm z-50 ease-out duration-200 rounded-mx p-2">
            <img src={userProfile?.profile_picture} alt="User profile" className="rounded-full" />
            {renderChoice(userChoice)}
          </div>
          <p className="mt-4 neon-container text-[20px] lg:text-sm">You</p>
        </div>

        {/* Choices Section */}
        <div className={`w-full md:col-span-2 ${isActive && turn ? "" : "opacity-60 pointer-events-none"}`}>
          <div className="flex gap-2 justify-around">
            <img onClick={() => handleChoice("paper")} src={paper} alt="Paper" className="p-2 md:w-12 md:h-12 bg-neutral w-[70px] h-[70px] flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full object-cover" />
            <img onClick={() => handleChoice("rock")} src={rock} alt="Rock" className="bg-neutral md:w-12 md:h-12 w-[70px] h-[70px] flex justify-center items-center hover:bg-secondary cursor-pointer ease-out duration-200 rounded-full p-2 z-[10] object-cover" />
          </div>
          <div onClick={() => handleChoice("scissors")} className="bg-neutral md:w-12 md:h-12 w-[70px] h-[70px] mx-auto flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-full p-2" aria-label="Choose Scissors">
            <img src={scissors} alt="Scissors" className="sm:w-32 z-[10] object-cover" />
          </div>
        </div>

        {/* Opponent Section */}
        <div className="">
          <div className="relative neon-border md:p-0 hover:text-black text-[20px] lg:text-sm text-center aspect-square flex justify-center items-center hover:bg-secondary cursor-pointer z-50 ease-out duration-200 rounded-mx p-2">
            <img src={opProfile} alt="Opponent profile" className="rounded-full" />
            {result ? renderChoice(getOpponentChoice(), false) : null}
          </div>
          <p className="mt-4 neon-container text-[20px] lg:text-sm">{opUsername}</p>
        </div>
      </div>

      {/* Submit button appears only when choice is not submitted */}
      {!result && !isSubmitted && (
        <div className="w-fit mx-auto py-7">
          <BorderButton onClick={handleSubmit} className="w-32">
            Play!
          </BorderButton>
        </div>
      )}
    </div>
  );
};

export default PaperRockScissorsFriend;
