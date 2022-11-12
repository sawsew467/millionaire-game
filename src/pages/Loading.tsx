import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getQuestion } from "../apis";
import Game from "./Game";

interface IProps {
    turn: number,
    match: number
}

function Loading({turn, match} : IProps) {
  const navigate = useNavigate();
  const [question1, setQuestion1] = useState();
  const [question2, setQuestion2] = useState();
  useEffect(() => {
    getQuestion().then((res) => {
      setQuestion1(res.data.results[0]);
      setQuestion2(res.data.results[1]);
    });
  }, []);
  if (question1 != undefined) {
    window.localStorage.setItem('question', JSON.stringify(
        question1,
    ));
    window.localStorage.setItem('turn', JSON.stringify(
        turn,
    ));
    navigate("/game");
  }
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-[#505150]">Loading...</h1>
          <p>Match {match}</p>
        </div>
      </div>
    </>
  );
}

export default Loading;
