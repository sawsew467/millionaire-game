import React, { useEffect } from "react";
import { IState as Props } from "../../App";

interface IProps {
  searchArr: Props["players"];
  players: Props["players"];
  resultsChars: string[];
  answersChars: string[];
  scores: number[];
  times: number[];
}

function Table({
  searchArr,
  players,
  answersChars,
  resultsChars,
  scores,
  times,
}: IProps) {
  const numberOfRounds: number = 3;
  return (
    <div className="w-full flex flex-col mt-4 text-sm">
      <div className="flex flex-row font-bold">
        <div className="w-1/5 flex justify-center items-center p-2 border-2 border-[#818181]">
          Player
        </div>
        <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
          Answer
        </div>
        <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
          Result
        </div>
        <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
          Score
        </div>
        <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
          Time
        </div>
      </div>
      {searchArr.map((item, index) => (
        <div className="flex flex-row" key={index}>
          <div className="w-1/5 flex justify-center items-center p-2 border-2 border-t-0 border-[#818181]">
            {players[item.id - 1].name}
          </div>
          <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-t-0 border-[#818181]">
            {answersChars.slice((item.id - 1) * numberOfRounds, item.id * numberOfRounds).join(", ")}
          </div>
          <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-t-0 border-[#818181]">
            {resultsChars.slice((item.id - 1) * numberOfRounds, item.id * numberOfRounds).join(", ")}
          </div>
          <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-t-0 border-[#818181]">
            {scores[item.id - 1]}
          </div>
          <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-t-0 border-[#818181]">
            {times[item.id - 1]}
          </div>
        </div>
      ))}
      {searchArr.length === 0 && (
        <p className="text-center text-md mt-4">0 result</p>
      )}
    </div>
  );
}

export default Table;
