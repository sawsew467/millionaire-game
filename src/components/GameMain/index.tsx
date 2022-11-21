import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IState as Props } from "../../App";
import Timer from "../Timer";
import { decode } from "html-entities";
import AnswerList from "../AnswerList";

interface IProps {
  players: Props["players"];
  setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>;
  round: number;
  turn: number;
  question: {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };
  setQuestion: React.Dispatch<
    React.SetStateAction<
      | {
          category: string;
          correct_answer: string;
          difficulty: string;
          incorrect_answers: string[];
          question: string;
          type: string;
        }
      | undefined
    >
  >;
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

function GameMain({
  players,
  setPlayers,
  round,
  turn,
  question,
  setQuestion,
}: IProps) {
  const numberOfRounds: number = 3;
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(10);
  const [choosen, setChoosen] = useState<number>(-1);
  const answers: IState["answers"] = [
    question.correct_answer,
    ...question.incorrect_answers,
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
  const handlePlayerTurn = (turn: number, correctIndex: number): void => {
    players[turn].correct_answers.push(correctIndex);
    countdown === 0
      ? players[turn].answers.push(-1)
      : players[turn].answers.push(choosen);
    players[turn].time += 10 - countdown;
    correctIndex === choosen && players[turn].score++;
    window.localStorage.setItem("turn", JSON.stringify(Math.abs(turn - 1)));
  };
  const handleSubmit = (): void => {
    let correctIndex = 0;
    for (let i = 0; i <= numberOfRounds; i++) {
      if (answers[i].answer === question.correct_answer) {
        correctIndex = i;
      }
    }
    if (turn === 0) {
      handlePlayerTurn(turn, correctIndex);

      const newQues = {
        ...question,
        question: "",
      };
      setQuestion(newQues);
    }
    if (turn === 1) {
      handlePlayerTurn(turn, correctIndex);
      window.localStorage.setItem("round", JSON.stringify(round + 1));
      if (round + 1 > numberOfRounds) {
        navigate("/result");
      } else {
        const newQues = {
          ...question,
          question: "",
        };
        setQuestion(newQues);
      }
    }
    window.localStorage.setItem("players", JSON.stringify(players));
  };
  useEffect((): void => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    if (countdown <= 0) {
      clearTimeout(timer);
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {decode(question.question.toString())}
            </p>
            <AnswerList
              answers={answers}
              choosen={choosen}
              setChoosen={setChoosen}
            ></AnswerList>
            <button
              className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 mx-auto border-[#818181] bg-[#cccccc] rounded-md"
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

export default GameMain;
