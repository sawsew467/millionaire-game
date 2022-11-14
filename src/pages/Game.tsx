import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IState as Props } from "../App";
import Timer from "../components/Timer";
import { decode } from "html-entities";
import AnswerList from "../components/AnswerList";

interface IProps {
  players: Props["players"];
  setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>;
  results: Props["results"];
  setResults: React.Dispatch<React.SetStateAction<Props["results"]>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
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
  round,
  setRound,
  turn,
  setTurn,
  results,
  setResults,
}: IProps) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(10);
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
  const handlePlayerTurn = (turn: number): void => {
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
    countdown === 0
      ? players[turn].answers.push(-1)
      : players[turn].answers.push(choosen);
    
    players[turn].times.push(10 - countdown);
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
  };
  const handleSubmit = (): void => {
    let correctIndex = 0;
    for (let i = 0; i < 4; i++) {
      if (answers[i].answer === question.correct_answer) {
        correctIndex = i;
      }
    }
    //
    if (turn === 0) {
      results[0].result.push(correctIndex);
      handlePlayerTurn(turn);
      setTurn(1);
      navigate("/loading");
    }

    //
    if (turn === 1) {
      results[1].result.push(correctIndex);
      handlePlayerTurn(turn);
      setTurn(0);
      setRound(round + 1);

      if (round + 1 > 3) {
        navigate("/result");
      } else {
        navigate("/loading");
      }
    }
  };
  useEffect((): void => {
    setTimeout(() => {
      setCountdown(countdown - 1);
      if (countdown <= 0) {
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
        <div className="lg:w-3/5 md:w-4/5 w-11/12 bg-[#f5f5f5] flex flex-col border-2 border-[#818181] p-4">
          <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-4">
            <h1 className="md:text-xl text-md font-bold text-[#818181] flex-1">
              {3 - round} questions left
            </h1>
            <p className="text-sm text-[#6e6e6e]">Time remaining</p>
            <Timer countdown={countdown}></Timer>
          </div>
          <div className="w-full flex flex-col justify-center items-start mt-2">
            <p className="mb-2 text-lg text-start font-bold text-[#6e6e6e]">
              {round}. {decode(question.question)}
            </p>
            <AnswerList answers={answers} choosen={choosen} setChoosen={setChoosen}></AnswerList>
            {choosen !== -1 ? (
              <button
                className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 mx-auto border-[#818181] bg-[#cccccc] rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 mx-auto border-[#818181] bg-[#cccccc] rounded-md opacity-50 cursor-not-allowed">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
