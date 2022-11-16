import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IState as Props } from "../../App";

interface IProps {
  players: Props["players"];
  setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>;
  results: Props["results"];
  setResults: React.Dispatch<React.SetStateAction<Props["results"]>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  match: number;
  setMatch: React.Dispatch<React.SetStateAction<number>>;
}

function Winner({
  // players,
  // setPlayers,
  // results,
  // setResults,
  match,
  setMatch,
  setRound,
}: IProps) {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "",
      answers: [],
      times: [],
    },
    {
      id: 2,
      name: "",
      answers: [],
      times: [],
    },
  ]);
  const [results, setResults] = useState([
    {
      id: 1,
      result: [],
    },
    {
      id: 2,
      result: [],
    },
  ]);
  useEffect(() => {
    setPlayers(JSON.parse(`${window.localStorage.getItem("players")}`));
    setResults(JSON.parse(`${window.localStorage.getItem("results")}`));
  }, []);
  const numberOfRounds = 3;
  let score1: number = 0;
  let time1: number = 0;
  let score2: number = 0;
  let time2: number = 0;

  for (let i = 0; i <= numberOfRounds; i++) {
    time1 = time1 + players[0].times[i];
    if (results[0].result[i] === players[0].answers[i]) {
      score1++;
    }
    time2 = time2 + players[1].times[i];
    if (results[1].result[i] === players[1].answers[i]) {
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
  const navigate = useNavigate();
  const handleNextMatch = () => {
    setMatch(match + 1);
    setRound(1);
    setPlayers([
      {
        id: 1,
        name: players[0].name,
        answers: [],
        times: [],
      },
      {
        id: 2,
        name: players[1].name,
        answers: [],
        times: [],
      },
    ]);
    setResults([
      {
        id: 1,
        result: [],
      },
      {
        id: 2,
        result: [],
      },
    ]);
    window.localStorage.setItem(
      "players",
      JSON.stringify([
        {
          id: 1,
          name: players[0].name,
          answers: [],
          times: [],
        },
        {
          id: 2,
          name: players[1].name,
          answers: [],
          times: [],
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
          <h1 className="text-2xl font-bold text-[#505150] mt-2">{winner()}</h1>
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
