import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import BorderButton from "../Buttons/BorderButton.jsx";
import { useNavigate } from "react-router";

const Dialog = ({ username }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.artina.org/api/game/user-profiles/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => setUsers(removeRecord(e.data)));
  }, []);

  const createGame = () => {
    axios
      .post(
        "https://api.artina.org/api/game/games/create_play_friend/",
        { friend_username: selected },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => setUsers(removeRecord(e.data)));
  };

  function removeRecord(array) {
    return array.filter((item) => item.username !== username);
  }

  return (
    <Fragment>
      <dialog id="frirens-list" className="modal">
        <div className="mx-auto bg-base-100 w-[70%] p-8 rounded-lg">
          <form method="dialog" className="text-xl">
            <button>
              <IoCloseSharp />
            </button>
          </form>
          <div className="modal-action block w-[60rem]">
            <h3 className="font-bold text-lg">Choose your opponent!</h3>
            {users.map((user) => {
              return (
                <div onClick={() => setSelected(user.username)} key={user.id} className={`p-4 cursor-pointer rounded-md w-fit my-3 ${selected === user.username ? "bg-primary text-primary-content " : "border border-primary"}`}>
                  <h1>{user.username}</h1>
                </div>
              );
            })}
            <BorderButton
              onClick={() => {
                createGame();
                navigate("./play-with-friend");
              }}
              className={`mx-auto`}
            >
              Start playing with your friend !
            </BorderButton>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
};
export default Dialog;
