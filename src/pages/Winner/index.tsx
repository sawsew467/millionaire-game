import React from "react";
import { useNavigate } from "react-router-dom";

function Winner() {
  const winner: string = window.localStorage.getItem("winner") ?? "";
  const match: number =
    JSON.parse(`${window.localStorage.getItem("match")}`) ?? 0;
  const navigate = useNavigate();
  const handleNextMatch = (): void => {
    window.localStorage.setItem("match", JSON.stringify(match + 1));
    window.localStorage.setItem("round", JSON.stringify(1));
    const players = JSON.parse(`${window.localStorage.getItem("players")}`);
    window.localStorage.setItem(
      "players",
      JSON.stringify([
        {
          id: 0,
          name: players[0].name,
          answers: [],
          correct_answers: [],
          time: 0,
          score: 0,
        },
        {
          id: 1,
          name: players[1].name,
          answers: [],
          correct_answers: [],
          time: 0,
          score: 0,
        },
      ])
    );
    navigate("/game");
  };
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <p className="text-2xl font-bold text-[#505150]">Match {match}</p>
          <div className="w-[10rem]">
            <img
              src={require("../../assets/images/gameicon.png")}
              alt={"img"}
            ></img>
          </div>
          <h1 className="text-2xl font-bold text-[#505150] mt-2">{winner}</h1>
          {match === 1 && (
            <button
              className="text-lg text-[#59595a] mt-4 px-8 py-1 border-2 border-[#818181] bg-[#cccccc] rounded-md"
              onClick={handleNextMatch}
            >
              Play Match 2
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Winner;
