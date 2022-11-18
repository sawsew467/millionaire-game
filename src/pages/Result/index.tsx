import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IState as Props } from "../../App";
import Table from "../../components/Table";

function Result() {
  const [players, setPlayers] = useState([
    {
      id: 0,
      name: "",
      questions: [],
      answers: [],
      correct_answers: [],
      time: 0,
      score: 0,
    },
    {
      id: 1,
      name: "",
      questions: [],
      answers: [],
      correct_answers: [],
      time: 0,
      score: 0,
    },
  ]);
  useEffect(() => {
    setPlayers(JSON.parse(`${window.localStorage.getItem("players")}`));
  }, []);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchArr, setSearchArr] = useState<any>(
    JSON.parse(`${window.localStorage.getItem("players")}`)
  );
  const [resultsChars, setResultsChars] = useState<string[]>([]);
  const [answersChars, setAnswersChars] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  useEffect((): void => {
    const resultsChar1: string[] = players[0].correct_answers.map((item: any) =>
      String.fromCharCode("A".charCodeAt(0) + item)
    );
    const resultsChar2: string[] = players[1].correct_answers.map((item: any) =>
      String.fromCharCode("A".charCodeAt(0) + item)
    );
    const answersChar1: string[] = players[0].answers.map((item: any) =>
      String.fromCharCode("A".charCodeAt(0) + item) === "@"
        ? "empty"
        : String.fromCharCode("A".charCodeAt(0) + item)
    );
    const answersChar2: string[] = players[1].answers.map((item: any) =>
      String.fromCharCode("A".charCodeAt(0) + item) === "@"
        ? "empty"
        : String.fromCharCode("A".charCodeAt(0) + item)
    );
    setAnswersChars([...answersChar1, ...answersChar2]);
    setResultsChars([...resultsChar1, ...resultsChar2]);
    setScores([players[0].score, players[1].score]);
    setTimes([players[0].time, players[1].time]);
    let winner: string = "";
    if (players[0].score !== players[1].score) {
      winner =
        players[0].score > players[1].score
          ? `Winner: ${players[0].name}`
          : `Winner: ${players[1].name}`;
    } else {
      if (players[0].time !== players[1].time) {
        winner =
          players[0].time < players[1].time
            ? `Winner: ${players[0].name}`
            : `Winner: ${players[1].name}`;
      } else {
        winner = "The match is drawn!";
      }
    }
    window.localStorage.setItem("winner", winner);
  }, [players]);
  const handleSearch = (): void => {
    const playersName = players.map((item: any) => item.name.toLowerCase());
    const filterArr = players.filter((item: any, index: number) =>
      playersName[index].includes(searchInput.toLowerCase())
    );
    setSearchArr(filterArr);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      setSearchInput("");
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center p-2">
        <div className="lg:w-3/5 md:w-4/5 w-11/12 bg-[#f5f5f5] flex flex-col border-2 border-[#818181] p-4">
          <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-4">
            <h1 className="text-2xl font-bold text-[#6e6e6e]">Result game</h1>
            <Link to="/winner">
              <button className="text-lg text-[#59595a] px-8 py-1 border-2 border-[#818181] bg-[#cccccc] rounded-md">
                Finally
              </button>
            </Link>
          </div>
          <form className="flex sm:flex-row flex-col items-strech mt-4 mx-auto">
            <input
              className="md:w-[16rem] outline-none border-2 border-[#818181] px-2 py-1 sm:rounded-l-full"
              type="text"
              placeholder="Search player"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
            ></input>
            <div
              className="border-2 sm:border-l-0 border-[#818181] sm:rounded-r-full sm:px-6 px-2 flex items-center justify-center cursor-pointer sm:mt-0 mt-2"
              onClick={handleSearch}
            >
              Search
            </div>
          </form>
          <Table
            searchArr={searchArr}
            players={players}
            answersChars={answersChars}
            resultsChars={resultsChars}
            scores={scores}
            times={times}
          ></Table>
        </div>
      </div>
    </>
  );
}

export default Result;
