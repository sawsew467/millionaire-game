import React, { useEffect, useState } from "react";
import { getQuestion } from "../../apis";
import { IState as Props } from "../../App";
import GameMain from "../../components/GameMain";
import LoadingMatch from "../../components/LoadingMatch";
import LoadingRound from "../../components/LoadingRound";

interface IProps {
  players: Props["players"];
  setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>;
  results: Props["results"];
  setResults: React.Dispatch<React.SetStateAction<Props["results"]>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  match: number;
  setMatch: React.Dispatch<React.SetStateAction<number>>;
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
  round,
  setRound,
  turn,
  setTurn,
  results,
  setResults,
  match,
  setMatch,
}: IProps) {
  const [question, setQuestion] = useState<IState["question"]>();
  const [isLoadingMatch, setIsLoadingMatch] = useState<boolean>(true);
  useEffect(() => {
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
          setRound={setRound}
          turn={turn}
          setTurn={setTurn}
          results={results}
          setResults={setResults}
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
