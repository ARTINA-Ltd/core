import { useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { UserContext } from "../../App.js";
import axios from "axios";
import BorderButton from "../Buttons/BorderButton.jsx";
import { Notify } from "notiflix";

const BuyHeart = () => {
  const user = useContext(UserContext);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const buyHearts = async () => {
    if (!user?.data?.id) {
      console.error("User ID not available");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.artina.org/api/game/user-profiles/buy_hearts/",
        { id: user.data.id, hearts_to_buy: amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      );
      console.log(response.data);
      Notify.success(response.data.message);
    } catch (error) {
      console.error("Error buying hearts:", error);
    }
  };

  const handleSelectAmount = (event) => {
    setAmount(Number(event.target.value));
  };

  return (
    <div>
      <dialog id="buy-heart" className="modal text-center modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="rounded-full hover:bg-error w-8 h-8 hover:text-error-content flex items-center justify-center absolute left-3 top-3">
              <IoCloseSharp />
            </button>
          </form>

          <div className="h-96 border rounded-lg px-32 mt-12 mx-auto w-fit py-12">
            <p>Buy more Hearts to play!</p>
            <select className="select select-primary mt-4 w-full max-w-xs" value={amount} onChange={handleSelectAmount}>
              <option disabled value={0}>
                Select the number of hearts
              </option>
              <option value={1}>Buy 1</option>
              <option value={10}>Buy 10</option>
              <option value={20}>Buy 20</option>
            </select>
            <BorderButton className="mt-40" onClick={buyHearts}>
              Buy Hearts!
            </BorderButton>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BuyHeart;
