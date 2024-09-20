import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import BorderButton from "../Buttons/BorderButton.jsx";
import { useNavigate } from "react-router";

const Dialog = ({ user }) => {
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
        "https://api.artina.org/api/game/games/",
        { user2: selected },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        setUsers(removeRecord(e.data));
        navigate("./play-with-friend");
      });
  };

  function removeRecord(array) {
    return array.filter((item) => item.user !== user);
  }

  return (
    <Fragment>
      <dialog id="frirens-list" className="modal">
        <div className="mx-auto  bg-base-100 w-[70%] p-8 rounded-lg">
          <form method="dialog" className="text-xl">
            <button>
              <IoCloseSharp />
            </button>
          </form>
          <h3 className="font-bold text-lg">Choose your opponent!</h3>
          <div className="modal-action max-h-[60vh] overflow-auto grid gap-4 grid-cols-6 lg:grid-cols-3 md:grid-cols-2">
            {users.map((user) => {
              return (
                <div onClick={() => setSelected(user.user)} key={user.id} className={`text-center p-4 cursor-pointer rounded-md grow w-fit my-3 ${selected === user.user ? "bg-primary  text-primary-content " : "border border-primary"}`}>
                  <img src={user.profile_picture} alt="" />
                  <h1 className="mt-2">{user.user}</h1>
                </div>
              );
            })}
          </div>
          <div className="mx-auto w-fit">
            <BorderButton
              disabled={selected.length === 0}
              onClick={() => {
                createGame();
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
