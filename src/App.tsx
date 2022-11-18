import React, { useState } from "react";
import { Route, Routes } from "react-router";
import CreateGame from "./pages/CreateGame";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Winner from "./pages/Winner";

export interface IState {
  players: {
    id: number;
    name: string;
    answers: number[];
    correct_answers: number[];
    time: number;
    score: number;
  }[];
}

function App() {
  const [players, setPlayers] = useState<IState["players"]>([
    {
      id: 0,
      name: "",
      answers: [],
      correct_answers: [],
      time: 0,
      score: 0,
    },
    {
      id: 1,
      name: "",
      answers: [],
      correct_answers: [],
      time: 0,
      score: 0,
    },
  ]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/create-game"
          element={
            <CreateGame setPlayers={setPlayers} players={players}></CreateGame>
          }
        ></Route>
        <Route
          path="/game"
          element={
            <GamePage players={players} setPlayers={setPlayers}></GamePage>
          }
        ></Route>
        <Route path="/result" element={<Result></Result>}></Route>
        <Route path="/winner" element={<Winner></Winner>}></Route>
      </Routes>
    </>
  );
}

export default App;
