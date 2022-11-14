import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getQuestion } from "../apis";

interface IProps {
  turn: number;
  round: number;
}

interface IState {
  question: {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string[];
    type: string;
  };
}

function Loading({ turn, round }: IProps) {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<IState["question"]>();
  useEffect((): void => {
    getQuestion().then((res) => {
      setQuestion(res.data.results[0]);
    });
  }, []);
  if (question !== undefined) {
    window.localStorage.setItem("question", JSON.stringify(question));
    window.localStorage.setItem("turn", JSON.stringify(turn));
  }
  useEffect((): void => {
    if (question !== undefined) {
      navigate("/game");
    }
  }, [question]);
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-3/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-[#505150]">Loading...</h1>
          <p>round {round}</p>
        </div>
      </div>
    </>
  );
}

export default Loading;
