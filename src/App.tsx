import React, { useState } from "react";
import { Route, Routes } from "react-router";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import Winner from "./pages/Winner";

export interface IState {
  players: {
    id: number;
    name: string;
    answers: number[];
    times: number[];
  }[];
  results: {
    id: number;
    result: number[];
  }[];
}

function App() {
  const [players, setPlayers] = useState<IState["players"]>([
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
  const [results, setResults] = useState<IState["results"]>([
    {
      id: 1,
      result: [],
    },
    {
      id: 2,
      result: [],
    },
  ]);
  const [turn, setTurn] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [match, setMatch] = useState<number>(1);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/create-game"
          element={
            <CreateGame setPlayers={setPlayers}></CreateGame>
          }
        ></Route>
        <Route
          path="/loading"
          element={<Loading turn={turn} round={round}></Loading>}
        ></Route>
        <Route
          path="/game"
          element={
            <Game
              players={players}
              setPlayers={setPlayers}
              round={round}
              setRound={setRound}
              turn={turn}
              setTurn={setTurn}
              results={results}
              setResults={setResults}
            ></Game>
          }
        ></Route>
        <Route
          path="/result"
          element={<Result players={players} results={results}></Result>}
        ></Route>
        <Route
          path="/winner"
          element={
            <Winner
              players={players}
              setPlayers={setPlayers}
              results={results}
              setResults={setResults}
              match={match}
              setMatch={setMatch}
              round={round}
              setRound={setRound}
            ></Winner>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
