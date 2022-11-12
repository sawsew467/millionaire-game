import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IState as Props } from "../App";

interface IProps {
  players: Props["players"];
  setPlayers: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        answers: number[];
        times: number[];
      }[]
    >
  >;
  results: Props["results"];
  setResults: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        result: number[];
      }[]
    >
  >;
  match: number;
  setMatch: React.Dispatch<React.SetStateAction<number>>;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
}

interface IState {
  question: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  answers: {
    id: number;
    answer: string;
  }[];
}

function Game({
  players,
  setPlayers,
  match,
  setMatch,
  turn,
  setTurn,
  results,
  setResults,
}: IProps) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const question: IState["question"] = JSON.parse(
    window.localStorage.getItem("question") ?? ""
  );
  const [choosen, setChoosen] = useState<number>(-1);
  const answers: IState["answers"] = [
    question.correct_answer,
    ...question?.incorrect_answers,
  ]
    .map((item, index) => {
      return {
        id: index,
        answer: item,
      };
    })
    .sort((a, b) => {
      return a.answer[0].charCodeAt(0) - b.answer[0].charCodeAt(0);
    });
  const handleSubmit = () => {
    let correctIndex = 0;
    for (let i = 0; i < 4; i++) {
      if (answers[i].answer === question.correct_answer) {
        correctIndex = i;
      }
    }
    //
    if (turn === 0) {
      results[0].result.push(correctIndex);
      setTurn(1);
      setResults([
        {
          id: 1,
          result: results[0].result,
        },
        {
          id: 2,
          result: results[1].result,
        },
      ]);
      countdown > 0 ? players[0].answers.push(choosen) : players[0].answers.push(0);
      players[0].times.push(10-countdown);
      setPlayers([
        {
          id: 1,
          name: players[0].name,
          answers: players[0].answers,
          times: players[0].times,
        },
        {
          id: 2,
          name: players[1].name,
          answers: players[1].answers,
          times: players[1].times,
        },
      ]);
      console.log(results[0].result);
      
      navigate("/loading");
    }

    //
    if (turn === 1) {
      results[1].result.push(correctIndex);
      setResults([
        {
          id: 1,
          result: results[0].result,
        },
        {
          id: 2,
          result: results[1].result,
        },
      ]);
      countdown > 0 ? players[1].answers.push(choosen) : players[1].answers.push(0);
      players[1].times.push(10-countdown);
      setPlayers([
        {
          id: 1,
          name: players[0].name,
          answers: players[0].answers,
          times: players[0].times,
        },
        {
          id: 2,
          name: players[1].name,
          answers: players[1].answers,
          times: players[1].times,
        },
      ]);
      setTurn(0);
      setMatch(match + 1);
      console.log(results[1].result);

      if (match + 1 > 3) {
        navigate("/result");
      } else {
        navigate("/loading");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1);
      if (countdown <= 0) {
        // setChoosen(0);
        handleSubmit();
      }
    }, 1000);
  }, [countdown]);
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl text-[#818181] font-bold mb-4">
          {players[turn].name}'s turn
        </h1>
        <div className="lg:w-2/5 md:w-4/5 w-11/12 bg-[#f5f5f5] flex flex-col border-2 border-[#818181] p-4">
          <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-2">
            <h1 className="md:text-2xl text-xl font-bold text-[#6e6e6e] flex-1">
              {3 - match} questions left
            </h1>
            <p>Time remaining</p>
            <div className="w-10 h-10 rounded-full border-2 border-[#818181] text-center leading-[36px] ml-4">
              {countdown}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-2">
            <p className="mb-2 text-lg">
              {match}. {question.question}
            </p>
            <ul className="lg:w-2/5 md:w-3/5 w-full flex flex-col gap-2">
              {answers.map((item, index) => (
                <li
                  className={
                    index === choosen
                      ? "flex flex-row items-center gap-2 text-lg bg-[#818181] text-[#fff] border-2 border-[#818181] px-2 cursor-pointer"
                      : "flex flex-row items-center gap-2 text-lg text-[#818181] border-2 border-[#818181] px-2 cursor-pointer"
                  }
                  key={index}
                  onClick={
                    index !== choosen
                      ? () => setChoosen(index)
                      : () => setChoosen(-1)
                  }
                >
                  <div
                    className={
                      index === choosen
                        ? "w-4 h-4 rounded-full border-2 border-[#fff]"
                        : "w-4 h-4 rounded-full border-2 border-[#888]"
                    }
                  ></div>
                  <p>{item.answer}</p>
                </li>
              ))}
            </ul>
            <button
              className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 border-[#818181] bg-[#cccccc] rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
