import React from "react";
import { IState as Props } from "../App";

interface IProps {
  players: Props["players"];
  results: Props["results"];
}

function Winner({ players, results }: IProps) {
  const resultsChar1: string[] = results[0].result.map((item) =>
    String.fromCharCode("A".charCodeAt(0) + item)
  );
  const resultsChar2: string[] = results[1].result.map((item) =>
    String.fromCharCode("A".charCodeAt(0) + item)
  );
  const answersChar1: string[] = players[0].answers.map((item) =>
    String.fromCharCode("A".charCodeAt(0) + item)
  );
  const answersChar2: string[] = players[1].answers.map((item) =>
    String.fromCharCode("A".charCodeAt(0) + item)
  );
  let score1:number = 0;
  let score2:number = 0;
  let time1:number = 0;
  let time2:number = 0;
  for (let i = 0; i < 3; i++) {
    if (resultsChar1[i] === answersChar1[i]) {
      time1 = time1 + players[0].times[i];
      score1++;
    }
    if (resultsChar2[i] === answersChar2[i]) {
      time2 = time2 + players[1].times[i];
      score2++;
    }
  }
  const winner = (): string => {
    if (score1 !== score2) {
      return score1 > score2
        ? `Winner: ${players[0].name}`
        : `Winner: ${players[1].name}`;
    } else {
      if (time1 !== time2) {
        return time1 < time2
          ? `Winner: ${players[0].name}`
          : `Winner: ${players[1].name}`;
      } else {
        return "The match is drawn!";
      }
    }
  };
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <div className="w-[10rem]">
            <img src={require("../assets/images/gameicon.png")}></img>
          </div>
          <h1 className="text-2xl font-bold text-[#505150]">{winner()}</h1>
        </div>
      </div>
    </>
  );
}

export default Winner;
