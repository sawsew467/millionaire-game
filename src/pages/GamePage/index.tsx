import React, { useEffect, useState } from "react";
import { getQuestion } from "../../apis";
import GameMain from "../../components/GameMain";
import LoadingMatch from "../../components/LoadingMatch";
import LoadingRound from "../../components/LoadingRound";
import { IState as Props } from "../../App";


interface IProps {
  players: Props["players"];
  setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>;
}

interface IState {
  question: {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };
}

function Index({
  players,
  setPlayers,
}: IProps) {
  const [question, setQuestion] = useState<IState["question"]>();
  const [isLoadingMatch, setIsLoadingMatch] = useState<boolean>(true);
  const match:number = JSON.parse(`${window.localStorage.getItem("match")}`) ?? 0;
  const turn:number = JSON.parse(`${window.localStorage.getItem("turn")}`) ?? 0;
  const round:number = JSON.parse(`${window.localStorage.getItem("round")}`) ?? 0;
  useEffect(():void => {
    setTimeout(() => {
      setIsLoadingMatch(!isLoadingMatch);
    }, 1000);
  }, [match]);
  useEffect((): void => {
    getQuestion()
      .then((res) => {
        setQuestion(res.data.results[0]);
      })
      .catch(() => {
        alert("Something went wrong, can not get question!!!");
      });
  }, [turn]);
  return (
    <>
      {isLoadingMatch && <LoadingMatch match={match}></LoadingMatch>}
      {question?.question ? (
        <GameMain
          players={JSON.parse(`${window.localStorage.getItem("players")}`)}
          setPlayers={setPlayers}
          round={round}
          turn={turn}
          question={question}
          setQuestion={setQuestion}
        ></GameMain>
      ) : (
        <LoadingRound turn={turn} round={round}></LoadingRound>
      )}
    </>
  );
}

export default Index;
