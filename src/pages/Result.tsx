import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IState as Props } from "../App";
import Table from "../components/Table";

interface IProps {
  players: Props["players"];
  results: Props["results"];
}

function Result({ players, results }: IProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchArr, setSearchArr] = useState<IProps["players"]>(players);
  const [resultsChars, setResultsChars] = useState<string[]>([]);
  const [answersChars, setAnswersChars] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  useEffect(() => {
    const resultsChar1: string[] = results[0].result.map((item) =>
      String.fromCharCode("A".charCodeAt(0) + item)
    );
    const resultsChar2: string[] = results[1].result.map((item) =>
      String.fromCharCode("A".charCodeAt(0) + item)
    );
    const answersChar1: string[] = players[0].answers.map((item) =>
      String.fromCharCode("A".charCodeAt(0) + item) === "@"
        ? "empty"
        : String.fromCharCode("A".charCodeAt(0) + item)
    );
    const answersChar2: string[] = players[1].answers.map((item) =>
      String.fromCharCode("A".charCodeAt(0) + item) === "@"
        ? "empty"
        : String.fromCharCode("A".charCodeAt(0) + item)
    );
    let score1: number = 0;
    let time1: number = 0;
    let score2: number = 0;
    let time2: number = 0;

    for (let i = 0; i < 3; i++) {
      time1 = time1 + players[0].times[i];
      if (resultsChar1[i] === answersChar1[i]) {
        score1++;
      }
      time2 = time2 + players[1].times[i];
      if (resultsChar2[i] === answersChar2[i]) {
        score2++;
      }
    }
    setAnswersChars([...answersChar1, ...answersChar2]);
    setResultsChars([...resultsChar1, ...resultsChar2]);
    setScores([score1, score2]);
    setTimes([time1, time2]);
    const resultData = {
      player1: {
        id: players[0].id,
        name: players[0].name,
        answers: answersChar1,
        results: resultsChar1,
        timeFinish: time1,
      },
      player2: {
        id: players[1].id,
        name: players[1].name,
        answers: answersChar2,
        results: resultsChar2,
        timeFinish: time2,
      },
    };
    window.localStorage.setItem("resultData", JSON.stringify(resultData));
  }, [players, results]);
  const handleSearch = (): void => {
    const playersName = players.map((item) => item.name.toLowerCase());
    const filterArr = players.filter((item, index) =>
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
          <form className="flex items-strech mt-4 mx-auto">
            <input
              className="md:w-[16rem] outline-none border-2 border-[#818181] px-2 py-1 rounded-l-full"
              type="text"
              placeholder="Search player"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
            ></input>
            <div
              className="border-2 border-l-0 border-[#818181] rounded-r-full px-6 flex items-center cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </div>
          </form>
          <Table searchArr={searchArr}players={players} answersChars={answersChars} resultsChars={resultsChars} scores={scores} times={times}></Table>
        </div>
      </div>
    </>
  );
}

export default Result;
