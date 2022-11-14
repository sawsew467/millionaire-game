import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IState as Props } from "../App";

interface IProps {
  setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>;
}

function CreateGame({ setPlayers }: IProps) {
  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = (): void => {
    if (!name1 || !name2) {
      setIsErr(true);
      return;
    }
    setPlayers([
      {
        id: 1,
        name: name1,
        answers: [],
        times: [],
      },
      {
        id: 2,
        name: name2,
        answers: [],
        times: [],
      },
    ]);
    navigate("/loading");
  };
  const handleEnter1 = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleEnter2 = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="lg:w-2/5 md:w-4/5 w-11/12 bg-[#fff] border-4 border-[#818181] flex flex-col p-4">
        <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-2">
          <h1 className="text-2xl font-bold text-[#6e6e6e]">Create game</h1>
          <Link to="/">
            <FaTimes className="text-2xl text-[#6e6e6e]"></FaTimes>
          </Link>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <form className="flex lg:flex-row flex-col lg:items-center lg:gap-4 mt-4">
            <label className="text-lg text-[#6e6e6e] font-bold">Player 1</label>
            <input
              className="outline-none border-2 border-[#818181] px-2 py-1"
              type="text"
              placeholder="Name"
              onChange={(e) => setName1(e.target.value)}
              onKeyDown={handleEnter1}
            ></input>
          </form>
          <form className="flex lg:flex-row flex-col lg:items-center lg:gap-4 mt-4">
            <label className="text-lg text-[#6e6e6e] font-bold">Player 2</label>
            <input
              className="outline-none border-2 border-[#818181] px-2 py-1"
              type="text"
              placeholder="Name"
              onChange={(e) => setName2(e.target.value)}
              onKeyDown={(e) => handleEnter2(e)}
            ></input>
          </form>
          <button
            className="border-2 border-[#818181] text-[#6e6e6e] px-6 mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {isErr && (
            <p className="text-[#ff5151] text-sm mt-4">
              {name1 === ""
                ? "Please enter Player1's name!"
                : name2 === "" && "Please enter Player2's name!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
